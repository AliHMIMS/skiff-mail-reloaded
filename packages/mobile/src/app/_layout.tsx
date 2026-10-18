import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { SessionProvider, useSession } from '@/lib/SessionProvider';
import { useTheme } from '@/lib/theme';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <SessionProvider>
      <StatusBar style='auto' />
      <RootNavigator />
    </SessionProvider>
  );
}

function RootNavigator() {
  const { isLoading, session } = useSession();
  const theme = useTheme();

  useEffect(() => {
    if (!isLoading) void SplashScreen.hideAsync();
  }, [isLoading]);

  if (isLoading) return null;
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.background } }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name='(app)' />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name='sign-in' />
      </Stack.Protected>
    </Stack>
  );
}
