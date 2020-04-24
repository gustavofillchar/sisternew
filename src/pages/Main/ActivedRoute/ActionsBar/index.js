import React from 'react';
import {Container} from './styles';
import Action from './Action';

export default function ActionsBar({onCancelRoute, onEndRoute}) {
  return (
    <Container>
      <Action iconName="cancel" color="#e57373" onPress={onCancelRoute} />
      <Action iconName="flag" color="#ffe082" onPress={onEndRoute} />
    </Container>
  );
}
