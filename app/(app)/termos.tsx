import { StyleSheet, Text } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { SectionCard } from '@/components/SectionCard';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';

export default function TermosScreen() {
  return (
    <Screen>
      <AppHeader title="Termos e avisos" subtitle="Resumo institucional do uso do SOS Vidas." />

      <SectionCard title="Finalidade do aplicativo">
        <Text style={styles.text}>O SOS Vidas organiza conteúdos oficiais, números de emergência e atalhos para atendimento. Ele não substitui serviço médico, diagnóstico, prescrição ou avaliação profissional.</Text>
      </SectionCard>

      <SectionCard title="Uso do conteúdo">
        <Text style={styles.text}>As fichas do aplicativo são estruturadas a partir de fontes públicas/oficiais. O app apresenta o conteúdo com atribuição explícita de origem e preserva os links das fontes utilizadas.</Text>
      </SectionCard>

      <SectionCard title="Emergência real">
        <Text style={styles.text}>Em caso de risco imediato, piora rápida do quadro ou dúvida sobre a gravidade, priorize o acionamento do 192 (SAMU) ou 193 (Bombeiros), conforme a situação.</Text>
      </SectionCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: { color: colors.text, lineHeight: 22 },
});
