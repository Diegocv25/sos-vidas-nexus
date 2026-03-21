import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { Screen } from '@/components/Screen';
import { APP_NAME } from '@/constants/app';
import { colors } from '@/constants/theme';

export default function SplashScreen() {
  return (
    <Screen style={styles.container}>
      <View style={styles.logoWrap}>
        <Text style={styles.logo}>🚨</Text>
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.subtitle}>Primeiros socorros, emergências e acesso rápido à ajuda oficial.</Text>
      </View>

      <View>
        <AppButton label="Criar conta" onPress={() => router.push('/(auth)/cadastro')} />
        <AppButton label="Já tenho conta — Entrar" variant="secondary" onPress={() => router.push('/(auth)/login')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'space-between', paddingTop: 48, paddingBottom: 36 },
  logoWrap: { gap: 16 },
  logo: { fontSize: 54 },
  title: { color: colors.text, fontSize: 30, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 16, lineHeight: 24 },
});
