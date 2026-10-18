import { ApolloProvider } from '@apollo/client/react';
import { Stack } from 'expo-router';

import { MailboxLabelProvider } from '@/lib/MailboxLabel';
import { useRealtimeUpdates } from '@/lib/realtime';
import { useSignedInSession } from '@/lib/SessionProvider';
import { useTheme } from '@/lib/theme';

export default function AppLayout() {
  const { session, client } = useSignedInSession();
  const theme = useTheme();
  useRealtimeUpdates(session, client);

  return (
    <ApolloProvider client={client}>
      <MailboxLabelProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: theme.background },
            headerTintColor: theme.text,
            headerShadowVisible: false,
            contentStyle: { backgroundColor: theme.background }
          }}
        >
          <Stack.Screen name='index' />
          <Stack.Screen name='thread/[threadID]' options={{ title: '' }} />
          <Stack.Screen name='labels' options={{ presentation: 'modal', title: 'Mailboxes' }} />
          <Stack.Screen name='compose' options={{ presentation: 'modal', title: 'New message' }} />
          <Stack.Screen name='settings' options={{ title: 'Settings' }} />
        </Stack>
      </MailboxLabelProvider>
    </ApolloProvider>
  );
}
