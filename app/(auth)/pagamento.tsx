import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { Screen } from '@/components/Screen';
import { APP_NAME, APP_PRICE_LABEL, KIWIFY_CHECKOUT_URL, PAYMENT_BENEFITS } from '@/constants/app';
import { colors } from '@/constants/theme';
import { getOwnProfile } from '@/services/auth';
import { getSubscriptionUi } from '@/services/subscription';
import { getSupabase, hasSupabaseEnv } from '@/services/supabase';

export default function PagamentoScreen() {
  const [checking, setChecking] = useState(false);

  async function handleCheckPayment() {
    if (!hasSupabaseEnv()) return Alert.alert('Pagamento', 'Supabase ainda não configurado no ambiente do app.');
    try {
      setChecking(true);
      const supabase = getSupabase();
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;

      if (!user) {
        router.replace('/login');
        return;
      }

      const profile = await getOwnProfile(user.id);
      const subscriptionUi = getSubscriptionUi(profile);

      if (subscriptionUi.blocked) {
        Alert.alert('Pagamento', 'Ainda não encontramos confirmação de pagamento. Se você acabou de pagar, aguarde alguns instantes e tente novamente.');
        return;
      }

      router.replace('/(app)');
    } catch (err) {
      Alert.alert('Pagamento', err instanceof Error ? err.message : 'Falha ao verificar pagamento');
    } finally {
      setChecking(false);
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>Assinatura</Text>
      <Text style={styles.appName}>{APP_NAME}</Text>
      <Text style={styles.price}>{APP_PRICE_LABEL}</Text>

      <View style={styles.card}>
        {PAYMENT_BENEFITS.map((item) => (
          <Text key={item} style={styles.item}>• {item}</Text>
        ))}
      </View>

      <Text style={styles.helper}>O checkout abre fora do app. Depois do pagamento, volte ao app e toque em “Já paguei — Verificar acesso”.</Text>

      <AppButton label="ASSINAR AGORA" onPress={() => KIWIFY_CHECKOUT_URL && Linking.openURL(KIWIFY_CHECKOUT_URL)} disabled={!KIWIFY_CHECKOUT_URL} />
      <AppButton label={checking ? 'Verificando...' : 'Já paguei — Verificar acesso'} variant="secondary" onPress={handleCheckPayment} disabled={checking} />
      <AppButton label="Ir para login" variant="ghost" onPress={() => router.replace('/login')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  appName: { color: colors.text, fontSize: 18, marginTop: 14, fontWeight: '700' },
  price: { color: colors.primarySoft, marginTop: 8, fontSize: 22, fontWeight: '800' },
  card: { marginTop: 20, borderRadius: 18, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, padding: 18, gap: 12 },
  item: { color: colors.text, lineHeight: 22 },
  helper: { color: colors.muted, marginTop: 16, marginBottom: 8, lineHeight: 22 },
});
