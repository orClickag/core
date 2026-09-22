import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { getSecret } from 'astro:env/server';

const cloudPathPrefix = '/api/keystatic/cloud/';
function isBodylessMethod(method) {
  return method === 'GET' || method === 'HEAD';
}
async function forwardCloudRequest(context) {
  var _ref, _getSecret;
  const requestUrl = new URL(context.request.url);
  const forwardedPath = requestUrl.pathname.slice(cloudPathPrefix.length);
  const configuredCloudApiUrl = (_ref = (_getSecret = getSecret('KEYSTATIC_CLOUD_API_URL')) !== null && _getSecret !== void 0 ? _getSecret : process.env.KEYSTATIC_CLOUD_API_URL) !== null && _ref !== void 0 ? _ref : 'https://api.keystatic.cloud';
  const upstream = new URL(`${forwardedPath.startsWith('v2/') ? 'api/' : ''}${forwardedPath}${requestUrl.search}`, configuredCloudApiUrl);
  const headers = new Headers();
  for (const name of ['accept', 'content-type', 'cookie', 'x-keystatic-version']) {
    const value = context.request.headers.get(name);
    if (value) headers.set(name, value);
  }
  const response = await fetch(upstream, {
    method: context.request.method,
    headers,
    body: isBodylessMethod(context.request.method) ? undefined : await context.request.arrayBuffer(),
    redirect: 'manual'
  });
  const responseHeaders = new Headers();
  for (const name of ['cache-control', 'content-type', 'location', 'set-cookie']) {
    const value = response.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders
  });
}
function makeHandler(_config) {
  return async function keystaticAPIRoute(context) {
    var _ref2, _ref3, _config$clientId, _ref4, _ref5, _config$clientSecret, _ref6, _ref7, _config$secret;
    if (new URL(context.request.url).pathname.startsWith(cloudPathPrefix)) {
      return forwardCloudRequest(context);
    }
    const handler = makeGenericAPIRouteHandler({
      ..._config,
      clientId: (_ref2 = (_ref3 = (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : getSecret('KEYSTATIC_GITHUB_CLIENT_ID')) !== null && _ref3 !== void 0 ? _ref3 : getSecret('GITHUB_APP_ID')) !== null && _ref2 !== void 0 ? _ref2 : process.env.GITHUB_APP_ID,
      clientSecret: (_ref4 = (_ref5 = (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : getSecret('KEYSTATIC_GITHUB_CLIENT_SECRET')) !== null && _ref5 !== void 0 ? _ref5 : getSecret('GITHUB_APP_CLIENT_SECRET')) !== null && _ref4 !== void 0 ? _ref4 : process.env.GITHUB_APP_CLIENT_SECRET,
      secret: (_ref6 = (_ref7 = (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : getSecret('KEYSTATIC_SECRET')) !== null && _ref7 !== void 0 ? _ref7 : getSecret('BETTER_AUTH_SECRET')) !== null && _ref6 !== void 0 ? _ref6 : process.env.BETTER_AUTH_SECRET
    }, {
      slugEnvName: 'PUBLIC_KEYSTATIC_GITHUB_APP_SLUG'
    });
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    return new Response(body, {
      status,
      headers
    });
  };
}

export { makeHandler };
