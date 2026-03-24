import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.brandRow}>
        <Text style={styles.brandIcon}>🚨</Text>
        <View>
          <Text style={styles.brandTitle}>SOS Vidas</Text>
          <Text style={styles.brandSubtitle}>(Nexus Automação)</Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 18, marginBottom: 18 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 22 },
  brandIcon: { fontSize: 28 },
  brandTitle: { color: colors.text, fontSize: 22, fontWeight: '800' },
  brandSubtitle: { color: colors.muted, fontSize: 13, marginTop: 2 },
  title: { color: colors.text, fontSize: 34, fontWeight: '800' },
  subtitle: { color: colors.muted, marginTop: 10, lineHeight: 22, fontSize: 16 },
});
