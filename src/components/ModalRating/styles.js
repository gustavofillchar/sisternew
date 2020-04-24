import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
`;

export const Message = styled.Text`
  font-size: 18px;
  color: #757575;
  text-align: center;
`;

export const ButtonsContainer = styled.TouchableOpacity`
  align-items: center;
  margin-top: 10px;
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor};
  padding: 10px 30px 10px 30px;
  border-radius: 5px;
  flex: 1px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
