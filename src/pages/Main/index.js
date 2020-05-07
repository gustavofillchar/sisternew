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
} from './styles';

import wp from '../../assets/van.jpg';
import {fetchUserData} from '~/services/api';
import {ContainerCentered} from '~/components/GlobalStyles';
import {ActivityIndicator} from 'react-native';
import {getUserDataFromStorage, storeUserDataInStorage} from '~/storage/user';
import {destroyToken} from '~/storage/auth';

export default function Main({navigation}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function prepareUserData() {
      const previousUserData = await getUserDataFromStorage();
      if (previousUserData) {
        setUser(previousUserData);
      } else {
        const data = await fetchUserData();
        await storeUserDataInStorage(data);
        setUser(data);
      }
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
          <Title>Olá, {user.driver.name}</Title>
          <Logout onPress={logout}>
            <MDIcon name="logout" size={25} color="#999" />
          </Logout>
        </Header>

        <BoxButtons>
          <ButtonScanner onPress={() => navigation.navigate('ReadCar', {user})}>
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
