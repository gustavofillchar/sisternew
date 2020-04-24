import Geolocation from '@react-native-community/geolocation';

export async function getCurrentLocation() {
  const geolocationPromise = new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(position => {
      const location = {latitude: position.coords.latitude, longitude: position.coords.longitude};
      resolve(location);
    });
  });
  return geolocationPromise;
}

export async function listenerUserPosition(callback) {
  const watchId = Geolocation.watchPosition(
    position => {
      callback({latitude: position.coords.latitude, longitude: position.coords.longitude});
    },
    error => {
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
