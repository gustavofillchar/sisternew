import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const FloatActionButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
  elevation: 2;
  margin-bottom: 5px;
`;

export const Actions = styled.View`
  position: absolute;
  bottom: 5px;
  right: 10px;
`;
