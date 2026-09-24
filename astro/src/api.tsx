import {
  APIRouteConfig,
  makeGenericAPIRouteHandler,
} from '@keystatic/core/api/generic';
import type { APIContext } from 'astro';
import { getSecret } from 'astro:env/server';

const cloudPathPrefix = '/api/keystatic/cloud/';

// Astro throws when a variable is not declared in its env schema. Packages
// cannot require every consumer to declare our optional compatibility aliases,
// so treat an undeclared secret the same as an absent one and keep the normal
// process.env fallback available.
function getOptionalSecret(name: string) {
  try {
    return getSecret(name);
  } catch {
    return undefined;
  }
}

function isBodylessMethod(method: string) {
  return method === 'GET' || method === 'HEAD';
}

async function forwardCloudRequest(context: APIContext) {
  const requestUrl = new URL(context.request.url);
  const forwardedPath = requestUrl.pathname.slice(cloudPathPrefix.length);
  const configuredCloudApiUrl =
    getOptionalSecret('KEYSTATIC_CLOUD_API_URL') ??
    process.env.KEYSTATIC_CLOUD_API_URL ??
    'https://api.keystatic.cloud';
  const upstream = new URL(
    `${forwardedPath.startsWith('v2/') ? 'api/' : ''}${forwardedPath}${
      requestUrl.search
    }`,
    configuredCloudApiUrl
  );
  const headers = new Headers();
  for (const name of [
    'accept',
    'content-type',
    'cookie',
    'origin',
    'x-keystatic-version',
  ]) {
    const value = context.request.headers.get(name);
    if (value) headers.set(name, value);
  }
  const response = await fetch(upstream, {
    method: context.request.method,
    headers,
    body: isBodylessMethod(context.request.method)
      ? undefined
      : await context.request.arrayBuffer(),
    redirect: 'manual',
  });
  const responseHeaders = new Headers();
  for (const name of [
    'cache-control',
    'content-type',
    'location',
    'set-cookie',
  ]) {
    const value = response.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}

export function makeHandler(_config: APIRouteConfig) {
  return async function keystaticAPIRoute(context: APIContext) {
    if (new URL(context.request.url).pathname.startsWith(cloudPathPrefix)) {
      return forwardCloudRequest(context);
    }
    const handler = makeGenericAPIRouteHandler(
      {
        ..._config,
        clientId:
          _config.clientId ??
          getOptionalSecret('KEYSTATIC_GITHUB_CLIENT_ID') ??
          getOptionalSecret('GITHUB_APP_ID') ??
          process.env.GITHUB_APP_ID,
        clientSecret:
          _config.clientSecret ??
          getOptionalSecret('KEYSTATIC_GITHUB_CLIENT_SECRET') ??
          getOptionalSecret('GITHUB_APP_CLIENT_SECRET') ??
          process.env.GITHUB_APP_CLIENT_SECRET,
        secret:
          _config.secret ??
          getOptionalSecret('KEYSTATIC_SECRET') ??
          getOptionalSecret('BETTER_AUTH_SECRET') ??
          process.env.BETTER_AUTH_SECRET,
      },
      {
        slugEnvName: 'PUBLIC_KEYSTATIC_GITHUB_APP_SLUG',
      }
    );
    const { body, headers, status } = await handler(context.request);
    return new Response(body, {
      status,
      headers,
    });
  };
}
