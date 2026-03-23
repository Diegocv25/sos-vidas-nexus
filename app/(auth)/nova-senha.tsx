import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { getSupabase, hasSupabaseEnv } from '@/services/supabase';

export default function NovaSenhaScreen() {
  const [loading, setLoading] = useState(false);
  const [senha, setSenha] = useState('');
  const [senha2, setSenha2] = useState('');

  async function handleSave() {
    if (!hasSupabaseEnv()) return Alert.alert('Nova senha', 'Supabase ainda não configurado no ambiente do app.');
    if (!senha || !senha2) return Alert.alert('Nova senha', 'Preencha os dois campos.');
    if (senha.length < 8) return Alert.alert('Nova senha', 'A senha precisa ter pelo menos 8 caracteres.');
    if (senha !== senha2) return Alert.alert('Nova senha', 'As senhas precisam ser idênticas.');

    try {
      setLoading(true);
      const supabase = getSupabase();
      const { error } = await supabase.auth.updateUser({ password: senha });
      if (error) throw error;
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
      <Text style={styles.title}>Criar nova senha</Text>
      <Text style={styles.subtitle}>Defina sua nova senha para voltar ao app.</Text>
      <AppInput label="Nova senha" placeholder="Mínimo 8 caracteres" secureTextEntry passwordToggle value={senha} onChangeText={setSenha} />
      <AppInput label="Confirmar nova senha" placeholder="Repita a nova senha" secureTextEntry passwordToggle value={senha2} onChangeText={setSenha2} />
      <AppButton label={loading ? 'Salvando...' : 'Salvar nova senha'} onPress={handleSave} disabled={loading} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.muted, marginTop: 10, lineHeight: 22 },
});
