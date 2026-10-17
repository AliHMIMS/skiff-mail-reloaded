//! Account creation done server-side (the open-source client has no signup page).
//! Reproduces the client's key derivation (libs/skiff-crypto/src/keys.ts) so the browser can log in with SRP
//! and decrypt the private keys generated here.

use anyhow::{Result, anyhow};
use argon2::{Algorithm, Argon2, Params, Version};
use ed25519_dalek::{Signer, SigningKey};
use hkdf::Hkdf;
use rand::rngs::OsRng;
use serde::Serialize;
use sha2::Sha256;

use crate::crypto::{self, b64};
use crate::srp;

pub struct NewAccount {
    pub salt: String,
    pub verifier: String,
    pub encrypted_user_data: String,
    pub public_key: String,
    pub public_key_signature: String,
    pub signing_public_key: String,
}

/// `createKeyFromSecret`: base64(Argon2id(password, utf8(salt hex string), t=1, m=1024 KiB, p=1, 32 bytes)).
fn master_secret(password: &str, salt: &str) -> Result<String> {
    let params = Params::new(1024, 1, 1, Some(32)).map_err(|e| anyhow!("{e}"))?;
    let mut out = [0u8; 32];
    Argon2::new(Algorithm::Argon2id, Version::V0x13, params)
        .hash_password_into(password.as_bytes(), salt.as_bytes(), &mut out)
        .map_err(|e| anyhow!("{e}"))?;
    Ok(b64(&out))
}

/// HKDF-SHA256 over the UTF-8 of the base64 master secret string, salted with the UTF-8 salt string.
fn hkdf32(master_secret: &str, salt: &str, info: &str) -> [u8; 32] {
    let mut out = [0u8; 32];
    Hkdf::<Sha256>::new(Some(salt.as_bytes()), master_secret.as_bytes())
        .expand(info.as_bytes(), &mut out)
        .expect("32 bytes is a valid HKDF length");
    out
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct PrivateUserData {
    private_key: String,
    signing_private_key: String,
    document_key: String,
}

pub fn create(password: &str) -> Result<NewAccount> {
    let salt = hex::encode(crypto::random_bytes::<32>());
    let master = master_secret(password, &salt)?;
    let srp_key = hex::encode(hkdf32(&master, &salt, "LOGIN"));
    let password_derived_secret = b64(&hkdf32(&master, &salt, "PRIVATE_KEYS"));

    let (public_key, private_key) = crypto::generate_keypair();
    let signing = SigningKey::generate(&mut OsRng);
    let private = PrivateUserData {
        private_key,
        // tweetnacl secret keys are seed ‖ public key
        signing_private_key: b64(&signing.to_keypair_bytes()),
        document_key: crypto::new_session_key(),
    };
    let signed = serde_json::to_string(&["USER_PUBLIC_KEY", "NO_CONTEXT", public_key.as_str()])?;
    Ok(NewAccount {
        verifier: srp::derive_verifier(&srp_key)?,
        encrypted_user_data: crypto::v1_encrypt(crypto::PRIVATE_USER_DATA_DATAGRAM, &private, &password_derived_secret)?,
        public_key_signature: b64(&signing.sign(signed.as_bytes()).to_bytes()),
        signing_public_key: b64(signing.verifying_key().as_bytes()),
        public_key,
        salt,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn hkdf_matches_js() {
        let v: serde_json::Value = serde_json::from_str(include_str!("../tests/srp_vectors.json")).unwrap();
        let (master, salt) = (v["masterSecret"].as_str().unwrap(), v["salt"].as_str().unwrap());
        assert_eq!(hex::encode(hkdf32(master, salt, "LOGIN")), v["x"].as_str().unwrap());
        assert_eq!(b64(&hkdf32(master, salt, "PRIVATE_KEYS")), v["pds"].as_str().unwrap());
    }

    #[test]
    fn creates_consistent_account() {
        let acct = create("hunter2").unwrap();
        assert_eq!(acct.salt.len(), 64);
        assert_eq!(acct.verifier.len(), 512);
        assert!(acct.encrypted_user_data.starts_with("PQUwLjEuMAUwLjEuMC"));
    }
}
