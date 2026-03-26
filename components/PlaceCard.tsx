import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

type Props = { name: string; address: string; distanceKm: number; mapsUrl: string };

export function PlaceCard({ name, address, distanceKm, mapsUrl }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.address}>{address}</Text>
      <Text style={styles.distance}>{distanceKm.toFixed(1)} km</Text>
      <Pressable style={({ pressed }) => [styles.button, pressed && { opacity: 0.88 }]} onPress={() => Linking.openURL(mapsUrl)}>
        <Text style={styles.buttonText}>📍 Ver no mapa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 14, borderRadius: 18, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, padding: 16 },
  name: { color: colors.text, fontSize: 17, fontWeight: '700' },
  address: { color: colors.muted, marginTop: 8, lineHeight: 20 },
  distance: { color: colors.primarySoft, marginTop: 10, fontWeight: '700' },
  phone: { color: colors.text, marginTop: 8, fontWeight: '600' },
  button: { minHeight: 52, borderRadius: 14, backgroundColor: colors.cardAlt, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginTop: 14 },
  buttonText: { color: colors.text, fontSize: 15, fontWeight: '800' },
  secondaryButton: { minHeight: 48, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  secondaryButtonText: { color: colors.text, fontSize: 15, fontWeight: '800' },
});
 { color: colors.text, fontSize: 15, fontWeight: '800' },
});
