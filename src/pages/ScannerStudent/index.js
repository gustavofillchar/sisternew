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
import QRCodeScanner from '~/components/QRCodeScanner';
import {getNowDateFormmated} from '~/utils/date';
import {
  getCurrentLocation,
  stopPositionListener,
  listenerUserPosition,
} from '~/utils/geolocation';
import {scannerStudentQRCode} from '~/services/api';
import {storeRouteInStorage} from '~/storage/routes';
import Action from '~/components/Action';
import {Image, StyleSheet} from 'react-native';
import {alertConfirmRouteFinal} from '~/components/Alerts';

import MapView, {Marker, Polyline} from 'react-native-maps';

export default function ScannerStudent({navigation, route: navigationRoute}) {
  const scanning = useRef(false);

  const [_, setScanning] = useState(false);
  const [scanError, setScanError] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([]);

  const route = useRef(navigationRoute.params?.route);
  const listenerPositionId = useRef();

  async function handleListenerPosition() {
    scanning.current = false;
    setCurrentLocation(await getCurrentLocation());
    listenerPositionId.current = await listenerUserPosition((position) => {
      setCoordinates([...coordinates, position]);
      setCurrentLocation(position);
    });
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      handleListenerPosition();
    });
    handleListenerPosition();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

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

  const handleEndRoute = useCallback(async () => {
    const finalPosition = await getCurrentLocation();
    route.current.finalPosition = finalPosition;
    route.current.finalTime = Date.now();
    stopPositionListener(listenerPositionId.current);
    await storeRouteInStorage(route.current);
    navigation.navigate('RouteResult', {route: route.current});
  }, [navigation]);

  // if (!cameraActived) {
  //   return (
  //     <BackgroundQRCode>
  //       <ContainerCameraInactive>
  //         <Info>
  //           Sua câmera não foi ativada de forma automática. Pressione o botão
  //           abaixo para ativar a câmera
  //         </Info>
  //         <ActiveCameraButton
  //           onPress={() => {
  //             setCameraActived(true);
  //           }}>
  //           <ActiveCameraText>Fazer Check-In Aluno</ActiveCameraText>
  //         </ActiveCameraButton>
  //       </ContainerCameraInactive>
  //     </BackgroundQRCode>
  //   );
  // }

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
            iconName="flag"
            description="Finalizar Rota"
            color="#ffca28"
            onPress={() => {
              alertConfirmRouteFinal(handleEndRoute);
            }}
          />
        </ActionContainer>
      </MapContainer>
      <QRCodeScanner
        scanning={scanning.current}
        error={scanError}
        onReadQRCode={async (e) => {
          if (scanning.current === false) {
            scanning.current = true;
            handleReadQRCode(e);
          }
        }}
      />
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
