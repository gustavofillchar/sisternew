import React, {useCallback} from 'react';
import {StatusBar, StyleSheet, ImageBackground} from 'react-native';
import {Container, QRCameraReaderBox} from './styles';

import {RNCamera} from 'react-native-camera';

import bgscanner from '../../assets/bg.png';
import {navigateInGoogleMaps} from '~/utils/map-directions';
import {getRouteFromStorage} from '~/storage/routes';

export default function ReadCar({navigation}) {
  const startRoute = useCallback(
    async (vehicleId) => {
      console.log(vehicleId);
      const route = await getRouteFromStorage();
      console.log(route);
      if (route) {
        navigateInGoogleMaps(route.initialPosition, route.finalPosition);
      } else {
        navigation.replace('RecordNewRoute');
      }
    },
    [navigation],
  );

  return (
    <Container>
      {/* <StatusBar
        barStyle={cameraOn ? 'light-content' : 'dark-content'}
        backgroundColor={cameraOn ? '#000' : '#fff'}
      /> */}
      <QRCameraReaderBox>
        <ImageBackground
          resizeMode="cover"
          source={bgscanner}
          style={styles.background}
        />
        <RNCamera
          style={styles.camera}
          onBarCodeRead={(e) => startRoute(e.data)}
        />
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
});
