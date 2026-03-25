import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

export function AppHeader({ title, subtitle, showBack = false }: { title: string; subtitle?: string; showBack?: boolean }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        {showBack ? (
          <Pressable style={({ pressed }) => [styles.backButton, pressed && styles.pressed]} onPress={() => router.back()}>
            <Text style={styles.backText}>← Voltar</Text>
          </Pressable>
        ) : <View />}
      </View>

      <View style={styles.brandRow}>
        <View style={styles.brandBadge}><Text style={styles.brandBadgeText}>SV</Text></View>
        <View>
          <Text style={styles.brandTitle}>SOS Vidas</Text>
          <Text style={styles.brandSubtitle}>Nexus Automação</Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 8, marginBottom: 22 },
  topRow: { minHeight: 34, justifyContent: 'center', marginBottom: 10 },
  backButton: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 2 },
  backText: { color: colors.primarySoft, fontSize: 15, fontWeight: '700' },
  pressed: { opacity: 0.8 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  brandBadge: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  brandBadgeText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  brandTitle: { color: colors.text, fontSize: 22, fontWeight: '800' },
  brandSubtitle: { color: colors.muted, fontSize: 13, marginTop: 2 },
  title: { color: colors.text, fontSize: 34, fontWeight: '800' },
  subtitle: { color: colors.muted, marginTop: 10, lineHeight: 22, fontSize: 16 },
});
