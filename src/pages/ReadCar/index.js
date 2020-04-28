import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, Image, ActivityIndicator} from 'react-native';
import {Container, QRCameraReaderBox} from './styles';

import {RNCamera} from 'react-native-camera';

import bgscanner from '../../assets/bg.png';
import {startRoute} from '~/services/api';
import {getCurrentLocation} from '~/utils/geolocation';

export default function ReadCar({navigation}) {
  const {current: user} = useRef(navigation.getParam('user'));
  const [scanning, setScanning] = useState(false);

  const initRoute = useCallback(
    async (vehicleId) => {
      // const route = await getRouteFromStorage();
      setScanning(true);
      const coords = await getCurrentLocation();
      const route = await startRoute(
        vehicleId,
        user.prefecture_id,
        coords.latitude,
        coords.longitude,
      );
      setScanning(false);
      console.tron(route);
      // if (route.new_route) {
      navigation.replace('RecordNewRoute', {route});
      // } else {
      // navigateInGoogleMaps(route.initialPosition, route.finalPosition);
      // }
    },
    [navigation, user],
  );

  return (
    <Container>
      {/* <StatusBar
        barStyle={cameraOn ? 'light-content' : 'dark-content'}
        backgroundColor={cameraOn ? '#000' : '#fff'}
      /> */}
      <QRCameraReaderBox>
        <Image
          resizeMode="cover"
          source={bgscanner}
          style={styles.background}
        />
        <RNCamera
          style={styles.camera}
          onBarCodeRead={(e) => {
            if (!scanning) {
              initRoute(e.data);
            }
          }}
        />
        {scanning && (
          <ActivityIndicator
            size={70}
            color="#fff"
            style={styles.positionRigthBottom}
          />
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
  positionRigthBottom: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 3,
  },
});
