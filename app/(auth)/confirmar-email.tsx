import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppHeader } from '@/components/AppHeader';
import { AppInput } from '@/components/AppInput';
import { Screen } from '@/components/Screen';
import { KIWIFY_CHECKOUT_URL } from '@/constants/app';
import { colors } from '@/constants/theme';
import { resendSignupCode, verifyEmailCode } from '@/services/auth';
import { clearPendingSignupEmail, getPendingSignupEmail } from '@/services/preferences';

export default function ConfirmarEmailScreen() {
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    getPendingSignupEmail().then(setEmail);
  }, []);

  async function handleResend() {
    if (!email) return Alert.alert('Confirmação', 'Não foi possível identificar o email do cadastro.');
    try {
      setResending(true);
      await resendSignupCode(email);
      Alert.alert('Confirmação', 'Código reenviado com sucesso. Verifique seu email.');
    } catch (err) {
      Alert.alert('Confirmação', err instanceof Error ? err.message : 'Falha ao reenviar código');
    } finally {
      setResending(false);
    }
  }

  async function handleContinue() {
    if (!email) return Alert.alert('Confirmação', 'Não foi possível identificar o email do cadastro.');
    if (!code.trim()) return Alert.alert('Confirmação', 'Digite o código recebido no email.');

    try {
      setLoading(true);
      await verifyEmailCode(email, code);
      await clearPendingSignupEmail();

      if (!KIWIFY_CHECKOUT_URL) {
        throw new Error('Checkout da Kiwify não configurado no app.');
      }

      await Linking.openURL(KIWIFY_CHECKOUT_URL);
      Alert.alert('Email confirmado', 'Checkout aberto. Depois de pagar, volte ao app e entre com seu email e senha.');
    } catch (err) {
      Alert.alert('Confirmação', err instanceof Error ? err.message : 'Falha ao confirmar código');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen style={styles.container}>
      <View>
        <AppHeader title="Confirmar email" subtitle="Enviamos um código para o seu email. Digite o código abaixo para continuar ao pagamento." showBack />
        <AppInput label="Email do cadastro" placeholder="voce@email.com" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <AppInput label="Código recebido" placeholder="Digite o código" keyboardType="number-pad" value={code} onChangeText={setCode} />
      </View>
      <View style={styles.actions}>
        <AppButton label={resending ? 'Reenviando...' : 'Reenviar email'} variant="secondary" onPress={handleResend} disabled={resending} />
        <AppButton label={loading ? 'Validando...' : 'Continuar'} onPress={handleContinue} disabled={loading} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'space-between', paddingTop: 48, paddingBottom: 72 },
  actions: { paddingBottom: 26 },
});
