import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import svgr from 'vite-plugin-svgr';

// Workspace libraries are compiled from source (no separate library build step).
const LIBS = [
  'nightwatch-ui',
  'skiff-crypto',
  'skiff-crypto-v2',
  'skiff-front-graphql',
  'skiff-front-search',
  'skiff-front-utils',
  'skiff-graphql',
  'skiff-mail-protos',
  'skiff-utils'
];

// process.env values the app reads, fixed at build time (what webpack's EnvironmentPlugin did).
const ENV_KEYS = [
  'SKEMAIL_API_BASE_URL',
  'SKEMAIL_BASE_URL',
  'LD_CLIENT_SIDE_ID',
  'HCAPTCHA_SITE_KEY',
  'PASSIVE_HCAPTCHA_SITE_KEY',
  'GIT_HASH',
  'PM_DEVTOOLS',
  'SKIP_RELAY_PROXY'
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const resolveFromApp = createRequire(path.join(__dirname, 'package.json')).resolve;

// Browser shims for Node core modules (absolute paths so imports from ../libs resolve under pnpm).
const NODE_SHIMS: Record<string, string> = {
  buffer: 'buffer/',
  process: 'process/browser.js',
  crypto: 'crypto-browserify',
  stream: 'stream-browserify',
  path: 'path-browserify',
  events: 'events/',
  util: 'util/',
  string_decoder: 'string_decoder/'
};

// Like webpack's ProvidePlugin: modules that use these free variables get an import instead.
const NODE_GLOBALS = { Buffer: ['buffer', 'Buffer'], process: 'process' } as const;

/** Ships the push service worker as-is at /mail/push/push-sw.js. */
const pushServiceWorker = (): Plugin => ({
  name: 'push-service-worker',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'push/push-sw.js',
      source: fs.readFileSync(path.resolve(__dirname, 'src/push/push-sw.js'))
    });
  }
});

export default defineConfig(({ mode }) => ({
  base: '/mail/',
  plugins: [react(), svgr({ include: '**/*.svg', svgrOptions: { exportType: 'default' } }), pushServiceWorker()],
  resolve: {
    alias: [
      ...LIBS.map((lib) => ({
        find: new RegExp(`^${lib}$`),
        replacement: path.resolve(__dirname, `../libs/${lib}/src/index.ts`)
      })),
      ...Object.entries(NODE_SHIMS).map(([mod, shim]) => ({
        find: new RegExp(`^(node:)?${mod}/?$`),
        replacement: resolveFromApp(shim)
      })),
      // the default entry loads its .wasm through a webpack loader; the bundled build inlines it
      { find: /^argon2-browser$/, replacement: 'argon2-browser/dist/argon2-bundled.min.js' }
    ]
  },
  define: {
    ...Object.fromEntries(
      ENV_KEYS.map((key) => [
        `process.env.${key}`,
        process.env[key] === undefined ? 'undefined' : JSON.stringify(process.env[key])
      ])
    ),
    'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
    global: 'globalThis'
  },
  worker: { format: 'es', rolldownOptions: { transform: { inject: NODE_GLOBALS } } },
  build: {
    outDir: 'src/dist-next',
    emptyOutDir: true,
    target: 'es2020',
    // Oxc end to end: Rolldown bundles with Oxc's parser/resolver/transformer; Oxc minifies JS
    minify: 'oxc',
    cssMinify: 'lightningcss',
    sourcemap: false,
    chunkSizeWarningLimit: 8000,
    rolldownOptions: {
      // the libraries re-export TypeScript types without `export type`; those names don't exist at runtime
      shimMissingExports: true,
      transform: { inject: NODE_GLOBALS },
      onLog(level, log, handler) {
        // expected: the type re-exports above, and `eval` inside a third-party dependency
        if (log.code === 'SHIMMED_EXPORT' || log.code === 'EVAL') return;
        handler(level, log);
      }
    }
  },
  server: { port: 4200 }
}));
