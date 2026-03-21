import { router } from 'expo-router';
import { Text, StyleSheet } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';

export default function CadastroScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Criar conta</Text>
      <Text style={styles.subtitle}>Cadastro base do SOS Vidas. Nesta etapa, a interface e o fluxo estão sendo montados antes da ligação completa das validações.</Text>
      <AppInput label="Nome completo" placeholder="Seu nome" />
      <AppInput label="CPF" placeholder="000.000.000-00" keyboardType="numeric" />
      <AppInput label="Email" placeholder="voce@email.com" keyboardType="email-address" autoCapitalize="none" />
      <AppInput label="Confirmação de email" placeholder="Repita o email" keyboardType="email-address" autoCapitalize="none" />
      <AppInput label="CEP" placeholder="00000-000" keyboardType="numeric" />
      <AppInput label="Endereço" placeholder="Logradouro" />
      <AppInput label="Número" placeholder="Número" keyboardType="numeric" />
      <AppInput label="Bairro" placeholder="Bairro" />
      <AppInput label="Cidade" placeholder="Cidade" />
      <AppInput label="Estado" placeholder="UF" autoCapitalize="characters" maxLength={2} />
      <AppInput label="Senha" placeholder="Mínimo 8 caracteres" secureTextEntry />
      <AppInput label="Confirmação de senha" placeholder="Repita a senha" secureTextEntry />
      <AppButton label="Continuar cadastro" onPress={() => router.push('/(auth)/confirmar-email')} />
      <AppButton label="Voltar" variant="ghost" onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.muted, marginTop: 10, lineHeight: 22 },
});
