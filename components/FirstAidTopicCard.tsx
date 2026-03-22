import { router } from 'expo-router';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

type Props = {
  topicId: string;
  emoji: string;
  label: string;
  url: string;
  emergencyNumber: '192' | '193';
  note?: string;
};

export function FirstAidTopicCard({ topicId, emoji, label, url, emergencyNumber, note }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{emoji} {label}</Text>
      {note ? <Text style={styles.note}>{note}</Text> : null}
      <View style={styles.actions}>
        <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]} onPress={() => router.push(`/(app)/primeiros-socorros/${topicId}`)}>
          <Text style={styles.secondaryText}>📖 Ver no app</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]} onPress={() => Linking.openURL(url)}>
          <Text style={styles.secondaryText}>🔗 Fonte oficial</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]} onPress={() => Linking.openURL(`tel:${emergencyNumber}`)}>
          <Text style={styles.primaryText}>📞 Ligar {emergencyNumber}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 14, borderRadius: 18, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, padding: 16 },
  label: { color: colors.text, fontSize: 16, fontWeight: '700' },
  note: { color: colors.muted, marginTop: 8, lineHeight: 18, fontSize: 12 },
  actions: { marginTop: 14, gap: 10 },
  primaryButton: { minHeight: 52, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  secondaryButton: { minHeight: 52, borderRadius: 14, backgroundColor: colors.cardAlt, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: colors.text, fontWeight: '800' },
  secondaryText: { color: colors.text, fontWeight: '700' },
  pressed: { opacity: 0.88 },
});
