import AsyncStorage from '@react-native-community/async-storage';

export async function storeTokenInStorage(token) {
  await AsyncStorage.setItem('token', token);
}

export async function storeDateLoginInStorage() {
  await AsyncStorage.setItem('date-login', Date.now().toString());
}

export async function getDateLoginFromStorage() {
  const date = await AsyncStorage.getItem('date-login');
  return date ? parseInt(date, 10) : null;
}

export async function getTokenFromStorage() {
  const token = await AsyncStorage.getItem('token');
  return token;
}

export async function destroyToken() {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('date-login');
}
