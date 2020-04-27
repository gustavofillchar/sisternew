import getDirections from 'react-native-google-maps-directions';

export function navigateInGoogleMaps(initialPosition, finalPosition) {
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
        value: 'driving', // may be "walking", "bicycling" or "transit" as well
      },
      {
        key: 'dir_action',
        value: 'navigate', // this instantly initializes navigation using the given travel mode
      },
    ],
  };

  getDirections(data);
}
