import Ionicons from '@expo/vector-icons/Ionicons';
import { useApolloClient } from '@apollo/client/react';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import type { EmailFragment } from 'skiff-front-graphql';

import { formatSize, openAttachment } from '@/lib/attachments';
import { useSignedInSession } from '@/lib/SessionProvider';
import { useTheme } from '@/lib/theme';

export function AttachmentList({ email }: { email: EmailFragment }) {
  const theme = useTheme();
  const client = useApolloClient();
  const { session } = useSignedInSession();
  const [opening, setOpening] = useState<string | null>(null);

  const attachments = (email.decryptedAttachmentMetadata ?? []).flatMap((a) =>
    a.decryptedMetadata ? [{ attachmentID: a.attachmentID, ...a.decryptedMetadata }] : []
  );
  if (attachments.length === 0) return null;

  const open = async (attachment: (typeof attachments)[number]) => {
    setOpening(attachment.attachmentID);
    try {
      await openAttachment(client, session, attachment);
    } catch (e) {
      Alert.alert(`Couldn't open ${attachment.filename}`, e instanceof Error ? e.message : String(e));
    } finally {
      setOpening(null);
    }
  };

  return (
    <View style={styles.list}>
      {attachments.map((attachment) => (
        <Pressable
          key={attachment.attachmentID}
          accessibilityRole='button'
          disabled={opening !== null}
          onPress={() => void open(attachment)}
          style={[styles.chip, { borderColor: theme.border, backgroundColor: theme.surfaceAlt }]}
        >
          {opening === attachment.attachmentID ? (
            <ActivityIndicator size='small' color={theme.textSecondary} />
          ) : (
            <Ionicons name='document-attach-outline' size={18} color={theme.textSecondary} />
          )}
          <Text numberOfLines={1} style={[styles.name, { color: theme.text }]}>
            {attachment.filename}
          </Text>
          <Text style={{ color: theme.textTertiary, fontSize: 12 }}>{formatSize(attachment.size)}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 6, marginTop: 10 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 9
  },
  name: { flex: 1, fontSize: 14 }
});
