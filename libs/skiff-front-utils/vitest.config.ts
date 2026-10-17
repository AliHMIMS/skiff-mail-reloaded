import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    alias: [{ find: /^.+\.svg$/, replacement: fileURLToPath(new URL('./testUtils/svgStub.tsx', import.meta.url)) }]
  }
});
