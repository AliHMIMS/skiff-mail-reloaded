import { useApolloClient } from '@apollo/client/react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { type EmailFragment, useGetThreadFromIdQuery } from 'skiff-front-graphql';

import { emailBodyHtml, formatAddress, fullDate, parseRecipients, sendMail, textToHtml } from '@/lib/mail';
import type { Session } from '@/lib/session';
import { useSignedInSession } from '@/lib/SessionProvider';
import { useTheme } from '@/lib/theme';

type Mode = 'reply' | 'replyAll' | 'forward';

interface Draft {
  to: string;
  cc: string;
  subject: string;
  /** Quoted original appended below what the user types. */
  quote?: { text: string; html: string };
  replyToEmailID?: string;
  droppedAttachments: boolean;
}

const withPrefix = (prefix: string, subject: string) =>
  new RegExp(`^${prefix}:`, 'i').test(subject.trim()) ? subject : `${prefix}: ${subject}`;

function draftFrom(mode: Mode | undefined, original: EmailFragment | undefined, session: Session): Draft {
  if (!mode || !original) return { to: '', cc: '', subject: '', droppedAttachments: false };
  const mine = new Set([session.account.emailAddress, ...session.account.emailAliases].map((a) => a.toLowerCase()));
  const notMe = (a: { address: string }) => !mine.has(a.address.toLowerCase());
  const subject = original.decryptedSubject ?? '';
  const originalText = original.decryptedText ?? '';
  const originalHtml = emailBodyHtml(original);

  if (mode === 'forward') {
    const header = [
      '---------- Forwarded message ---------',
      `From: ${formatAddress(original.from)}`,
      `Date: ${fullDate(original.createdAt)}`,
      `Subject: ${subject}`,
      `To: ${original.to.map(formatAddress).join(', ')}`
    ];
    return {
      to: '',
      cc: '',
      subject: withPrefix('Fwd', subject),
      quote: {
        text: `\n\n${header.join('\n')}\n\n${originalText}`,
        html: `<br><div>${header.map((line) => textToHtml(line)).join('')}</div><br>${originalHtml}`
      },
      droppedAttachments: original.attachmentMetadata.length > 0
    };
  }

  // reply to whoever sent it, or (for a message I sent) to its recipients
  const sentByMe = !notMe(original.from);
  const primary = sentByMe ? original.to : [original.replyTo ?? original.from];
  const to = mode === 'replyAll' && !sentByMe ? [...primary, ...original.to.filter(notMe)] : primary;
  const cc = mode === 'replyAll' ? original.cc.filter(notMe) : [];
  const attribution = `On ${fullDate(original.createdAt)}, ${formatAddress(original.from)} wrote:`;
  return {
    to: to.map(formatAddress).join(', '),
    cc: cc.map(formatAddress).join(', '),
    subject: withPrefix('Re', subject),
    quote: {
      text: `\n\n${attribution}\n${originalText.replace(/^/gm, '> ')}`,
      html: `<br><div>${textToHtml(attribution)}</div><blockquote style="margin:0 0 0 0.8ex;border-left:1px solid #ccc;padding-left:1ex">${originalHtml}</blockquote>`
    },
    replyToEmailID: original.id,
    droppedAttachments: false
  };
}

export default function ComposeScreen() {
  const params = useLocalSearchParams<{ mode?: Mode; threadID?: string; emailID?: string }>();
  const theme = useTheme();
  const { session } = useSignedInSession();
  const { data, loading } = useGetThreadFromIdQuery({
    variables: { threadID: params.threadID ?? '' },
    skip: !params.threadID,
    fetchPolicy: 'cache-first'
  });

  if (params.threadID && loading && !data) {
    return <ActivityIndicator style={{ marginTop: 40 }} color={theme.textSecondary} />;
  }
  const original = data?.userThread?.emails.find((e) => e.id === params.emailID);
  return <ComposeForm draft={draftFrom(params.mode, original, session)} mode={params.mode} />;
}

function ComposeForm({ draft, mode }: { draft: Draft; mode?: Mode }) {
  const theme = useTheme();
  const client = useApolloClient();
  const { session } = useSignedInSession();
  const [to, setTo] = useState(draft.to);
  const [cc, setCc] = useState(draft.cc);
  const [bcc, setBcc] = useState('');
  const [showCc, setShowCc] = useState(!!draft.cc);
  const [subject, setSubject] = useState(draft.subject);
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);

  const send = async () => {
    const parsed = [to, cc, bcc].map(parseRecipients);
    const invalid = parsed.flatMap((p) => p.invalid);
    if (invalid.length > 0) {
      Alert.alert('Check the recipients', `These aren't email addresses: ${invalid.join(', ')}`);
      return;
    }
    if (parsed.every((p) => p.recipients.length === 0)) {
      Alert.alert('Add a recipient', 'Who should this message go to?');
      return;
    }
    setSending(true);
    try {
      await sendMail(client, session, {
        to: parsed[0].recipients,
        cc: parsed[1].recipients,
        bcc: parsed[2].recipients,
        subject,
        text: body + (draft.quote?.text ?? ''),
        html: textToHtml(body) + (draft.quote?.html ?? ''),
        replyToEmailID: draft.replyToEmailID
      });
      router.back();
    } catch (e) {
      setSending(false);
      Alert.alert("Couldn't send", e instanceof Error ? e.message : String(e));
    }
  };

  const title = mode === 'forward' ? 'Forward' : mode ? 'Reply' : 'New message';
  const field = [styles.fieldInput, { color: theme.text }];
  const row = [styles.fieldRow, { borderColor: theme.border }];

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Stack.Screen
        options={{
          title,
          headerLeft: () => (
            <Pressable accessibilityRole='button' hitSlop={10} onPress={() => router.back()} disabled={sending}>
              <Text style={{ color: theme.text, fontSize: 16 }}>Cancel</Text>
            </Pressable>
          ),
          headerRight: () =>
            sending ? (
              <ActivityIndicator color={theme.accent} />
            ) : (
              <Pressable accessibilityRole='button' hitSlop={10} onPress={() => void send()}>
                <Text style={{ color: theme.accent, fontSize: 16, fontWeight: '600' }}>Send</Text>
              </Pressable>
            )
        }}
      />
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={row}>
          <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>To</Text>
          <TextInput
            style={field}
            value={to}
            onChangeText={setTo}
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            autoFocus={mode !== 'reply' && mode !== 'replyAll'}
            editable={!sending}
          />
          {!showCc && (
            <Pressable hitSlop={8} onPress={() => setShowCc(true)}>
              <Text style={{ color: theme.textSecondary }}>Cc/Bcc</Text>
            </Pressable>
          )}
        </View>
        {showCc && (
          <>
            <View style={row}>
              <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>Cc</Text>
              <TextInput
                style={field}
                value={cc}
                onChangeText={setCc}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                editable={!sending}
              />
            </View>
            <View style={row}>
              <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>Bcc</Text>
              <TextInput
                style={field}
                value={bcc}
                onChangeText={setBcc}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                editable={!sending}
              />
            </View>
          </>
        )}
        <View style={row}>
          <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>From</Text>
          <Text style={[styles.fieldInput, { color: theme.textSecondary }]} numberOfLines={1}>
            {session.account.emailAddress}
          </Text>
        </View>
        <View style={row}>
          <TextInput
            style={[field, styles.subject]}
            value={subject}
            onChangeText={setSubject}
            placeholder='Subject'
            placeholderTextColor={theme.textTertiary}
            editable={!sending}
          />
        </View>
        <TextInput
          style={[styles.body, { color: theme.text }]}
          value={body}
          onChangeText={setBody}
          placeholder='Message'
          placeholderTextColor={theme.textTertiary}
          multiline
          textAlignVertical='top'
          autoFocus={mode === 'reply' || mode === 'replyAll'}
          editable={!sending}
        />
        {draft.quote && (
          <Text numberOfLines={8} style={[styles.quote, { color: theme.textTertiary, borderColor: theme.border }]}>
            {draft.quote.text.trim()}
          </Text>
        )}
        {draft.droppedAttachments && (
          <Text style={[styles.note, { color: theme.textTertiary }]}>
            The original attachments aren't included when forwarding from the app.
          </Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: 48,
    gap: 10
  },
  fieldLabel: { fontSize: 15, width: 44 },
  fieldInput: { flex: 1, fontSize: 15, paddingVertical: 12 },
  subject: { fontWeight: '500' },
  body: { minHeight: 220, fontSize: 16, lineHeight: 22, padding: 16 },
  quote: { marginHorizontal: 16, paddingLeft: 10, borderLeftWidth: 2, fontSize: 13, lineHeight: 18 },
  note: { margin: 16, fontSize: 13 }
});
