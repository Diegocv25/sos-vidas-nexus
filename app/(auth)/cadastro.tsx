import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppHeader } from '@/components/AppHeader';
import { AppInput } from '@/components/AppInput';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { signUpWithProfile } from '@/services/auth';
import { savePendingSignupEmail } from '@/services/preferences';
import { fetchAddressByCep } from '@/services/viacep';
import { isValidCep, isValidCpf, maskCep, maskCpf } from '@/services/validators';

export default function CadastroScreen() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: '', cpf: '', email: '', cep: '', logradouro: '', numero: '', bairro: '', cidade: '', estado: '', senha: '', senha2: '',
  });

  function requiredMessage(label: string) {
    return `${label} está vazio ou incorreto.`;
  }

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
    if (!form.nome.trim()) return Alert.alert('Cadastro', requiredMessage('Nome completo'));
    if (!form.cpf.trim() || !isValidCpf(form.cpf)) return Alert.alert('Cadastro', requiredMessage('CPF'));
    if (!form.email.trim() || !form.email.includes('@')) return Alert.alert('Cadastro', requiredMessage('Email'));
    if (!form.cep.trim() || !isValidCep(form.cep)) return Alert.alert('Cadastro', requiredMessage('CEP'));
    if (!form.logradouro.trim()) return Alert.alert('Cadastro', requiredMessage('Endereço'));
    if (!form.numero.trim()) return Alert.alert('Cadastro', requiredMessage('Número'));
    if (!form.bairro.trim()) return Alert.alert('Cadastro', requiredMessage('Bairro'));
    if (!form.cidade.trim()) return Alert.alert('Cadastro', requiredMessage('Cidade'));
    if (!form.estado.trim() || form.estado.trim().length !== 2) return Alert.alert('Cadastro', requiredMessage('Estado'));
    if (!form.senha) return Alert.alert('Cadastro', requiredMessage('Senha'));
    if (form.senha.length < 8) return Alert.alert('Cadastro', 'Senha está vazia ou incorreta.');
    if (!form.senha2) return Alert.alert('Cadastro', requiredMessage('Confirmar senha'));
    if (form.senha !== form.senha2) return Alert.alert('Cadastro', 'Confirmar senha está vazio ou incorreto.');

    try {
      setLoading(true);
      const normalizedEmail = form.email.trim().toLowerCase();
      await signUpWithProfile({
        nome_completo: form.nome.trim(),
        cpf: form.cpf,
        email: normalizedEmail,
        cep: form.cep,
        logradouro: form.logradouro.trim(),
        numero: form.numero.trim(),
        bairro: form.bairro.trim(),
        cidade: form.cidade.trim(),
        estado: form.estado.trim().toUpperCase(),
        senha: form.senha,
      });
      await savePendingSignupEmail(normalizedEmail);
      router.replace('/confirmar-email');
    } catch (err) {
      Alert.alert('Cadastro', err instanceof Error ? err.message : 'Falha ao criar conta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <AppHeader title="Criar conta" subtitle="Cadastre-se e confirme seu email para seguir ao pagamento." showBack />
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

      <View style={styles.footerGap} />
      <Text style={styles.footerNote}>Todos os campos devem ser preenchidos corretamente para continuar o cadastro e receber a confirmação por email.</Text>
      <AppButton label={loading ? 'Confirmando cadastro...' : 'Confirmar cadastro'} onPress={handleSubmit} disabled={loading} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  footerGap: { height: 28 },
  footerNote: { color: colors.muted, fontSize: 13, lineHeight: 20, marginBottom: 12 },
});

