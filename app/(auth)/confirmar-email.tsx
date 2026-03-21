import { router } from 'expo-router';
import { Text, StyleSheet, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';

export default function ConfirmarEmailScreen() {
  return (
    <Screen style={styles.container}>
      <View>
        <Text style={styles.title}>Confirme seu email</Text>
        <Text style={styles.subtitle}>Enviamos um email de confirmação. Após confirmar, você segue obrigatoriamente para o pagamento.</Text>
      </View>
      <View>
        <AppButton label="Reenviar email de confirmação" variant="secondary" />
        <AppButton label="Já confirmei — Continuar" onPress={() => router.push('/(auth)/pagamento')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'space-between', paddingTop: 48, paddingBottom: 36 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.muted, marginTop: 10, lineHeight: 22 },
});
