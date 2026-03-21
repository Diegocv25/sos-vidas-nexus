import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';

export default function LoginScreen() {
  const [remember, setRemember] = useState(true);

  return (
    <Screen>
      <Text style={styles.title}>Entrar</Text>
      <Text style={styles.subtitle}>Acesso ao SOS Vidas após email confirmado e assinatura ativa.</Text>

      <AppInput label="Email" placeholder="voce@email.com" keyboardType="email-address" autoCapitalize="none" />
      <AppInput label="Senha" placeholder="Sua senha" secureTextEntry />

      <Pressable style={styles.rememberRow} onPress={() => setRemember((v) => !v)}>
        <View style={[styles.checkbox, remember && styles.checkboxOn]} />
        <Text style={styles.rememberText}>Lembrar minha senha (auto complete / sugestão facilitada)</Text>
      </Pressable>

      <AppButton label="Entrar" onPress={() => router.replace('/(app)')} />
      <AppButton label="Esqueci minha senha" variant="ghost" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.muted, marginTop: 10, lineHeight: 22 },
  rememberRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 18 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  checkboxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  rememberText: { color: colors.text, flex: 1, lineHeight: 20 },
});
