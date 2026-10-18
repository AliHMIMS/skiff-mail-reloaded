import Constants from 'expo-constants';
import { type ReactNode, useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { probeServer, type ServerInfo } from '@/lib/server';
import { useSession, useSignedInSession } from '@/lib/SessionProvider';
import { type Theme, useTheme } from '@/lib/theme';

export default function SettingsScreen() {
  const theme = useTheme();
  const { session } = useSignedInSession();
  const { signOut } = useSession();
  const [server, setServer] = useState<ServerInfo | null>(null);

  useEffect(() => {
    probeServer(session.serverUrl).then(setServer, () => setServer(null));
  }, [session.serverUrl]);

  const confirmSignOut = () =>
    Alert.alert('Sign out?', 'Your keys are removed from this device. Sign in again with your password.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: () => void signOut() }
    ]);

  const { account } = session;
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Section title='Account' theme={theme}>
        <Item label='Name' value={account.displayName || '—'} theme={theme} />
        <Item label='Address' value={account.emailAddress} theme={theme} />
        <Item label='Username' value={account.username} theme={theme} />
      </Section>
      <Section title='Server' theme={theme}>
        <Item label='Address' value={session.serverUrl} theme={theme} />
        <Item label='Version' value={server ? server.version : 'unreachable'} theme={theme} />
      </Section>
      <Section title='App' theme={theme}>
        <Item label='Version' value={Constants.expoConfig?.version ?? '—'} theme={theme} />
      </Section>
      <Pressable
        accessibilityRole='button'
        onPress={confirmSignOut}
        style={[styles.signOut, { borderColor: theme.border }]}
      >
        <Text style={{ color: theme.danger, fontSize: 16, fontWeight: '500' }}>Sign out</Text>
      </Pressable>
    </ScrollView>
  );
}

function Section({ title, theme, children }: { title: string; theme: Theme; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.textTertiary }]}>{title}</Text>
      <View style={[styles.card, { borderColor: theme.border, backgroundColor: theme.surface }]}>{children}</View>
    </View>
  );
}

function Item({ label, value, theme }: { label: string; value: string; theme: Theme }) {
  return (
    <View style={[styles.item, { borderColor: theme.border }]}>
      <Text style={{ color: theme.textSecondary, fontSize: 15 }}>{label}</Text>
      <Text selectable numberOfLines={1} style={[styles.value, { color: theme.text }]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 20 },
  section: { gap: 6 },
  sectionTitle: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase', marginLeft: 4 },
  card: { borderWidth: StyleSheet.hairlineWidth, borderRadius: 12, overflow: 'hidden' },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  value: { flexShrink: 1, fontSize: 15 },
  signOut: { borderWidth: StyleSheet.hairlineWidth, borderRadius: 12, paddingVertical: 14, alignItems: 'center' }
});
