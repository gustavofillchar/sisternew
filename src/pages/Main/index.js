import React, {useEffect, useState, useCallback, useRef} from 'react';

import {Container, MapBox} from './styles';
import InitRoute from './InitRoute';

import {fetchUserData} from '~/services/api';
import {storeUserDataInStorage, getUserDataFromStorage} from '~/storage/user';
import {getCurrentLocation, listenerUserPosition, stopPositionListener} from '~/utils/geolocation';
import {ActivityIndicator, ToastAndroid} from 'react-native';
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
    listenerPositionId.current = await listenerUserPosition(position => {
      console.log(position);
      setCurrentLocation(position);
      setCoordinates(prevState => [...prevState, position]);
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
    listenerPositionId.current = await listenerUserPosition(position => {
      console.log(position);
      setCurrentLocation(position);
      setCoordinates(prevState => [...prevState, position]);
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
    async finalPosition => {
      ToastAndroid.show('Rota Finalizada', ToastAndroid.LONG);
      stopPositionListener(listenerPositionId.current);
      if (!route.finalTime) {
        await storeRouteInStorage({...route, finalPosition, finalTime: Date.now()});
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

  const markStop = useCallback(stop => {
    console.log('STOP: ', stop);
    setRoute(prevState => ({
      ...prevState,
      stops: [...prevState.stops, stop],
    }));
  }, []);

  const handleRouteSelection = useCallback(routeSelected => {
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
      return <ActivedRoute onCancelRoute={cancelRoute} onFinalizeRoute={finalizeRoute} />;
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

  return (
    <Container>
      <MapBox>
        {currentLocation ? (
          <Map location={currentLocation} route={route} status={routeStatus} />
        ) : (
          <ActivityIndicator size={20} />
        )}
      </MapBox>
      {renderContent()}
    </Container>
  );
}

Main.navigationOptions = ({navigation}) => {
  const status = navigation.getParam('status');
  let title = '';
  switch (status) {
    case ROUTE_STATUS.RECORDING:
      title = 'Gravando Rota';
      break;
    case ROUTE_STATUS.DESACTIVED:
      title = 'Rotas';
      break;
    case ROUTE_STATUS.FINALIZED:
      title = 'Resumo da Viagem';
      break;
    case ROUTE_STATUS.ACTIVED:
      title = 'Rota Ativa';
      break;
  }

  return {
    title,
  };
};
