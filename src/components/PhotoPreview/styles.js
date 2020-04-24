import styled from 'styled-components/native';
import TextInputMask from 'react-native-text-input-mask';

export const Container = styled.TouchableOpacity`
  border: solid #f44336 2px;
  border-radius: 100px;
  padding: 2px;
`;

export const BoxImage = styled.View`
  height: 85px;
  width: 85px;
  border-radius: 100px;
`;

export const ImageProfile = styled.Image.attrs({
  resizeMode: 'cover',
})`
  border-radius: 100px;
  height: 100%;
  width: 100%;
  border: #f2f2f2 0.5px;
`;

export const IconBox = styled.View`
  background-color: #f44336;
  height: 30px;
  width: 30px;
  position: absolute;
  bottom: -1px;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;
