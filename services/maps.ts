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
