import AsyncStorage from '@react-native-community/async-storage';

export async function storeUserDataInStorage(userData) {
  await AsyncStorage.setItem('user-data', JSON.stringify(userData));
}

export async function getUserDataFromStorage() {
  const userData = JSON.parse(await AsyncStorage.getItem('user-data')) || undefined;
  return userData;
}
