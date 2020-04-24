import styled from 'styled-components/native';

export const Container = styled.View`
  /* background-color: #999; */
  margin: 0 0 20px 0;
`;

export const LabelText = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: #78909c;
  margin-left: 5px;
`;

export const FormLabel = styled.View`
  width: 100%;
`;

export const FormInput = styled.View`
  flex-direction: row;
  width: 100%;
  border-radius: 5px;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #90a4ae;
  padding: 5px;
`;

export const FieldText = styled.TextInput`
  margin: 0;
  padding: 0;
  flex: 1;
  font-size: 16px;
`;
