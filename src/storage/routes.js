import AsyncStorage from '@react-native-community/async-storage';

export async function getRoutesFromStorage() {
  const routes = JSON.parse(await AsyncStorage.getItem('routes')) || [];
  return Object.values(routes);
}

export async function storeRouteInStorage(route) {
  const previousRoutes = JSON.parse(await AsyncStorage.getItem('routes')) || {};
  previousRoutes[route.id.toString()] = route;
  await AsyncStorage.setItem('routes', JSON.stringify(previousRoutes));
}

export async function getEspecificRouteFromStorage(routeId) {
  const routes = JSON.parse(await AsyncStorage.getItem('routes')) || {};
  return routes[routeId.toString()];
}
