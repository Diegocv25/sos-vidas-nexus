import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

type Props = { emoji: string; name: string; number: string; displayNumber?: string };

export function EmergencyCard({ emoji, name, number, displayNumber }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.emoji}>{emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.number}>{displayNumber ?? number}</Text>
        </View>
      </View>
      <Pressable style={({ pressed }) => [styles.button, pressed && { opacity: 0.88 }]} onPress={() => Linking.openURL(`tel:${number}`)}>
        <Text style={styles.buttonText}>📞 LIGAR AGORA</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 14, borderRadius: 18, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, padding: 16, gap: 14 },
  header: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  emoji: { fontSize: 26 },
  name: { color: colors.text, fontSize: 17, fontWeight: '700' },
  number: { color: colors.muted, marginTop: 4 },
  button: { minHeight: 52, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: colors.text, fontSize: 15, fontWeight: '800' },
});
