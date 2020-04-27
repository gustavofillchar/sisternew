import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

export const Container = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
`;

export const ButtonClose = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  z-index: 3;
`;

export const ButtonCloseText = styled.Text`
  color: #fff;
`;
