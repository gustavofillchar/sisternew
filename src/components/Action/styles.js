import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  border-radius: 10px;
  padding: 10px;
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
`;

export const Description = styled.Text`
  color: #fff;
  margin-top: 5px;
`;
