import { StyleSheet, Text } from 'react-native';
import { EmergencyCard } from '@/components/EmergencyCard';
import { Screen } from '@/components/Screen';
import { EMERGENCY_DISCLAIMER } from '@/constants/app';
import { EMERGENCY_CONTACTS } from '@/constants/emergency';
import { colors } from '@/constants/theme';

export default function EmergenciasScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Números de Emergência</Text>
      <Text style={styles.text}>Acesso rápido aos principais serviços de emergência do Brasil com discagem nativa, incluindo rodovias federal e estadual.</Text>
      {EMERGENCY_CONTACTS.map((item) => (
        <EmergencyCard key={item.id} emoji={item.emoji} name={item.name} number={item.number} displayNumber={item.displayNumber} />
      ))}
      <Text style={styles.disclaimer}>{EMERGENCY_DISCLAIMER}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  text: { color: colors.muted, marginTop: 10, lineHeight: 22 },
  disclaimer: { color: colors.muted, marginTop: 20, fontSize: 12, lineHeight: 18 },
});
