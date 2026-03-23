import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { Screen } from '@/components/Screen';
import { APP_NAME } from '@/constants/app';
import { colors } from '@/constants/theme';
import { getOwnProfile } from '@/services/auth';
import { getSubscriptionUi } from '@/services/subscription';
import { getSupabase, hasSupabaseEnv } from '@/services/supabase';

export default function SplashScreen() {
  useEffect(() => {
    let active = true;

    async function restoreSession() {
      if (!hasSupabaseEnv()) return;
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase.auth.getSession();
        if (error || !active) return;

        const user = data.session?.user;
        if (!user) return;

        if (!user.email_confirmed_at) {
          router.replace('/confirmar-email');
          return;
        }

        const profile = await getOwnProfile(user.id).catch(() => null);
        if (!active) return;

        const subscriptionUi = getSubscriptionUi(profile);
        if (subscriptionUi.blocked) {
          router.replace('/pagamento');
          return;
        }

        router.replace('/(app)');
      } catch {
        // fallback silencioso para a tela inicial
      }
    }

    restoreSession();
    return () => {
      active = false;
    };
  }, []);

  return (
    <Screen style={styles.container}>
      <View style={styles.logoWrap}>
        <Text style={styles.logo}>🚨</Text>
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.subtitle}>Primeiros socorros, emergências e acesso rápido à ajuda oficial.</Text>
      </View>

      <View>
        <AppButton label="Criar conta" onPress={() => router.push('/(auth)/cadastro')} />
        <AppButton label="Já tenho conta — Entrar" variant="secondary" onPress={() => router.push('/(auth)/login')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'space-between', paddingTop: 48, paddingBottom: 36 },
  logoWrap: { gap: 16 },
  logo: { fontSize: 54 },
  title: { color: colors.text, fontSize: 30, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 16, lineHeight: 24 },
});
