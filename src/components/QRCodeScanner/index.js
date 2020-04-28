import React from 'react';
import {Container, ButtonClose, ButtonCloseText} from './styles';
import {RNCamera} from 'react-native-camera';
import {StyleSheet, Dimensions, Image, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';

import bgscanner from '../../assets/bg.png';

export default function QRCodeScanner({
  visible,
  scanning,
  onReadQRCode,
  onClose,
}) {
  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      useNativeDriver
      onBackButtonPress={onClose}>
      <Container>
        <Image
          resizeMode="cover"
          source={bgscanner}
          style={styles.background}
        />
        <RNCamera
          style={styles.camera}
          onBarCodeRead={(event) => {
            console.tron('SCANNING: ', scanning);
            if (!scanning) {
              onReadQRCode(event.data);
            }
          }}
        />
        <ButtonClose onPress={onClose} disabled={scanning}>
          {scanning ? (
            <ActivityIndicator size={30} color="#fff" />
          ) : (
            <ButtonCloseText>FECHAR</ButtonCloseText>
          )}
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
