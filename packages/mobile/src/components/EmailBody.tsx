import { Buffer } from 'buffer';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import { type BodyMessage, emailDocument, injectedScript } from '@/lib/emailHtml';
import { imageProxyUrl } from '@/lib/server';
import type { Session } from '@/lib/session';
import { useTheme } from '@/lib/theme';

const MAX_IMAGES = 60;

async function fetchAsDataUri(session: Session, url: string): Promise<string | null> {
  try {
    const res = await fetch(imageProxyUrl(session.serverUrl, url), {
      headers: { authorization: `Bearer ${session.token}` }
    });
    if (!res.ok) return null;
    const type = res.headers.get('content-type') ?? 'image/png';
    return `data:${type};base64,${Buffer.from(await res.arrayBuffer()).toString('base64')}`;
  } catch {
    return null;
  }
}

/** One message's HTML, sized to its content so a thread scrolls as a single page. */
export function EmailBody({ html, session }: { html: string; session: Session }) {
  const theme = useTheme();
  const webView = useRef<WebView<object>>(null);
  const [height, setHeight] = useState(40);
  const [remoteImages, setRemoteImages] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const source = useMemo(() => ({ html: emailDocument(html), baseUrl: '' }), [html]);

  const onMessage = useCallback((event: WebViewMessageEvent) => {
    let message: BodyMessage;
    try {
      message = JSON.parse(event.nativeEvent.data) as BodyMessage;
    } catch {
      return;
    }
    if (message.type === 'height' && Number.isFinite(message.height)) setHeight(Math.max(20, message.height));
    if (message.type === 'remoteImages' && Array.isArray(message.urls)) setRemoteImages(message.urls);
  }, []);

  const loadImages = useCallback(async () => {
    setLoadingImages(true);
    const urls = remoteImages.slice(0, MAX_IMAGES);
    const images: Record<string, string> = {};
    // a few at a time: newsletters carry dozens of images
    for (let i = 0; i < urls.length; i += 6) {
      const batch = urls.slice(i, i + 6);
      const loaded = await Promise.all(batch.map((url) => fetchAsDataUri(session, url)));
      batch.forEach((url, j) => {
        if (loaded[j]) images[url] = loaded[j];
      });
    }
    webView.current?.injectJavaScript(`window.skiffSetImages(${JSON.stringify(images)}); true;`);
    setRemoteImages([]);
    setLoadingImages(false);
  }, [remoteImages, session]);

  return (
    <View>
      {remoteImages.length > 0 && (
        <Pressable
          accessibilityRole='button'
          onPress={() => void loadImages()}
          disabled={loadingImages}
          style={[styles.banner, { backgroundColor: theme.surfaceAlt }]}
        >
          {loadingImages ? (
            <ActivityIndicator size='small' color={theme.accent} />
          ) : (
            <Text style={{ color: theme.textSecondary }}>
              Images are hidden to protect your privacy. <Text style={{ color: theme.accent }}>Load images</Text>
            </Text>
          )}
        </Pressable>
      )}
      <View style={[styles.card, { height }]}>
        {/* the type argument: WebView's default (undefined) intersects its props down to never */}
        <WebView<object>
          ref={webView}
          source={source}
          originWhitelist={['*']}
          injectedJavaScript={injectedScript}
          onMessage={onMessage}
          scrollEnabled={false}
          nestedScrollEnabled={false}
          javaScriptCanOpenWindowsAutomatically={false}
          setSupportMultipleWindows={false}
          allowFileAccess={false}
          allowsLinkPreview={false}
          // links open in the browser (or mail app); the message itself never navigates
          onShouldStartLoadWithRequest={(request) => {
            if (request.url === 'about:blank' || request.url.startsWith('data:')) return true;
            if (/^(https?|mailto|tel):/i.test(request.url)) void Linking.openURL(request.url);
            return false;
          }}
          style={styles.webView}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, marginBottom: 8, alignItems: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden' },
  webView: { backgroundColor: 'transparent' }
});
