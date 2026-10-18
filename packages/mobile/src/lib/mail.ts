import type { ApolloClient } from '@apollo/client';
import dayjs from 'dayjs';
import { randomUUID } from 'expo-crypto';
import {
  ApplyLabelsDocument,
  DecryptionServicePublicKeyDocument,
  type DecryptionServicePublicKeyQuery,
  DeleteThreadDocument,
  type EmailFragment,
  encryptMessage,
  SendMessageDocument,
  SendReplyMessageDocument,
  SetReadStatusDocument,
  type ThreadWithoutContentFragment
} from 'skiff-front-graphql';
import { type SendAddressRequest, type SendEmailRequest, SystemLabels } from 'skiff-graphql';

import type { Session } from './session';

/** The labels mymail-server serves (Gmail's folders); drafts, scheduled send and imports aren't supported. */
export const SYSTEM_LABELS = [
  { id: SystemLabels.Inbox, name: 'Inbox', icon: 'mail-outline' },
  { id: SystemLabels.Sent, name: 'Sent', icon: 'send-outline' },
  { id: SystemLabels.Archive, name: 'Archive', icon: 'archive-outline' },
  { id: SystemLabels.AllMail, name: 'All Mail', icon: 'albums-outline' },
  { id: SystemLabels.Spam, name: 'Spam', icon: 'warning-outline' },
  { id: SystemLabels.Trash, name: 'Trash', icon: 'trash-outline' }
] as const;

export const systemLabelName = (label: string) => SYSTEM_LABELS.find((l) => l.id === label)?.name;

type Address = { name?: string | null; address: string };

export const displayName = (a: Address) => a.name?.trim() || a.address;

export const formatAddress = (a: Address) => (a.name?.trim() ? `${a.name.trim()} <${a.address}>` : a.address);

/** Like the web list: the distinct senders, most recent last, "me" for the signed-in user. */
export function threadParticipants(thread: ThreadWithoutContentFragment, myAddresses: string[]) {
  const names: string[] = [];
  for (const email of thread.emails) {
    const name = myAddresses.includes(email.from.address.toLowerCase()) ? 'me' : displayName(email.from);
    if (!names.includes(name)) names.push(name);
  }
  return names.slice(-3).join(', ');
}

export const latestEmail = <T>(thread: { emails: T[] }) => thread.emails[thread.emails.length - 1];

export function listDate(date: Date | string | number) {
  const d = dayjs(date);
  if (d.isSame(dayjs(), 'day')) return d.format('h:mm A');
  if (d.isSame(dayjs(), 'year')) return d.format('MMM D');
  return d.format('M/D/YY');
}

export const fullDate = (date: Date | string | number) => dayjs(date).format('ddd, MMM D, YYYY [at] h:mm A');

const EMAIL = /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/;

/** "Ann <ann@x.com>, bob@y.org" → recipients; returns the parts that aren't addresses separately. */
export function parseRecipients(input: string): { recipients: SendAddressRequest[]; invalid: string[] } {
  const recipients: SendAddressRequest[] = [];
  const invalid: string[] = [];
  for (const part of input.split(/[,;\n]/)) {
    const text = part.trim();
    if (!text) continue;
    const named = text.match(/^(.*?)\s*<([^>]+)>$/);
    const address = (named ? named[2] : text).trim();
    if (!EMAIL.test(address)) {
      invalid.push(text);
      continue;
    }
    const name = named?.[1].replace(/^"|"$/g, '').trim();
    recipients.push(name ? { name, address } : { address });
  }
  return { recipients, invalid };
}

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const textToHtml = (text: string) => `<div>${escapeHtml(text).replace(/\n/g, '<br>')}</div>`;

/** What the web client shows: the HTML part, else the text part as HTML. */
export const emailBodyHtml = (email: EmailFragment) =>
  email.decryptedHtml || email.decryptedTextAsHtml || textToHtml(email.decryptedText ?? '');

export async function setRead(client: ApolloClient, threadIDs: string[], read: boolean) {
  await client.mutate({ mutation: SetReadStatusDocument, variables: { request: { threadIDs, read } } });
}

/** Archive, trash, spam or move to the inbox: in mymail-server these are system labels mapped to Gmail folders. */
export async function moveThreads(client: ApolloClient, threadIDs: string[], to: SystemLabels) {
  await client.mutate({ mutation: ApplyLabelsDocument, variables: { request: { threadIDs, systemLabels: [to] } } });
  await client.refetchQueries({ include: 'active' });
}

export async function deleteForever(client: ApolloClient, threadIDs: string[]) {
  await client.mutate({ mutation: DeleteThreadDocument, variables: { request: { threadIDs } } });
  await client.refetchQueries({ include: 'active' });
}

export interface OutgoingMail {
  to: SendAddressRequest[];
  cc: SendAddressRequest[];
  bcc: SendAddressRequest[];
  subject: string;
  text: string;
  html: string;
  /** The email being replied to; replies keep the thread together. */
  replyToEmailID?: string;
}

/**
 * Encrypts and sends like the web composer: the body is sealed with a fresh session key, which is boxed to the
 * server's decryption key so it can relay the message over Gmail.
 */
export async function sendMail(client: ApolloClient, session: Session, mail: OutgoingMail) {
  const { account } = session;
  const { data } = await client.query<DecryptionServicePublicKeyQuery>({
    query: DecryptionServicePublicKeyDocument,
    fetchPolicy: 'cache-first'
  });
  const externalPublicKey = data?.decryptionServicePublicKey;
  if (!externalPublicKey) throw new Error("The server didn't provide its encryption key.");

  const encrypted = await encryptMessage(
    {
      messageSubject: mail.subject,
      messageTextBody: mail.text,
      messageHtmlBody: mail.html,
      attachments: [],
      toAddresses: mail.to,
      ccAddresses: mail.cc,
      bccAddresses: mail.bcc,
      fromAddress: { name: account.displayName || undefined, address: account.emailAddress },
      privateKey: account.privateKey,
      publicKey: account.publicKey,
      externalPublicKey
    },
    client
  );

  const request: SendEmailRequest = {
    from: encrypted.fromAddressWithEncryptedKey,
    to: encrypted.toAddressesWithEncryptedKeys,
    cc: encrypted.ccAddressesWithEncryptedKeys,
    bcc: encrypted.bccAddressesWithEncryptedKeys,
    attachments: encrypted.encryptedAttachments,
    encryptedSubject: encrypted.encryptedSubject,
    encryptedText: encrypted.encryptedText,
    encryptedHtml: encrypted.encryptedHtml,
    encryptedTextAsHtml: encrypted.encryptedTextAsHtml,
    encryptedTextSnippet: encrypted.encryptedTextSnippet,
    externalEncryptedSessionKey: encrypted.externalEncryptedSessionKey,
    rawSubject: mail.subject,
    captchaToken: ''
  };

  if (mail.replyToEmailID) {
    await client.mutate({
      mutation: SendReplyMessageDocument,
      variables: { request: { ...request, replyID: mail.replyToEmailID, customMessageID: randomUUID() } }
    });
  } else {
    await client.mutate({ mutation: SendMessageDocument, variables: { request } });
  }
  await client.refetchQueries({ include: 'active' });
}
