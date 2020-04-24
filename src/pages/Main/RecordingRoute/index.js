import React, {useState, useCallback} from 'react';
import {Container} from './styles';
import {getCurrentLocation} from '~/utils/geolocation';
import ActionsBar from './ActionsBar';
import DialogStudents from './DialogStudents';

export default function RecordingRoute({route, onFinalizeRoute, onCancelRoute, onMarkStop}) {
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleFinalizeRoute = useCallback(async () => {
    const finalPosition = await getCurrentLocation();
    onFinalizeRoute(finalPosition);
  }, [onFinalizeRoute]);

  const handleMarkStop = useCallback(
    async amountStudents => {
      setDialogVisible(false);
      const position = await getCurrentLocation();
      const stop = {coords: position, amountStudents};
      onMarkStop(stop);
    },
    [onMarkStop],
  );

  return (
    <Container>
      <DialogStudents visible={dialogVisible} onCancel={() => setDialogVisible(false)} onSubmit={handleMarkStop} />
      <ActionsBar
        onCancelRoute={onCancelRoute}
        onEndRoute={handleFinalizeRoute}
        onMarkStop={() => setDialogVisible(true)}
      />
    </Container>
  );
}
