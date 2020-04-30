import React, {useRef, useState, useEffect} from 'react';
import {
  Container,
  InfoContainer,
  Label,
  Value,
  ConfirmButton,
  ConfirmText,
  CloseText,
} from './styles';

export default function StudentID({navigation}) {
  const {current: student} = useRef(navigation.getParam('student'));

  const timer = useRef();
  const [secondsView, setSecondsView] = useState(5);
  const seconds = useRef(5);

  useEffect(() => {
    navigation.addListener('didFocus', () => {
      timer.current = setInterval(() => {
        if (seconds.current === 0) {
          clearInterval(timer.current);
          navigation.goBack();
          return;
        }
        seconds.current--;
        setSecondsView((prev) => prev - 1);
      }, 1000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {/* <ConfirmButton onPress={() => navigation.goBack()}>
        <ConfirmText>Confirmar</ConfirmText>
      </ConfirmButton> */}
      <CloseText>Fechando em {secondsView}</CloseText>
    </Container>
  );
}
