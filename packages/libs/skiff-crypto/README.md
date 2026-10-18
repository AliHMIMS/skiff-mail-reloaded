![Logo](https://skiff-org.github.io/assets/updates/skiff-crypto-header.png)

# skiff-crypto

Welcome! `skiff-crypto` is a versatile, open-source JavaScript cryptography library specifically designed to provide strong and efficient cryptographic functions for use in NodeJS or in the browser. This package powers cryptography inside Skiff's end-to-end encrypted, privacy-first product suite, including Mail, Pages, Drive, and Calendar applications.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.txt)

## Features

skiff-crypto brings together a host of cryptographic functionalities:

- **Symmetric Key Cryptography**: ChaCha20Poly1305-based symmetric encryption functions.
- **Asymmetric Key Cryptography**: TweetNaCl-based asymmetric encryption.
- **Datagram Library**: Manage object versions and metadata in an efficient way.
- **Integrity**: Support for checksum and data integrity verification.
- **Utilities**: A collection of useful utilities for working with cryptographic data, such as utf8 and string conversion.

## Usage

A workspace package: depend on `"skiff-crypto": "workspace:*"` and import it.

```ts
import * as skiffCrypto from 'skiff-crypto';

// Asymmetric encryption example
const plaintext = 'Hello, skiff-crypto!';
const keypair = skiffCrypto.generatePublicPrivateKeyPair();
const encrypted = skiffCrypto.stringEncryptAsymmetric(keypair.privateKey, { key: keypair.publicKey }, plaintext);
const decrypted = skiffCrypto.stringDecryptAsymmetric(keypair.privateKey, { key: keypair.publicKey }, encrypted);

console.log('Plaintext:', plaintext);
console.log('Ciphertext:', encrypted);
console.log('Expected to be true:', plaintext === decrypted);

// Symmetric encryption example
const symmetricKey = skiffCrypto.generateSymmetricKey();
// A datagram is used to manage object versions and metadata
const TestDatagram = skiffCrypto.createJSONWrapperDatagram('ddl://test');
const symmetricPlainText = 'Hello, skiff-crypto (symmetric encryption)!';
const symmetricEncrypted = skiffCrypto.encryptSymmetric(symmetricPlainText, symmetricKey, TestDatagram);
const symmetricDecrypted = skiffCrypto.decryptSymmetric(symmetricEncrypted, symmetricKey, TestDatagram);
console.log('Symmetric encrypted content', symmetricEncrypted);
console.log('Symmetric decrypted content', symmetricDecrypted);
console.log('Expected to be true:', symmetricPlainText === symmetricDecrypted);

// Hash example
console.log('SHA-512 hash example', skiffCrypto.generateHash('Hello, skiff-crypto!'));
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/skiff-crypto-demo-kt7soo)

Detailed usage instructions and more examples are available in the [API documentation](https://skiff.com/skiff-crypto).

## Security

Cryptography is a sensitive domain. While skiff-crypto has been audited and built using widely-used, audited libraries, we urge you to use this library responsibly. Please have a sound understanding of the underlying principles of cryptography before implementation.

## License

skiff-crypto is [MIT licensed](./LICENSE.txt). You're encouraged to use and adapt the code for your projects, given that you respect the original copyright and abide by the license terms.
