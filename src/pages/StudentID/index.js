import React, {useRef, useState, useEffect} from 'react';
import {
  Container,
  InfoContainer,
  Label,
  Value,
  ConfirmButton,
  ConfirmText,
  CloseText,
  ContainerProfile,
} from './styles';
import PhotoPreview from '../../components/PhotoPreview';
export default function StudentID({navigation, route: navigationRoute}) {
  const {current: student} = useRef(navigationRoute.params?.student);

  // console.log(student);

  const capitalizeString = (s) => {
    if (typeof s !== 'string') {
      return '';
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const timer = useRef();
  const [secondsView, setSecondsView] = useState(5);
  const seconds = useRef(5);

  useEffect(() => {
    navigation.addListener('focus', () => {
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
      <ContainerProfile>
        <PhotoPreview onlyRead={true} imageUri={student?.image} />
      </ContainerProfile>
      <InfoContainer>
        <Label>Nome:</Label>
        <Value>{capitalizeString(student?.name)}</Value>
      </InfoContainer>
      <InfoContainer>
        <Label>Email:</Label>
        <Value>{student?.email}</Value>
      </InfoContainer>
      <InfoContainer>
        <Label>Telefone:</Label>
        <Value>{student?.phone}</Value>
      </InfoContainer>
      <InfoContainer>
        <Label>CPF:</Label>
        <Value>{student?.document}</Value>
      </InfoContainer>
      <InfoContainer>
        <Label>Endereço:</Label>
        <Value>{student?.address}</Value>
      </InfoContainer>

      <InfoContainer>
        <Label>Cidade/UF:</Label>
        <Value>
          {student?.city}/{student?.uf}
        </Value>
      </InfoContainer>
      {/* <ConfirmButton onPress={() => navigation.goBack()}>
        <ConfirmText>Confirmar</ConfirmText>
      </ConfirmButton> */}
      <CloseText>Fechando em {secondsView} segundos</CloseText>
    </Container>
  );
}
