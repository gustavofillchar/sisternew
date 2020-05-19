/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
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
  ButtonRegisterVeichle,
} from './styles';

import wp from '../../assets/van.jpg';
import {fetchUserData} from '~/services/api';
import {ContainerCentered} from '~/components/GlobalStyles';
import {ActivityIndicator, BackHandler, ToastAndroid} from 'react-native';
import {getUserDataFromStorage, storeUserDataInStorage} from '~/storage/user';
import {destroyToken} from '~/storage/auth';
import {alertAvaibleDriver} from '~/components/Alerts';

export default function Main({navigation}) {
  const [user, setUser] = useState(null);

  const [numberClick, setNumberClick] = useState(0);

  const backHandler = useCallback(() => {
    if (numberClick === 2) {
      BackHandler.exitApp();
    }
    setNumberClick(2);
    ToastAndroid.show(
      'Pressione novamente para sair do aplicativo',
      ToastAndroid.SHORT,
    );
    setTimeout(() => {
      setNumberClick(1);
    }, 1000);
    return true;
  }, [numberClick]);

  useEffect(() => {
    BackHandler.removeEventListener('hardwareBackPress', backHandler);
    BackHandler.addEventListener('hardwareBackPress', backHandler);
  }, [backHandler]);

  useEffect(() => {
    navigation.addListener('blur', () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler);
    });

    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', backHandler);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    async function prepareUserData() {
      const previousUserData = await getUserDataFromStorage();
      if (previousUserData) {
        setUser(previousUserData);
      } else {
      }
      const data = await fetchUserData();
      // console.log(data);
      await storeUserDataInStorage(data);
      setUser(data);
      console.log('log user ', user);
    }
    prepareUserData();
  }, []);

  const logout = useCallback(async () => {
    await destroyToken();
    navigation.replace('Login');
  }, [navigation]);

  if (!user) {
    return (
      <ContainerCentered>
        <ActivityIndicator size={40} color="#C10C19" />
      </ContainerCentered>
    );
  }

  return (
    <Container>
      <ContainerPanel source={wp}>
        <Header>
          <Title numberOfLines={1}>Olá, {user.driver.name}</Title>
          <Logout onPress={logout}>
            <MDIcon name="logout" size={25} color="#999" />
          </Logout>
        </Header>

        <BoxButtons>
          {user !== null && (
            <ButtonScanner
              onPress={() => navigation.navigate('ReadCar', {user})}>
              <MDIcon name="qrcode-scan" size={29} color="#fff" />
              <ButtonScannerText>Iniciar Viagem</ButtonScannerText>
            </ButtonScanner>
          )}
          <ButtonAvailable
            onPress={() => {
              alertAvaibleDriver();
            }}>
            <Icon name="event-available" size={29} color="#fff" />
            <ButtonAvailableText>
              Informar Indisponibilidade
            </ButtonAvailableText>
          </ButtonAvailable>

          <ButtonRegisterVeichle
            onPress={() => navigation.navigate('VehicleRegister', {user})}>
            <Icon name="list" size={29} color="#fff" />
            <ButtonAvailableText>Cadastrar Veículo</ButtonAvailableText>
          </ButtonRegisterVeichle>
        </BoxButtons>
      </ContainerPanel>
    </Container>
  );
}
