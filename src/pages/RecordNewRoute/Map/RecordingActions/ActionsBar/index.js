import React from 'react';
import {Container} from './styles';
import Action from './Action';

export default function ActionsBar({onEndRoute, onReadQRCode}) {
  return (
    <Container>
      <Action iconName="qrcode-scan" color="#a5d6a7" onPress={onReadQRCode} />
      <Action iconName="flag" color="#ffe082" onPress={onEndRoute} />
    </Container>
  );
}
