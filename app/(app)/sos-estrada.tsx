import { Linking, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppHeader } from '@/components/AppHeader';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';

const roadsideSearches = [
  { id: 'gas', label: '⛽ Posto de gasolina', query: 'posto de gasolina' },
  { id: 'tire', label: '🛞 Borracharia', query: 'borracharia' },
  { id: 'mech-car', label: '🔧 Mecânica automotiva', query: 'mecânica automotiva' },
  { id: 'mech-bike', label: '🏍️ Mecânica de moto', query: 'mecânica de moto' },
  { id: 'auto-parts', label: '🧰 Auto peças', query: 'auto peças' },
  { id: 'tow', label: '🚚 Guincho', query: 'guincho' },
] as const;

function openMapsSearch(query: string) {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  Linking.openURL(url);
}

function dial(number: string) {
  Linking.openURL(`tel:${number}`);
}

export default function SosEstradaScreen() {
  return (
    <Screen>
      <AppHeader title="SOS Estrada" subtitle="Atalhos rápidos para suporte em estrada e serviços essenciais próximos." showBack />

      <Text style={styles.sectionTitle}>Serviços automotivos</Text>
      <View>
        {roadsideSearches.map((item) => (
          <AppButton key={item.id} label={item.label} variant="secondary" onPress={() => openMapsSearch(item.query)} />
        ))}
      </View>

      <Text style={[styles.sectionTitle, styles.spacing]}>Emergência imediata</Text>
      <AppButton label="🚑 Ligar para o SAMU (192)" onPress={() => dial('192')} />
      <AppButton label="🔥 Ligar para os Bombeiros (193)" variant="secondary" onPress={() => dial('193')} />

      <Text style={styles.note}>Os botões de serviços automotivos abrem a busca no app de mapas do seu celular para facilitar o atendimento rápido na sua localização.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: 4, marginBottom: 4 },
  spacing: { marginTop: 24 },
  note: { color: colors.muted, fontSize: 13, lineHeight: 20, marginTop: 18 },
});
