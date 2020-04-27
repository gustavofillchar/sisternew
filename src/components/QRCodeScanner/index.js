import React from 'react';
import {Container, ButtonClose, ButtonCloseText} from './styles';
import {RNCamera} from 'react-native-camera';
import {StyleSheet, Dimensions, Image} from 'react-native';
import Modal from 'react-native-modal';

import bgscanner from '../../assets/bg.png';

export default function QRCodeScanner({visible, onReadQRCode, onClose}) {
  return (
    <Modal isVisible={visible} style={styles.modal} useNativeDriver>
      <Container>
        <Image
          resizeMode="cover"
          source={bgscanner}
          style={styles.background}
        />
        <RNCamera style={styles.camera} onBarCodeRead={onReadQRCode} />
        <ButtonClose onPress={onClose}>
          <ButtonCloseText>FECHAR</ButtonCloseText>
        </ButtonClose>
      </Container>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  camera: {
    height: '100%',
    width: '100%',
  },
  background: {
    position: 'absolute',
    zIndex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
