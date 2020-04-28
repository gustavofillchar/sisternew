import React, {useRef, useEffect, useState} from 'react';
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
import {Separator, ContainerCentered} from '~/components/GlobalStyles';
import {format} from 'date-fns';
import {distaceBetweenTwoPoints} from '~/utils/geolocation';
import {closeRoute} from '~/services/api';
import {ActivityIndicator} from 'react-native';
import {getNowDateFormmated} from '~/utils/date';

export default function RouteResult({navigation}) {
  const [loading, setLoading] = useState(true);

  const {current: route} = useRef(navigation.getParam('route'));
  const {current: kms} = useRef(
    distaceBetweenTwoPoints(route.initialPosition, route.finalPosition).toFixed(
      2,
    ),
  );

  useEffect(() => {
    navigation.addListener('didFocus', async () => {
      console.log('ROUTE: ', route);
      setLoading(true);
      await closeRoute(
        route.id_worked_route,
        route.defined_route_id.defined_route_id,
        route.finalPosition.latitude,
        route.finalPosition.longitude,
        kms,
        getNowDateFormmated(),
      );
      setLoading(false);
    });
  }, [kms, navigation, route]);

  if (loading) {
    return (
      <ContainerCentered>
        <ActivityIndicator size={40} color="#C10C19" />
      </ContainerCentered>
    );
  }

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
        <InfoDescriptText>{kms} km</InfoDescriptText>
      </InfoBoxDescript>

      <Separator />
      {/* <BoxTripDetail>
        <Icon name="school" size={25} color="#555" />
        <DescriptTitle>Total de Alunos</DescriptTitle>
      </BoxTripDetail>
      <InfoBoxDescript>
        <InfoDescriptText>{route.totalStudents} alunos</InfoDescriptText>
      </InfoBoxDescript> */}

      <BoxTripDetail>
        <Icon name="bus-school" size={25} color="#555" />
        <DescriptTitle>Alunos Transportados</DescriptTitle>
      </BoxTripDetail>
      <InfoBoxDescript>
        <InfoDescriptText>{route.totalStudents} alunos</InfoDescriptText>
      </InfoBoxDescript>

      {/* <BoxTripDetail>
        <Icon name="not-equal-variant" size={25} color="#555" />
        <DescriptTitle>Alunos Faltantes</DescriptTitle>
      </BoxTripDetail>
      <InfoBoxDescript>
        <InfoDescriptText>6 alunos</InfoDescriptText>
      </InfoBoxDescript> */}

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
