import type { ApolloClient } from '@apollo/client';
import { createContext, type ReactNode, use, useCallback, useEffect, useMemo, useState } from 'react';

import { createApolloClient } from './apollo';
import { signIn as srpSignIn, signOut as serverSignOut } from './auth';
import { clearSession, loadSession, saveSession, type Session } from './session';

interface SessionContextValue {
  /** True until the stored session (if any) has been read from the keychain. */
  isLoading: boolean;
  session: Session | null;
  client: ApolloClient | null;
  signIn: (serverUrl: string, username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function useSession() {
  const value = use(SessionContext);
  if (!value) throw new Error('useSession must be used inside <SessionProvider>');
  return value;
}

/** The signed-in session; only for screens behind the sign-in guard. */
export function useSignedInSession() {
  const { session, client } = useSession();
  if (!session || !client) throw new Error('useSignedInSession requires a signed-in session');
  return { session, client };
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    loadSession()
      .then(setSession)
      .finally(() => setIsLoading(false));
  }, []);

  const forget = useCallback(async () => {
    setSession(null);
    await clearSession();
  }, []);

  const client = useMemo(
    // a rejected token (expired, or signed out elsewhere) returns the app to sign-in
    () => (session ? createApolloClient(session, () => void forget()) : null),
    [session, forget]
  );

  useEffect(() => () => client?.stop(), [client]);

  const signIn = useCallback(async (serverUrl: string, username: string, password: string) => {
    const next = await srpSignIn(serverUrl, username, password);
    await saveSession(next);
    setSession(next);
  }, []);

  const signOut = useCallback(async () => {
    await forget();
    if (session) await serverSignOut(session);
  }, [session, forget]);

  const value = useMemo(
    () => ({ isLoading, session, client, signIn, signOut }),
    [isLoading, session, client, signIn, signOut]
  );
  return <SessionContext value={value}>{children}</SessionContext>;
}
