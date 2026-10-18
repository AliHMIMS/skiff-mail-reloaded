// Any self-hosted mymail-server works: the user types its address and the app checks it before signing in.

export interface ServerInfo {
  server: string;
  version: string;
  publicUrl: string;
  features: string[];
}

/** Accepts what people paste: a bare host, the web app's URL (…/mail/inbox), trailing slashes. */
export function normalizeServerUrl(input: string): string {
  let url = input.trim();
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  const parsed = new URL(url);
  const path = parsed.pathname.replace(/\/(mail|graphql)(\/.*)?$/, '').replace(/\/+$/, '');
  return `${parsed.protocol}//${parsed.host}${path}`;
}

export class ServerError extends Error {}

/** Confirms the URL is a mymail-server new enough for the app (bearer sessions). */
export async function probeServer(serverUrl: string): Promise<ServerInfo> {
  let res: Response;
  try {
    res = await fetch(`${serverUrl}/graphql/info`, { headers: { accept: 'application/json' } });
  } catch {
    throw new ServerError(`Can't reach ${serverUrl}. Check the address and your connection.`);
  }
  if (res.status === 404) {
    const health = await fetch(`${serverUrl}/graphql/health`).catch(() => undefined);
    if (health?.ok && (await health.text()).trim() === 'ok') {
      throw new ServerError('This server is too old for the app. Update mymail-server, then try again.');
    }
  }
  const info = res.ok ? ((await res.json().catch(() => undefined)) as ServerInfo | undefined) : undefined;
  if (info?.server !== 'mymail-server') {
    throw new ServerError(`${serverUrl} doesn't look like a Skiff Mail server.`);
  }
  if (!info.features?.includes('bearer-auth')) {
    throw new ServerError('This server is too old for the app. Update mymail-server, then try again.');
  }
  return info;
}

export const graphqlUrl = (serverUrl: string) => `${serverUrl}/graphql`;
export const eventsUrl = (serverUrl: string) => `${serverUrl.replace(/^http/, 'ws')}/graphql/events`;
export const imageProxyUrl = (serverUrl: string, url: string) =>
  `${serverUrl}/image_proxy/?url=${encodeURIComponent(url)}`;

/** Download links are built from the server's PUBLIC_URL; re-point them at the address this app signed in with. */
export function rebaseServerLink(serverUrl: string, link: string): string {
  const at = link.indexOf('/graphql/');
  return at === -1 ? link : `${serverUrl}${link.slice(at)}`;
}
