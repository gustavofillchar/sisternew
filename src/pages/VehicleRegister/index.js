import React, {useState, useEffect} from 'react';
import {StatusBar, ActivityIndicator, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '~/services/api';
import axios from 'axios';

import {
  Container,
  Form,
  SubmitText,
  SubmitButton,
  AddPhoto,
  AddPhotoText,
  PreviewCNH,
  ContainerProfile,
  InformText,
  CepInput,
} from './styles';

import PhotoPreview from '../../components/PhotoPreview';
import openCamera from '~/utils/open-camera';
import ItemForm from '~/components/ItemForm';

export default function VehicleRegister({navigation}) {
  const [setting, setSetting] = useState(false);
  const [image, setImage] = useState('');

  const [idPrefectureSelected, setIdPrefectureSelected] = useState('');
  const [driverId, setDriverId] = useState('');

  useEffect(() => {
    let user = navigation.getParam('user');

    if (user) {
      setDriverId(user.driver.id);
    }
    console.log(driverId);
  }, [navigation, driverId]);

  const [board, setBoard] = useState('');
  const [renavam, setRenavam] = useState('');
  const [yearManufacture, setYearManufacture] = useState('');
  const [passengers, setPassengers] = useState('');
  const [yearModel, setYearModel] = useState('');

  const [validation, setValidation] = useState({
    board: true,
    renavam: true,
    yearManufacture: true,
    passengers: true,
    yearModel: true,
  });

  function validEntries() {
    const valid = {};

    if (board.trim() !== '') {
      valid.board = true;
    } else {
      valid.board = false;
    }

    if (yearManufacture.trim() !== '') {
      valid.yearManufacture = true;
    } else {
      valid.yearManufacture = false;
    }

    if (passengers.trim() !== '') {
      valid.passengers = true;
    } else {
      valid.passengers = false;
    }

    if (yearModel.trim() !== '') {
      valid.yearModel = true;
    } else {
      valid.yearModel = false;
    }

    if (renavam.trim() !== '') {
      valid.renavam = true;
    } else {
      valid.renavam = false;
    }

    if (Object.keys(image).length > 0) {
      valid.image = true;
    } else {
      valid.image = false;
    }

    setValidation(valid);
    return !Object.values(valid).some((value) => !value);
  }

  function buildFormData() {
    const formData = new FormData();
    formData.append('driver_id', driverId);
    formData.append('board', board);
    formData.append('renavam', renavam);
    formData.append('year_manufacture', yearManufacture);
    formData.append('image_license', image);
    formData.append('passengers', passengers);
    formData.append('year_model', yearModel);
    formData.append('vehicle_model_id', 1);
    formData.append('brand_model_id', 1);

    return formData;
  }

  async function takeLicenseImage() {
    const imageTaken = await openCamera();
    setImage({
      uri: imageTaken.path,
      type: imageTaken.mime,
      name: imageTaken.path.split('/').pop(),
    });
  }

  async function register() {
    setSetting(true);
    if (!validEntries()) {
      Alert.alert(
        'Ops',
        'Existe campos inválidos. Tenha certeza de preencher todos corretamente',
      );
      setSetting(false);
      return;
    }

    const formData = buildFormData();
    try {
      await api.post('/general/vehicle/register', formData);
      Alert.alert('Aviso', 'Veículo cadastrado com sucesso');
      // navigation.navigate('CheckAuth');
    } catch (error) {
      // console.warn(error);
      Alert.alert(
        'Erro',
        Object.values(
          error?.response?.data || [
            'Ocorreu um erro.',
            'Verifique sua conexão',
          ],
        ).join('\n\n'),
      );
    } finally {
      setSetting(false);
    }
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#C10C19" />
      <Icon
        name="car"
        size={40}
        color="#fff"
        style={{alignSelf: 'center', marginBottom: 15}}
      />

      <Form>
        <ItemForm
          label="Placa do Veículo"
          placeholder="XXX-XXXX"
          value={board}
          onChangeText={setBoard}
          valid={validation.board}
          invalidMessage="Digite a placa corretamente"
        />

        <ItemForm
          label="Número RENAVAN"
          placeholder="Ex.: 123456789"
          value={renavam}
          onChangeText={setRenavam}
          valid={validation.renavam}
          invalidMessage="Digite o RENAVAM corretamente"
        />

        <ItemForm
          label="Ano do Modelo"
          placeholder="2019"
          value={yearModel}
          onChangeText={setYearModel}
          valid={validation.yearModel}
          invalidMessage="Insira o ano do modelo"
        />

        <ItemForm
          label="Ano de Fabricação"
          placeholder="2020"
          value={yearManufacture}
          onChangeText={setYearManufacture}
          valid={validation.yearManufacture}
          invalidMessage="Insira o ano de fabricação"
        />

        <ItemForm
          label="Capacidade de passageiros"
          placeholder="Ex.: 15"
          value={passengers}
          onChangeText={setPassengers}
          valid={validation.passengers}
          invalidMessage="Insira a quantidade de passageiros"
        />

        {image ? <PreviewCNH source={{uri: image.uri}} /> : null}
        <AddPhoto activeOpacity={0.8} onPress={() => takeLicenseImage()}>
          <Icon name="camera" size={20} color="#d32f2f" />
          <AddPhotoText>
            {!image ? 'Fotografar CRLV' : 'Fotografar novamente'}
          </AddPhotoText>
        </AddPhoto>
        <SubmitButton onPress={() => register()} activeOpacity={0.8}>
          {setting ? (
            <ActivityIndicator size={30} color="#fff" />
          ) : (
            <SubmitText>Cadastrar</SubmitText>
          )}
        </SubmitButton>
      </Form>
    </Container>
  );
}
