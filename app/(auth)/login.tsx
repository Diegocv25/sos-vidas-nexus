import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppCheckbox } from '@/components/AppCheckbox';
import { AppInput } from '@/components/AppInput';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { getOwnProfile, resetPasswordForEmail, signInWithPassword } from '@/services/auth';
import { clearRememberedEmail, getRememberedEmail, saveRememberedEmail } from '@/services/preferences';
import { getSubscriptionUi } from '@/services/subscription';

export default function LoginScreen() {
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getRememberedEmail().then((stored) => {
      if (stored) {
        setRemember(true);
        setEmail(stored);
      }
    });
  }, []);

  async function handleLogin() {
    if (!email || !password) return Alert.alert('Login', 'Preencha email e senha.');
    try {
      setLoading(true);
      const normalizedEmail = email.trim().toLowerCase();
      const { user } = await signInWithPassword(normalizedEmail, password);
      if (remember) await saveRememberedEmail(normalizedEmail);
      else await clearRememberedEmail();

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
      <Text style={styles.title}>Entrar</Text>
      <Text style={styles.subtitle}>Entre com email e senha. Se ainda não tiver acesso, siga para criar seu cadastro.</Text>
      <AppInput label="Email" placeholder="voce@email.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} hint={remember ? 'Sugestão de email ativa para facilitar acesso em emergência.' : undefined} />
      <AppInput label="Senha" placeholder="Sua senha" secureTextEntry passwordToggle value={password} onChangeText={setPassword} />
      <AppCheckbox value={remember} label="Lembrar meu email (auto complete / sugestão facilitada)" onChange={setRemember} />
      <AppButton label={loading ? 'Entrando...' : 'Entrar'} onPress={handleLogin} disabled={loading} />
      <AppButton label="Criar cadastro" variant="secondary" onPress={() => router.push('/cadastro')} />
      <AppButton label="Esqueci minha senha" variant="ghost" onPress={handleReset} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.muted, marginTop: 10, lineHeight: 22 },
});
