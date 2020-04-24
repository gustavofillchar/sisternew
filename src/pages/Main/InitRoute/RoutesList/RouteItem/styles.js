import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 10px;
  border: 1px #ccc solid;
  border-radius: 10px;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #555;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ItemFooter = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LabelFooter = styled.Text`
  font-size: 12px;
  color: #999;
  margin-left: 5px;
`;
