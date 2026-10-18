// The workspace libs are written for the browser (Vite). Metro needs the same substitutions web's vite.config makes:
// Node built-ins become shims, and argon2-browser (WebAssembly, which Hermes lacks) becomes a pure-JS argon2id.
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const shim = (file) => path.join(__dirname, 'src', 'shims', file);
const aliases = {
  'argon2-browser': shim('argon2.ts'),
  'futoin-hkdf': shim('hkdf.ts'),
  crypto: shim('crypto.ts'),
  'node:crypto': shim('crypto.ts')
};

// Resolved from this package so the libs (whose pnpm peers point at web's React) share the app's single copy
const singletons = ['react', 'react-native', '@apollo/client', 'graphql', 'rxjs', 'buffer', 'process'];
const fromApp = path.join(__dirname, 'index.ts');

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (aliases[moduleName]) {
    return { type: 'sourceFile', filePath: aliases[moduleName] };
  }
  const bare = moduleName.replace(/^node:/, '');
  if (singletons.some((name) => bare === name || bare.startsWith(name + '/'))) {
    return context.resolveRequest({ ...context, originModulePath: fromApp }, bare, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
