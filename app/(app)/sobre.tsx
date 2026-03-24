import { router } from 'expo-router';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppHeader } from '@/components/AppHeader';
import { Screen } from '@/components/Screen';
import { APP_NAME, APP_SUPPORT_TEXT, EMERGENCY_DISCLAIMER } from '@/constants/app';
import { colors } from '@/constants/theme';

export default function SobreScreen() {
  return (
    <Screen>
      <AppHeader title="Sobre o app" subtitle={APP_SUPPORT_TEXT} />

      <View style={styles.card}>
        <Text style={styles.blockTitle}>{APP_NAME}</Text>
        <Text style={styles.text}>Este aplicativo foi estruturado para facilitar o acesso a conteúdos oficiais de primeiros socorros, números de emergência e caminhos rápidos para ajuda.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.blockTitle}>Responsabilidade</Text>
        <Text style={styles.text}>{EMERGENCY_DISCLAIMER}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.blockTitle}>Nexus Automação</Text>
        <Text style={styles.text}>A Nexus Automação é uma empresa focada em automação e soluções digitais. O SOS Vidas faz parte dessa iniciativa para facilitar acesso rápido a ajuda oficial em situações de emergência.</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('https://www.instagram.com/nexus.automacao.saas')}>Instagram: @nexus.automacao.saas</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.blockTitle}>Política de privacidade</Text>
        <Text style={styles.text}>Antes da publicação final, esta tela poderá apontar para a política oficial hospedada no domínio definitivo do projeto.</Text>
      </View>

      <AppButton label="Ver privacidade" variant="secondary" onPress={() => router.push('/(app)/privacidade')} />
      <AppButton label="Ajuda rápida" variant="secondary" onPress={() => router.push('/(app)/ajuda')} />
      <AppButton label="Termos e avisos" variant="secondary" onPress={() => router.push('/(app)/termos')} />
      <AppButton label="Abrir site do Ministério da Saúde" variant="secondary" onPress={() => Linking.openURL('https://www.gov.br/saude/pt-br')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 16, borderRadius: 18, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, padding: 16 },
  blockTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  text: { color: colors.text, marginTop: 10, lineHeight: 22 },
  link: { color: colors.primarySoft, marginTop: 12, fontWeight: '700' },
});
