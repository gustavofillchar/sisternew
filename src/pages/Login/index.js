import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  BackHandler,
  ToastAndroid,
  StatusBar,
  ActivityIndicator,
  Alert,
  Switch,
} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '~/services/api';
import AsyncStorage from '@react-native-community/async-storage';
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
  RememberText,
  BoxRemember,
  ShowPassEye,
} from './styles';

import logoapp from '../../assets/logoapp.png';
import wp from '../../assets/van.jpg';
import {storeTokenInStorage, storeDateLoginInStorage} from '~/storage/auth';

export default function Login({navigation}) {
  const [userName, setUserName] = useState(''); // input do usuario
  const [password, setPassword] = useState('');
  const [logging, setLogging] = useState(false); // define o activityIndicator do botão enquanto a função executa
  const [hasError, setHasError] = useState(false); // verifica se retornou erro e qual erro
  const [errorMessage, setErrorMessage] = useState(''); // mensagem para tratamento de erros
  const [numberClick, setNumberClick] = useState(0);
  const [editable, setEditable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveMyLogin, setSaveMyLogin] = useState(false);

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

  const netInfo = useNetInfo();

  useEffect(() => {
    console.log('status connection: ', netInfo.isConnected);
  }, [netInfo]);

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
    const getFromStorage = async () => {
      const savedLogin = await AsyncStorage.getItem('USER_PASS_LOGIN');

      const savedJsonLogin = JSON.parse(savedLogin);
      console.log(savedJsonLogin);

      if (savedJsonLogin) {
        setUserName(savedJsonLogin.user);
        setPassword(savedJsonLogin.pass);
      }
    };
    getFromStorage();
  }, []);

  const loginUser = useCallback(() => {
    setLogging(true);
    if (hasError) {
      setHasError(false);
    }
    if (saveMyLogin) {
      AsyncStorage.setItem(
        'USER_PASS_LOGIN',
        JSON.stringify({user: userName, pass: password}),
      );
    } else {
      AsyncStorage.removeItem('USER_PASS_LOGIN');
    }
    if (userName.length && password.length > 1) {
      api
        .post('general/driver/login', {
          email: userName,
          password: password,
          player_id: 1,
        })
        .then(async (response) => {
          // console.log(response.data);
          await storeTokenInStorage(response.data.access_token);
          await storeDateLoginInStorage();
          navigation.replace('Main', {user: response.data});
          setUserName('');
          setPassword('');
        })
        .catch((error) => {
          console.log(error);
          Alert.alert(
            'Atenção',
            'Usuário ou senha incorretos. Certifique-se que está inserindo os dados corretamente. Caso tenha esquecido sua senha vá até a seção "ESQUECI MINHA SENHA"',
          );
          setHasError(true);
          setLogging(false);
        });
    } else {
      setLogging(false);
      Alert.alert(
        'Atenção',
        'Certifique-se que está inserindo os dados corretamente. Caso tenha esquecido sua senha vá até a seção "ESQUECI MINHA SENHA"',
      );
    }
  }, [hasError, navigation, password, saveMyLogin, userName]);

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
            placeholder="Usuário"
            keyboardType="email-address"
            value={userName}
            onChangeText={(entry) => setUserName(entry)}
            autoCapitalize="none"
          />
        </BoxInput>

        <BoxInput>
          <MDIcon name="lock" size={18} color="#999" />
          <InputHere
            placeholder="Senha"
            keyboardType="number-pad"
            secureTextEntry={showPassword ? false : true}
            value={password}
            onChangeText={(entry) => setPassword(entry)}
          />
          <ShowPassEye
            onPress={() => setShowPassword(showPassword ? false : true)}>
            <MDIcon
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#999"
            />
          </ShowPassEye>
        </BoxInput>

        <BoxRemember>
          <RememberText>Lembrar-me</RememberText>
          <Switch
            trackColor={{false: '#888', true: '#888'}}
            value={saveMyLogin}
            onValueChange={setSaveMyLogin}
            thumbColor={saveMyLogin ? '#c10c19' : '#f4f3f4'}
          />
        </BoxRemember>

        <LoginButton onPress={loginUser}>
          {logging ? (
            <ActivityIndicator color="#fff" size={25} />
          ) : (
            <TextButton>Entrar</TextButton>
          )}
        </LoginButton>
        <RecoveryPassword onPress={() => navigation.navigate('RecoveryPass')}>
          <TextPass>Esqueci minha senha</TextPass>
        </RecoveryPassword>
        <RegisterButton onPress={() => navigation.navigate('Register')}>
          <TextRegister>Cadastro de Motorista</TextRegister>
        </RegisterButton>
      </ContainerForm>
    </Container>
  );
}
