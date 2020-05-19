import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 15px;
`;

export const InfoContainer = styled.View`
  margin: 5px 0 5px 0;
`;

export const Label = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #999;
`;

export const Value = styled.Text`
  color: #37474f;
  font-weight: bold;
`;

export const ConfirmButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #1565c0;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

export const ConfirmText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const CloseText = styled.Text`
  font-weight: bold;
  color: #f44336;
  font-size: 16px;
  text-align: center;
  margin: 15px 0 0 0;
  font-style: italic;
  border: solid #f44336 1px;
  padding: 10px;
  border-radius: 5px;
`;

export const ContainerProfile = styled.View`
  align-self: center;
  margin: 0 0 15px 0;
`;
