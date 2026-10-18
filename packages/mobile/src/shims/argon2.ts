// argon2-browser's API on @noble/hashes: Hermes has no WebAssembly. Parameters default to argon2-browser's
// (time 1, mem 1024 KiB, parallelism 1), which the server's account derivation matches.
import { argon2d, argon2i, argon2id } from '@noble/hashes/argon2.js';
import { bytesToHex } from '@noble/hashes/utils.js';

export const ArgonType = { Argon2d: 0, Argon2i: 1, Argon2id: 2 } as const;

interface HashOptions {
  pass: string | Uint8Array;
  salt: string | Uint8Array;
  time?: number;
  mem?: number;
  hashLen?: number;
  parallelism?: number;
  type?: number;
}

const encoder = new TextEncoder();
const bytes = (value: string | Uint8Array) => (typeof value === 'string' ? encoder.encode(value) : value);

export async function hash({
  pass,
  salt,
  time = 1,
  mem = 1024,
  hashLen = 24,
  parallelism = 1,
  type = ArgonType.Argon2d
}: HashOptions) {
  const fn = type === ArgonType.Argon2id ? argon2id : type === ArgonType.Argon2i ? argon2i : argon2d;
  const out = fn(bytes(pass), bytes(salt), { t: time, m: mem, p: parallelism, dkLen: hashLen });
  return { hash: out, hashHex: bytesToHex(out) };
}

export default { ArgonType, hash };
