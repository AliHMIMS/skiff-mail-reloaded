// Live updates from the server's /graphql/events socket (see packages/server/src/events.rs). Any change refreshes
// the queries on screen; the socket reconnects with backoff and whenever the app returns to the foreground.
import type { ApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import { AppState } from 'react-native';

import { eventsUrl } from './server';
import type { Session } from './session';

type ServerEvent = { type: 'changes'; threadIDs: string[]; labels: boolean; drafts: boolean } | { type: 'resync' };

// React Native's WebSocket takes headers as a third argument; the DOM typing doesn't know about it
type NativeWebSocket = new (
  url: string,
  protocols: string[] | undefined,
  options: { headers: Record<string, string> }
) => WebSocket;

const MAX_BACKOFF_MS = 30_000;

export function useRealtimeUpdates(session: Session, client: ApolloClient) {
  useEffect(() => {
    let socket: WebSocket | null = null;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;
    let closed = false;
    let refetchTimer: ReturnType<typeof setTimeout> | undefined;

    // bursts of events (a sync touching many threads) become one refetch
    const refresh = () => {
      clearTimeout(refetchTimer);
      refetchTimer = setTimeout(() => void client.refetchQueries({ include: 'active' }), 150);
    };

    const connect = () => {
      if (closed || socket) return;
      const ws = new (WebSocket as unknown as NativeWebSocket)(eventsUrl(session.serverUrl), undefined, {
        headers: { authorization: `Bearer ${session.token}` }
      });
      socket = ws;
      ws.onopen = () => {
        // anything may have changed while disconnected
        if (attempts > 0) refresh();
        attempts = 0;
      };
      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(String(event.data)) as ServerEvent;
          if (message.type === 'resync' || message.type === 'changes') refresh();
        } catch {
          // not ours
        }
      };
      ws.onclose = () => {
        socket = null;
        if (closed) return;
        attempts += 1;
        retryTimer = setTimeout(connect, Math.min(MAX_BACKOFF_MS, 1000 * 2 ** Math.min(attempts, 5)));
      };
    };

    const appState = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        clearTimeout(retryTimer);
        connect();
        refresh();
      }
    });

    connect();
    return () => {
      closed = true;
      appState.remove();
      clearTimeout(retryTimer);
      clearTimeout(refetchTimer);
      socket?.close();
    };
  }, [session, client]);
}
