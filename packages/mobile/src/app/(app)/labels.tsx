import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGetNumUnreadAllLabelsQuery, useUserLabelsQuery } from 'skiff-front-graphql';
import { UserLabelVariant } from 'skiff-graphql';

import { type MailboxLabel, useMailboxLabel } from '@/lib/MailboxLabel';
import { SYSTEM_LABELS } from '@/lib/mail';
import { type Theme, useTheme } from '@/lib/theme';

export default function LabelsScreen() {
  const theme = useTheme();
  const { label: current, setLabel } = useMailboxLabel();
  const { data: labelsData } = useUserLabelsQuery();
  const userLabels = (labelsData?.userLabels ?? []).filter(
    (l) => l.variant === UserLabelVariant.Plain || l.variant === UserLabelVariant.Folder
  );
  const { data: unreadData } = useGetNumUnreadAllLabelsQuery({
    variables: { labels: [...SYSTEM_LABELS.map((l) => l.id), ...userLabels.map((l) => l.labelID)] },
    fetchPolicy: 'cache-and-network'
  });
  const unread = new Map(unreadData?.unreadAllLabels.map((u) => [u.label, u.count]));

  const choose = (label: MailboxLabel) => {
    setLabel(label);
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {SYSTEM_LABELS.map((l) => (
        <Row
          key={l.id}
          theme={theme}
          icon={l.icon}
          name={l.name}
          count={unread.get(l.id)}
          selected={current.id === l.id}
          onPress={() => choose({ id: l.id, name: l.name })}
        />
      ))}
      {userLabels.length > 0 && <Text style={[styles.section, { color: theme.textTertiary }]}>Labels</Text>}
      {userLabels.map((l) => (
        <Row
          key={l.labelID}
          theme={theme}
          icon={l.variant === UserLabelVariant.Folder ? 'folder-outline' : 'pricetag-outline'}
          iconColor={l.color}
          name={l.labelName}
          count={unread.get(l.labelID)}
          selected={current.id === l.labelID}
          onPress={() => choose({ id: l.labelID, name: l.labelName })}
        />
      ))}
      <View style={[styles.divider, { backgroundColor: theme.border }]} />
      <Row
        theme={theme}
        icon='settings-outline'
        name='Settings'
        selected={false}
        onPress={() => {
          router.back();
          router.push('/settings');
        }}
      />
    </ScrollView>
  );
}

function Row({
  theme,
  icon,
  iconColor,
  name,
  count,
  selected,
  onPress
}: {
  theme: Theme;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  name: string;
  count?: number;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole='button'
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.row, (selected || pressed) && { backgroundColor: theme.surfaceAlt }]}
    >
      <Ionicons name={icon} size={20} color={iconColor ?? (selected ? theme.accent : theme.textSecondary)} />
      <Text style={[styles.name, { color: theme.text, fontWeight: selected ? '600' : '400' }]}>{name}</Text>
      {!!count && <Text style={{ color: theme.textSecondary }}>{count}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { padding: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10
  },
  name: { flex: 1, fontSize: 16 },
  section: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 18,
    marginBottom: 4,
    marginLeft: 14
  },
  divider: { height: StyleSheet.hairlineWidth, marginVertical: 10, marginHorizontal: 14 }
});
