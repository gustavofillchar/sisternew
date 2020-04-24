import React, {useCallback} from 'react';
import {Container} from './styles';
import {getCurrentLocation} from '~/utils/geolocation';
import ActionsBar from './ActionsBar';

export default function ActivedRoute({onFinalizeRoute, onCancelRoute}) {
  const handleFinalizeRoute = useCallback(async () => {
    const finalPosition = await getCurrentLocation();
    onFinalizeRoute(finalPosition);
  }, [onFinalizeRoute]);

  return (
    <Container>
      <ActionsBar onCancelRoute={onCancelRoute} onEndRoute={handleFinalizeRoute} />
    </Container>
  );
}
