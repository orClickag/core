import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));
function keystatic() {
  return {
    name: 'keystatic',
    hooks: {
      'astro:config:setup': ({
        injectRoute,
        updateConfig,
        config
      }) => {
        // A linked @keystatic/astro package is transformed from its real path
        // outside the Astro project. Resolve this peer from the consumer so
        // Vite does not look for it in @keystatic/astro/node_modules.
        const consumerRequire = createRequire(new URL('./package.json', config.root));
        const coreUiEntrypoint = join(dirname(consumerRequire.resolve('@keystatic/core/package.json')), 'dist/keystatic-core-ui.js');
        updateConfig({
          server: config.server.host ? {} : {
            host: '127.0.0.1'
          },
          vite: {
            resolve: {
              alias: {
                '@keystatic/core/ui': coreUiEntrypoint
              }
            },
            server: {
              fs: {
                // The Astro page is an internal entrypoint of this package.
                // This is needed when the package is linked during local
                // development, because Vite otherwise rejects the resolved
                // real path outside the consumer's root with a 403.
                allow: [fileURLToPath(config.root), packageRoot]
              }
            },
            plugins: [{
              name: 'keystatic',
              resolveId(id) {
                if (id === 'virtual:keystatic-config') {
                  return this.resolve('./keystatic.config', './a');
                }
                return null;
              }
            }],
            optimizeDeps: {
              entries: ['keystatic.config.*', '.astro/keystatic-imports.js']
            }
          }
        });
        const dotAstroDir = new URL('./.astro/', config.root);
        mkdirSync(dotAstroDir, {
          recursive: true
        });
        writeFileSync(new URL('keystatic-imports.js', dotAstroDir), `import "@keystatic/astro/ui";
import "@keystatic/astro/api";
import "@keystatic/core/ui";
`);
        injectRoute({
          entrypoint: '@keystatic/astro/internal/keystatic-astro-page.astro',
          pattern: '/keystatic/[...params]',
          prerender: false
        });
        injectRoute({
          entrypoint: '@keystatic/astro/internal/keystatic-api.js',
          pattern: '/api/keystatic/[...params]',
          prerender: false
        });
      }
    }
  };
}

export { keystatic as default };
