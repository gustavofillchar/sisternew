import React from 'react';
import {Container} from './styles';
import Action from '~/components/Action';

export default function ActionsBar({onEndRoute, onReadQRCode}) {
  return (
    <Container>
      {/* <Action
        iconName="qrcode-scan"
        description="Check-in Aluno"
        color="#66bb6a"
        onPress={onReadQRCode}
      /> */}
      <Action
        iconName="flag"
        description="Finalizar Rota"
        color="#ffca28"
        onPress={onEndRoute}
      />
    </Container>
  );
}
