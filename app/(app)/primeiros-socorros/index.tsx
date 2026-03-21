import { Text, StyleSheet } from 'react-native';
import { Screen } from '@/components/Screen';
import { EMERGENCY_DISCLAIMER } from '@/constants/app';
import { colors } from '@/constants/theme';

export default function PrimeirosSocorrosScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Primeiros Socorros</Text>
      <Text style={styles.text}>Tela reservada para o modo por categorias e para a busca semântica/RAG. A categoria “Outros” continua pendente de pesquisa do conteúdo oficial.</Text>
      <Text style={styles.disclaimer}>{EMERGENCY_DISCLAIMER}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  text: { color: colors.muted, marginTop: 10, lineHeight: 22 },
  disclaimer: { color: colors.muted, marginTop: 18, fontSize: 12, lineHeight: 18 },
});
