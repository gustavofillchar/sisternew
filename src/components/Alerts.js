import {Alert} from 'react-native';

export function alertConfirmRouteFinal(callback) {
  Alert.alert('Aviso', 'Tem certeza que deseja finalizar a rota? ', [
    {text: 'Cancelar', style: 'cancel'},
    {text: 'Finalizar', onPress: () => callback()},
  ]);
}

export function alertChoose(newRouteCallback, routeDefinedCallback) {
  Alert.alert(
    'Escolha',
    'Você deseja fazer uma nova rota ou ir por uma rota já definida?',
    [
      {text: 'Nova Rota', onPress: newRouteCallback},
      {text: 'Rota Definida', onPress: routeDefinedCallback},
    ],
    {cancelable: false},
  );
}

export function confirmCancelRoute(confirmCallback) {
  Alert.alert(
    'ATENÇÃO, MOTORISTA!',
    'Para finalizar a viagem você deve clicar em FINALIZAR ROTA e ler o QR Code da Van.',
    [
      {
        text: 'Ok',
      },
    ],
  );
}

export function alertAvaibleDriver() {
  Alert.alert('Aviso', 'Indisponibilidade informada com sucesso.');
}
