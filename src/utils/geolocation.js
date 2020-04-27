import Geolocation from '@react-native-community/geolocation';

export function distaceBetweenTwoPoints(initialPoint, finalPoint) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const R = 6371;
  const dLat = deg2rad(finalPoint.latitude - initialPoint.latitude);
  const dLon = deg2rad(finalPoint.longitude - initialPoint.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(initialPoint.latitude)) *
      Math.cos(deg2rad(finalPoint.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

export async function getCurrentLocation() {
  const geolocationPromise = new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition((position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      resolve(location);
    });
  });
  return geolocationPromise;
}

export async function listenerUserPosition(callback) {
  const watchId = Geolocation.watchPosition(
    (position) => {
      callback({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    (error) => {
      console.warn(error);
    },
    {
      useSignificantChanges: true,
      enableHighAccuracy: true,
    },
  );
  return watchId;
}

export function stopPositionListener(watchId) {
  Geolocation.clearWatch(watchId);
}
