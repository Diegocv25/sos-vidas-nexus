import AsyncStorage from '@react-native-async-storage/async-storage';

const REMEMBER_KEY = 'sosvidas.rememberEmail';

export async function saveRememberedEmail(email: string) {
  await AsyncStorage.setItem(REMEMBER_KEY, email.trim().toLowerCase());
}

export async function clearRememberedEmail() {
  await AsyncStorage.removeItem(REMEMBER_KEY);
}

export async function getRememberedEmail() {
  return (await AsyncStorage.getItem(REMEMBER_KEY)) ?? '';
}
