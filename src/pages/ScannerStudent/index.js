import React, {useRef, useCallback, useState} from 'react';
import {
  Container,
  ActionContainer,
  ActiveCameraButton,
  ActiveCameraText,
  BackgroundQRCode,
  ContainerCameraInactive,
  Info,
} from './styles';
import QRCodeScanner from '~/components/QRCodeScanner';
import {getNowDateFormmated} from '~/utils/date';
import {getCurrentLocation, stopPositionListener} from '~/utils/geolocation';
import {scannerStudentQRCode} from '~/services/api';
import {storeRouteInStorage} from '~/storage/routes';
import Action from '~/components/Action';
import {navigateInGoogleMaps} from '~/utils/map-directions';
import {ContainerCentered} from '~/components/GlobalStyles';
import {Button} from 'react-native';
import {alertConfirmRouteFinal} from '~/components/Alerts';

export default function ScannerStudent({navigation}) {
  const scanning = useRef(false);

  const [_, setScanning] = useState(false);
  const [cameraActived, setCameraActived] = useState(false);
  const [scanError, setScanError] = useState(false);

  const route = useRef(navigation.getParam('route'));
  const listenerPositionId = useRef();

  const handleReadQRCode = useCallback(
    async (studentCode) => {
      if (!route.current.stops) {
        route.current.stops = [];
      }

      scanning.current = true;
      setScanError(false);
      setScanning(true);
      try {
        const coords = await getCurrentLocation();
        const studentData = await scannerStudentQRCode(
          route.current.id_worked_route,
          studentCode,
          coords.latitude,
          coords.longitude,
          getNowDateFormmated(),
        );
        route.current.totalStudents++;
        route.current.stops.push(coords);
        navigation.navigate('StudentID', {student: studentData.pupil});
      } catch (error) {
        console.warn(error);
        setScanError(true);
      } finally {
        scanning.current = false;
        setScanning(false);
      }
    },
    [navigation, route],
  );

  const handleEndRoute = useCallback(async () => {
    const finalPosition = await getCurrentLocation();
    console.log('FINAL: ', finalPosition);
    route.current.finalPosition = finalPosition;
    route.current.finalTime = Date.now();
    stopPositionListener(listenerPositionId.current);
    await storeRouteInStorage(route.current);
    navigation.navigate('RouteResult', {route: route.current});
  }, [navigation]);

  if (!cameraActived) {
    return (
      <BackgroundQRCode>
        <ContainerCameraInactive>
          <Info>
            Sua câmera não foi ativada de forma automática. Pressione o botão
            abaixo para ativar a câmera
          </Info>
          <ActiveCameraButton
            onPress={() => {
              setCameraActived(true);
            }}>
            <ActiveCameraText>Fazer Check-In Aluno</ActiveCameraText>
          </ActiveCameraButton>
        </ContainerCameraInactive>
      </BackgroundQRCode>
    );
  }

  return (
    <Container>
      <QRCodeScanner
        scanning={scanning.current}
        error={scanError}
        onReadQRCode={handleReadQRCode}
      />
      <ActionContainer>
        <Action
          iconName="flag"
          description="Finalizar Rota"
          color="#ffca28"
          onPress={() => {
            alertConfirmRouteFinal(handleEndRoute);
          }}
        />
      </ActionContainer>
    </Container>
  );
}
