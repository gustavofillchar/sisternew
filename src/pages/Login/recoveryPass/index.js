import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  BackHandler,
  ToastAndroid,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '~/services/api';

import {
  Container,
  ContainerForm,
  BoxInput,
  InputHere,
  LoginButton,
  TextButton,
  RegisterButton,
  TextRegister,
  LogoBox,
  Logo,
  RecoveryPassword,
  TextPass,
} from './styles';

import logoapp from '../../../assets/logoapp.png';
import wp from '../../../assets/van.jpg';
import {storeTokenInStorage, storeDateLoginInStorage} from '~/storage/auth';

export default function RecoveryPass({navigation}) {
  const [userName, setUserName] = useState(''); // input do usuario
  const [logging, setLogging] = useState(false); // define o activityIndicator do botão enquanto a função executa

  function recoveryMyPass() {
    setLogging(true);
    if (userName !== '') {
      const formData = new FormData();
      formData.append('email', userName);

      const headers = {
        'content-type':
          'multipart/form-data; boundary=---011000010111000001101001',
      };

      api
        .post('/general/driver/reset-password', formData, {headers})
        .then((response) => {
          console.log(response);
          setLogging(false);
          Alert.alert(
            'Pronto',
            'Confira na sua caixa de entrada a sua senha de acesso ao aplicativo.',
          );
          navigation.navigate('Login');
        })
        .catch((error) => {
          setLogging(false);
          console.log(error);
          Alert.alert(
            'Ops',
            `Algo deu errado. Entre em contato com o suporte técnico. \n\nDetalhes: ${error.message}`,
          );
        });
    } else {
      Alert.alert(
        'Atenção',
        'Para redefinir sua senha você deve inserir o e-mail correspondente ao seu cadastro',
      );
    }
  }

  return (
    <Container source={wp} blurRadius={1.2}>
      <StatusBar barStyle="light-content" backgroundColor="#C10C19" />

      <LogoBox>
        <Logo source={logoapp} />
      </LogoBox>

      <ContainerForm>
        <BoxInput>
          <MDIcon name="account" size={18} color="#999" />
          <InputHere
            placeholder="Seu e-mail"
            keyboardType="email-address"
            value={userName}
            onChangeText={(entry) => setUserName(entry)}
            autoCapitalize="none"
          />
        </BoxInput>

        <LoginButton
          onPress={() => {
            recoveryMyPass();
          }}>
          {logging ? (
            <ActivityIndicator color="#fff" size={25} />
          ) : (
            <TextButton>Receber minha senha via SMS</TextButton>
          )}
        </LoginButton>
      </ContainerForm>
    </Container>
  );
}
