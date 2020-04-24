import React from 'react';
import {
  Container,
  MessageError,
  Title,
  Button,
  ButtonText,
  ImageIcon,
} from './styles';

import satellite from './src/satelite.png';

export default function APIErrorMessage({message, textButton, onPress}) {
  return (
    <Container>
      <ImageIcon source={satellite} />
      <Title>Parece que não há internet!</Title>
      <MessageError>{message}</MessageError>
      <Button onPress={onPress}>
        <ButtonText>{textButton}</ButtonText>
      </Button>
    </Container>
  );
}
