import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Image, StyleSheet} from 'react-native';

import {Container} from './styles';
import RecordingActions from './RecordingActions';

export default function Map({location, onFinalizeRoute, onReadQRCode}) {
  return (
    <Container>
      <MapView
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0102,
          longitudeDelta: 0.0102,
        }}
        loadingEnabled={true}
        style={styles.map}>
        <Marker title="Sua posição atual" coordinate={location}>
          <Image
            source={require('~/assets/car.png')}
            style={{width: 20, height: 20}}
          />
        </Marker>
      </MapView>
      <RecordingActions
        onFinalizeRoute={onFinalizeRoute}
        onReadQRCode={onReadQRCode}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
});
