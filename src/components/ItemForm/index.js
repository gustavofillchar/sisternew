import React from 'react';
import {Container, LabelText, FormLabel, FormInput, FieldText} from './styles';

export default function ItemForm({
  label,
  placeholder,
  value,
  editable = true,
  secureTextEntry = false,
  onChangeText,
}) {
  return (
    <Container>
      <FormLabel>
        <LabelText>{label}</LabelText>
      </FormLabel>
      <FormInput>
        <FieldText
          editable={editable}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </FormInput>
    </Container>
  );
}
