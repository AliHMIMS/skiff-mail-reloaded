// futoin-hkdf's default export on @noble/hashes (futoin-hkdf needs Node's crypto). Strings are UTF-8, like Buffer.from.
import { hkdf as nobleHkdf } from '@noble/hashes/hkdf.js';
import { sha1 } from '@noble/hashes/legacy.js';
import { sha256, sha512 } from '@noble/hashes/sha2.js';
import { Buffer } from 'buffer';

interface Options {
  salt?: string | Uint8Array;
  info?: string | Uint8Array;
  hash?: string;
}

const hashes = { 'SHA-1': sha1, 'SHA-256': sha256, 'SHA-512': sha512 };
const bytes = (value: string | Uint8Array) => (typeof value === 'string' ? Buffer.from(value, 'utf8') : value);

export default function hkdf(ikm: string | Uint8Array, length: number, { salt, info, hash = 'SHA-256' }: Options = {}) {
  const fn = hashes[hash.toUpperCase().replace(/^SHA(\d)/, 'SHA-$1') as keyof typeof hashes];
  if (!fn) throw new Error(`hkdf shim: unsupported hash ${hash}`);
  return Buffer.from(nobleHkdf(fn, bytes(ikm), salt ? bytes(salt) : undefined, info ? bytes(info) : undefined, length));
}
