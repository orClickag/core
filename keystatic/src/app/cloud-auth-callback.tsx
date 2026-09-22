import { ProgressCircle } from '@keystar/ui/progress';
import { Text } from '@keystar/ui/typography';
import { useEffect, useMemo, useState } from 'react';
import * as s from 'superstruct';
import { Config } from '../config';
import {
  KEYSTATIC_CLOUD_BROWSER_API_URL,
  KEYSTATIC_CLOUD_HEADERS,
} from './utils';
import { Flex } from '@keystar/ui/layout';

const storedStateSchema = s.object({
  state: s.string(),
  from: s.string(),
  code_verifier: s.string(),
});
const tokenResponseSchema = s.type({
  token_type: s.string(),
  expires_in: s.number(),
});

export function KeystaticCloudAuthCallback({ config }: { config: Config }) {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = useMemo(() => {
    const _storedState = localStorage.getItem('keystatic-cloud-state');
    const storedState = (() => {
      try {
        return storedStateSchema.create(JSON.parse(_storedState || ''));
      } catch {
        return null;
      }
    })();
    return storedState;
  }, []);
  const [error, setError] = useState<null | Error>(null);
  useEffect(() => {
    if (
      code &&
      state &&
      storedState &&
      state === storedState.state &&
      config.cloud?.project
    ) {
      const { project } = config.cloud;
      (async () => {
        const res = await fetch(
          `${KEYSTATIC_CLOUD_BROWSER_API_URL}/oauth/token`,
          {
            method: 'POST',
            credentials: 'same-origin',
            body: new URLSearchParams({
              code,
              client_id: project,
              redirect_uri: `${window.location.origin}/keystatic/cloud/oauth/callback`,
              code_verifier: storedState.code_verifier,
              grant_type: 'authorization_code',
            }).toString(),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              ...KEYSTATIC_CLOUD_HEADERS,
            },
          }
        );
        if (!res.ok) {
          throw new Error(
            `Bad response: ${res.status} ${
              res.statusText
            }\n\n${await res.text()}`
          );
        }
        const data = await res.json();
        tokenResponseSchema.create(data);
        localStorage.removeItem('keystatic-cloud-state');
        localStorage.removeItem('keystatic-cloud-access-token');
        window.location.assign(`/keystatic/${storedState.from}`);
      })().catch(error => {
        setError(error);
      });
    }
  }, [code, state, storedState, config]);
  if (!config.cloud?.project) {
    return <Text>Missing Keystatic Cloud config</Text>;
  }
  if (!code || !state) {
    return <Text>Missing code or state</Text>;
  }
  if (!storedState || state !== storedState.state) {
    return <Text>Invalid state</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <ProgressCircle
        size="large"
        isIndeterminate
        aria-label="Authenticating"
      />
    </Flex>
  );
}
