import React, {useState, useCallback, useEffect, useRef} from 'react';
import {Container} from './styles';
import Map from './Map';

import QRCodeScanner from '~/components/QRCodeScanner';
import {
  listenerUserPosition,
  stopPositionListener,
  getCurrentLocation,
} from '~/utils/geolocation';
import {storeRouteInStorage} from '~/storage/routes';
import {ContainerCentered} from '~/components/GlobalStyles';
import {ActivityIndicator} from 'react-native';

export default function RecordNewRoute({navigation}) {
  const [scannerVisible, setScannerVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const route = useRef({totalStudents: 0});
  const listenerPositionId = useRef();

  useEffect(() => {
    async function initRecordRoute() {
      const location = await getCurrentLocation();

      listenerPositionId.current = await listenerUserPosition((coords) => {
        console.log('NEW LOCATION: ', coords);
        setCurrentLocation(coords);
      });
      route.current.initialPosition = location;
      route.current.initialTime = Date.now();
      setCurrentLocation(location);
    }

    navigation.addListener('didFocus', () => {
      initRecordRoute();
    });
    initRecordRoute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReadQRCode = useCallback(({data}) => {
    console.log('DATA: ', data);
    setScannerVisible(false);
    route.current.totalStudents++;
  }, []);

  const handleEndRoute = useCallback(
    async (finalPosition) => {
      console.log('FINAL: ', finalPosition);
      route.current.finalPosition = finalPosition;
      route.current.finalTime = Date.now();
      stopPositionListener(listenerPositionId.current);
      await storeRouteInStorage(route.current);
      navigation.navigate('RouteResult', {route: route.current});
    },
    [navigation],
  );

  return (
    <Container>
      <QRCodeScanner
        visible={scannerVisible}
        onReadQRCode={handleReadQRCode}
        onClose={() => setScannerVisible(false)}
      />
      {currentLocation ? (
        <Map
          location={currentLocation}
          onFinalizeRoute={handleEndRoute}
          onReadQRCode={() => setScannerVisible(true)}
        />
      ) : (
        <ContainerCentered>
          <ActivityIndicator />
        </ContainerCentered>
      )}
    </Container>
  );
}
