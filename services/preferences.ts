import AsyncStorage from '@react-native-async-storage/async-storage';

const REMEMBER_KEY = 'sosvidas.rememberEmail';
const PENDING_SIGNUP_EMAIL_KEY = 'sosvidas.pendingSignupEmail';

export async function saveRememberedEmail(email: string) {
  await AsyncStorage.setItem(REMEMBER_KEY, email.trim().toLowerCase());
}

export async function clearRememberedEmail() {
  await AsyncStorage.removeItem(REMEMBER_KEY);
}

export async function getRememberedEmail() {
  return (await AsyncStorage.getItem(REMEMBER_KEY)) ?? '';
}

export async function savePendingSignupEmail(email: string) {
  await AsyncStorage.setItem(PENDING_SIGNUP_EMAIL_KEY, email.trim().toLowerCase());
}

export async function getPendingSignupEmail() {
  return (await AsyncStorage.getItem(PENDING_SIGNUP_EMAIL_KEY)) ?? '';
}

export async function clearPendingSignupEmail() {
  await AsyncStorage.removeItem(PENDING_SIGNUP_EMAIL_KEY);
}
