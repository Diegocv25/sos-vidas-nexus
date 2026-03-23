import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { getSupabase, hasSupabaseEnv } from '@/services/supabase';

export default function ConfirmarEmailScreen() {
  const [loading, setLoading] = useState(false);

  async function handleResend() {
    if (!hasSupabaseEnv()) return Alert.alert('Confirmação', 'Supabase ainda não configurado no ambiente do app.');
    const supabase = getSupabase();
    const { data } = await supabase.auth.getUser();
    const email = data.user?.email;
    if (!email) return Alert.alert('Confirmação', 'Não foi possível identificar o email atual.');
    try {
      setLoading(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: { emailRedirectTo: process.env.EXPO_PUBLIC_KIWIFY_CHECKOUT_URL || undefined },
      });
      if (error) throw error;
      Alert.alert('Confirmação', 'Email reenviado com sucesso. Verifique sua caixa de entrada.');
    } catch (err) {
      Alert.alert('Confirmação', err instanceof Error ? err.message : 'Falha ao reenviar email');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen style={styles.container}>
      <View>
        <Text style={styles.title}>Confirme seu email</Text>
        <Text style={styles.subtitle}>Enviamos um email de confirmação para você. Assim que confirmar no email recebido, você será levado direto para o checkout.</Text>
      </View>
      <View>
        <AppButton label={loading ? 'Reenviando...' : 'Reenviar email de confirmação'} variant="secondary" onPress={handleResend} disabled={loading} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'space-between', paddingTop: 48, paddingBottom: 36 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.muted, marginTop: 10, lineHeight: 22 },
});
