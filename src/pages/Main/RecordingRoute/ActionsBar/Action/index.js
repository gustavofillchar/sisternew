import React from 'react';
import {Container} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Action({iconName, iconSize = 20, iconColor = '#fff', color, onPress}) {
  return (
    <Container color={color} onPress={onPress}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </Container>
  );
}
