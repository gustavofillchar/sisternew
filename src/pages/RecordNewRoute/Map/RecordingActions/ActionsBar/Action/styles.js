import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${props => props.color};
  justify-content: center;
  align-items: center;
`;
