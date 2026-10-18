// Apollo client for one signed-in server. Queries come from skiff-front-graphql, the same documents the web client
// uses; their @client fields (decryptedSubject, decryptedHtml, …) are filled in by the type policies below.
import {
  ApolloClient,
  ApolloLink,
  CombinedGraphQLErrors,
  type FieldFunctionOptions,
  type FieldPolicy,
  HttpLink,
  InMemoryCache,
  ServerError,
  type TypePolicy
} from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { LocalState } from '@apollo/client/local-state';
import { decryptDatagramV2, decryptSessionKey } from 'skiff-crypto';
import {
  AttachmentMetadataDatagram,
  MailHtmlDatagram,
  MailSubjectDatagram,
  MailTextAsHTMLDatagram,
  MailTextDatagram
} from 'skiff-front-graphql';
import type { Mailbox, MailboxRequest } from 'skiff-graphql';

import { graphqlUrl } from './server';
import type { Session } from './session';

type ReadField = FieldFunctionOptions['readField'];
type Encrypted = { encryptedData: string } | null | undefined;
type EncryptedSessionKey = { encryptedSessionKey: string; encryptedBy: { key: string } } | null | undefined;

/**
 * Field reads run on every cache read, so each decrypted value is kept in Apollo's per-field storage and only
 * recomputed when its inputs change (as web's memoizeFieldReadFunction does).
 */
function memoized<D extends unknown[], T>(deps: (options: FieldFunctionOptions) => D, compute: (...deps: D) => T) {
  return (_existing: unknown, options: FieldFunctionOptions): T => {
    const next = deps(options);
    const last = options.storage.memo as { deps: D; value: T } | undefined;
    if (last && last.deps.length === next.length && last.deps.every((d, i) => d === next[i])) return last.value;
    const value = compute(...next);
    options.storage.memo = { deps: next, value };
    return value;
  };
}

// The server sends epoch milliseconds; the generated types (and web's type policies) promise Dates. One Date per
// value keeps reads referentially stable so lists don't re-render on every cache read.
const dates = new Map<number | string, Date>();
const asDate = (value: number | string | Date | null | undefined) => {
  if (value == null || value instanceof Date) return value;
  let date = dates.get(value);
  if (!date) {
    date = new Date(value);
    dates.set(value, date);
  }
  return date;
};
const datePolicy = { read: asDate };

function emailTypePolicy(privateKey: string): TypePolicy {
  const decryptedField = <T>(field: string, decrypt: (sessionKey: string, data: string) => T, fallback: T) => ({
    read: memoized(
      ({ readField }) => [readField<string | null>('decryptedSessionKey'), readField<Encrypted>(field)] as const,
      (sessionKey, encrypted) => {
        if (!sessionKey || !encrypted) return fallback;
        try {
          return decrypt(sessionKey, encrypted.encryptedData);
        } catch (e) {
          console.warn(`couldn't decrypt ${field}`, e);
          return fallback;
        }
      }
    )
  });

  return {
    fields: {
      decryptedSessionKey: {
        read: memoized(
          ({ readField }) => [readField<EncryptedSessionKey>('encryptedSessionKey')] as const,
          (key) => {
            if (!key) return null;
            try {
              return decryptSessionKey(key.encryptedSessionKey, privateKey, key.encryptedBy);
            } catch (e) {
              console.warn("couldn't decrypt an email's session key", e);
              return null;
            }
          }
        )
      },
      decryptedSubject: decryptedField(
        'encryptedSubject',
        (k, d) => decryptDatagramV2(MailSubjectDatagram, k, d).body.subject,
        '(could not decrypt)'
      ),
      decryptedText: decryptedField('encryptedText', (k, d) => decryptDatagramV2(MailTextDatagram, k, d).body.text, ''),
      decryptedHtml: decryptedField(
        'encryptedHtml',
        (k, d) => decryptDatagramV2(MailHtmlDatagram, k, d).body.html,
        null as string | null
      ),
      decryptedTextAsHtml: decryptedField(
        'encryptedTextAsHtml',
        (k, d) => decryptDatagramV2(MailTextAsHTMLDatagram, k, d).body.textAsHTML,
        null as string | null
      ),
      decryptedTextSnippet: decryptedField(
        'encryptedTextSnippet',
        (k, d) => decryptDatagramV2(MailTextDatagram, k, d).body.text,
        null as string | null
      ),
      decryptedAttachmentMetadata: {
        read: memoized(
          ({ readField }) =>
            [
              readField<string | null>('decryptedSessionKey'),
              readField<{ attachmentID: string; encryptedData: { encryptedData: string } }[]>('attachmentMetadata')
            ] as const,
          (sessionKey, attachments) =>
            sessionKey && attachments
              ? attachments.map(({ attachmentID, encryptedData }) => {
                  try {
                    return {
                      attachmentID,
                      decryptedMetadata: decryptDatagramV2(
                        AttachmentMetadataDatagram,
                        sessionKey,
                        encryptedData.encryptedData
                      ).body
                    };
                  } catch {
                    return { attachmentID, decryptedMetadata: null };
                  }
                })
              : null
        )
      },
      createdAt: datePolicy
    }
  };
}

function attachmentTypePolicy(privateKey: string): TypePolicy {
  return {
    keyFields: ['attachmentID'],
    fields: {
      decryptedSessionKey: {
        read: memoized(
          ({ readField }) => [readField<EncryptedSessionKey>('encryptedSessionKey')] as const,
          (key) => (key ? decryptSessionKey(key.encryptedSessionKey, privateKey, key.encryptedBy) : null)
        )
      }
    }
  };
}

const updatedAt = (readField: ReadField, thread: unknown, label?: string | null) =>
  readField<Date>(label === 'SENT' ? 'sentLabelUpdatedAt' : 'emailsUpdatedAt', thread as never)?.getTime() ?? 0;

/** One list per label/filter; pages fetched with a cursor append, a fetch without one is a fresh first page. */
const mailboxFieldPolicy: FieldPolicy<Mailbox> = {
  keyArgs: (args) => {
    const request = args?.request as MailboxRequest | undefined;
    return JSON.stringify({ label: request?.label, filters: request?.filters });
  },
  merge(existing, incoming, { args, readField }) {
    const request = args?.request as MailboxRequest | undefined;
    if (!existing || !request?.cursor) return incoming;
    const seen = new Set(existing.threads.map((t) => readField<string>('threadID', t)));
    const threads = [
      ...existing.threads,
      ...incoming.threads.filter((t) => !seen.has(readField<string>('threadID', t)))
    ];
    return { ...incoming, threads };
  },
  read(existing, { args, readField }) {
    if (!existing) return existing;
    const label = (args?.request as MailboxRequest | undefined)?.label;
    const threads = [...existing.threads].sort(
      (a, b) => updatedAt(readField, b, label) - updatedAt(readField, a, label)
    );
    return { ...existing, threads };
  }
};

export function createApolloClient(session: Session, onUnauthorized: () => void) {
  const auth = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }: { headers?: Record<string, string> }) => ({
      headers: { ...headers, authorization: `Bearer ${session.token}` }
    }));
    return forward(operation);
  });

  const signedOut = new ErrorLink(({ error }) => {
    const notAuthorized =
      (CombinedGraphQLErrors.is(error) && error.errors.some((e) => e.extensions?.code === 'NOT_AUTHORIZED')) ||
      (ServerError.is(error) && error.statusCode === 401);
    if (notAuthorized) onUnauthorized();
  });

  const { privateKey } = session.account;
  return new ApolloClient({
    link: ApolloLink.from([signedOut, auth, new RetryLink(), new HttpLink({ uri: graphqlUrl(session.serverUrl) })]),
    cache: new InMemoryCache({
      typePolicies: {
        UserThread: {
          keyFields: ['threadID'],
          fields: { emailsUpdatedAt: datePolicy, sentLabelUpdatedAt: datePolicy }
        },
        Email: emailTypePolicy(privateKey),
        Attachment: attachmentTypePolicy(privateKey),
        UserLabel: { keyFields: ['labelID'] },
        Query: {
          fields: {
            mailbox: mailboxFieldPolicy,
            userThread: {
              read: (_, { args, toReference }) => toReference({ __typename: 'UserThread', threadID: args?.threadID })
            }
          }
        }
      }
    }),
    localState: new LocalState(),
    clientAwareness: { name: 'skiff-mail-mobile', version: '0.1.0' }
  });
}
