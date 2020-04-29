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

export const ErrorContainer = styled.View`
  position: absolute;
  bottom: 20px;
  right: 0;
  left: 0;
  z-index: 2;
`;

export const ErrorMessage = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 16px;
`;

export const ErrorTitle = styled.Text`
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
