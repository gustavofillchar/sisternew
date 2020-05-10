import getDirections from 'react-native-google-maps-directions';

export function navigateInGoogleMaps(
  initialPosition,
  finalPosition,
  stops = [],
) {
  console.log(stops);
  const data = {
    source: {
      ...initialPosition,
    },
    destination: {
      ...finalPosition,
    },
    params: [
      {
        key: 'travelmode',
        value: 'driving',
      },
      {
        key: 'dir_action',
        value: 'navigate',
      },
    ],
    waypoints: stops,
  };

  getDirections(data);
}

export function getGoogleMapsURL(initialPosition, finalPosition, stops = []) {
  return `https://www.google.com/maps/dir/?api=1&origin=${initialPosition.latitude},${initialPosition.longitude}&destination=${finalPosition.latitude},${finalPosition.longitude}&travelmode=driving&dir_action=navigate`;
}
