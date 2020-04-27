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

  const route = useRef({amountStudents: 0});
  const listenerPositionId = useRef();

  useEffect(() => {
    async function initRecordRoute() {
      listenerPositionId.current = listenerUserPosition((location) => {
        setCurrentLocation(location);
      });

      const location = await getCurrentLocation();
      route.current.initialPosition = location;
      setCurrentLocation(location);
    }
    initRecordRoute();
  }, []);

  const handleReadQRCode = useCallback(({data}) => {
    console.log('DATA: ', data);
    setScannerVisible(false);
    route.current.amountStudents++;
  }, []);

  const handleEndRoute = useCallback(
    async (finalPosition) => {
      console.log('FINAL: ', finalPosition);
      route.current.finalPosition = finalPosition;
      stopPositionListener(listenerPositionId.current);
      await storeRouteInStorage(route.current);
      navigation.navigate('Main');
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
