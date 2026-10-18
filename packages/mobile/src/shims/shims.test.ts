import realArgon2 from 'argon2-browser';
import realHkdf from 'futoin-hkdf';
import { createHash as nodeCreateHash, createHmac as nodeCreateHmac } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import srp from 'secure-remote-password/client';
import { describe, expect, it } from 'vitest';

import vectors from '../../../server/tests/srp_vectors.json';

import argon2 from './argon2';
import { createHash, createHmac, randomBytes } from './crypto';
import hkdf from './hkdf';

// The reference implementation's Emscripten loader fetch()es its .wasm when Node has a global fetch, which fails
// for a file path; hand it the binary through the Module object it reads from `self` instead.
const require = createRequire(import.meta.url);
(globalThis as any).loadArgon2WasmModule = async () => {
  const g = globalThis as any;
  g.self = { Module: { wasmBinary: readFileSync(require.resolve('argon2-browser/dist/argon2.wasm')) } };
  try {
    return require('argon2-browser/dist/argon2.js');
  } finally {
    delete g.self;
  }
};

describe('argon2 shim', () => {
  it('matches argon2-browser for the login derivation', async () => {
    const options = { pass: 'correct horse battery staple', salt: vectors.salt, hashLen: 32, type: 2 };
    const expected = await realArgon2.hash({ ...options, type: realArgon2.ArgonType.Argon2id });
    const actual = await argon2.hash(options);
    expect(Buffer.from(actual.hash).toString('hex')).toBe(expected.hashHex);
  });

  it('keeps argon2-browser defaults (24-byte Argon2d)', async () => {
    const expected = await realArgon2.hash({ pass: 'pw', salt: 'saltsalt' });
    expect((await argon2.hash({ pass: 'pw', salt: 'saltsalt' })).hashHex).toBe(expected.hashHex);
  });
});

describe('hkdf shim', () => {
  it('matches futoin-hkdf', () => {
    const options = { salt: vectors.salt, info: 'LOGIN', hash: 'SHA-256' };
    expect(hkdf(vectors.masterSecret, 32, options).toString('hex')).toBe(
      realHkdf(vectors.masterSecret, 32, options).toString('hex')
    );
  });

  it('derives the server-verified SRP key and password-derived secret', () => {
    expect(hkdf(vectors.masterSecret, 32, { salt: vectors.salt, info: 'LOGIN', hash: 'SHA-256' }).toString('hex')).toBe(
      vectors.x
    );
    expect(
      hkdf(vectors.masterSecret, 32, { salt: vectors.salt, info: 'PRIVATE_KEYS', hash: 'SHA-256' }).toString('base64')
    ).toBe(vectors.pds);
  });
});

describe('crypto shim', () => {
  it('matches node hashes and hmacs', () => {
    for (const algorithm of ['sha1', 'sha256', 'sha512']) {
      expect(
        createHash(algorithm)
          .update('abc')
          .update(new Uint8Array([1, 2]))
          .digest('hex')
      ).toBe(
        nodeCreateHash(algorithm)
          .update('abc')
          .update(new Uint8Array([1, 2]))
          .digest('hex')
      );
      expect(createHmac(algorithm, 'key').update('message').digest('hex')).toBe(
        nodeCreateHmac(algorithm, 'key').update('message').digest('hex')
      );
    }
  });

  it('returns random buffers of the requested size', () => {
    const a = randomBytes(24);
    expect(a).toHaveLength(24);
    expect(a.equals(randomBytes(24))).toBe(false);
  });
});

describe('SRP client', () => {
  it('produces the proof the server expects', () => {
    const session = srp.deriveSession(vectors.a, vectors.B, vectors.salt, vectors.username, vectors.x);
    expect(session.proof).toBe(vectors.M);
    expect(session.key).toBe(vectors.K);
    expect(() => srp.verifySession(vectors.A, session, vectors.serverProof)).not.toThrow();
  });
});
