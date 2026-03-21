import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { PlaceCard } from '@/components/PlaceCard';
import { Screen } from '@/components/Screen';
import { MAP_CATEGORIES } from '@/constants/emergency';
import { colors } from '@/constants/theme';
import { getCurrentLocation, PlaceResult, searchNearbyPlaces } from '@/services/maps';

export default function MapasScreen() {
  const [loading, setLoading] = useState<string | null>(null);
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string>('');

  async function handleSearch(category: (typeof MAP_CATEGORIES)[number]) {
    try {
      setLoading(category.id);
      const coords = await getCurrentLocation();
      const results = await searchNearbyPlaces({
        latitude: coords.latitude,
        longitude: coords.longitude,
        type: category.type,
        keyword: category.keyword,
      });
      setPlaces(results);
      setSelectedLabel(category.label);
    } catch (err) {
      Alert.alert('Mapas', err instanceof Error ? err.message : 'Falha ao buscar locais.');
    } finally {
      setLoading(null);
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>Mapas</Text>
      <Text style={styles.text}>Busque os 10 pontos de socorro mais próximos por categoria.</Text>
      <View style={styles.actions}>
        {MAP_CATEGORIES.map((category) => (
          <AppButton
            key={category.id}
            label={loading === category.id ? `Buscando ${category.label}...` : category.label}
            variant="secondary"
            onPress={() => handleSearch(category)}
            disabled={Boolean(loading)}
          />
        ))}
      </View>
      {selectedLabel ? <Text style={styles.section}>Resultados: {selectedLabel}</Text> : null}
      {places.map((place) => (
        <PlaceCard key={place.id} name={place.name} address={place.address} distanceKm={place.distanceKm} mapsUrl={place.mapsUrl} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  text: { color: colors.muted, marginTop: 10, lineHeight: 22 },
  actions: { marginTop: 18 },
  section: { color: colors.primarySoft, marginTop: 20, fontWeight: '800', fontSize: 16 },
});
