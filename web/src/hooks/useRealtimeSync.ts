// Real-time sync with mymail-server: a WebSocket tells every open app which threads, labels or drafts
// changed (new mail via Gmail push, or an action taken in another tab/device), and we refresh just those.
import { useEffect } from 'react';
import {
  GetAllDraftsDocument,
  GetNumUnreadAllLabelsDocument,
  GetNumUnreadDocument,
  GetThreadsFromIDsDocument,
  GetThreadsFromIDsQuery,
  GetThreadsFromIDsQueryVariables,
  MailboxDocument,
  ThreadWithoutContentFragment,
  ThreadWithoutContentFragmentDoc,
  UserLabelsDocument
} from 'skiff-front-graphql';
import { SystemLabels } from 'skiff-graphql';

import client, { getRouterUri } from '../apollo/client';
import { updateThreadsWithModifiedLabels } from '../utils/cache/cache';
import { removeThreadsFromMailboxQuery } from '../utils/cache/mailbox';

type ServerMessage = { type: 'changes'; threadIDs: string[]; labels: boolean; drafts: boolean } | { type: 'resync' };

const MAX_RECONNECT_DELAY_MS = 30_000;

async function refreshThreads(threadIDs: string[]) {
  const { data } = await client.query<GetThreadsFromIDsQuery, GetThreadsFromIDsQueryVariables>({
    query: GetThreadsFromIDsDocument,
    variables: { threadIDs },
    fetchPolicy: 'no-cache'
  });
  if (!data) return;
  const fresh = data.userThreads;
  const cache = client.cache;

  // All Mail is a virtual folder the label diff below doesn't know about: drop threads that left it.
  const leftAllMail = fresh
    .filter((thread) => thread.attributes.systemLabels.some((l) => l === SystemLabels.Trash || l === SystemLabels.Spam))
    .map((thread) =>
      cache.readFragment<ThreadWithoutContentFragment>({
        id: cache.identify({ __typename: 'UserThread', threadID: thread.threadID }),
        fragment: ThreadWithoutContentFragmentDoc,
        fragmentName: 'ThreadWithoutContent'
      })
    )
    .filter((thread): thread is ThreadWithoutContentFragment => !!thread);
  if (leftAllMail.length) removeThreadsFromMailboxQuery(cache, SystemLabels.AllMail, leftAllMail);

  // Move threads between mailbox lists exactly like a local archive/trash/label action does
  // (compares against what's cached, so it must run before the fresh data is written).
  updateThreadsWithModifiedLabels({
    cache,
    updatedThreads: fresh.map((thread) => ({
      threadID: thread.threadID,
      systemLabels: thread.attributes.systemLabels,
      userLabels: thread.attributes.userLabels
    }))
  });
  // Then store the latest thread state (read status, new emails in the thread, ...).
  cache.writeQuery<GetThreadsFromIDsQuery, GetThreadsFromIDsQueryVariables>({
    query: GetThreadsFromIDsDocument,
    variables: { threadIDs },
    data
  });

  // Threads the server no longer has were deleted permanently.
  const returned = new Set(fresh.map((thread) => thread.threadID));
  const deleted = threadIDs.filter((id) => !returned.has(id));
  deleted.forEach((threadID) => cache.evict({ id: cache.identify({ __typename: 'UserThread', threadID }) }));
  if (deleted.length) cache.gc();

  // New threads only appear in a list after the list is refetched; counts change with read state.
  await client.refetchQueries({ include: [MailboxDocument, GetNumUnreadAllLabelsDocument, GetNumUnreadDocument] });
}

async function handleMessage(message: ServerMessage) {
  if (message.type === 'resync') {
    await client.refetchQueries({ include: 'active' });
    return;
  }
  const jobs: Promise<unknown>[] = [];
  if (message.threadIDs.length) jobs.push(refreshThreads(message.threadIDs));
  if (message.labels) jobs.push(client.refetchQueries({ include: [UserLabelsDocument] }));
  if (message.drafts) jobs.push(client.refetchQueries({ include: [GetAllDraftsDocument] }));
  await Promise.all(jobs);
}

/** Keep a WebSocket to the server open while logged in, reconnecting with backoff. */
export function useRealtimeSync(isLoggedIn: boolean) {
  useEffect(() => {
    if (!isLoggedIn) return;
    const url = `${(getRouterUri() || window.location.origin).replace(/^http/, 'ws')}/graphql/events`;
    let socket: WebSocket | undefined;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    let attempt = 0;
    let stopped = false;
    // process one message at a time so cache updates don't interleave
    let queue = Promise.resolve();

    const connect = () => {
      socket = new WebSocket(url);
      socket.onopen = () => {
        // anything may have changed while we were disconnected
        if (attempt > 0) queue = queue.then(() => handleMessage({ type: 'resync' })).catch(console.error);
        attempt = 0;
      };
      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(String(event.data)) as ServerMessage;
          queue = queue.then(() => handleMessage(message)).catch((e) => console.error('Realtime sync failed', e));
        } catch (e) {
          console.error('Bad realtime message', e);
        }
      };
      socket.onclose = () => {
        if (stopped) return;
        attempt += 1;
        const delay = Math.min(1000 * 2 ** (attempt - 1), MAX_RECONNECT_DELAY_MS);
        retryTimer = setTimeout(connect, delay);
      };
    };

    connect();
    return () => {
      stopped = true;
      if (retryTimer) clearTimeout(retryTimer);
      socket?.close();
    };
  }, [isLoggedIn]);
}
