import React, {useState, useCallback, useEffect, useRef} from 'react';
import {Container, Info} from './styles';
import Map from './Map';

import QRCodeScanner from '~/components/QRCodeScanner';
import {
  listenerUserPosition,
  stopPositionListener,
  getCurrentLocation,
} from '~/utils/geolocation';
import {storeRouteInStorage} from '~/storage/routes';
import {ContainerCentered} from '~/components/GlobalStyles';
import {ActivityIndicator, BackHandler, Alert} from 'react-native';
import {scannerStudentQRCode, streamingRoute} from '~/services/api';
import {getNowDateFormmated} from '~/utils/date';
import {alertConfirmRouteFinal, confirmCancelRoute} from '~/components/Alerts';
import {useNetInfo} from '@react-native-community/netinfo';

export default function RecordNewRoute({navigation, route: navigationRoute}) {
  const [_, setScanning] = useState(false);
  const [scanError, setScanError] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [offlineReadStudent, setOfflineReadStudent] = useState([]);
  const scanningHolder = useRef(false);

  const synchronized = useRef(false);

  const netInfo = useNetInfo();
  const isOffline = useRef(false);
  isOffline.current = netInfo.isConnected;
  useEffect(() => {
    console.log('status: ', isOffline.current);
    console.log('students: ', offlineReadStudent);
  }, [netInfo, offlineReadStudent]);

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

  const handleSynchronizeStudent = useCallback(
    async (studentCode) => {
      if (!route.current.stops) {
        route.current.stops = [];
      }

      setScanError(false);
      setScanning(true);
      try {
        const coords = await getCurrentLocation();
        await scannerStudentQRCode(
          route.current.id_worked_route,
          studentCode,
          coords.latitude,
          coords.longitude,
          getNowDateFormmated(),
        );
        route.current.totalStudents++;
        route.current.stops.push(coords);
      } catch (error) {
        console.warn(error);
        setScanError(true);
      } finally {
        setScanning(false);
      }
    },
    [route],
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
              if (isOffline.current) {
                if (offlineReadStudent.length > 0 && !synchronized.current) {
                  offlineReadStudent.map((item, index) => {
                    handleSynchronizeStudent(item.student);
                    console.log(index);

                    if (offlineReadStudent.length === index + 1) {
                      console.log('chegou no ultimo');
                      synchronized.current = true;
                      alertConfirmRouteFinal(() =>
                        handleEndRoute(finalPosition),
                      );
                      setOfflineReadStudent([]);
                    }
                  });
                } else {
                  alertConfirmRouteFinal(() => handleEndRoute(finalPosition));
                }
              } else {
                Alert.alert(
                  'Atenção',
                  'Você está desconectado. Para finalizar a rota você deve estar conectado com a internet.',
                );
              }
            }}
            coordinates={coordinates}
            // onReadQRCode={() => setScannerVisible(true)}
          />
          <QRCodeScanner
            onReadQRCode={async (e) => {
              if (isOffline.current) {
                if (scanningHolder.current === false) {
                  scanningHolder.current = true;
                  handleReadQRCode(e);
                }
              } else {
                if (scanningHolder.current === false) {
                  scanningHolder.current = true;
                  Alert.alert(
                    'LEITURA OFFLINE REALIZADA COM SUCESSO',
                    `Os dados serão transmitidos com restabelecimento do sinal.\n\nCódigo do aluno: ${e}`,
                    [
                      {
                        text: 'Ok',
                        onPress: async () => {
                          scanningHolder.current = false;

                          setOfflineReadStudent([
                            ...offlineReadStudent,
                            {student: e},
                          ]);
                        },
                      },
                    ],
                  );
                }
              }
            }}
            scanning={scanningHolder.current}
            error={scanError}
          />
          <Info colorbg={!isOffline.current ? '#f44336' : '#4CAF50'}>
            {!isOffline.current
              ? 'Leitura Offline Ativada'
              : 'Conectado com a internet'}
          </Info>
        </>
      ) : (
        <ContainerCentered>
          <ActivityIndicator size={30} color="#C10C19" />
        </ContainerCentered>
      )}
    </Container>
  );
}
