import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppCheckbox } from '@/components/AppCheckbox';
import { AppInput } from '@/components/AppInput';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { getOwnProfile, resetPasswordForEmail, signInWithPassword } from '@/services/auth';

export default function LoginScreen() {
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!email || !password) return Alert.alert('Login', 'Preencha email e senha.');
    try {
      setLoading(true);
      const { user } = await signInWithPassword(email.trim().toLowerCase(), password);
      if (!user?.email_confirmed_at) {
        return router.replace('/(auth)/confirmar-email');
      }
      const profile = await getOwnProfile(user.id);
      if (!profile?.is_subscribed || profile.subscription_status !== 'active') {
        return router.replace('/(auth)/pagamento');
      }
      router.replace('/(app)');
    } catch (err) {
      Alert.alert('Login', err instanceof Error ? err.message : 'Falha ao entrar');
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
    if (!email) return Alert.alert('Recuperação', 'Informe seu email primeiro.');
    try {
      await resetPasswordForEmail(email.trim().toLowerCase());
      Alert.alert('Recuperação', 'Enviamos as instruções para o seu email.');
    } catch (err) {
      Alert.alert('Recuperação', err instanceof Error ? err.message : 'Falha ao enviar recuperação');
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>Entrar</Text>
      <Text style={styles.subtitle}>Acesso ao SOS Vidas após email confirmado e assinatura ativa.</Text>
      <AppInput label="Email" placeholder="voce@email.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <AppInput label="Senha" placeholder="Sua senha" secureTextEntry value={password} onChangeText={setPassword} />
      <AppCheckbox value={remember} label="Lembrar minha senha (auto complete / sugestão facilitada)" onChange={setRemember} />
      <AppButton label={loading ? 'Entrando...' : 'Entrar'} onPress={handleLogin} disabled={loading} />
      <AppButton label="Esqueci minha senha" variant="ghost" onPress={handleReset} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.muted, marginTop: 10, lineHeight: 22 },
});
