import {Alert} from 'react-native';

export function alertConfirmRouteFinal(callback) {
  Alert.alert('Aviso', 'Tem certeza que deseja finalizar a rota? ', [
    {text: 'Cancelar', style: 'cancel'},
    {text: 'Finalizar', onPress: () => callback()},
  ]);
}
