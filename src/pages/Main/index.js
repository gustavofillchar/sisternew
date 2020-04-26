import React, {useEffect, useState, useCallback, useRef} from 'react';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  MapBox,
  QRCameraReaderBox,
  ContainerPanel,
  Header,
  Title,
  TouchableHighlight,
  Logout,
  BoxButtons,
  ButtonScanner,
  ButtonScannerText,
  ButtonAvailable,
  ButtonAvailableText,
} from './styles';
import InitRoute from './InitRoute';

import wp from '../../assets/van.jpg';

import {RNCamera} from 'react-native-camera';

import bgscanner from '../../assets/bg.png';

import {fetchUserData} from '~/services/api';
import {storeUserDataInStorage, getUserDataFromStorage} from '~/storage/user';
import {
  getCurrentLocation,
  listenerUserPosition,
  stopPositionListener,
} from '~/utils/geolocation';
import {
  ActivityIndicator,
  ToastAndroid,
  StatusBar,
  StyleSheet,
  ImageBackground,
  View,
  Alert,
} from 'react-native';
import {ROUTE_STATUS} from '~/utils/contants';
import RecordingRoute from './RecordingRoute';
import RouteResult from './RouteResult';
import Map from './Map';
import {storeRouteInStorage} from '~/storage/routes';
import ActivedRoute from './ActivedRoute';

export default function Main({navigation}) {
  const [user, setUser] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [route, setRoute] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const [routeStatus, setRouteStatus] = useState(ROUTE_STATUS.DESACTIVED);

  const listenerPositionId = useRef();

  useEffect(() => {
    async function getUserLocation() {
      const position = await getCurrentLocation();
      setCurrentLocation(position);
    }
    async function prepareUserData() {
      const previousUserData = await getUserDataFromStorage();
      if (!previousUserData) {
        const data = await fetchUserData();
        await storeUserDataInStorage(data);
        setUser(data);
      } else {
        setUser(previousUserData);
      }
    }
    prepareUserData();
    getUserLocation();
  }, []);

  useEffect(() => {
    navigation.setParams({status: routeStatus});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeStatus]);

  const recordRoute = useCallback(async () => {
    listenerPositionId.current = await listenerUserPosition((position) => {
      console.log(position);
      setCurrentLocation(position);
      setCoordinates((prevState) => [...prevState, position]);
    });

    const position = await getCurrentLocation();
    setRoute({
      id: Math.random(),
      initialTime: Date.now(),
      initialPosition: position,
      stops: [],
    });

    setRouteStatus(ROUTE_STATUS.RECORDING);
  }, []);

  const startRoute = useCallback(async () => {
    listenerPositionId.current = await listenerUserPosition((position) => {
      console.log(position);
      setCurrentLocation(position);
      setCoordinates((prevState) => [...prevState, position]);
    });
    setRouteStatus(ROUTE_STATUS.ACTIVED);
  }, []);

  const cancelRoute = useCallback(() => {
    ToastAndroid.show('Rota Cancelada', ToastAndroid.LONG);
    stopPositionListener(listenerPositionId.current);
    setRouteStatus(ROUTE_STATUS.DESACTIVED);
    setRoute({});
  }, []);

  const finalizeRoute = useCallback(
    async (finalPosition) => {
      ToastAndroid.show('Rota Finalizada', ToastAndroid.LONG);
      stopPositionListener(listenerPositionId.current);
      if (!route.finalTime) {
        await storeRouteInStorage({
          ...route,
          finalPosition,
          finalTime: Date.now(),
        });
        setRoute({...route, finalPosition, finalTime: Date.now()});
      }
      setRouteStatus(ROUTE_STATUS.FINALIZED);
    },
    [route],
  );

  const closeResultRoute = useCallback(() => {
    setRouteStatus(ROUTE_STATUS.DESACTIVED);
    setRoute({});
  }, []);

  const markStop = useCallback((stop) => {
    console.log('STOP: ', stop);
    setRoute((prevState) => ({
      ...prevState,
      stops: [...prevState.stops, stop],
    }));
  }, []);

  const handleRouteSelection = useCallback((routeSelected) => {
    setRoute(routeSelected);
  }, []);

  const renderContent = useCallback(() => {
    if (routeStatus === ROUTE_STATUS.RECORDING) {
      return (
        <RecordingRoute
          route={route}
          onCancelRoute={cancelRoute}
          onFinalizeRoute={finalizeRoute}
          onMarkStop={markStop}
        />
      );
    } else if (routeStatus === ROUTE_STATUS.DESACTIVED) {
      return (
        <InitRoute
          route={route}
          onInitRoute={recordRoute}
          onRouteSelect={handleRouteSelection}
          onStartRoute={startRoute}
        />
      );
    } else if (routeStatus === ROUTE_STATUS.FINALIZED) {
      return <RouteResult route={route} onClose={closeResultRoute} />;
    } else {
      return (
        <ActivedRoute
          onCancelRoute={cancelRoute}
          onFinalizeRoute={finalizeRoute}
        />
      );
    }
  }, [
    routeStatus,
    route,
    cancelRoute,
    finalizeRoute,
    markStop,
    recordRoute,
    handleRouteSelection,
    startRoute,
    closeResultRoute,
  ]);
  const [cameraOn, setCameraOn] = useState(false);
  return (
    <Container>
      {cameraOn ? (
        <QRCameraReaderBox>
          <ImageBackground
            resizeMode="cover"
            source={bgscanner}
            style={styles.background}
          />
          <RNCamera
            style={styles.camera}
            onBarCodeRead={(e) => alert('Codigo da Van: ' + e.data)}
          />
        </QRCameraReaderBox>
      ) : (
        <ContainerPanel source={wp}>
          <Header>
            <Title>Olá, Luiz</Title>
            <Logout>
              <MDIcon name="logout" size={25} color="#999" />
            </Logout>
          </Header>

          <BoxButtons>
            <ButtonScanner onPress={() => setCameraOn(true)}>
              <MDIcon name="qrcode-scan" size={29} color="#fff" />
              <ButtonScannerText>Iniciar Viagem</ButtonScannerText>
            </ButtonScanner>
            <ButtonAvailable>
              <Icon name="event-available" size={29} color="#fff" />
              <ButtonAvailableText>
                Informar disponibilidade
              </ButtonAvailableText>
            </ButtonAvailable>
          </BoxButtons>
          {/* <MapBox>
            {currentLocation ? (
              <Map
                location={currentLocation}
                route={route}
                status={routeStatus}
              />
            ) : (
              <ActivityIndicator size={20} />
            )}
          </MapBox> */}
        </ContainerPanel>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  camera: {
    zIndex: 1,
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
  background: {
    zIndex: 2,
    position: 'absolute',
    height: '100%',
    width: '100%',
    flex: 1,
  },
});
