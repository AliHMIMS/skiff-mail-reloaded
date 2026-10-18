// babel-preset-expo strips Flow types from every file, and that pass rejects TypeScript `declare` class fields
// (skiff-graphql's errors.ts uses one). Running TypeScript's own transform first, with declare fields allowed,
// removes them before the Flow pass sees them.
module.exports = function (api) {
  api.cache(true);
  const typescript = (isTSX) => [
    '@babel/plugin-transform-typescript',
    { isTSX, allowNamespaces: true, allowDeclareFields: true }
  ];
  return {
    presets: ['babel-preset-expo'],
    overrides: [
      { test: (file) => !!file && file.endsWith('.ts'), plugins: [typescript(false)] },
      { test: (file) => !!file && file.endsWith('.tsx'), plugins: [typescript(true)] }
    ]
  };
};
