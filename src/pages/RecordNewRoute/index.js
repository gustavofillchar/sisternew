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
import {scannerStudentQRCode} from '~/services/api';
import {getNowDateFormmated} from '~/utils/date';
import {alertConfirmRouteFinal} from '~/components/Alerts';

export default function RecordNewRoute({navigation}) {
  const [_, setScanning] = useState(false);
  const [scanError, setScanError] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  const scanningHolder = useRef(false);

  const route = useRef({
    ...navigation.getParam('route'),
    stops: [],
    totalStudents: 0,
  });
  const listenerPositionId = useRef();

  useEffect(() => {
    async function initRecordRoute() {
      console.log('INIT ROUTE');

      const location = await getCurrentLocation();
      setCoordinates([location]);
      listenerPositionId.current = await listenerUserPosition((coords) => {
        console.log('NEW POSITION: ', coords);
        setCoordinates((prev) => [...prev, coords]);
        setCurrentLocation(coords);
      });
      route.current.initialPosition = location;
      route.current.initialTime = Date.now();
      setCurrentLocation(location);
    }

    navigation.addListener('didFocus', () => {
      if (coordinates.length > 0) {
        initRecordRoute();
      }
    });
    initRecordRoute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReadQRCode = useCallback(
    async (studentCode) => {
      setScanning(true);
      scanningHolder.current = true;
      setScanError(false);
      try {
        const coords = await getCurrentLocation();
        const studentData = await scannerStudentQRCode(
          route.current.id_worked_route,
          studentCode,
          coords.latitude,
          coords.longitude,
          getNowDateFormmated(),
        );
        route.current.totalStudents++;
        route.current.stops.push(coords);
        navigation.navigate('StudentID', {student: studentData.pupil});
      } catch (error) {
        console.warn(error);
        setScanError(true);
      } finally {
        scanningHolder.current = false;
        setScanning(false);
      }
    },
    [navigation, route],
  );

  const handleEndRoute = useCallback(
    async (finalPosition) => {
      console.log('FINAL: ', finalPosition);
      route.current.finalPosition = finalPosition;
      route.current.finalTime = Date.now();
      stopPositionListener(listenerPositionId.current);
      setCoordinates([]);
      await storeRouteInStorage(route.current);
      navigation.navigate('RouteResult', {route: route.current});
    },
    [navigation, route],
  );

  return (
    <Container>
      {currentLocation ? (
        <>
          <Map
            location={currentLocation}
            onFinalizeRoute={(finalPosition) => {
              alertConfirmRouteFinal(() => handleEndRoute(finalPosition));
            }}
            coordinates={coordinates}
            // onReadQRCode={() => setScannerVisible(true)}
          />
          <QRCodeScanner
            onReadQRCode={handleReadQRCode}
            scanning={scanningHolder.current}
            error={scanError}
          />
        </>
      ) : (
        <ContainerCentered>
          <ActivityIndicator size={30} color="#C10C19" />
        </ContainerCentered>
      )}
    </Container>
  );
}
