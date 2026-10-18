// expo-router depends on these, but nothing the app renders imports them (the bundle contains none of their
// modules), so their native code stays out of the build. That keeps the APK smaller and avoids
// gesture-handler's codegen paths, which pass Windows' path limit. Remove an entry here before using the
// library (drawers, swipe gestures, Reanimated animations).
const unused = ['react-native-gesture-handler', 'react-native-reanimated', 'react-native-worklets'];

module.exports = {
  dependencies: Object.fromEntries(unused.map((name) => [name, { platforms: { android: null, ios: null } }]))
};
