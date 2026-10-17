//! SRP-6a server side, matching `secure-remote-password` 0.3.1 exactly
//! (RFC 5054 2048-bit group, g = 2, SHA-256, hex-length-preserving hashing).

use std::sync::LazyLock;

use anyhow::{Result, bail};
use num_bigint::BigUint;
use sha2::{Digest, Sha256};

const N_HEX: &str = concat!(
    "AC6BDB41324A9A9BF166DE5E1389582FAF72B6651987EE07FC3192943DB56050A37329CBB4A099ED8193E075",
    "7767A13DD52312AB4B03310DCD7F48A9DA04FD50E8083969EDB767B0CF6095179A163AB3661A05FBD5FAAAE8",
    "2918A9962F0B93B855F97993EC975EEAA80D740ADBF4FF747359D041D5C33EA71D281E446B14773BCA97B43A",
    "23FB801676BD207A436C6481F1D2B9078717461A5B9D32E688F87748544523B524B0D57D5EA77A2775D2ECFA",
    "032CFBDBF52FB3786160279004E57AE6AF874E7303CE53299CCC041C7BC308D82A5698F3A8D0C38271AE35F8",
    "E9DBFBB694B5C803D89F7AE435DE236D525F54759B65E372FCD68EF20FA7111F9E4AFF73"
);
/// Byte length of N; values produced by mod/modPow are hashed left-padded to this.
const N_LEN: usize = 256;

static N: LazyLock<BigUint> = LazyLock::new(|| BigUint::parse_bytes(N_HEX.as_bytes(), 16).unwrap());
static G: LazyLock<BigUint> = LazyLock::new(|| BigUint::from(2u8));
/// k = H(N, g) where g is hashed as the single byte 0x02.
static K: LazyLock<BigUint> = LazyLock::new(|| BigUint::from_bytes_be(&hash(&[&pad(&N), &[2u8]])));

fn hash(parts: &[&[u8]]) -> [u8; 32] {
    let mut h = Sha256::new();
    for p in parts {
        h.update(p);
    }
    h.finalize().into()
}

fn pad(n: &BigUint) -> Vec<u8> {
    let bytes = n.to_bytes_be();
    let mut out = vec![0u8; N_LEN.saturating_sub(bytes.len())];
    out.extend_from_slice(&bytes);
    out
}

fn from_hex(s: &str) -> Result<BigUint> {
    BigUint::parse_bytes(s.as_bytes(), 16).ok_or_else(|| anyhow::anyhow!("invalid hex integer"))
}

/// verifier = g^x mod N as 512 hex chars (used when creating accounts).
pub fn derive_verifier(private_key_hex: &str) -> Result<String> {
    Ok(hex::encode(pad(&G.modpow(&from_hex(private_key_hex)?, &N))))
}

/// Server ephemeral: returns (b_hex, B_hex). B = (k·v + g^b) mod N, sent padded to 512 hex chars.
pub fn server_ephemeral(verifier_hex: &str, b: [u8; 32]) -> Result<(String, String)> {
    let v = from_hex(verifier_hex)?;
    let b = BigUint::from_bytes_be(&b);
    let big_b = (&*K * &v + G.modpow(&b, &N)) % &*N;
    Ok((hex::encode(b.to_bytes_be()), hex::encode(pad(&big_b))))
}

/// Verify the client proof M; on success returns the server proof P = H(A, M, K) as hex.
pub fn verify_session(
    b_hex: &str,
    client_public_hex: &str,
    salt_hex: &str,
    username: &str,
    verifier_hex: &str,
    client_proof_hex: &str,
) -> Result<String> {
    let b = from_hex(b_hex)?;
    let a_pub = from_hex(client_public_hex)?;
    let v = from_hex(verifier_hex)?;
    if (&a_pub % &*N) == BigUint::ZERO {
        bail!("invalid client ephemeral");
    }
    let big_b = (&*K * &v + G.modpow(&b, &N)) % &*N;
    let (a_bytes, b_bytes) = (pad(&a_pub), pad(&big_b));
    let u = BigUint::from_bytes_be(&hash(&[&a_bytes, &b_bytes]));
    let s = (&a_pub * v.modpow(&u, &N)).modpow(&b, &N);
    let k = hash(&[&pad(&s)]);
    let hn = hash(&[&pad(&N)]);
    let hg = hash(&[&[2u8]]);
    let hxor: Vec<u8> = hn.iter().zip(hg.iter()).map(|(a, b)| a ^ b).collect();
    let salt = hex::decode(salt_hex)?;
    let m = hash(&[&hxor, &hash(&[username.as_bytes()]), &salt, &a_bytes, &b_bytes, &k]);
    let client_m = hex::decode(client_proof_hex.trim_start_matches("0x")).unwrap_or_default();
    // the library compares as integers, so tolerate a leading-zero difference
    if BigUint::from_bytes_be(&client_m) != BigUint::from_bytes_be(&m) {
        bail!("bad client proof");
    }
    Ok(hex::encode(hash(&[&a_bytes, &m, &k])))
}

#[cfg(test)]
mod tests {
    use super::*;

    // Generated with secure-remote-password 0.3.1 (client + server) from the repo's yarn cache.
    const SALT: &str = "a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1";
    const X: &str = "f6935294ad2c603f967249fd330aa80817f3278a3363aca3bf42b4791475c800";
    
    fn vectors() -> serde_json::Value {
        serde_json::from_str(include_str!("../tests/srp_vectors.json")).unwrap()
    }

    #[test]
    fn verifier_and_ephemeral_match_js() {
        let v = vectors();
        assert_eq!(derive_verifier(X).unwrap(), v["v"].as_str().unwrap());
        let b: [u8; 32] = hex::decode(v["b"].as_str().unwrap()).unwrap().try_into().unwrap();
        let (_, big_b) = server_ephemeral(v["v"].as_str().unwrap(), b).unwrap();
        assert_eq!(big_b, v["B"].as_str().unwrap());
    }

    #[test]
    fn session_proofs_match_js() {
        let v = vectors();
        let b = v["b"].as_str().unwrap();
        let proof = verify_session(
            b,
            v["A"].as_str().unwrap(),
            SALT,
            v["username"].as_str().unwrap(),
            v["v"].as_str().unwrap(),
            v["M"].as_str().unwrap(),
        )
        .unwrap();
        assert_eq!(proof, v["serverProof"].as_str().unwrap());
        assert!(
            verify_session(b, v["A"].as_str().unwrap(), SALT, "other", v["v"].as_str().unwrap(), v["M"].as_str().unwrap())
                .is_err()
        );
    }
}
