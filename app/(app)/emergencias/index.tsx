import { Text, StyleSheet } from 'react-native';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';

export default function EmergenciasScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Emergências</Text>
      <Text style={styles.text}>Tela reservada para a lista oficial de números com discagem nativa. Estrutura visual será refinada na etapa do módulo.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  text: { color: colors.muted, marginTop: 10, lineHeight: 22 },
});
