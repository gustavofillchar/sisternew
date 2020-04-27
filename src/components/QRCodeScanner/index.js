import React from 'react';
import {Container} from './styles';
import {RNCamera} from 'react-native-camera';
import {StyleSheet, ImageBackground} from 'react-native';

import bgscanner from '../../assets/bg.png';

export default function QRCodeScanner({visible, onReadQRCode}) {
  if (!visible) {
    return null;
  }

  return (
    <Container>
      <ImageBackground
        resizeMode="cover"
        source={bgscanner}
        style={styles.background}
      />
      <RNCamera style={styles.camera} onBarCodeRead={onReadQRCode} />
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
