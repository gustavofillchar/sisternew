import React from 'react';
import {
  Container,
  LabelText,
  FormLabel,
  FormInput,
  FieldText,
  FieldTextMasked,
} from './styles';
import {Text} from 'react-native';

export default function ItemForm({
  label,
  placeholder,
  value,
  editable = true,
  secureTextEntry = false,
  onChangeText,
  keyboardType = 'default',
  valid = true,
  invalidMessage = '',
  mask = null,
}) {
  return (
    <Container>
      <FormLabel>
        <LabelText>{label}</LabelText>
      </FormLabel>
      <FormInput valid={valid}>
        {mask ? (
          <FieldTextMasked
            editable={editable}
            placeholder={placeholder}
            value={value}
            onChangeText={(formmated) => onChangeText(formmated)}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            mask={mask}
          />
        ) : (
          <FieldText
            editable={editable}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
          />
        )}
      </FormInput>
      {invalidMessage !== '' && !valid && <Text>{invalidMessage}</Text>}
    </Container>
  );
}
