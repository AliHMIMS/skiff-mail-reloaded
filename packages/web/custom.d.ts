interface TokenClientConfig {
  client_id: string;
  scope: string;
  callback?: () => void;
}

interface TokenClient {
  requestAccessToken: () => void;
}

declare namespace google.accounts.oauth2 {
  export function revoke(token: string): void;
  export function initTokenClient(tokenClientConfig: TokenClientConfig): TokenClient;
  export function hasGrantedAllScopes(scope: string): boolean;
}

// apollo-upload-client documents its types in JSDoc only
declare module 'apollo-upload-client/UploadHttpLink.mjs' {
  import { ApolloLink } from '@apollo/client';

  export default class UploadHttpLink extends ApolloLink {
    constructor(options?: { uri?: string; credentials?: RequestCredentials; headers?: Record<string, string> });
  }
}

// prosemirror-dev-tools 4 ships without type declarations
declare module 'prosemirror-dev-tools' {
  import type { EditorView } from 'prosemirror-view';

  export default function applyDevTools(view: EditorView): void;
}

// eml-format has no type declarations; this is the part exportEml uses
declare module 'eml-format' {
  interface EmlAddress {
    name?: string | null;
    email: string;
  }
  interface EmlAttachment {
    name?: string;
    contentType?: string;
    data: ArrayBuffer | Uint8Array | string;
    inline?: boolean | null;
    cid?: string;
  }
  interface EmlData {
    from?: string | EmlAddress;
    to?: string | EmlAddress | EmlAddress[];
    cc?: string | EmlAddress | EmlAddress[];
    bcc?: string | EmlAddress | EmlAddress[];
    subject?: string | null;
    text?: string | null;
    html?: string | null;
    attachments?: EmlAttachment[];
    headers?: Record<string, string>;
  }
  const emlFormat: { build(data: EmlData, callback: (error: Error | null, eml: string) => void): void };
  export default emlFormat;
}
