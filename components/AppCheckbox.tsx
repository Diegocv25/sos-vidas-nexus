import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

type Props = { value: boolean; label: string; onChange: (next: boolean) => void };

export function AppCheckbox({ value, label, onChange }: Props) {
  return (
    <Pressable style={styles.row} onPress={() => onChange(!value)}>
      <View style={[styles.box, value && styles.boxOn]} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 18 },
  box: { width: 22, height: 22, borderRadius: 6, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  boxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  label: { color: colors.text, flex: 1, lineHeight: 20 },
});
