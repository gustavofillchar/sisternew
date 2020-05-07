import React, {useRef, useState, useCallback, useEffect} from 'react';
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
import {Separator, ContainerFullFlex} from '~/components/GlobalStyles';
import {format} from 'date-fns';
import {distaceBetweenTwoPoints} from '~/utils/geolocation';
import {closeRoute} from '~/services/api';
import {getNowDateFormmated} from '~/utils/date';
import QRCodeScanner from '~/components/QRCodeScanner';
import MapView, {Marker} from 'react-native-maps';
import {Image, StyleSheet} from 'react-native';

export default function RouteResult({navigation}) {
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);

  const scanner = useRef();
  const {current: route} = useRef(navigation.getParam('route'));
  const {current: kms} = useRef(
    distaceBetweenTwoPoints(route.initialPosition, route.finalPosition).toFixed(
      2,
    ),
  );

  const handleQRCodeRead = useCallback(async () => {
    setLoading(true);
    await closeRoute(
      route.id_worked_route,
      route.defined_route_id.defined_route_id,
      route.finalPosition.latitude,
      route.finalPosition.longitude,
      kms,
      getNowDateFormmated(),
    );
    scanner.current.pause();
    setScanned(true);
  }, [kms, route]);

  if (!scanned) {
    return (
      <ContainerFullFlex>
        <QRCodeScanner
          ref={scanner}
          scanning={loading}
          onReadQRCode={handleQRCodeRead}
        />
      </ContainerFullFlex>
    );
  }

  return (
    <ContainerInfo>
      <MapView
        style={styles.map}
        region={{
          latitude: route.finalPosition.latitude,
          longitude: route.finalPosition.longitude,
          latitudeDelta: 0.0102,
          longitudeDelta: 0.0102,
        }}>
        <Marker coordinate={route.initialPosition} pinColor="#0f0" />
        <Marker coordinate={route.finalPosition} />
        {route.stops.map((stop, index) => {
          return (
            <Marker key={index.toString()} coordinate={stop}>
              <Image
                source={require('~/assets/stop-sign.png')}
                style={styles.stopSign}
              />
            </Marker>
          );
        })}
      </MapView>
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
        <InfoDescriptText>{route.totalStudents} alunos</InfoDescriptText>
      </InfoBoxDescript>

      <BoxTripDetail>
        <Icon name="not-equal-variant" size={25} color="#555" />
        <DescriptTitle>Alunos Faltantes</DescriptTitle>
      </BoxTripDetail>
      <InfoBoxDescript>
        <InfoDescriptText>0 alunos</InfoDescriptText>
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

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 300,
  },
  stopSign: {
    width: 10,
    height: 10,
  },
});
