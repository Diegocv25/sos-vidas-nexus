import { Text, StyleSheet } from 'react-native';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';

export default function MapasScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Mapas</Text>
      <Text style={styles.text}>Tela reservada para Hospitais, UPAs 24h e Centros de Saúde. Integração com Google Places entra na etapa específica de mapas.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  text: { color: colors.muted, marginTop: 10, lineHeight: 22 },
});
