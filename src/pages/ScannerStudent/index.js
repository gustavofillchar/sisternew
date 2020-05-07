import React, {useRef, useCallback, useState} from 'react';
import {Container} from './styles';
import QRCodeScanner from '~/components/QRCodeScanner';
import {getNowDateFormmated} from '~/utils/date';
import {getCurrentLocation} from '~/utils/geolocation';
import {scannerStudentQRCode} from '~/services/api';

export default function ScannerStudent({navigation}) {
  const scanning = useRef(false);

  const [scanError, setScanError] = useState(false);

  // const handleReadQRCode = useCallback(
  //   async (studentCode) => {
  //     scanning.current = true;
  //     setScanError(false);
  //     try {
  //       const coords = await getCurrentLocation();
  //       const studentData = await scannerStudentQRCode(
  //         route.current.id_worked_route,
  //         studentCode,
  //         coords.latitude,
  //         coords.longitude,
  //         getNowDateFormmated(),
  //       );
  //       route.current.totalStudents++;
  //       route.current.stops.push(coords);
  //       navigation.navigate('StudentID', {student: studentData.pupil});
  //     } catch (error) {
  //       console.warn(error);
  //       setScanError(true);
  //     } finally {
  //       scanning.current = false;
  //     }
  //   },
  //   [navigation, route],
  // );

  // const handleEndRoute = useCallback(
  //   async (finalPosition) => {
  //     console.log('FINAL: ', finalPosition);
  //     route.current.finalPosition = finalPosition;
  //     route.current.finalTime = Date.now();
  //     stopPositionListener(listenerPositionId.current);
  //     setCoordinates([]);
  //     await storeRouteInStorage(route.current);
  //     navigation.navigate('RouteResult', {route: route.current});
  //   },
  //   [navigation, route],
  // );

  return (
    <Container>
      <QRCodeScanner
        scanning={scanning.current}
        error={scanError}
        // onReadQRCode={handleReadQRCode}
      />
    </Container>
  );
}
