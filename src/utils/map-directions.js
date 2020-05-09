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
