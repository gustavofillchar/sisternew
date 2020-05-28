import React, {useRef, useCallback, useState, useEffect} from 'react';
import {
  Container,
  ActionContainer,
  ActiveCameraButton,
  ActiveCameraText,
  BackgroundQRCode,
  ContainerCameraInactive,
  Info,
  MapContainer,
} from './styles';
import {useNetInfo} from '@react-native-community/netinfo';
import QRCodeScanner from '~/components/QRCodeScanner';
import {navigateInGoogleMaps} from '~/utils/map-directions';
import {getNowDateFormmated} from '~/utils/date';
import {
  getCurrentLocation,
  stopPositionListener,
  listenerUserPosition,
} from '~/utils/geolocation';
import {scannerStudentQRCode} from '~/services/api';
import {storeRouteInStorage} from '~/storage/routes';
import Action from '~/components/Action';
import {Image, StyleSheet, Alert} from 'react-native';
import {alertConfirmRouteFinal} from '~/components/Alerts';

import MapView, {Marker, Polyline} from 'react-native-maps';

export default function ScannerStudent({navigation, route: navigationRoute}) {
  const scanning = useRef(false);
  const synchronized = useRef(false);

  const [_, setScanning] = useState(false);
  const [scanError, setScanError] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([]);

  const [offlineReadStudent, setOfflineReadStudent] = useState([]);

  const route = useRef(navigationRoute.params?.route);
  const listenerPositionId = useRef();

  async function handleListenerPosition() {
    setCurrentLocation(await getCurrentLocation());
    listenerPositionId.current = await listenerUserPosition((position) => {
      setCoordinates([...coordinates, position]);
      setCurrentLocation(position);
    });
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      scanning.current = false;
      handleListenerPosition();
    });
    handleListenerPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const netInfo = useNetInfo();
  const isOffline = useRef(false);
  isOffline.current = netInfo.isConnected;
  useEffect(() => {
    console.log('status: ', isOffline.current);
    console.log('students: ', offlineReadStudent);
  }, [netInfo, offlineReadStudent]);

  const handleReadQRCode = useCallback(
    async (studentCode) => {
      if (!route.current.stops) {
        route.current.stops = [];
      }

      setScanError(false);
      setScanning(true);
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

  const handleEndRoute = useCallback(async () => {
    const finalPosition = await getCurrentLocation();
    route.current.finalPosition = finalPosition;
    route.current.finalTime = Date.now();
    stopPositionListener(listenerPositionId.current);
    await storeRouteInStorage(route.current);
    navigation.navigate('RouteResult', {route: route.current});
  }, [navigation]);

  return (
    <Container>
      <MapContainer>
        <MapView
          style={styles.map}
          region={{
            latitude: route.current.finalPosition.latitude,
            longitude: route.current.finalPosition.longitude,
            latitudeDelta: 0.0102,
            longitudeDelta: 0.0102,
          }}>
          <Polyline
            coordinates={coordinates}
            strokeWidth={3}
            strokeColor="#C10C19"
          />
          {currentLocation && (
            <Marker title="Sua posição atual" coordinate={currentLocation}>
              <Image
                source={require('~/assets/car.png')}
                style={styles.carImage}
              />
            </Marker>
          )}
          <Marker coordinate={route.current.initialPosition} pinColor="#0f0" />
          <Marker coordinate={route.current.finalPosition} />
          {route.current.stops.map((stop, index) => {
            return (
              <Marker key={index.toString()} coordinate={stop}>
                <Image
                  source={require('~/assets/stop-sign.png')}
                  style={styles.stopSign}
                />
              </Marker>
            );
          })}
        </MapView>
        <ActionContainer>
          <Action
            iconName="map"
            description="Seguir GPS"
            color="#009eba"
            onPress={() => {
              // console.log(route.current.initialPosition);

              if (isOffline.current) {
                navigateInGoogleMaps(
                  route.current.initialPosition,
                  route.current.finalPosition,
                );
              } else {
                Alert.alert(
                  'Atenção',
                  'Você está desconectado. Para utilizar o seu GPS é interessante que esteja conectado a internet ou ter feito o download da rota anteriormente.',
                );

                Alert.alert(
                  'Atenção',
                  'Você está desconectado. Para utilizar o seu GPS é interessante que esteja conectado a internet ou ter feito o download da rota anteriormente.',
                  // eslint-disable-next-line no-sparse-arrays
                  [
                    {
                      text: 'Continuar mesmo assim',
                      onPress: () =>
                        navigateInGoogleMaps(
                          route.current.initialPosition,
                          route.current.finalPosition,
                        ),
                    },

                    {text: 'Ok', onPress: () => console.log('OK Pressed')},
                    ,
                  ],
                  {cancelable: false},
                );
              }
            }}
          />
          <Action
            iconName="flag"
            description="Finalizar Rota"
            color="#ffca28"
            onPress={() => {
              if (isOffline.current) {
                if (offlineReadStudent.length > 0 && !synchronized.current) {
                  offlineReadStudent.map((item, index) => {
                    handleSynchronizeStudent(item.student);
                    console.log(index);

                    if (offlineReadStudent.length === index + 1) {
                      console.log('chegou no ultimo');
                      synchronized.current = true;
                      alertConfirmRouteFinal(handleEndRoute);
                      setOfflineReadStudent([]);
                    }
                  });
                } else {
                  alertConfirmRouteFinal(handleEndRoute);
                }
              } else {
                Alert.alert(
                  'Atenção',
                  'Você está desconectado. Para finalizar a rota você deve estar conectado com a internet.',
                );
              }
            }}
          />
        </ActionContainer>
      </MapContainer>
      <QRCodeScanner
        scanning={scanning.current}
        error={scanError}
        onReadQRCode={async (e) => {
          if (isOffline.current) {
            if (scanning.current === false) {
              scanning.current = true;
              handleReadQRCode(e);
            }
          } else {
            if (scanning.current === false) {
              scanning.current = true;
              Alert.alert(
                'LEITURA OFFLINE REALIZADA COM SUCESSO',
                `Os dados serão transmitidos com restabelecimento do sinal.\n\nCódigo do aluno: ${e}`,
                [
                  {
                    text: 'Ok',
                    onPress: async () => {
                      scanning.current = false;

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
      />
      <Info colorbg={!isOffline.current ? '#f44336' : '#4CAF50'}>
        {!isOffline.current
          ? 'Leitura Offline Ativada'
          : 'Conectado com a internet'}
      </Info>
    </Container>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 300,
  },
  stopSign: {
    width: 10,
    height: 10,
  },
  carImage: {
    width: 20,
    height: 20,
  },
});
