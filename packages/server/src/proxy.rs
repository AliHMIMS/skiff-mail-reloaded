//! Image proxy for remote content in emails (the client rewrites <img src> to /image_proxy/?url=...),
//! so senders don't see the reader's IP. Only public http(s) hosts, only images, bounded size.

use std::{net::IpAddr, time::Duration};

use anyhow::{Context, Result, anyhow, bail};
use reqwest::{Client, Url, header, redirect::Policy};

const MAX_BYTES: usize = 15 * 1024 * 1024;
const MAX_REDIRECTS: usize = 4;

pub struct ImageProxy {
    client: Client,
}

fn is_public(ip: IpAddr) -> bool {
    match ip {
        IpAddr::V4(v4) => {
            let o = v4.octets();
            !(v4.is_private()
                || v4.is_loopback()
                || v4.is_link_local()
                || v4.is_unspecified()
                || v4.is_broadcast()
                || v4.is_documentation()
                || v4.is_multicast()
                || (o[0] == 100 && (o[1] & 0xc0) == 64) // carrier-grade NAT
                || o[0] == 0)
        }
        IpAddr::V6(v6) => {
            if let Some(v4) = v6.to_ipv4_mapped() {
                return is_public(IpAddr::V4(v4));
            }
            let seg0 = v6.segments()[0];
            !(v6.is_loopback()
                || v6.is_unspecified()
                || v6.is_multicast()
                || (seg0 & 0xfe00) == 0xfc00
                || (seg0 & 0xffc0) == 0xfe80)
        }
    }
}

async fn ensure_public(url: &Url) -> Result<()> {
    if !matches!(url.scheme(), "http" | "https") {
        bail!("only http(s) URLs can be proxied");
    }
    let host = url.host_str().context("URL has no host")?;
    let port = url.port_or_known_default().unwrap_or(443);
    let addrs: Vec<_> = tokio::net::lookup_host((host, port)).await.context("DNS lookup failed")?.collect();
    if addrs.is_empty() || addrs.iter().any(|a| !is_public(a.ip())) {
        bail!("refusing to fetch a non-public address");
    }
    Ok(())
}

impl ImageProxy {
    pub fn new() -> Result<Self> {
        let client = Client::builder()
            .tls_backend_preconfigured(crate::gmail::tls_client_config()?)
            .redirect(Policy::none())
            .timeout(Duration::from_secs(20))
            .user_agent("Mozilla/5.0 (compatible; mymail image proxy)")
            .build()?;
        Ok(Self { client })
    }

    /// Returns (content type, body).
    pub async fn fetch(&self, url: &str) -> Result<(String, Vec<u8>)> {
        let mut url = Url::parse(url).context("invalid URL")?;
        for _ in 0..=MAX_REDIRECTS {
            ensure_public(&url).await?;
            let mut resp = self.client.get(url.clone()).send().await?;
            if resp.status().is_redirection() {
                let location = resp
                    .headers()
                    .get(header::LOCATION)
                    .and_then(|l| l.to_str().ok())
                    .ok_or_else(|| anyhow!("redirect without location"))?;
                url = url.join(location)?;
                continue;
            }
            if !resp.status().is_success() {
                bail!("upstream returned {}", resp.status());
            }
            let content_type = resp
                .headers()
                .get(header::CONTENT_TYPE)
                .and_then(|c| c.to_str().ok())
                .unwrap_or("application/octet-stream")
                .to_ascii_lowercase();
            if !(content_type.starts_with("image/") || content_type.starts_with("application/octet-stream")) {
                bail!("not an image ({content_type})");
            }
            let mut body = Vec::new();
            while let Some(chunk) = resp.chunk().await? {
                body.extend_from_slice(&chunk);
                if body.len() > MAX_BYTES {
                    bail!("image too large");
                }
            }
            return Ok((content_type, body));
        }
        bail!("too many redirects")
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn classifies_addresses() {
        for private in [
            "127.0.0.1",
            "10.1.2.3",
            "192.168.0.1",
            "172.16.5.4",
            "100.64.0.1",
            "169.254.1.1",
            "::1",
            "fd00::1",
            "fe80::1",
            "::ffff:127.0.0.1",
        ] {
            assert!(!is_public(private.parse().unwrap()), "{private}");
        }
        for public in ["8.8.8.8", "142.250.1.1", "2a00:1450::1"] {
            assert!(is_public(public.parse().unwrap()), "{public}");
        }
    }
}
