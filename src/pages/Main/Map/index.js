import React, {useCallback} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Image, Dimensions} from 'react-native';
import {ROUTE_STATUS} from '~/utils/contants';

export default function Map({location, route, status}) {
  const isShowStops = useCallback(() => {
    return status === ROUTE_STATUS.ACTIVED || route?.stops?.length > 0;
  }, [route, status]);

  const getMapHeight = useCallback(() => {
    return status === ROUTE_STATUS.RECORDING || status === ROUTE_STATUS.ACTIVED
      ? Dimensions.get('window').height
      : '100%';
  }, [status]);

  return (
    <MapView
      region={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0102,
        longitudeDelta: 0.0102,
      }}
      loadingEnabled={true}
      style={{height: getMapHeight(), width: '100%'}}>
      <Marker title="Sua posição atual" coordinate={location}>
        <Image source={require('~/assets/car.png')} style={{width: 20, height: 20}} />
      </Marker>
      {route.initialPosition && <Marker pinColor="#9f9" coordinate={route.initialPosition} />}
      {route.finalPosition && <Marker coordinate={route.finalPosition} />}
      {isShowStops() && (
        <>
          {route.stops.map((stop, index) => {
            return (
              <Marker key={index.toString()} title="Sua posição atual" coordinate={stop.coords}>
                <Image source={require('~/assets/stop-sign.png')} style={{width: 20, height: 20}} />
              </Marker>
            );
          })}
        </>
      )}
    </MapView>
  );
}
