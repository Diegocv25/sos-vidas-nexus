import AsyncStorage from '@react-native-async-storage/async-storage';

const REMEMBER_EMAIL_KEY = 'sosvidas.rememberEmail';
const REMEMBER_PASSWORD_KEY = 'sosvidas.rememberPassword';
const PENDING_SIGNUP_EMAIL_KEY = 'sosvidas.pendingSignupEmail';

export async function saveRememberedCredentials(email: string, password: string) {
  await AsyncStorage.multiSet([
    [REMEMBER_EMAIL_KEY, email.trim().toLowerCase()],
    [REMEMBER_PASSWORD_KEY, password],
  ]);
}

export async function clearRememberedCredentials() {
  await AsyncStorage.multiRemove([REMEMBER_EMAIL_KEY, REMEMBER_PASSWORD_KEY]);
}

export async function getRememberedCredentials() {
  const values = await AsyncStorage.multiGet([REMEMBER_EMAIL_KEY, REMEMBER_PASSWORD_KEY]);
  const map = Object.fromEntries(values);
  return {
    email: map[REMEMBER_EMAIL_KEY] ?? '',
    password: map[REMEMBER_PASSWORD_KEY] ?? '',
  };
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
