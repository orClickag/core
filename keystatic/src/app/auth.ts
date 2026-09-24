import { parse } from 'cookie';
import { Config } from '../config';

export function getSyncAuth(config: Config) {
  if (typeof document === 'undefined') {
    return null;
  }
  if (config.storage.kind === 'github') {
    const cookies = parse(document.cookie);
    const accessToken = cookies['keystatic-gh-access-token'];
    if (!accessToken) {
      return null;
    }
    return { accessToken };
  }
  if (config.storage.kind === 'cloud') {
    // Cloud authentication is a same-origin HttpOnly cookie session. There is
    // intentionally no bearer token to recover from browser storage.
    return { accessToken: '' };
  }
  return null;
}

export function getCloudAuth(config: Config) {
  return config.storage.kind === 'cloud' ? { accessToken: '' } : null;
}

function localAuthProject(config: Config) {
  if (config.storage.kind !== 'local') return;
  return config.ui?.localAuth?.project;
}

let _refreshTokenPromise: Promise<{ accessToken: string } | null> | undefined;

export async function getAuth(config: Config) {
  const token = getSyncAuth(config);

  if (config.storage.kind === 'github' && !token) {
    if (!_refreshTokenPromise) {
      _refreshTokenPromise = (async () => {
        try {
          const res = await fetch('/api/keystatic/github/refresh-token', {
            method: 'POST',
          });
          if (res.status === 200) {
            const cookies = parse(document.cookie);
            const accessToken = cookies['keystatic-gh-access-token'];
            if (accessToken) {
              return { accessToken };
            }
          }
        } catch {
        } finally {
          _refreshTokenPromise = undefined;
        }
        return null;
      })();
    }
    return _refreshTokenPromise;
  }
  if (config.storage.kind === 'cloud') {
    if (!config.cloud?.project) return null;
    const response = await fetch(
      `/api/keystatic/cloud/v2/projects/${encodeURIComponent(
        config.cloud.project
      )}/session`,
      { credentials: 'same-origin', headers: { Accept: 'application/json' } }
    );
    return response.ok ? { accessToken: '' } : null;
  }
  const project = localAuthProject(config);
  if (project) {
    const response = await fetch('/api/keystatic/local/session', {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'X-Keystatic-Project': project,
      },
    });
    return response.ok ? { accessToken: '' } : null;
  }
  return token;
}
