import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

export function StatusBanner({ text, severity = 'warning' }: { text: string; severity?: 'warning' | 'danger' | 'info' }) {
  const palette = severity === 'danger'
    ? { bg: '#3B0B0B', border: '#7F1D1D', text: '#FECACA' }
    : severity === 'info'
      ? { bg: '#0F172A', border: '#1D4ED8', text: '#BFDBFE' }
      : { bg: '#3A2A05', border: '#A16207', text: '#FDE68A' };

  return (
    <View style={[styles.wrap, { backgroundColor: palette.bg, borderColor: palette.border }]}>
      <Text style={[styles.text, { color: palette.text }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 16, borderRadius: 16, borderWidth: 1, padding: 14 },
  text: { fontSize: 14, lineHeight: 20, fontWeight: '700' },
});
