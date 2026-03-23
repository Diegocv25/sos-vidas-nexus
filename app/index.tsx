import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { Screen } from '@/components/Screen';
import { APP_NAME, KIWIFY_CHECKOUT_URL } from '@/constants/app';
import { colors } from '@/constants/theme';
import { getOwnProfile } from '@/services/auth';
import { getSubscriptionUi } from '@/services/subscription';
import { getSupabase, hasSupabaseEnv } from '@/services/supabase';

export default function SplashScreen() {
  const params = useLocalSearchParams<{ screen?: string }>();

  useEffect(() => {
    let active = true;
    if (!hasSupabaseEnv()) return;

    const supabase = getSupabase();

    async function routeFromSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error || !active) return;

        const user = data.session?.user;
        if (params.screen === 'reset-password') {
          router.replace('/nova-senha');
          return;
        }

        if (!user) {
          if (params.screen === 'login') router.replace('/login');
          return;
        }

        if (!user.email_confirmed_at) {
          router.replace('/confirmar-email');
          return;
        }

        const profile = await getOwnProfile(user.id).catch(() => null);
        if (!active) return;

        const subscriptionUi = getSubscriptionUi(profile);
        if (subscriptionUi.blocked) {
          if (KIWIFY_CHECKOUT_URL) {
            Linking.openURL(KIWIFY_CHECKOUT_URL);
          } else {
            router.replace('/pagamento');
          }
          return;
        }

        router.replace('/(app)');
      } catch {
        // fallback silencioso para a tela inicial
      }
    }

    routeFromSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active || !session?.user) return;
      setTimeout(() => {
        if (active) routeFromSession();
      }, 0);
    });

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, [params.screen]);

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
