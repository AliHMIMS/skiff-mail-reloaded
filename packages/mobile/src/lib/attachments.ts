// Attachments are stored encrypted with the email's own key: fetch, decrypt here, then hand the file to the OS
// (open in another app, save, share) like web's useAttachments does with a download.
import type { ApolloClient } from '@apollo/client';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { decryptDatagramV2 } from 'skiff-crypto';
import {
  AttachmentDatagram,
  GetAttachmentsDocument,
  type GetAttachmentsQuery,
  type GetAttachmentsQueryVariables
} from 'skiff-front-graphql';

import { rebaseServerLink } from './server';
import type { Session } from './session';

export interface AttachmentInfo {
  attachmentID: string;
  filename: string;
  contentType: string;
}

// file names come from the sender; keep them to characters every filesystem accepts
const safeFilename = (name: string) =>
  Array.from(name, (c) => (c.charCodeAt(0) < 32 || '/\\:*?"<>|'.includes(c) ? '_' : c))
    .join('')
    .slice(0, 120) || 'attachment';

export async function openAttachment(client: ApolloClient, session: Session, attachment: AttachmentInfo) {
  const { data } = await client.query<GetAttachmentsQuery, GetAttachmentsQueryVariables>({
    query: GetAttachmentsDocument,
    variables: { ids: [attachment.attachmentID] },
    fetchPolicy: 'network-only'
  });
  const found = data?.attachments?.[0];
  if (!found?.downloadLink || !found.decryptedSessionKey) throw new Error('The server has no copy of this attachment.');

  const res = await fetch(rebaseServerLink(session.serverUrl, found.downloadLink), {
    headers: { authorization: `Bearer ${session.token}` }
  });
  if (!res.ok) throw new Error(`Download failed (${res.status}).`);
  const { content } = decryptDatagramV2(AttachmentDatagram, found.decryptedSessionKey, await res.text()).body;
  // older messages store a data: URL, newer ones bare base64
  const base64 = String(content).replace(/^data:[^,]*,/, '');

  const file = new File(Paths.cache, `${attachment.attachmentID}-${safeFilename(attachment.filename)}`);
  if (file.exists) file.delete();
  file.create();
  file.write(base64, { encoding: 'base64' });

  if (!(await Sharing.isAvailableAsync())) throw new Error("This device can't open files from the app.");
  await Sharing.shareAsync(file.uri, { mimeType: attachment.contentType, dialogTitle: attachment.filename });
}

export function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
