import React, {useRef} from 'react';
import {
  Container,
  InfoContainer,
  Label,
  Value,
  ConfirmButton,
  ConfirmText,
} from './styles';

export default function StudentID({navigation}) {
  const {current: student} = useRef(navigation.getParam('student'));

  return (
    <Container>
      <InfoContainer>
        <Label>Nome:</Label>
        <Value>{student?.name}</Value>
      </InfoContainer>
      <InfoContainer>
        <Label>Email:</Label>
        <Value>{student?.email}</Value>
      </InfoContainer>
      <InfoContainer>
        <Label>CPF:</Label>
        <Value>{student?.document}</Value>
      </InfoContainer>
      <InfoContainer>
        <Label>Endereço:</Label>
        <Value>{student?.address}</Value>
      </InfoContainer>
      <ConfirmButton onPress={() => navigation.goBack()}>
        <ConfirmText>Confirmar</ConfirmText>
      </ConfirmButton>
    </Container>
  );
}
