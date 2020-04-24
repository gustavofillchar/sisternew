import React from 'react';
import {Container, Message} from './styles';
import {ActivityIndicator} from 'react-native';

export default function ListEmpty({routes}) {
  return (
    <Container>
      {routes === null ? <ActivityIndicator size={30} color="#C10C19" /> : <Message>Nenhuma rota definida</Message>}
    </Container>
  );
}
