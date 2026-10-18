// Polyfills must run before anything imports the crypto libs (tweetnacl picks its random source at load time)
import './src/polyfills';

import 'expo-router/entry';
