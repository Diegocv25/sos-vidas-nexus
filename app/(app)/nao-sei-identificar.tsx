import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';

function ContactCard({ title, number, desc, emoji }: { title: string; number: string; desc: string; emoji: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{emoji} {title} — {number}</Text>
      <Text style={styles.cardDesc}>{desc}</Text>
      <Pressable style={({ pressed }) => [styles.button, pressed && { opacity: 0.88 }]} onPress={() => Linking.openURL(`tel:${number}`)}>
        <Text style={styles.buttonText}>📞 Ligar agora</Text>
      </Pressable>
    </View>
  );
}

export default function NaoSeiIdentificarScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Não sei identificar</Text>
      <Text style={styles.subtitle}>
        Se você não tem certeza do que está acontecendo, use os números abaixo conforme o tipo de emergência.
      </Text>

      <ContactCard
        emoji="🚑"
        title="SAMU"
        number="192"
        desc="Urgências clínicas e emergências em saúde: suspeita de AVC, infarto, convulsão, desmaio, dificuldade respiratória, intoxicação, mal súbito e outras situações clínicas graves."
      />

      <ContactCard
        emoji="🔥"
        title="Bombeiros"
        number="193"
        desc="Resgate e salvamento: afogamento, incêndio, acidentes com risco físico/ambiental, salvamentos e situações em que a resposta é mais de resgate do que clínica."
      />

      <View style={styles.note}>
        <Text style={styles.noteText}>
          Este app funciona como atalho para orientação e encaminhamento oficial. Em caso de dúvida, priorize o serviço de emergência.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.muted, marginTop: 10, lineHeight: 22 },
  card: { marginTop: 18, borderRadius: 18, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, padding: 16 },
  cardTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  cardDesc: { color: colors.muted, marginTop: 10, lineHeight: 22 },
  button: { minHeight: 52, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginTop: 14 },
  buttonText: { color: colors.text, fontWeight: '800' },
  note: { marginTop: 20, borderRadius: 16, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.cardAlt, padding: 14 },
  noteText: { color: colors.text, lineHeight: 20 },
});
