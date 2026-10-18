// The signed-in account lives in the OS keychain/keystore: the bearer token and the user's decrypted private keys.
import * as SecureStore from 'expo-secure-store';
import type { PublicKeyWithSignature } from 'skiff-graphql';

export interface Account {
  userID: string;
  username: string;
  displayName: string;
  emailAddress: string;
  emailAliases: string[];
  publicKey: PublicKeyWithSignature;
  signingPublicKey: string;
  privateKey: string;
  signingPrivateKey: string;
}

export interface Session {
  serverUrl: string;
  token: string;
  account: Account;
}

const KEY = 'session.v1';
// remembered across sign-outs so signing back in is quick
const LAST_SERVER_KEY = 'lastServerUrl';

export async function loadSession(): Promise<Session | null> {
  const raw = await SecureStore.getItemAsync(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    await SecureStore.deleteItemAsync(KEY);
    return null;
  }
}

export async function saveSession(session: Session) {
  await SecureStore.setItemAsync(KEY, JSON.stringify(session));
  await SecureStore.setItemAsync(LAST_SERVER_KEY, session.serverUrl);
}

export async function clearSession() {
  await SecureStore.deleteItemAsync(KEY);
}

export const loadLastServerUrl = () => SecureStore.getItemAsync(LAST_SERVER_KEY);
