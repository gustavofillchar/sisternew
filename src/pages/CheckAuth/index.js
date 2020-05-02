import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {Container} from './styles';
import {getDateLoginFromStorage} from '~/storage/auth';
import {isSameDay} from 'date-fns';

export default function CheckAuth({navigation}) {
  useEffect(() => {
    async function checkAuth() {
      const dateLogin = await getDateLoginFromStorage();
      if (isSameDay(dateLogin, Date.now())) {
        navigation.navigate('Main');
      } else {
        navigation.navigate('Login');
      }
    }
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ActivityIndicator size={50} color="#C10C19" />
    </Container>
  );
}
