// Globals the browser-targeted workspace libs expect (web sets the same in packages/web/src/polyfills.ts).
import { Buffer } from 'buffer';
import { getRandomValues } from 'expo-crypto';
import process from 'process';

const g = globalThis as any;

g.Buffer ??= Buffer;
g.process ??= process;
g.process.env ??= {};
g.global ??= globalThis;
g.self ??= globalThis;

// tweetnacl, randombytes and secure-remote-password all draw from crypto.getRandomValues
g.crypto ??= {};
g.crypto.getRandomValues ??= getRandomValues;
