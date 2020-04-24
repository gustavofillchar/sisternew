/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StatusBar, StyleSheet, ImageBackground, View} from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  QRCameraReaderBox,
  ContainerPanel,
  Header,
  Title,
  TouchableHighlight,
  Logout,
  BoxButtons,
  ButtonScanner,
  ButtonScannerText,
  ButtonAvailable,
  ButtonAvailableText,
} from './styles';
import wp from '../../assets/van.jpg';

import {RNCamera} from 'react-native-camera';

import bgscanner from '../../assets/bg.png';

export default function ReadCar() {
  const [cameraOn, setCameraOn] = useState(false);

  return (
    <Container>
      <StatusBar
        barStyle={cameraOn ? 'light-content' : 'dark-content'}
        backgroundColor={cameraOn ? '#000' : '#fff'}
      />

      {cameraOn ? (
        <QRCameraReaderBox>
          <ImageBackground
            resizeMode="cover"
            source={bgscanner}
            style={styles.background}
          />
          <RNCamera style={styles.camera} />
        </QRCameraReaderBox>
      ) : (
        <ContainerPanel source={wp}>
          <Header>
            <Title>Olá, Luiz</Title>
            <Logout>
              <MDIcon name="logout" size={25} color="#999" />
            </Logout>
          </Header>

          <BoxButtons>
            <ButtonScanner onPress={() => setCameraOn(true)}>
              <MDIcon name="qrcode-scan" size={29} color="#fff" />
              <ButtonScannerText>Iniciar Viagem</ButtonScannerText>
            </ButtonScanner>
            <ButtonAvailable>
              <Icon name="event-available" size={29} color="#fff" />
              <ButtonAvailableText>
                Informar disponibilidade
              </ButtonAvailableText>
            </ButtonAvailable>
          </BoxButtons>
        </ContainerPanel>
      )}
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
