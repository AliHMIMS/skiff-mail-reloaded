declare module '*.svg' {
  const content: any;
  export default content;
}

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
