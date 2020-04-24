import React from 'react';
import {Container, Label} from './styles';

export default function StopItem({stop, index}) {
  return (
    <Container>
      <Label>
        {stop.description || `Parada ${index}`}: {stop.coords.latitude}, {stop.coords.longitude}
      </Label>
    </Container>
  );
}
