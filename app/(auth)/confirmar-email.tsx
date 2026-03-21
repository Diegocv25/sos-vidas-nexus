import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { getSupabase, hasSupabaseEnv } from '@/services/supabase';

export default function ConfirmarEmailScreen() {
  const [loading, setLoading] = useState(false);

  async function handleResend() {
    const { data } = await supabase.auth.getUser();
    const email = data.user?.email;
    if (!email) return Alert.alert('Confirmação', 'Não foi possível identificar o email atual.');
    try {
      setLoading(true);
      const { error } = await supabase.auth.resend({ type: 'signup', email });
      if (error) throw error;
      Alert.alert('Confirmação', 'Email reenviado com sucesso.');
    } catch (err) {
      Alert.alert('Confirmação', err instanceof Error ? err.message : 'Falha ao reenviar email');
    } finally {
      setLoading(false);
    }
  }

  async function handleContinue() {
    const { data } = await supabase.auth.getUser();
    if (data.user?.email_confirmed_at) {
      router.replace('/(auth)/pagamento');
    } else {
      Alert.alert('Confirmação', 'Seu email ainda não foi confirmado.');
    }
  }

  return (
    <Screen style={styles.container}>
      <View>
        <Text style={styles.title}>Confirme seu email</Text>
        <Text style={styles.subtitle}>Enviamos um email de confirmação. Após confirmar, você segue obrigatoriamente para o pagamento.</Text>
      </View>
      <View>
        <AppButton label={loading ? 'Reenviando...' : 'Reenviar email de confirmação'} variant="secondary" onPress={handleResend} disabled={loading} />
        <AppButton label="Já confirmei — Continuar" onPress={handleContinue} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'space-between', paddingTop: 48, paddingBottom: 36 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.muted, marginTop: 10, lineHeight: 22 },
});
title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.muted, marginTop: 10, lineHeight: 22 },
});
