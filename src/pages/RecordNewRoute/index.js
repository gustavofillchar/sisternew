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
import {ActivityIndicator, BackHandler} from 'react-native';
import {scannerStudentQRCode, streamingRoute} from '~/services/api';
import {getNowDateFormmated} from '~/utils/date';
import {alertConfirmRouteFinal, confirmCancelRoute} from '~/components/Alerts';

export default function RecordNewRoute({navigation, route: navigationRoute}) {
  const [_, setScanning] = useState(false);
  const [scanError, setScanError] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  const scanningHolder = useRef(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      scanningHolder.current = false;
    });
  }, [navigation]);

  const route = useRef({
    ...navigationRoute.params.route,
    stops: [],
    totalStudents: 0,
  });
  const listenerPositionId = useRef();
  const streamingTimer = useRef();

  const handleBackButton = useCallback(() => {
    confirmCancelRoute(() => {
      clearInterval(streamingTimer.current);
      // handleEndRoute;
    });
    return true;
  }, []);

  useEffect(() => {
    async function initRecordRoute() {
      console.log('INIT ROUTE');

      streamingTimer.current = setInterval(async () => {
        const location = await getCurrentLocation();
        console.log('ROUTE: ', route);
        streamingRoute(route.current.id_worked_route, location);
      }, 60000);

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

    navigation.addListener('focus', () => {
      if (coordinates.length > 0) {
        initRecordRoute();
      }
    });

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    initRecordRoute();

    return () => {
      backHandler.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReadQRCode = useCallback(
    async (studentCode) => {
      setScanning(true);

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
        scanningHolder.current = false;
        setScanError(true);
      } finally {
        setScanning(false);
      }
    },
    [navigation, route],
  );

  const handleEndRoute = useCallback(
    async (finalPosition) => {
      route.current.finalPosition = finalPosition;
      route.current.finalTime = Date.now();
      clearInterval(streamingTimer.current);
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
            onReadQRCode={async (e) => {
              if (scanningHolder.current === false) {
                scanningHolder.current = true;
                handleReadQRCode(e);
                // alert('apenas 1');
              }
            }}
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
