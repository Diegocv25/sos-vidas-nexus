import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppHeader } from '@/components/AppHeader';
import { AppInput } from '@/components/AppInput';
import { Screen } from '@/components/Screen';
import { verifyResetCode } from '@/services/auth';
import { clearPendingResetEmail, getPendingResetEmail } from '@/services/preferences';
import { getSupabase, hasSupabaseEnv } from '@/services/supabase';

export default function NovaSenhaScreen() {
  const [loading, setLoading] = useState(false);
  const [confirmingCode, setConfirmingCode] = useState(false);
  const [codeConfirmed, setCodeConfirmed] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [senha, setSenha] = useState('');
  const [senha2, setSenha2] = useState('');

  useEffect(() => {
    getPendingResetEmail().then(setEmail);
  }, []);

  async function handleConfirmCode() {
    if (!hasSupabaseEnv()) return Alert.alert('Nova senha', 'Supabase ainda não configurado no ambiente do app.');
    if (!email) return Alert.alert('Nova senha', 'Não foi possível identificar o email da recuperação.');
    if (!code.trim()) return Alert.alert('Nova senha', 'Digite o código recebido no email.');

    try {
      setConfirmingCode(true);
      await verifyResetCode(email, code);
      setCodeConfirmed(true);
      Alert.alert('Nova senha', 'Código confirmado. Agora defina sua nova senha.');
    } catch (err) {
      Alert.alert('Nova senha', err instanceof Error ? err.message : 'Falha ao confirmar código');
    } finally {
      setConfirmingCode(false);
    }
  }

  async function handleSave() {
    if (!hasSupabaseEnv()) return Alert.alert('Nova senha', 'Supabase ainda não configurado no ambiente do app.');
    if (!codeConfirmed) return Alert.alert('Nova senha', 'Confirme o código antes de definir a nova senha.');
    if (!senha || !senha2) return Alert.alert('Nova senha', 'Preencha os dois campos.');
    if (senha.length < 8) return Alert.alert('Nova senha', 'A senha precisa ter pelo menos 8 caracteres.');
    if (senha !== senha2) return Alert.alert('Nova senha', 'As senhas precisam ser idênticas.');

    try {
      setLoading(true);
      const supabase = getSupabase();
      const { error } = await supabase.auth.updateUser({ password: senha });
      if (error) throw error;
      await clearPendingResetEmail();
      Alert.alert('Nova senha', 'Senha atualizada com sucesso. Faça login para continuar.');
      router.replace('/login');
    } catch (err) {
      Alert.alert('Nova senha', err instanceof Error ? err.message : 'Falha ao atualizar senha');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <AppHeader title="Criar nova senha" subtitle="Primeiro confirme o código recebido por email. Depois disso, defina sua nova senha." showBack />
      <AppInput label="Email da recuperação" placeholder="voce@email.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <AppInput label="Código recebido" placeholder="Digite o código" keyboardType="number-pad" value={code} onChangeText={setCode} />
      <AppButton label={confirmingCode ? 'Confirmando código...' : 'Confirmar código'} onPress={handleConfirmCode} disabled={confirmingCode || codeConfirmed} />

      {codeConfirmed ? (
        <View>
          <AppInput label="Nova senha" placeholder="Mínimo 8 caracteres" secureTextEntry passwordToggle value={senha} onChangeText={setSenha} />
          <AppInput label="Confirmar nova senha" placeholder="Repita a nova senha" secureTextEntry passwordToggle value={senha2} onChangeText={setSenha2} />
          <AppButton label={loading ? 'Salvando...' : 'Salvar nova senha'} onPress={handleSave} disabled={loading} />
        </View>
      ) : null}
    </Screen>
  );
}
