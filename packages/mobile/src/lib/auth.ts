// Sign-in mirrors the web client (packages/web/src/utils/loginUtils.ts): SRP proves the password without sending it,
// and the same password unlocks the private keys that decrypt mail on this device.
import { gql } from '@apollo/client';
import { type DocumentNode, print } from 'graphql';
import srp from 'secure-remote-password/client';
import { createKeyFromSecret, createPasswordDerivedSecret, createSRPKey } from 'skiff-crypto';
import {
  ClearSessionCacheDocument,
  decryptPrivateUserData,
  LoginSrpStep1Document,
  type LoginSrpStep1Mutation,
  LoginSrpStep2Document,
  type LoginSrpStep2Mutation
} from 'skiff-front-graphql';
import type { PublicKeyWithSignature } from 'skiff-graphql';

import { graphqlUrl, ServerError } from './server';
import type { Session } from './session';

export class AuthError extends Error {}

const ACCOUNT = gql`
  query mobileAccount {
    currentUser {
      userID
      username
      defaultEmailAlias
      emailAliases
      publicData {
        displayName
      }
    }
  }
`;

interface AccountQuery {
  currentUser: {
    userID: string;
    username: string;
    defaultEmailAlias?: string | null;
    emailAliases?: string[] | null;
    publicData?: { displayName?: string | null } | null;
  } | null;
}

async function request<T>(serverUrl: string, document: DocumentNode, variables: object, token?: string): Promise<T> {
  const res = await fetch(graphqlUrl(serverUrl), {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify({ query: print(document), variables })
  });
  const body = (await res.json().catch(() => undefined)) as { data?: T; errors?: { message: string }[] } | undefined;
  if (!res.ok || !body?.data) {
    throw new ServerError(body?.errors?.[0]?.message ?? `The server answered ${res.status}.`);
  }
  return body.data;
}

export async function signIn(serverUrl: string, username: string, password: string): Promise<Session> {
  const name = username.trim().toLowerCase();
  const clientEphemeral = srp.generateEphemeral();

  const step1 = await request<LoginSrpStep1Mutation>(serverUrl, LoginSrpStep1Document, {
    request: { step: 1, username: name }
  });
  const { salt, serverEphemeralPublic } = step1.loginSrp;
  if (!salt || !serverEphemeralPublic) throw new ServerError('The server sent an incomplete sign-in challenge.');

  const masterSecret = await createKeyFromSecret(password, salt);
  const clientSession = srp.deriveSession(
    clientEphemeral.secret,
    serverEphemeralPublic,
    salt,
    name,
    createSRPKey(masterSecret, salt)
  );

  const { loginSrp } = await request<LoginSrpStep2Mutation>(serverUrl, LoginSrpStep2Document, {
    request: {
      step: 2,
      username: name,
      clientSessionProof: clientSession.proof,
      clientEphemeralPublic: clientEphemeral.public
    }
  });
  if (loginSrp.status !== 'AUTHENTICATED') throw new AuthError('Wrong username or password.');
  // the server must prove it knows the verifier too, or this isn't the server the account was created on
  if (!loginSrp.serverSessionProof) throw new ServerError("The server didn't prove its identity.");
  srp.verifySession(clientEphemeral.public, clientSession, loginSrp.serverSessionProof);

  const token = loginSrp.jwt;
  if (!token) throw new ServerError('This server is too old for the app. Update mymail-server, then try again.');
  const { userID, encryptedUserData, publicKey, signingPublicKey } = loginSrp;
  if (!userID || !encryptedUserData || !publicKey || !signingPublicKey) {
    throw new ServerError('The server sent an incomplete account.');
  }
  const keys = decryptPrivateUserData(encryptedUserData, createPasswordDerivedSecret(masterSecret, salt));

  const { currentUser } = await request<AccountQuery>(serverUrl, ACCOUNT, {}, token);
  const emailAliases = currentUser?.emailAliases ?? [];
  return {
    serverUrl,
    token,
    account: {
      userID,
      username: name,
      displayName: currentUser?.publicData?.displayName ?? loginSrp.publicData?.displayName ?? '',
      emailAddress: currentUser?.defaultEmailAlias ?? emailAliases[0] ?? name,
      emailAliases,
      publicKey: publicKey as PublicKeyWithSignature,
      signingPublicKey,
      privateKey: keys.privateKey,
      signingPrivateKey: keys.signingPrivateKey
    }
  };
}

/** Ends the session on the server too; signing out still works offline. */
export async function signOut(session: Session) {
  await request(session.serverUrl, ClearSessionCacheDocument, {}, session.token).catch(() => undefined);
}
