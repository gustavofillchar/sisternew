import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, Alert, Image, ActivityIndicator} from 'react-native';
import {Container, QRCameraReaderBox, ErrorMessage} from './styles';

import {RNCamera} from 'react-native-camera';
import {useNetInfo} from '@react-native-community/netinfo';
import bgscanner from '../../assets/bg.png';
import {startRoute} from '~/services/api';
import {getCurrentLocation} from '~/utils/geolocation';
import {navigateInGoogleMaps} from '~/utils/map-directions';
import {alertChoose} from '~/components/Alerts';
import {func} from 'prop-types';

export default function ReadCar({navigation, route: navigationRoute}) {
  const {current: user} = useRef(navigationRoute.params);
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState(false);

  const netInfo = useNetInfo();
  const isOffline = useRef(false);
  isOffline.current = netInfo.isConnected;

  const scanningHolder = useRef(false);

  const initRoute = useCallback(
    async (code) => {
      setScanning(true);
      setScanError(false);
      try {
        const coords = await getCurrentLocation();
        const route = await startRoute(code, coords.latitude, coords.longitude);

        if (route.new_route) {
          navigation.replace('RecordNewRoute', {route});
          scanningHolder.current = false;
        } else {
          const initialPosition = {
            latitude: isNaN(route.defined_route_id.lat_start)
              ? coords.latitude
              : parseFloat(route.defined_route_id.lat_start),
            longitude: isNaN(route.defined_route_id.lng_start)
              ? coords.longitude
              : parseFloat(route.defined_route_id.lng_start),
          };
          const finalPosition = {
            latitude: parseFloat(route.defined_route_id.lat_end),
            longitude: parseFloat(route.defined_route_id.lng_end),
          };
          const stops = route.stop_routes?.map((stop) => {
            return {
              latitude: parseFloat(stop.latitude),
              longitude: parseFloat(stop.longitude),
            };
          });
          setScanning(false);

          alertChoose(
            () => {
              navigation.replace('RecordNewRoute', {route});
              scanningHolder.current = false;
            },
            () => {
              route.initialPosition = initialPosition;
              route.finalPosition = finalPosition;
              route.stops = stops;
              route.initialTime = Date.now();
              route.totalStudents = 0;
              navigation.replace('ScannerStudent', {route});
              scanningHolder.current = false;
            },
          );
        }
      } catch (error) {
        console.warn(error);
        scanningHolder.current = false;
        setScanError(true);
      } finally {
        setScanning(false);
      }
    },

    [navigation],
  );

  return (
    <Container>
      <QRCameraReaderBox>
        <Image
          resizeMode="cover"
          source={bgscanner}
          style={styles.background}
        />
        <RNCamera
          style={styles.camera}
          onBarCodeRead={async (e) => {
            if (!isOffline.current && scanningHolder.current === false) {
              scanningHolder.current = true;
              Alert.alert(
                'SEM CONEXÃO',
                'Você está desconectado da internet e assim não poderá iniciar uma viagem.',
                [{text: 'Ok', onPress: () => (scanningHolder.current = false)}],
              );
            } else {
              if (scanningHolder.current === false) {
                scanningHolder.current = true;
                await initRoute(e.data);
              }
            }
          }}
        />
        {/* // initRoute(e.data); */}
        {scanning && (
          <ActivityIndicator
            size={50}
            color="#fff"
            style={styles.iconPosition}
          />
        )}
        {scanError && (
          <ErrorMessage>Ocorreu um erro ao ler o QRCode</ErrorMessage>
        )}
      </QRCameraReaderBox>
    </Container>
  );
}

const styles = StyleSheet.create({
  camera: {
    zIndex: 1,
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
  background: {
    zIndex: 2,
    position: 'absolute',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  iconPosition: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 3,
  },
});
