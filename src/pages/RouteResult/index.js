import React, {useRef} from 'react';
import {
  Info,
  Title,
  BoxTripDetail,
  DescriptTitle,
  InfoBoxDescript,
  InfoDescriptText,
  CloseBox,
  CloseTitle,
  ContainerInfo,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Separator} from '~/components/GlobalStyles';
import {format} from 'date-fns';
import {distaceBetweenTwoPoints} from '~/utils/geolocation';

export default function RouteResult({navigation}) {
  const {current: route} = useRef(navigation.getParam('route'));

  return (
    <ContainerInfo>
      <Info>
        <Title>Resumo da Viagem</Title>
      </Info>
      <BoxTripDetail>
        <Icon name="clock-start" size={25} color="#555" />
        <DescriptTitle>Início</DescriptTitle>
      </BoxTripDetail>
      <InfoBoxDescript>
        <InfoDescriptText>
          {format(route.initialTime, "HH'h' mm'm' ss's'")}
        </InfoDescriptText>
      </InfoBoxDescript>

      <BoxTripDetail>
        <Icon name="clock-end" size={25} color="#555" />
        <DescriptTitle>Fim</DescriptTitle>
      </BoxTripDetail>
      <InfoBoxDescript>
        <InfoDescriptText>
          {format(route.finalTime, "HH'h' mm'm' ss's'")}
        </InfoDescriptText>
      </InfoBoxDescript>

      <BoxTripDetail>
        <Icon name="map-marker-distance" size={25} color="#555" />
        <DescriptTitle>Distância Percorrida</DescriptTitle>
      </BoxTripDetail>
      <InfoBoxDescript>
        <InfoDescriptText>
          {distaceBetweenTwoPoints(
            route.initialPosition,
            route.finalPosition,
          ).toFixed(2)}{' '}
          km
        </InfoDescriptText>
      </InfoBoxDescript>

      <Separator />
      <BoxTripDetail>
        <Icon name="school" size={25} color="#555" />
        <DescriptTitle>Total de Alunos</DescriptTitle>
      </BoxTripDetail>
      <InfoBoxDescript>
        <InfoDescriptText>{route.totalStudents} alunos</InfoDescriptText>
      </InfoBoxDescript>

      <BoxTripDetail>
        <Icon name="bus-school" size={25} color="#555" />
        <DescriptTitle>Alunos Transportados</DescriptTitle>
      </BoxTripDetail>
      <InfoBoxDescript>
        <InfoDescriptText>8 alunos</InfoDescriptText>
      </InfoBoxDescript>

      <BoxTripDetail>
        <Icon name="not-equal-variant" size={25} color="#555" />
        <DescriptTitle>Alunos Faltantes</DescriptTitle>
      </BoxTripDetail>
      <InfoBoxDescript>
        <InfoDescriptText>6 alunos</InfoDescriptText>
      </InfoBoxDescript>

      {/* <BoxTripDetail>
        <Icon name="map-marker-check" size={25} color="#555" />
        <DescriptTitle>Total de Paradas</DescriptTitle>
      </BoxTripDetail>
      <InfoBoxDescript>
        <InfoDescriptText>{route.stops.length} paradas</InfoDescriptText>
      </InfoBoxDescript> */}

      <CloseBox
        onPress={() => {
          navigation.navigate('Main');
        }}>
        <CloseTitle>Fechar</CloseTitle>
      </CloseBox>
    </ContainerInfo>
  );
}
