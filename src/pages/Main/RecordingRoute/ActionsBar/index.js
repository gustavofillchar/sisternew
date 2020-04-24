import React from 'react';
import {Container} from './styles';
import Action from './Action';

export default function ActionsBar({onCancelRoute, onEndRoute, onMarkStop}) {
  return (
    <Container>
      <Action iconName="cancel" color="#e57373" onPress={onCancelRoute} />
      <Action iconName="map-marker-plus" color="#a5d6a7" onPress={onMarkStop} />
      <Action iconName="flag" color="#ffe082" onPress={onEndRoute} />
    </Container>
  );
}
