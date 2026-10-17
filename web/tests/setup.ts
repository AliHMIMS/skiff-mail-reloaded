import '@testing-library/jest-dom/vitest';

import { cleanup, configure } from '@testing-library/react';
import { afterEach } from 'vitest';

configure({ testIdAttribute: 'data-test' });
// Testing Library only registers this itself when test globals are enabled
afterEach(cleanup);

// jsdom replaces Uint8Array with its own realm's; Node's TextEncoder and crypto libraries (openpgp) produce
// and check Node's, so put it back (the old Jest environment did the same)
globalThis.Uint8Array = Object.getPrototypeOf(Buffer.prototype).constructor;

// jsdom has no ResizeObserver
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// jsdom has no canvas; lottie-web paints a 1x1 placeholder when it loads
HTMLCanvasElement.prototype.getContext = (() => ({ fillStyle: '', fillRect() {} })) as never;

// No network in tests: anything that reaches the app's real Apollo client fails fast instead of calling out
globalThis.fetch = () => Promise.reject(new TypeError('fetch is disabled in tests'));
