import { router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppHeader } from '@/components/AppHeader';
import { SectionCard } from '@/components/SectionCard';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';

export default function MaisScreen() {
  return (
    <Screen>
      <AppHeader title="Mais opções" subtitle="Acesso rápido às telas institucionais e auxiliares do app." />

      <SectionCard title="Institucional">
        <Text style={styles.text}>Acesse informações sobre o aplicativo, privacidade, avisos e ajuda rápida.</Text>
        <AppButton label="Sobre o app" onPress={() => router.push('/(app)/sobre')} />
        <AppButton label="Privacidade" variant="secondary" onPress={() => router.push('/(app)/privacidade')} />
        <AppButton label="Termos e avisos" variant="secondary" onPress={() => router.push('/(app)/termos')} />
        <AppButton label="Ajuda rápida" variant="secondary" onPress={() => router.push('/(app)/ajuda')} />
        <AppButton label="Status do app" variant="secondary" onPress={() => router.push('/(app)/status-app')} />
        <AppButton label="Release / versão" variant="secondary" onPress={() => router.push('/(app)/release')} />
      </SectionCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: { color: colors.text, lineHeight: 22 },
});
