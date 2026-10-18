import Ionicons from '@expo/vector-icons/Ionicons';
import { useApolloClient } from '@apollo/client/react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { type EmailFragment, useGetThreadFromIdQuery } from 'skiff-front-graphql';
import { SystemLabels } from 'skiff-graphql';

import { AttachmentList } from '@/components/AttachmentList';
import { EmailBody } from '@/components/EmailBody';
import { deleteForever, displayName, emailBodyHtml, fullDate, listDate, moveThreads, setRead } from '@/lib/mail';
import { useSignedInSession } from '@/lib/SessionProvider';
import { type Theme, useTheme } from '@/lib/theme';

export default function ThreadScreen() {
  const { threadID } = useLocalSearchParams<{ threadID: string }>();
  const theme = useTheme();
  const client = useApolloClient();
  const { data, loading, error } = useGetThreadFromIdQuery({ variables: { threadID } });
  const thread = data?.userThread;
  const [busy, setBusy] = useState(false);

  // opening a thread reads it; update the cached list row right away rather than waiting for the server
  const unread = thread ? !thread.attributes.read : false;
  useEffect(() => {
    if (!unread) return;
    client.cache.modify({
      id: client.cache.identify({ __typename: 'UserThread', threadID }),
      fields: { attributes: (attributes: object) => ({ ...attributes, read: true }) }
    });
    void setRead(client, [threadID], true).catch(() => undefined);
  }, [unread, client, threadID]);

  const act = async (action: () => Promise<unknown>, leave = true) => {
    setBusy(true);
    try {
      await action();
      if (leave) router.back();
    } catch (e) {
      Alert.alert("Couldn't update the conversation", e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const labels = thread?.attributes.systemLabels ?? [];
  const inTrash = labels.includes(SystemLabels.Trash);
  const inSpam = labels.includes(SystemLabels.Spam);
  const inInbox = labels.includes(SystemLabels.Inbox);

  const headerActions = (
    <View style={styles.headerActions}>
      {busy && <ActivityIndicator color={theme.textSecondary} />}
      {(inTrash || inSpam || !inInbox) && (
        <HeaderButton
          icon='mail-unread-outline'
          label={inSpam ? 'Not spam' : 'Move to Inbox'}
          theme={theme}
          onPress={() => void act(() => moveThreads(client, [threadID], SystemLabels.Inbox))}
        />
      )}
      {inInbox && (
        <HeaderButton
          icon='archive-outline'
          label='Archive'
          theme={theme}
          onPress={() => void act(() => moveThreads(client, [threadID], SystemLabels.Archive))}
        />
      )}
      {inTrash ? (
        <HeaderButton
          icon='trash'
          label='Delete forever'
          theme={theme}
          onPress={() =>
            Alert.alert('Delete forever?', 'This conversation will be permanently deleted.', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', style: 'destructive', onPress: () => void act(() => deleteForever(client, [threadID])) }
            ])
          }
        />
      ) : (
        <HeaderButton
          icon='trash-outline'
          label='Move to Trash'
          theme={theme}
          onPress={() => void act(() => moveThreads(client, [threadID], SystemLabels.Trash))}
        />
      )}
      <HeaderButton
        icon='mail-outline'
        label='Mark as unread'
        theme={theme}
        onPress={() =>
          void act(() => setRead(client, [threadID], false).then(() => client.refetchQueries({ include: 'active' })))
        }
      />
    </View>
  );

  if (!thread) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ title: '' }} />
        {loading ? (
          <ActivityIndicator color={theme.textSecondary} />
        ) : (
          <Text style={{ color: theme.textSecondary }}>{error ? error.message : 'This conversation is gone.'}</Text>
        )}
      </View>
    );
  }

  const subject = thread.emails[0]?.decryptedSubject || '(no subject)';
  const last = thread.emails[thread.emails.length - 1];

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: '', headerRight: () => headerActions }} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.subject, { color: theme.text }]}>{subject}</Text>
        {thread.emails.map((email, i) => (
          <EmailCard
            key={email.id}
            email={email}
            theme={theme}
            initiallyOpen={i === thread.emails.length - 1 || unread}
          />
        ))}
        {last && (
          <View style={styles.replyBar}>
            <ReplyButton
              theme={theme}
              icon='arrow-undo-outline'
              label='Reply'
              mode='reply'
              threadID={threadID}
              emailID={last.id}
            />
            <ReplyButton
              theme={theme}
              icon='arrow-undo-circle-outline'
              label='Reply all'
              mode='replyAll'
              threadID={threadID}
              emailID={last.id}
            />
            <ReplyButton
              theme={theme}
              icon='arrow-redo-outline'
              label='Forward'
              mode='forward'
              threadID={threadID}
              emailID={last.id}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function EmailCard({ email, theme, initiallyOpen }: { email: EmailFragment; theme: Theme; initiallyOpen: boolean }) {
  const { session } = useSignedInSession();
  const [open, setOpen] = useState(initiallyOpen);
  const recipients = [...email.to, ...email.cc].map(displayName).join(', ');
  return (
    <View style={[styles.card, { borderColor: theme.border, backgroundColor: theme.surface }]}>
      <Pressable accessibilityRole='button' onPress={() => setOpen((o) => !o)} style={styles.cardHeader}>
        <View style={styles.cardHeaderText}>
          <Text numberOfLines={1} style={[styles.from, { color: theme.text }]}>
            {displayName(email.from)}
          </Text>
          <Text numberOfLines={1} style={[styles.meta, { color: theme.textSecondary }]}>
            {open ? `to ${recipients || 'undisclosed recipients'}` : email.decryptedTextSnippet?.trim()}
          </Text>
        </View>
        <Text style={[styles.meta, { color: theme.textTertiary }]}>
          {open ? fullDate(email.createdAt) : listDate(email.createdAt)}
        </Text>
      </Pressable>
      {open && (
        <View style={styles.cardBody}>
          <EmailBody html={emailBodyHtml(email)} session={session} />
          <AttachmentList email={email} />
        </View>
      )}
    </View>
  );
}

function HeaderButton({
  icon,
  label,
  theme,
  onPress
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  theme: Theme;
  onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole='button' accessibilityLabel={label} hitSlop={8} onPress={onPress}>
      <Ionicons name={icon} size={22} color={theme.text} />
    </Pressable>
  );
}

function ReplyButton({
  theme,
  icon,
  label,
  mode,
  threadID,
  emailID
}: {
  theme: Theme;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  mode: 'reply' | 'replyAll' | 'forward';
  threadID: string;
  emailID: string;
}) {
  return (
    <Pressable
      accessibilityRole='button'
      onPress={() => router.push({ pathname: '/compose', params: { mode, threadID, emailID } })}
      style={[styles.replyButton, { borderColor: theme.border }]}
    >
      <Ionicons name={icon} size={18} color={theme.text} />
      <Text style={{ color: theme.text, fontSize: 14 }}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  content: { padding: 12, paddingBottom: 40, gap: 10 },
  subject: { fontSize: 21, fontWeight: '600', marginHorizontal: 4, marginBottom: 6 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  card: { borderWidth: StyleSheet.hairlineWidth, borderRadius: 12, overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', padding: 12, gap: 8 },
  cardHeaderText: { flex: 1 },
  from: { fontSize: 15, fontWeight: '600' },
  meta: { fontSize: 12, marginTop: 2 },
  cardBody: { paddingHorizontal: 8, paddingBottom: 10 },
  replyBar: { flexDirection: 'row', gap: 8, marginTop: 6 },
  replyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    paddingVertical: 10
  }
});
