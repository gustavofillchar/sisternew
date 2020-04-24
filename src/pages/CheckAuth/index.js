import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {Container} from './styles';
import {getTokenFromStorage} from '~/storage/auth';

export default function CheckAuth({navigation}) {
  useEffect(() => {
    async function checkAuth() {
      if (await getTokenFromStorage()) {
        navigation.replace('Main');
      } else {
        navigation.replace('Login');
      }
    }
    checkAuth();
  }, [navigation]);

  return (
    <Container>
      <ActivityIndicator size={50} color="#C10C19" />
    </Container>
  );
}
