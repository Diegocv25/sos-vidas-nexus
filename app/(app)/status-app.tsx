import { StyleSheet, Text } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { SectionCard } from '@/components/SectionCard';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { hasSupabaseEnv } from '@/services/supabase';

export default function StatusAppScreen() {
  const checks = [
    { label: 'Supabase URL/Anon configurados', ok: hasSupabaseEnv() },
    { label: 'Checkout Kiwify definido no app', ok: Boolean(process.env.EXPO_PUBLIC_KIWIFY_CHECKOUT_URL) },
    { label: 'Google Places API configurada', ok: Boolean(process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY) },
  ];

  return (
    <Screen>
      <AppHeader title="Status do app" subtitle="Resumo rápido de configuração para teste e publicação." />

      <SectionCard title="Ambiente">
        {checks.map((item) => (
          <Text key={item.label} style={styles.text}>{item.ok ? '✅' : '⚠️'} {item.label}</Text>
        ))}
      </SectionCard>

      <SectionCard title="Observação">
        <Text style={styles.text}>Esta tela serve apenas como apoio de validação interna durante a reta final do projeto.</Text>
      </SectionCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: { color: colors.text, lineHeight: 24 },
});
