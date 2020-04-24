import React from 'react';

import {StatusBar} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  FormInput,
  FieldText,
  Form,
  FormLabel,
  LabelText,
  ItemForm,
  SubmitText,
  SubmitButton,
} from './styles';

const FormItemInput = ({labelname, sample, secure}) => {
  return (
    <ItemForm>
      <FormLabel>
        <LabelText>{labelname}</LabelText>
      </FormLabel>
      <FormInput>
        <FieldText placeholder={sample} secureTextEntry={secure} />
      </FormInput>
    </ItemForm>
  );
};

export default function VehicleRegister({navigation}) {
  return (
    <Container>
      <StatusBar backgroundColor="#C10C19" />

      <Icon
        name="van-passenger"
        size={50}
        color="#fff"
        style={{alignSelf: 'center', marginBottom: 15}}
      />

      <Form>
        <FormItemInput labelname="Placa do Veículo" sample="XXX-XXXX" />
        <FormItemInput labelname="Número RENAVAN" sample="Ex.: 123456789" />
        <FormItemInput labelname="Marca" sample="Ex.: Volkswagen" />
        <FormItemInput labelname="Modelo" sample="Ex.: Kombi" />
        <FormItemInput labelname="Ano de Fabricação" sample="Ex.: Kombi" />
        <FormItemInput labelname="Capacidade de passageiros" sample="Ex.: 13" />

        <SubmitButton
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Main')}>
          <SubmitText>Cadastrar</SubmitText>
        </SubmitButton>
      </Form>
    </Container>
  );
}

// Placa
// marca
// modelo
// ano
// número passageiros
// número RENAVAN
