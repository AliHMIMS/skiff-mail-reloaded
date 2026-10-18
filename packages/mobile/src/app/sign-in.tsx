import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthError } from '@/lib/auth';
import { normalizeServerUrl, probeServer, ServerError } from '@/lib/server';
import { loadLastServerUrl } from '@/lib/session';
import { useSession } from '@/lib/SessionProvider';
import { useTheme } from '@/lib/theme';

export default function SignIn() {
  const theme = useTheme();
  const { signIn } = useSession();
  const [server, setServer] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void loadLastServerUrl().then((url) => url && setServer((current) => current || url));
  }, []);

  const busy = status !== null;
  const canSubmit = !busy && server.trim() && username.trim() && password;

  const submit = async () => {
    setError(null);
    try {
      let serverUrl: string;
      try {
        serverUrl = normalizeServerUrl(server);
      } catch {
        throw new ServerError('Enter your server address, like mail.example.com.');
      }
      setStatus('Contacting server…');
      await probeServer(serverUrl);
      // deriving the key from the password takes a moment on slower phones
      setStatus('Signing in…');
      await signIn(serverUrl, username, password);
    } catch (e) {
      setError(
        e instanceof AuthError || e instanceof ServerError
          ? e.message
          : `Sign-in failed: ${e instanceof Error ? e.message : String(e)}`
      );
      setStatus(null);
    }
  };

  const input = [styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surfaceAlt }];

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps='handled'>
          <Text style={[styles.title, { color: theme.text }]}>Skiff Mail</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Sign in to your self-hosted Skiff Mail server.
          </Text>

          <Text style={[styles.label, { color: theme.textSecondary }]}>Server</Text>
          <TextInput
            style={input}
            value={server}
            onChangeText={setServer}
            placeholder='mail.example.com'
            placeholderTextColor={theme.textTertiary}
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='url'
            textContentType='URL'
            editable={!busy}
          />

          <Text style={[styles.label, { color: theme.textSecondary }]}>Username</Text>
          <TextInput
            style={input}
            value={username}
            onChangeText={setUsername}
            placeholder='you@example.com'
            placeholderTextColor={theme.textTertiary}
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            textContentType='username'
            autoComplete='username'
            editable={!busy}
          />

          <Text style={[styles.label, { color: theme.textSecondary }]}>Password</Text>
          <TextInput
            style={input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType='password'
            autoComplete='current-password'
            onSubmitEditing={() => canSubmit && void submit()}
            returnKeyType='go'
            editable={!busy}
          />

          {error && <Text style={[styles.error, { color: theme.danger }]}>{error}</Text>}

          <Pressable
            accessibilityRole='button'
            onPress={() => void submit()}
            disabled={!canSubmit}
            style={[styles.button, { backgroundColor: theme.accent, opacity: canSubmit ? 1 : 0.5 }]}
          >
            {busy ? (
              <View style={styles.row}>
                <ActivityIndicator color={theme.accentText} />
                <Text style={[styles.buttonText, { color: theme.accentText }]}>{status}</Text>
              </View>
            ) : (
              <Text style={[styles.buttonText, { color: theme.accentText }]}>Sign in</Text>
            )}
          </Pressable>

          <Text style={[styles.hint, { color: theme.textTertiary }]}>
            Accounts are created on the server with the create-user command. Your password never leaves this device: it
            proves who you are and unlocks your encryption keys.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 24, paddingTop: 48 },
  title: { fontSize: 32, fontWeight: '700' },
  subtitle: { fontSize: 15, marginTop: 6, marginBottom: 28 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6, marginTop: 14 },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16
  },
  error: { marginTop: 16, fontSize: 14 },
  button: { marginTop: 24, borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  hint: { fontSize: 13, marginTop: 24, lineHeight: 19 }
});
