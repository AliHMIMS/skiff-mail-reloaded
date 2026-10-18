import Ionicons from '@expo/vector-icons/Ionicons';
import { router, Stack } from 'expo-router';
import { memo, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { type ThreadWithoutContentFragment, useMailboxQuery } from 'skiff-front-graphql';

import { useMailboxLabel } from '@/lib/MailboxLabel';
import { latestEmail, listDate, threadParticipants } from '@/lib/mail';
import { useSignedInSession } from '@/lib/SessionProvider';
import { type Theme, useTheme } from '@/lib/theme';

const PAGE_SIZE = 25;

export default function Mailbox() {
  const theme = useTheme();
  const { session } = useSignedInSession();
  const { label } = useMailboxLabel();
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, loading, error, refetch, fetchMore } = useMailboxQuery({
    variables: { request: { label: label.id, limit: PAGE_SIZE, clientsideFiltersApplied: true } },
    notifyOnNetworkStatusChange: false
  });
  const threads = data?.mailbox?.threads ?? [];
  const pageInfo = data?.mailbox?.pageInfo;

  const { emailAddress, emailAliases } = session.account;
  // stable across renders so the memoized rows don't re-render
  const myAddresses = useMemo(
    () => [emailAddress, ...emailAliases].map((a) => a.toLowerCase()),
    [emailAddress, emailAliases]
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const onEndReached = useCallback(async () => {
    const cursor = pageInfo?.cursor;
    if (!pageInfo?.hasNextPage || !cursor || loadingMore) return;
    setLoadingMore(true);
    await fetchMore({
      variables: {
        request: {
          label: label.id,
          limit: PAGE_SIZE,
          clientsideFiltersApplied: true,
          cursor: { threadID: cursor.threadID, date: cursor.date }
        }
      }
    }).finally(() => setLoadingMore(false));
  }, [fetchMore, label.id, loadingMore, pageInfo]);

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          title: label.name,
          headerLeft: () => (
            <Pressable accessibilityLabel='Mailboxes' hitSlop={12} onPress={() => router.push('/labels')}>
              <Ionicons name='menu' size={24} color={theme.text} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable accessibilityLabel='Compose' hitSlop={12} onPress={() => router.push('/compose')}>
              <Ionicons name='create-outline' size={24} color={theme.accent} />
            </Pressable>
          )
        }}
      />
      <FlatList
        data={threads}
        keyExtractor={(thread) => thread.threadID}
        renderItem={({ item }) => <ThreadRow thread={item} myAddresses={myAddresses} theme={theme} />}
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: theme.border }]} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void onRefresh()} />}
        onEndReached={() => void onEndReached()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator style={styles.footer} color={theme.textSecondary} /> : undefined
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator style={styles.empty} color={theme.textSecondary} />
          ) : (
            <Text style={[styles.empty, styles.emptyText, { color: theme.textSecondary }]}>
              {error ? `Couldn't load mail: ${error.message}` : `No messages in ${label.name}.`}
            </Text>
          )
        }
        contentContainerStyle={threads.length === 0 ? styles.fill : undefined}
      />
    </View>
  );
}

const ThreadRow = memo(function ThreadRow({
  thread,
  myAddresses,
  theme
}: {
  thread: ThreadWithoutContentFragment;
  myAddresses: string[];
  theme: Theme;
}) {
  const email = latestEmail(thread);
  if (!email) return null;
  const unread = !thread.attributes.read;
  const hasAttachments = thread.emails.some((e) => e.attachmentMetadata.length > 0);
  const weight = unread ? '700' : '400';
  return (
    <Pressable
      accessibilityRole='button'
      onPress={() => router.push({ pathname: '/thread/[threadID]', params: { threadID: thread.threadID } })}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: theme.surfaceAlt }]}
    >
      <View style={styles.dotColumn}>
        {unread && <View style={[styles.dot, { backgroundColor: theme.unreadDot }]} />}
      </View>
      <View style={styles.rowBody}>
        <View style={styles.rowTop}>
          <Text numberOfLines={1} style={[styles.from, { color: theme.text, fontWeight: weight }]}>
            {threadParticipants(thread, myAddresses)}
            {thread.emails.length > 1 && (
              <Text style={{ color: theme.textTertiary, fontWeight: '400' }}> {thread.emails.length}</Text>
            )}
          </Text>
          {hasAttachments && <Ionicons name='attach' size={15} color={theme.textTertiary} />}
          <Text style={[styles.date, { color: unread ? theme.text : theme.textTertiary }]}>
            {listDate(thread.emailsUpdatedAt)}
          </Text>
        </View>
        <Text numberOfLines={1} style={[styles.subject, { color: theme.text, fontWeight: weight }]}>
          {email.decryptedSubject || '(no subject)'}
        </Text>
        <Text numberOfLines={2} style={[styles.snippet, { color: theme.textSecondary }]}>
          {email.decryptedTextSnippet?.trim() ?? ''}
        </Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  screen: { flex: 1 },
  fill: { flexGrow: 1 },
  row: { flexDirection: 'row', paddingVertical: 12, paddingRight: 16 },
  dotColumn: { width: 22, alignItems: 'center', paddingTop: 7 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  rowBody: { flex: 1 },
  rowTop: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  from: { flex: 1, fontSize: 15 },
  date: { fontSize: 12 },
  subject: { fontSize: 14, marginTop: 2 },
  snippet: { fontSize: 13, marginTop: 2, lineHeight: 18 },
  separator: { height: StyleSheet.hairlineWidth, marginLeft: 22 },
  footer: { paddingVertical: 16 },
  empty: { marginTop: 80 },
  emptyText: { textAlign: 'center', paddingHorizontal: 32 }
});
