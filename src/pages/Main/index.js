import React from 'react';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  ContainerPanel,
  Header,
  Title,
  Logout,
  BoxButtons,
  ButtonScanner,
  ButtonScannerText,
  ButtonAvailable,
  ButtonAvailableText,
} from './styles';

import wp from '../../assets/van.jpg';

export default function Main({navigation}) {
  return (
    <Container>
      <ContainerPanel source={wp}>
        <Header>
          <Title>Olá, Luiz</Title>
          <Logout>
            <MDIcon name="logout" size={25} color="#999" />
          </Logout>
        </Header>

        <BoxButtons>
          <ButtonScanner onPress={() => navigation.navigate('ReadCar')}>
            <MDIcon name="qrcode-scan" size={29} color="#fff" />
            <ButtonScannerText>Iniciar Viagem</ButtonScannerText>
          </ButtonScanner>
          <ButtonAvailable>
            <Icon name="event-available" size={29} color="#fff" />
            <ButtonAvailableText>Informar disponibilidade</ButtonAvailableText>
          </ButtonAvailable>
        </BoxButtons>
      </ContainerPanel>
    </Container>
  );
}
