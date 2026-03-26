import * as Location from 'expo-location';
import { getSupabase } from '@/services/supabase';

export type PlaceResult = {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  mapsUrl: string;
  phone?: string;
};

export async function getCurrentLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') throw new Error('Permissão de localização negada.');
  const location = await Location.getCurrentPositionAsync({});
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}

export async function searchNearbyPlaces(params: { latitude: number; longitude: number; type?: string; keyword?: string; strategy?: 'nearby' | 'textsearch' }) {
  const supabase = getSupabase();
  const { data, error } = await supabase.functions.invoke('search-nearby-places', {
    body: {
      latitude: params.latitude,
      longitude: params.longitude,
      type: params.type,
      keyword: params.keyword,
      strategy: params.strategy,
    },
  });

  if (error) throw error;
  const results = (data?.results ?? []).map((item: any) => ({
    id: item.id,
    name: item.name,
    address: item.address,
    distanceKm: Number(item.distanceKm ?? 0),
    mapsUrl: item.mapsUrl,
    phone: item.phone,
  })) as PlaceResult[];

  return results.sort((a: PlaceResult, b: PlaceResult) => a.distanceKm - b.distanceKm);
}
