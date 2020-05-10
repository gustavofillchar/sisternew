import styled from 'styled-components/native';
import TextInputMask from 'react-native-text-input-mask';

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
  border-color: ${(props) => (props.valid ? '#90a4ae' : '#c00')};
  padding: 5px;
`;

export const FieldText = styled.TextInput`
  margin: 0;
  padding: 0;
  flex: 1;
  font-size: 16px;
`;

export const FieldTextMasked = styled(TextInputMask)`
  margin: 0;
  padding: 0;
  flex: 1;
  font-size: 16px;
`;
