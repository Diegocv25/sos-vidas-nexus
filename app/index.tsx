import { router, useLocalSearchParams } from 'expo-router';
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
  const params = useLocalSearchParams<{ screen?: string }>();
  const isResetPasswordFlow = params.screen === 'reset-password';

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
          router.replace('/login');
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
          router.replace('/pagamento');
          return;
        }

        router.replace('/(app)');
      } catch {
        router.replace('/login');
      }
    }

    routeFromSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      if (session?.user) {
        setTimeout(() => {
          if (active) routeFromSession();
        }, 0);
      }
    });

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, [params.screen]);

  if (isResetPasswordFlow) {
    return <Screen scroll={false} style={styles.blank} />;
  }

  return (
    <Screen style={styles.container}>
      <View style={styles.logoWrap}>
        <Text style={styles.logo}>🚨</Text>
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.subtitle}>Primeiros socorros, emergências e acesso rápido à ajuda oficial.</Text>
      </View>

      <View>
        <AppButton label="Entrar" onPress={() => router.replace('/login')} />
        <AppButton label="Criar cadastro" variant="secondary" onPress={() => router.replace('/cadastro')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'space-between', paddingTop: 48, paddingBottom: 36 },
  blank: { backgroundColor: colors.bg },
  logoWrap: { gap: 16 },
  logo: { fontSize: 54 },
  title: { color: colors.text, fontSize: 30, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 16, lineHeight: 24 },
});
