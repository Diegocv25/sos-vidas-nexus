import * as Location from 'expo-location';

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY ?? '';

export type PlaceResult = {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  mapsUrl: string;
};

export async function getCurrentLocation() {
  const permission = await Location.requestForegroundPermissionsAsync();
  if (permission.status !== 'granted') {
    throw new Error('Permissão de localização negada.');
  }
  const current = await Location.getCurrentPositionAsync({});
  return current.coords;
}

function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function searchNearbyPlaces(params: { latitude: number; longitude: number; type?: string; keyword?: string }) {
  if (!apiKey) throw new Error('Google Places API ainda não configurada no ambiente.');

  const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
  url.searchParams.set('location', `${params.latitude},${params.longitude}`);
  url.searchParams.set('rankby', 'distance');
  url.searchParams.set('key', apiKey);
  if (params.type) url.searchParams.set('type', params.type);
  if (params.keyword) url.searchParams.set('keyword', params.keyword);

  const resp = await fetch(url.toString());
  if (!resp.ok) throw new Error('Falha ao consultar Google Places.');
  const data = await resp.json();
  const results = (data.results ?? []).slice(0, 10).map((item: any) => {
    const lat = item.geometry?.location?.lat ?? params.latitude;
    const lng = item.geometry?.location?.lng ?? params.longitude;
    return {
      id: item.place_id,
      name: item.name,
      address: item.vicinity ?? item.formatted_address ?? 'Endereço não disponível',
      distanceKm: Number(distanceKm(params.latitude, params.longitude, lat, lng).toFixed(1)),
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + (item.vicinity ?? ''))}`,
    } as PlaceResult;
  });

  return results.sort((a: PlaceResult, b: PlaceResult) => a.distanceKm - b.distanceKm);
}
