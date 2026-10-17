//! Byte-compatible reimplementation of the Skiff client crypto (libs/skiff-crypto).
//!
//! - Asymmetric: NaCl crypto_box (X25519 + XSalsa20-Poly1305), output base64(nonce24 ‖ tag16 ‖ ct).
//! - Symmetric: ChaCha20-Poly1305 IETF inside the "datagram" envelope (V2 for mail, V1 for user data).
//! - Session keys travel as their base64 *string*, so boxes encrypt the UTF-8 of that string.

use anyhow::{Context, Result, anyhow, bail};
use base64::{Engine, engine::general_purpose::STANDARD};
use chacha20poly1305::{
    ChaCha20Poly1305,
    aead::{Aead as _, KeyInit as _, Payload},
};
use crypto_box::SalsaBox;
use rand::{RngCore, rngs::OsRng};

pub fn b64(bytes: &[u8]) -> String {
    STANDARD.encode(bytes)
}

pub fn unb64(s: &str) -> Result<Vec<u8>> {
    STANDARD.decode(s.trim()).context("invalid base64")
}

pub fn random_bytes<const N: usize>() -> [u8; N] {
    let mut out = [0u8; N];
    OsRng.fill_bytes(&mut out);
    out
}

/// A fresh per-email session key, as the client represents it (base64 of 32 random bytes).
pub fn new_session_key() -> String {
    b64(&random_bytes::<32>())
}

// ---------------------------------------------------------------------------
// varint (unsigned LEB128, minimal encoding)

pub fn put_varint(out: &mut Vec<u8>, mut v: u64) {
    while v >= 0x80 {
        out.push((v as u8) | 0x80);
        v >>= 7;
    }
    out.push(v as u8);
}

pub fn read_varint(buf: &[u8], pos: &mut usize) -> Result<u64> {
    let mut result = 0u64;
    let mut shift = 0;
    loop {
        let b = *buf.get(*pos).ok_or_else(|| anyhow!("truncated varint"))?;
        *pos += 1;
        result |= u64::from(b & 0x7f) << shift;
        if b & 0x80 == 0 {
            return Ok(result);
        }
        shift += 7;
        if shift > 63 {
            bail!("varint overflow");
        }
    }
}

fn put_prefixed(out: &mut Vec<u8>, bytes: &[u8]) {
    put_varint(out, bytes.len() as u64);
    out.extend_from_slice(bytes);
}

fn read_prefixed<'a>(buf: &'a [u8], pos: &mut usize) -> Result<&'a [u8]> {
    let len = read_varint(buf, pos)? as usize;
    let end = pos.checked_add(len).filter(|&e| e <= buf.len()).ok_or_else(|| anyhow!("truncated field"))?;
    let slice = &buf[*pos..end];
    *pos = end;
    Ok(slice)
}

// ---------------------------------------------------------------------------
// Asymmetric (crypto_box)

fn salsa_box(their_pk_b64: &str, my_sk_b64: &str) -> Result<SalsaBox> {
    let pk: [u8; 32] = unb64(their_pk_b64)?.try_into().map_err(|_| anyhow!("public key must be 32 bytes"))?;
    let sk: [u8; 32] = unb64(my_sk_b64)?.try_into().map_err(|_| anyhow!("secret key must be 32 bytes"))?;
    Ok(SalsaBox::new(&crypto_box::PublicKey::from(pk), &crypto_box::SecretKey::from(sk)))
}

/// `stringEncryptAsymmetric`: base64(nonce24 ‖ tag16 ‖ ct).
pub fn box_encrypt(plaintext: &[u8], their_pk_b64: &str, my_sk_b64: &str) -> Result<String> {
    box_encrypt_with_nonce(plaintext, their_pk_b64, my_sk_b64, random_bytes::<24>())
}

fn box_encrypt_with_nonce(plaintext: &[u8], their_pk_b64: &str, my_sk_b64: &str, nonce: [u8; 24]) -> Result<String> {
    let sealed = salsa_box(their_pk_b64, my_sk_b64)?
        .encrypt(&nonce.into(), plaintext)
        .map_err(|_| anyhow!("box encrypt failed"))?;
    let mut out = nonce.to_vec();
    out.extend_from_slice(&sealed);
    Ok(b64(&out))
}

/// `stringDecryptAsymmetric`.
pub fn box_decrypt(data_b64: &str, their_pk_b64: &str, my_sk_b64: &str) -> Result<Vec<u8>> {
    let data = unb64(data_b64)?;
    if data.len() < 24 + 16 {
        bail!("box ciphertext too short");
    }
    let (nonce, sealed) = data.split_at(24);
    let nonce: [u8; 24] = nonce.try_into()?;
    salsa_box(their_pk_b64, my_sk_b64)?.decrypt(&nonce.into(), sealed).map_err(|_| anyhow!("box decrypt failed"))
}

pub fn public_key_of(sk_b64: &str) -> Result<String> {
    let sk: [u8; 32] = unb64(sk_b64)?.try_into().map_err(|_| anyhow!("secret key must be 32 bytes"))?;
    Ok(b64(crypto_box::SecretKey::from(sk).public_key().as_bytes()))
}

pub fn generate_keypair() -> (String, String) {
    let sk = crypto_box::SecretKey::generate(&mut OsRng);
    (b64(sk.public_key().as_bytes()), b64(&sk.to_bytes()))
}

// ---------------------------------------------------------------------------
// Symmetric V2 envelope (mail content)

const V2_METADATA_VERSION: &str = "0.2.0";
const DATAGRAM_VERSION: &str = "0.1.0";

pub mod datagram {
    pub const MAIL_SUBJECT: &str = "skemail.mailSubject";
    pub const MAIL_TEXT: &str = "skemail.mailText";
    pub const MAIL_HTML: &str = "skemail.mailHtml";
    pub const MAIL_TEXT_AS_HTML: &str = "skemail.MailTextAsHTML";
    pub const ATTACHMENT: &str = "skemail.attachment";
    pub const ATTACHMENT_METADATA: &str = "skemail.attachmentMetadata";
    pub const RAW_MIME: &str = "skemail.rawMime";
}

fn session_cipher(session_key_b64: &str) -> Result<ChaCha20Poly1305> {
    let key = unb64(session_key_b64)?;
    ChaCha20Poly1305::new_from_slice(&key).map_err(|_| anyhow!("session key must be 32 bytes"))
}

/// Encrypt a protobuf body into a V2 datagram envelope (header is always empty for mail).
pub fn v2_encrypt(datagram_type: &str, body: &[u8], session_key_b64: &str) -> Result<String> {
    v2_encrypt_with_nonce(datagram_type, body, session_key_b64, random_bytes::<12>())
}

fn v2_encrypt_with_nonce(datagram_type: &str, body: &[u8], session_key_b64: &str, nonce: [u8; 12]) -> Result<String> {
    let mut inner = Vec::new();
    put_prefixed(&mut inner, V2_METADATA_VERSION.as_bytes());
    put_prefixed(&mut inner, DATAGRAM_VERSION.as_bytes());
    put_prefixed(&mut inner, datagram_type.as_bytes());
    put_prefixed(&mut inner, &nonce);
    put_prefixed(&mut inner, &[]);
    let mut aad = Vec::new();
    put_prefixed(&mut aad, &inner);
    let ct = session_cipher(session_key_b64)?
        .encrypt(&nonce.into(), Payload { msg: body, aad: &aad })
        .map_err(|_| anyhow!("chacha encrypt failed"))?;
    aad.extend_from_slice(&ct);
    Ok(b64(&aad))
}

/// Decrypt a V2 envelope, returning the protobuf body.
pub fn v2_decrypt(expected_type: &str, data_b64: &str, session_key_b64: &str) -> Result<Vec<u8>> {
    let data = unb64(data_b64)?;
    let mut pos = 0;
    let inner = read_prefixed(&data, &mut pos)?;
    let aad = &data[..pos];
    let ct = &data[pos..];
    let mut ip = 0;
    let meta_version = read_prefixed(inner, &mut ip)?;
    if meta_version != V2_METADATA_VERSION.as_bytes() {
        bail!("unexpected envelope version");
    }
    let version = read_prefixed(inner, &mut ip)?;
    let dtype = read_prefixed(inner, &mut ip)?;
    let nonce: [u8; 12] = read_prefixed(inner, &mut ip)?.try_into().map_err(|_| anyhow!("bad nonce"))?;
    let _header = read_prefixed(inner, &mut ip)?;
    if dtype != expected_type.as_bytes() {
        bail!("datagram type mismatch: {}", String::from_utf8_lossy(dtype));
    }
    if !version.starts_with(b"0.1.") {
        bail!("unsupported datagram version");
    }
    session_cipher(session_key_b64)?
        .decrypt(&nonce.into(), Payload { msg: ct, aad })
        .map_err(|_| anyhow!("chacha decrypt failed"))
}

// ---------------------------------------------------------------------------
// Symmetric V1 envelope (user private data): JSON-wrapped body, no header field

pub const PRIVATE_USER_DATA_DATAGRAM: &str = "ddl://skiff/PrivateUserDataDatagram";

#[derive(serde::Serialize)]
struct JsonWrapper<'a, T> {
    version: &'a str,
    #[serde(rename = "type")]
    datagram_type: &'a str,
    data: &'a T,
}

pub fn v1_encrypt<T: serde::Serialize>(datagram_type: &str, data: &T, key_b64: &str) -> Result<String> {
    v1_encrypt_with_nonce(datagram_type, data, key_b64, random_bytes::<12>())
}

fn v1_encrypt_with_nonce<T: serde::Serialize>(
    datagram_type: &str,
    data: &T,
    key_b64: &str,
    nonce: [u8; 12],
) -> Result<String> {
    let body = serde_json::to_vec(&JsonWrapper { version: DATAGRAM_VERSION, datagram_type, data })?;
    let mut inner = Vec::new();
    put_prefixed(&mut inner, DATAGRAM_VERSION.as_bytes());
    put_prefixed(&mut inner, DATAGRAM_VERSION.as_bytes());
    put_prefixed(&mut inner, datagram_type.as_bytes());
    put_prefixed(&mut inner, &nonce);
    let mut aad = Vec::new();
    put_prefixed(&mut aad, &inner);
    let ct = session_cipher(key_b64)?
        .encrypt(&nonce.into(), Payload { msg: &body, aad: &aad })
        .map_err(|_| anyhow!("chacha encrypt failed"))?;
    aad.extend_from_slice(&ct);
    Ok(b64(&aad))
}

// ---------------------------------------------------------------------------
// Minimal protobuf (proto3 strings/int64 only; empty values omitted like ts-proto)

pub fn proto_string(out: &mut Vec<u8>, field: u32, value: &str) {
    if value.is_empty() {
        return;
    }
    put_varint(out, u64::from(field << 3 | 2));
    put_prefixed(out, value.as_bytes());
}

pub fn proto_int64(out: &mut Vec<u8>, field: u32, value: i64) {
    if value == 0 {
        return;
    }
    put_varint(out, u64::from(field << 3));
    put_varint(out, value as u64);
}

/// Decoded protobuf fields: (field number, value); length-delimited values are lossy UTF-8.
#[derive(Debug, Default)]
pub struct ProtoFields(Vec<(u32, ProtoValue)>);

#[derive(Debug)]
pub enum ProtoValue {
    Bytes(Vec<u8>),
    Varint(u64),
}

impl ProtoFields {
    pub fn parse(buf: &[u8]) -> Result<Self> {
        let mut fields = Vec::new();
        let mut pos = 0;
        while pos < buf.len() {
            let key = read_varint(buf, &mut pos)?;
            let field = (key >> 3) as u32;
            match key & 7 {
                0 => fields.push((field, ProtoValue::Varint(read_varint(buf, &mut pos)?))),
                2 => fields.push((field, ProtoValue::Bytes(read_prefixed(buf, &mut pos)?.to_vec()))),
                1 => pos += 8,
                5 => pos += 4,
                wt => bail!("unsupported protobuf wire type {wt}"),
            }
        }
        Ok(Self(fields))
    }

    pub fn string(&self, field: u32) -> String {
        self.0
            .iter()
            .rev()
            .find_map(|(f, v)| match v {
                ProtoValue::Bytes(b) if *f == field => Some(String::from_utf8_lossy(b).into_owned()),
                _ => None,
            })
            .unwrap_or_default()
    }

    pub fn int(&self, field: u32) -> i64 {
        self.0
            .iter()
            .rev()
            .find_map(|(f, v)| match v {
                ProtoValue::Varint(n) if *f == field => Some(*n as i64),
                _ => None,
            })
            .unwrap_or_default()
    }
}

/// Encrypt a single-string mail field (subject/text/html/textAsHtml/rawMime/attachment content).
pub fn encrypt_string_field(datagram_type: &str, value: &str, session_key_b64: &str) -> Result<String> {
    let mut body = Vec::new();
    proto_string(&mut body, 1, value);
    v2_encrypt(datagram_type, &body, session_key_b64)
}

pub fn decrypt_string_field(datagram_type: &str, data_b64: &str, session_key_b64: &str) -> Result<String> {
    Ok(ProtoFields::parse(&v2_decrypt(datagram_type, data_b64, session_key_b64)?)?.string(1))
}

#[derive(Debug, Default, Clone)]
pub struct AttachmentMetadata {
    pub content_type: String,
    pub content_disposition: String,
    pub filename: String,
    pub checksum: String,
    pub size: i64,
    pub content_id: String,
}

impl AttachmentMetadata {
    pub fn encrypt(&self, session_key_b64: &str) -> Result<String> {
        let mut body = Vec::new();
        proto_string(&mut body, 1, &self.content_type);
        proto_string(&mut body, 2, &self.content_disposition);
        proto_string(&mut body, 3, &self.filename);
        proto_string(&mut body, 5, &self.checksum);
        proto_int64(&mut body, 6, self.size);
        proto_string(&mut body, 7, &self.content_id);
        v2_encrypt(datagram::ATTACHMENT_METADATA, &body, session_key_b64)
    }

    pub fn decrypt(data_b64: &str, session_key_b64: &str) -> Result<Self> {
        let f = ProtoFields::parse(&v2_decrypt(datagram::ATTACHMENT_METADATA, data_b64, session_key_b64)?)?;
        Ok(Self {
            content_type: f.string(1),
            content_disposition: f.string(2),
            filename: f.string(3),
            checksum: f.string(5),
            size: f.int(6),
            content_id: f.string(7),
        })
    }
}

#[cfg(test)]
mod tests {
    //! Vectors produced by the client's own JS libraries (tweetnacl, @stablelib/chacha20poly1305).
    use super::*;

    const SESSION_KEY: &str = "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=";
    const NONCE12: [u8; 12] = [0xa0, 0xa1, 0xa2, 0xa3, 0xa4, 0xa5, 0xa6, 0xa7, 0xa8, 0xa9, 0xaa, 0xab];

    #[test]
    fn v2_subject_vector() {
        let mut body = Vec::new();
        proto_string(&mut body, 1, "Hello");
        let out = v2_encrypt_with_nonce(datagram::MAIL_SUBJECT, &body, SESSION_KEY, NONCE12).unwrap();
        assert_eq!(
            out,
            "LgUwLjIuMAUwLjEuMBNza2VtYWlsLm1haWxTdWJqZWN0DKChoqOkpaanqKmqqwAGrjA6IYqt+4lkl0nkS0EoHtI84TST3A=="
        );
        assert_eq!(decrypt_string_field(datagram::MAIL_SUBJECT, &out, SESSION_KEY).unwrap(), "Hello");
        assert!(decrypt_string_field(datagram::MAIL_TEXT, &out, SESSION_KEY).is_err());
    }

    #[test]
    fn v2_empty_subject_vector() {
        let out = v2_encrypt_with_nonce(datagram::MAIL_SUBJECT, &[], SESSION_KEY, NONCE12).unwrap();
        assert!(out.ends_with("qwAXS2R+eHQgij2F1mmR1RRw"), "{out}");
    }

    #[test]
    fn v1_user_data_vector() {
        #[derive(serde::Serialize)]
        #[serde(rename_all = "camelCase")]
        struct Data {
            private_key: &'static str,
            signing_private_key: &'static str,
            document_key: &'static str,
        }
        let data = Data { private_key: "AAAA", signing_private_key: "BBBB", document_key: "CCCC" };
        let out = v1_encrypt_with_nonce(PRIVATE_USER_DATA_DATAGRAM, &data, SESSION_KEY, NONCE12).unwrap();
        assert_eq!(
            out,
            "PQUwLjEuMAUwLjEuMCNkZGw6Ly9za2lmZi9Qcml2YXRlVXNlckRhdGFEYXRhZ3JhbQygoaKjpKWmp6ipqqt3iQ46P5Wrws4tyTbM1MzVrXz/nTcTEMaW4vnVFQ75I0PzfePIr9DatKWD3Gk0LTUvtg5ZfW0v4FM1bDItR4fkk58GOlnLqIsAgKDge9HdG0v8dsEmntfhOmlorKy/ydzyLgnH3ykEg840BSnxuTnPaoDxFxdyxofMg8Mm3/XeSjRIhdyzhbiARvb9QAet9pc8OACEY3OSIEY0JepK"
        );
    }

    #[test]
    fn box_vector() {
        let user_sk = b64(&[0x11; 32]);
        let server_sk = b64(&[0x22; 32]);
        let user_pk = public_key_of(&user_sk).unwrap();
        let server_pk = public_key_of(&server_sk).unwrap();
        assert_eq!(user_pk, "e06Qm75//kTEZaIgA31gjuNYl9Me+XLwf3SJLLD3PxM=");
        assert_eq!(server_pk, "D6poTtKIZ7l/Smot7l34zpdOdrcBjj8iocTPJnhXDyA=");
        let nonce: [u8; 24] = core::array::from_fn(|i| i as u8);
        let out = box_encrypt_with_nonce(SESSION_KEY.as_bytes(), &user_pk, &server_sk, nonce).unwrap();
        assert_eq!(
            out,
            "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXTioqLjJ5ieGJ1JHoGWrrmxrNXNUf5KuOeMpW5ZIAHfahlCI78EVAK+adTzMps5fGDw9f4e32Jy/Iw2T7"
        );
        // symmetric: the user opens it with their sk and the server pk
        assert_eq!(box_decrypt(&out, &server_pk, &user_sk).unwrap(), SESSION_KEY.as_bytes());
    }

    #[test]
    fn attachment_metadata_roundtrip() {
        let key = new_session_key();
        let meta = AttachmentMetadata {
            content_type: "image/png".into(),
            content_disposition: "inline; filename=\"a.png\"".into(),
            filename: "a.png".into(),
            checksum: "x".into(),
            size: 1234,
            content_id: "<a@b>".into(),
        };
        let back = AttachmentMetadata::decrypt(&meta.encrypt(&key).unwrap(), &key).unwrap();
        assert_eq!(back.filename, "a.png");
        assert_eq!(back.size, 1234);
        assert_eq!(back.content_id, "<a@b>");
    }
}
