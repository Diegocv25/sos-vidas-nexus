import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { PlaceCard } from '@/components/PlaceCard';
import { Screen } from '@/components/Screen';
import { MAP_CATEGORIES, type MapCategory } from '@/constants/emergency';
import { colors } from '@/constants/theme';
import { getCurrentLocation, PlaceResult, searchNearbyPlaces } from '@/services/maps';

export default function MapasScreen() {
  const [loading, setLoading] = useState<string | null>(null);
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [searchText, setSearchText] = useState('');

  async function handleSearch(category: MapCategory) {
    try {
      setLoading(category.id);
      const coords = await getCurrentLocation();
      const results = await searchNearbyPlaces({
        latitude: coords.latitude,
        longitude: coords.longitude,
        type: category.type,
        keyword: category.keyword,
        strategy: category.strategy,
      });
      setPlaces(results);
      setSelectedLabel(category.label);
    } catch (err) {
      Alert.alert('Mapas', err instanceof Error ? err.message : 'Falha ao buscar locais.');
    } finally {
      setLoading(null);
    }
  }

  async function handleSearchByName() {
    if (!searchText.trim()) return Alert.alert('Mapas', 'Digite o nome do local que deseja buscar.');
    try {
      setLoading('search');
      const coords = await getCurrentLocation();
      const results = await searchNearbyPlaces({
        latitude: coords.latitude,
        longitude: coords.longitude,
        keyword: searchText.trim(),
        strategy: 'textsearch',
      });
      setPlaces(results);
      setSelectedLabel(`Busca por nome: ${searchText.trim()}`);
    } catch (err) {
      Alert.alert('Mapas', err instanceof Error ? err.message : 'Falha ao buscar locais pelo nome.');
    } finally {
      setLoading(null);
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>Mapas</Text>
      <Text style={styles.text}>Busque até 15 pontos de socorro por categoria com base na sua localização atual.</Text>
      <View style={styles.searchBox}>
        <AppInput label="Buscar por nome do local" placeholder="Ex.: São Lucas, UPA Palhoça, Hospital Regional" value={searchText} onChangeText={setSearchText} />
        <AppButton label={loading === 'search' ? 'Pesquisando...' : 'Pesquisar por nome'} onPress={handleSearchByName} disabled={Boolean(loading)} />
      </View>
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
  searchBox: { marginTop: 12 },
  actions: { marginTop: 18 },
  section: { color: colors.primarySoft, marginTop: 20, fontWeight: '800', fontSize: 16 },
});
