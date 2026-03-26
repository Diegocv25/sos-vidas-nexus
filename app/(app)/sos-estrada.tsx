import { useEffect, useState } from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppButton } from '@/components/AppButton';
import { AppHeader } from '@/components/AppHeader';
import { AppInput } from '@/components/AppInput';
import { InsuranceCard } from '@/components/InsuranceCard';
import { PlaceCard } from '@/components/PlaceCard';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { getCurrentLocation, PlaceResult, searchNearbyPlaces } from '@/services/maps';
import { getInsuranceContact, saveInsuranceContact, type InsuranceContact } from '@/services/preferences';

const roadsideCategories = [
  { id: 'gas', label: '⛽ Posto de gasolina', keyword: 'posto de gasolina' },
  { id: 'tire', label: '🔧 Borracharia', keyword: 'borracharia' },
  { id: 'mech-car', label: '🚗 Mecânica automotiva', keyword: 'mecânica automotiva' },
  { id: 'mech-bike', label: '🏍️ Mecânica de moto', keyword: 'mecânica de moto' },
  { id: 'toll', label: '🛣️ Pedágios', keyword: 'pedágios' },
  { id: 'tow', label: '🚚 Guincho', keyword: 'guincho' },
] as const;

function dial(number: string) {
  Linking.openURL(`tel:${number}`);
}

export default function SosEstradaScreen() {
  const [loading, setLoading] = useState<string | null>(null);
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [selectedLabel, setSelectedLabel] = useState('');
  const [showInsuranceForm, setShowInsuranceForm] = useState(false);
  const [insuranceName, setInsuranceName] = useState('');
  const [insurancePhone, setInsurancePhone] = useState('');
  const [insuranceContact, setInsuranceContact] = useState<InsuranceContact | null>(null);

  useEffect(() => {
    getInsuranceContact().then(setInsuranceContact).catch(() => setInsuranceContact(null));
  }, []);

  async function handleSearch(item: (typeof roadsideCategories)[number]) {
    try {
      setLoading(item.id);
      const coords = await getCurrentLocation();
      const results = await searchNearbyPlaces({
        latitude: coords.latitude,
        longitude: coords.longitude,
        keyword: item.keyword,
        strategy: 'textsearch',
      });
      setPlaces(results);
      setSelectedLabel(item.label);
    } catch (err) {
      Alert.alert('SOS Estrada', err instanceof Error ? err.message : 'Falha ao buscar serviços.');
    } finally {
      setLoading(null);
    }
  }

  async function handleSaveInsurance() {
    if (!insuranceName.trim() || !insurancePhone.trim()) {
      return Alert.alert('Seguro', 'Preencha nome e número do seguro.');
    }

    const next = { name: insuranceName.trim(), phone: insurancePhone.trim() };
    await saveInsuranceContact(next);
    setInsuranceContact(next);
    setInsuranceName('');
    setInsurancePhone('');
    setShowInsuranceForm(false);
  }

  async function handleDeleteInsurance() {
    await AsyncStorage.removeItem('sosvidas.insuranceContact');
    setInsuranceContact(null);
  }

  return (
    <Screen>
      <AppHeader title="SOS Estrada" subtitle="Serviços automotivos próximos e emergência imediata na estrada." showBack />

      <Text style={styles.sectionTitle}>Serviços automotivos</Text>
      <View>
        {roadsideCategories.map((item) => (
          <AppButton key={item.id} label={loading === item.id ? 'Buscando...' : item.label} variant="secondary" onPress={() => handleSearch(item)} disabled={Boolean(loading)} />
        ))}
      </View>

      <Text style={[styles.sectionTitle, styles.spacing]}>Seguro</Text>
      <Text style={styles.helperText}>Cadastre o telefone do seu seguro para deixar esse contato fixo e acessível com rapidez.</Text>
      <AppButton label={showInsuranceForm ? 'Fechar cadastro do seguro' : 'Registrar seguro'} variant="secondary" onPress={() => setShowInsuranceForm((v) => !v)} />
      {showInsuranceForm ? (
        <View>
          <AppInput label="Nome" value={insuranceName} onChangeText={setInsuranceName} placeholder="Ex.: Porto Seguro" />
          <AppInput label="Número" value={insurancePhone} onChangeText={setInsurancePhone} placeholder="Ex.: 0800 000 0000" keyboardType="phone-pad" />
          <AppButton label="Concluir" variant="secondary" onPress={handleSaveInsurance} />
        </View>
      ) : null}
      {insuranceContact ? <InsuranceCard name={insuranceContact.name} phone={insuranceContact.phone} onDelete={handleDeleteInsurance} /> : null}

      <Text style={[styles.sectionTitle, styles.spacing]}>Emergência imediata</Text>
      <AppButton label="🚑 Ligar para o SAMU (192)" onPress={() => dial('192')} />
      <AppButton label="🔥 Ligar para os Bombeiros (193)" variant="secondary" onPress={() => dial('193')} />
      <AppButton label="🚓 Ligar para a PRF (191)" variant="secondary" onPress={() => dial('191')} />
      <AppButton label="🛣️ Ligar para a Polícia Rodoviária Estadual (198)" variant="secondary" onPress={() => dial('198')} />

      {selectedLabel ? <Text style={styles.resultsTitle}>Resultados: {selectedLabel}</Text> : null}
      {places.map((place) => (
        <PlaceCard key={place.id} name={place.name} address={place.address} distanceKm={place.distanceKm} mapsUrl={place.mapsUrl} phone={place.phone} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: 4, marginBottom: 4 },
  spacing: { marginTop: 24 },
  helperText: { color: colors.muted, lineHeight: 20, marginBottom: 4 },
  resultsTitle: { color: colors.primarySoft, marginTop: 20, fontWeight: '800', fontSize: 16 },
});
