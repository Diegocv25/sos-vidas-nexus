import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { signUpWithProfile } from '@/services/auth';
import { fetchAddressByCep } from '@/services/viacep';
import { isValidCep, isValidCpf, maskCep, maskCpf } from '@/services/validators';

export default function CadastroScreen() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: '', cpf: '', email: '', cep: '', logradouro: '', numero: '', bairro: '', cidade: '', estado: '', senha: '', senha2: '',
  });

  async function onCepBlur() {
    if (!isValidCep(form.cep)) return;
    try {
      const data = await fetchAddressByCep(form.cep);
      setForm((prev) => ({ ...prev, logradouro: data.logradouro ?? '', bairro: data.bairro ?? '', cidade: data.localidade ?? '', estado: data.uf ?? '' }));
    } catch (err) {
      Alert.alert('CEP', err instanceof Error ? err.message : 'Não foi possível consultar o CEP');
    }
  }

  async function handleSubmit() {
    if (!form.nome || !form.cpf || !form.email || !form.cep || !form.logradouro || !form.numero || !form.bairro || !form.cidade || !form.estado || !form.senha || !form.senha2) {
      return Alert.alert('Cadastro', 'Preencha todos os campos obrigatórios.');
    }
    if (!isValidCpf(form.cpf)) return Alert.alert('Cadastro', 'CPF inválido.');
    if (!isValidCep(form.cep)) return Alert.alert('Cadastro', 'CEP inválido.');
    if (form.senha.length < 8) return Alert.alert('Cadastro', 'A senha precisa ter pelo menos 8 caracteres.');
    if (form.senha !== form.senha2) return Alert.alert('Cadastro', 'As senhas precisam ser idênticas.');

    try {
      setLoading(true);
      await signUpWithProfile({
        nome_completo: form.nome.trim(),
        cpf: form.cpf,
        email: form.email.trim().toLowerCase(),
        cep: form.cep,
        logradouro: form.logradouro.trim(),
        numero: form.numero.trim(),
        bairro: form.bairro.trim(),
        cidade: form.cidade.trim(),
        estado: form.estado.trim().toUpperCase(),
        senha: form.senha,
      });
      router.replace('/(auth)/confirmar-email');
    } catch (err) {
      Alert.alert('Cadastro', err instanceof Error ? err.message : 'Falha ao criar conta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>Criar conta</Text>
      <Text style={styles.subtitle}>Cadastre-se e confirme seu email para seguir ao pagamento.</Text>
      <AppInput label="Nome completo" placeholder="Seu nome" value={form.nome} onChangeText={(v) => setForm((p) => ({ ...p, nome: v }))} />
      <AppInput label="CPF" placeholder="000.000.000-00" keyboardType="numeric" value={form.cpf} onChangeText={(v) => setForm((p) => ({ ...p, cpf: maskCpf(v) }))} />
      <AppInput label="Email" placeholder="voce@email.com" keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={(v) => setForm((p) => ({ ...p, email: v }))} hint="O email será usado para enviar a confirmação antes do pagamento." />
      <AppInput label="CEP" placeholder="00000-000" keyboardType="numeric" value={form.cep} onChangeText={(v) => setForm((p) => ({ ...p, cep: maskCep(v) }))} onBlur={onCepBlur} />
      <AppInput label="Endereço" placeholder="Logradouro" value={form.logradouro} onChangeText={(v) => setForm((p) => ({ ...p, logradouro: v }))} />
      <AppInput label="Número" placeholder="Número" keyboardType="numeric" value={form.numero} onChangeText={(v) => setForm((p) => ({ ...p, numero: v }))} />
      <AppInput label="Bairro" placeholder="Bairro" value={form.bairro} onChangeText={(v) => setForm((p) => ({ ...p, bairro: v }))} />
      <AppInput label="Cidade" placeholder="Cidade" value={form.cidade} onChangeText={(v) => setForm((p) => ({ ...p, cidade: v }))} />
      <AppInput label="Estado" placeholder="UF" autoCapitalize="characters" maxLength={2} value={form.estado} onChangeText={(v) => setForm((p) => ({ ...p, estado: v }))} />
      <AppInput label="Senha" placeholder="Mínimo 8 caracteres" secureTextEntry passwordToggle value={form.senha} onChangeText={(v) => setForm((p) => ({ ...p, senha: v }))} />
      <AppInput label="Confirmar senha" placeholder="Repita a senha" secureTextEntry passwordToggle value={form.senha2} onChangeText={(v) => setForm((p) => ({ ...p, senha2: v }))} />
      <AppButton label={loading ? 'Criando conta...' : 'Continuar cadastro'} onPress={handleSubmit} disabled={loading} />
      <AppButton label="Voltar" variant="ghost" onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.muted, marginTop: 10, lineHeight: 22 },
});
