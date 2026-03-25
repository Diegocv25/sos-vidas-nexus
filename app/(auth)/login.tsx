import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppCheckbox } from '@/components/AppCheckbox';
import { AppHeader } from '@/components/AppHeader';
import { AppInput } from '@/components/AppInput';
import { Screen } from '@/components/Screen';
import { getOwnProfile, resetPasswordForEmail, signInWithPassword } from '@/services/auth';
import { clearRememberedCredentials, getRememberedCredentials, saveRememberedCredentials } from '@/services/preferences';
import { getSubscriptionUi } from '@/services/subscription';

export default function LoginScreen() {
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getRememberedCredentials().then(({ email: storedEmail, password: storedPassword }) => {
      if (storedEmail || storedPassword) {
        setRemember(true);
        setEmail(storedEmail);
        setPassword(storedPassword);
      }
    });
  }, []);

  async function handleLogin() {
    if (!email || !password) return Alert.alert('Login', 'Preencha email e senha.');
    try {
      setLoading(true);
      const normalizedEmail = email.trim().toLowerCase();
      const { user } = await signInWithPassword(normalizedEmail, password);
      if (remember) await saveRememberedCredentials(normalizedEmail, password);
      else await clearRememberedCredentials();

      if (!user?.email_confirmed_at) {
        return router.replace('/confirmar-email');
      }
      const profile = await getOwnProfile(user.id);
      const subscriptionUi = getSubscriptionUi(profile);
      if (subscriptionUi.blocked) {
        Alert.alert('Assinatura', subscriptionUi.banner || 'Assinatura inativa.');
        return router.replace('/pagamento');
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
      <AppHeader title="Entrar" subtitle="Entre com email e senha. Em um desespero ou confusão mental, lembrar email e senha facilita o acesso rápido." />
      <AppInput label="Email" placeholder="voce@email.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} hint={remember ? 'Email e senha ficam salvos para facilitar o acesso em emergência.' : undefined} />
      <AppInput label="Senha" placeholder="Sua senha" secureTextEntry passwordToggle value={password} onChangeText={setPassword} />
      <AppCheckbox value={remember} label="Lembrar meu email e senha (acesso facilitado em emergência)" onChange={setRemember} />
      <AppButton label={loading ? 'Entrando...' : 'Entrar'} onPress={handleLogin} disabled={loading} />
      <AppButton label="Criar cadastro" variant="secondary" onPress={() => router.push('/cadastro')} />
      <AppButton label="Esqueci minha senha" variant="ghost" onPress={handleReset} />
    </Screen>
  );
}

