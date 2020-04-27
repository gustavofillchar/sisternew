import React, {useState, useCallback} from 'react';
import {Container} from './styles';
import {getCurrentLocation} from '~/utils/geolocation';
import ActionsBar from './ActionsBar';

export default function RecordingActions({onFinalizeRoute, onReadQRCode}) {
  const handleFinalizeRoute = useCallback(async () => {
    const finalPosition = await getCurrentLocation();
    onFinalizeRoute(finalPosition);
  }, [onFinalizeRoute]);

  const handleReadQRCode = useCallback(() => {
    onReadQRCode();
  }, [onReadQRCode]);

  return (
    <Container>
      <ActionsBar
        onEndRoute={handleFinalizeRoute}
        onReadQRCode={handleReadQRCode}
      />
    </Container>
  );
}
