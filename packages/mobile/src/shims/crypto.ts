// The slice of Node's `crypto` the workspace libs touch (skiff-crypto's aead-v2 nonces, tweetnacl's fallback).
import { sha1 } from '@noble/hashes/legacy.js';
import { hmac } from '@noble/hashes/hmac.js';
import { sha256, sha512 } from '@noble/hashes/sha2.js';
import type { CHash } from '@noble/hashes/utils.js';
import { Buffer } from 'buffer';

type Hash = CHash;

const hashes: Record<string, Hash> = { sha1, sha256, sha512, 'sha-1': sha1, 'sha-256': sha256, 'sha-512': sha512 };

function pickHash(name: string): Hash {
  const hash = hashes[name.toLowerCase()];
  if (!hash) throw new Error(`crypto shim: unsupported hash ${name}`);
  return hash;
}

const toBytes = (data: string | Uint8Array, encoding?: BufferEncoding) =>
  typeof data === 'string' ? Buffer.from(data, encoding ?? 'utf8') : data;

export function randomBytes(size: number): Buffer {
  const bytes = new Uint8Array(size);
  globalThis.crypto.getRandomValues(bytes);
  return Buffer.from(bytes);
}

function digester(update: (bytes: Uint8Array) => void, finish: () => Uint8Array) {
  const self = {
    update(data: string | Uint8Array, encoding?: BufferEncoding) {
      update(toBytes(data, encoding));
      return self;
    },
    digest(encoding?: BufferEncoding) {
      const out = Buffer.from(finish());
      return encoding ? out.toString(encoding) : out;
    }
  };
  return self;
}

export function createHash(algorithm: string) {
  const h = pickHash(algorithm).create();
  return digester(
    (bytes) => h.update(bytes),
    () => h.digest()
  );
}

export function createHmac(algorithm: string, key: string | Uint8Array) {
  const h = hmac.create(pickHash(algorithm), toBytes(key));
  return digester(
    (bytes) => h.update(bytes),
    () => h.digest()
  );
}

export default { randomBytes, createHash, createHmac };
