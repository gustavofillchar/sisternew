import React, {useRef, forwardRef, useImperativeHandle} from 'react';
import {
  Container,
  ButtonClose,
  ErrorMessage,
  ErrorTitle,
  ErrorContainer,
} from './styles';
import {RNCamera} from 'react-native-camera';
import {StyleSheet, Image, ActivityIndicator, Text} from 'react-native';

import bgscanner from '../../assets/bg.png';

function QRCodeScanner(
  {scanning, error, onReadQRCode, onCameraReady = () => {}},
  ref,
) {
  const camera = useRef();

  useImperativeHandle(ref, () => ({
    pause() {
      camera.current.pausePreview();
    },
  }));

  return (
    <Container>
      <Image resizeMode="cover" source={bgscanner} style={styles.background} />
      <Text style={styles.InfoDoing}>
        Aponte para o CÓDIGO QR para continuar
      </Text>
      <RNCamera
        ref={camera}
        style={styles.camera}
        onBarCodeRead={(event) => {
          if (!scanning) {
            onReadQRCode(event.data);
          }
        }}
        onCameraReady={onCameraReady}
      />
      <ButtonClose onPress={() => {}} disabled={true}>
        {scanning && <ActivityIndicator size={30} color="#fff" />}
      </ButtonClose>
      {error && (
        <ErrorContainer>
          <ErrorTitle>Ocorreu um erro ao ler o QRCode.</ErrorTitle>
          <ErrorMessage>
            Tenha certeza de ser um QRCode válido ou verifique sua conexão com a
            internet
          </ErrorMessage>
        </ErrorContainer>
      )}
    </Container>
  );
}

export default forwardRef(QRCodeScanner);

const styles = StyleSheet.create({
  camera: {
    height: '100%',
    width: '100%',
  },
  background: {
    zIndex: 2,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  InfoDoing: {
    position: 'absolute',
    zIndex: 3,
    color: '#FFC107',
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
    margin: 20,
    fontSize: 16,
    fontWeight: '700',
  },
});
