import AsyncStorage from '@react-native-community/async-storage';

export async function storeTokenInStorage(token) {
  await AsyncStorage.setItem('token', token);
}

export async function getTokenFromStorage() {
  const token = await AsyncStorage.getItem('token');
  return token;
}
