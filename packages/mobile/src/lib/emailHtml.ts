// Email HTML goes into a WebView under a CSP that blocks everything except inline styles and data: images, so a
// message can't run script, load trackers or frames, or phone home. The app's own script (injected by the
// WebView, which a page CSP doesn't apply to) sizes the view and swaps in remote images the user asks for.

const CSP = "default-src 'none'; img-src data:; style-src 'unsafe-inline'; font-src data:";

export function emailDocument(html: string) {
  return `<!doctype html><html><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  html, body { margin: 0; padding: 0; background: #fff; color: #1a1a1a; }
  body { font: 15px/1.45 -apple-system, Roboto, 'Segoe UI', sans-serif; overflow-wrap: anywhere; }
  #skiff-body { padding: 4px 2px 8px; }
  img { max-width: 100%; height: auto; }
  pre { white-space: pre-wrap; }
  blockquote { margin: 0 0 0 6px; padding-left: 10px; border-left: 2px solid #ccc; color: #555; }
</style></head><body><div id="skiff-body">${html}</div></body></html>`;
}

/** Messages from the injected script. */
export type BodyMessage = { type: 'height'; height: number } | { type: 'remoteImages'; urls: string[] };

const BLANK = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export const injectedScript = `(function () {
  var post = function (m) { window.ReactNativeWebView.postMessage(JSON.stringify(m)); };
  var remote = {};
  // remote (and cid:) images are blocked by the CSP; remember them and show nothing instead of broken icons
  document.querySelectorAll('img').forEach(function (img) {
    var src = img.getAttribute('src') || '';
    if (/^https?:/i.test(src)) {
      (remote[src] = remote[src] || []).push(img);
      img.setAttribute('src', '${BLANK}');
      img.setAttribute('data-skiff-pending', '');
    } else if (!/^data:/i.test(src)) {
      img.style.display = 'none';
    }
  });
  var lastHeight = 0;
  var measure = function () {
    var body = document.getElementById('skiff-body');
    // newsletters are laid out for ~600px; shrink them to the screen instead of scrolling sideways
    body.style.zoom = 1;
    var wide = body.scrollWidth;
    if (wide > window.innerWidth) body.style.zoom = window.innerWidth / wide;
    var height = Math.ceil(body.getBoundingClientRect().height * (parseFloat(body.style.zoom) || 1));
    if (Math.abs(height - lastHeight) > 1) { lastHeight = height; post({ type: 'height', height: height }); }
  };
  window.skiffSetImages = function (images) {
    Object.keys(images).forEach(function (url) {
      (remote[url] || []).forEach(function (img) { img.setAttribute('src', images[url]); img.removeAttribute('data-skiff-pending'); });
    });
    setTimeout(measure, 50);
  };
  new ResizeObserver(measure).observe(document.getElementById('skiff-body'));
  window.addEventListener('load', measure);
  measure();
  post({ type: 'remoteImages', urls: Object.keys(remote) });
})(); true;`;
