import React, {useState, useEffect} from 'react';

import {StatusBar, ActivityIndicator, Alert} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import api from '~/services/api';

import {Picker} from '@react-native-community/picker';

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
} from './styles';

import PhotoPreview from '../../components/PhotoPreview';
import openCamera from '~/utils/open-camera';
import ItemForm from '~/components/ItemForm';

export default function Register({navigation}) {
  const [setting, setSetting] = useState(false);
  const [image, setImage] = useState();

  const [hasPrefecture, setHasPrefecture] = useState(false);
  const [prefectureInfo, setPrefectureInfo] = useState(null);
  const [idPrefectureSelected, setIdPrefectureSelected] = useState();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const [driverLicenseImage, setDriverLicenseImage] = useState('');
  const [imageLicense, setImageLicense] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [board, setBoard] = useState('');
  const [renavam, setRenavam] = useState('');
  const [yearManufacture, setYearManufacture] = useState('');
  const [yearModel, setYearModel] = useState('');
  const [passengers, setPassengers] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [vehicleModelId, setVehicleModelId] = useState(1);

  useEffect(() => {
    api
      .get('general/prefectures')
      .then(async response => {
        setPrefectureInfo(response.data);
        // setHasPrefecture(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (hasPrefecture) {
      prefectureInfo?.data.map(data => {
        if (data.id === idPrefectureSelected) {
          setCity(data.city);
          setUf(data.uf);
        }
      });
    }
  }, [hasPrefecture, idPrefectureSelected, prefectureInfo]);

  function buildFormData() {
    console.log(driverLicenseImage);
    console.log(imageLicense);
    const formData = new FormData();
    formData.append('prefecture_id', idPrefectureSelected);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('document', document);
    formData.append('driver_license', driverLicense);
    formData.append('driver_license_image', driverLicenseImage);
    formData.append('image_license', imageLicense);
    formData.append('address', address);
    formData.append('number', number);
    formData.append('uf', uf);
    formData.append('city', city);
    formData.append('zip_code', zipCode);
    formData.append('board', board);
    formData.append('renavam', renavam);
    formData.append('year_manufacture', yearManufacture);
    formData.append('year_model', yearModel);
    formData.append('passengers', passengers);
    formData.append('player_id', 'one_id');
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);
    formData.append('vehicle_model_id', vehicleModelId);
    // formData.append('brand_model_id', brand)
    return formData;
  }

  async function takeLicenseImage() {
    const imageTaken = await openCamera();
    setImageLicense({
      uri: imageTaken.path,
      type: imageTaken.mime,
      name: imageTaken.path.split('/').pop(),
    });
    setDriverLicenseImage({
      uri: imageTaken.path,
      type: imageTaken.mime,
      name: imageTaken.path.split('/').pop(),
    });
  }

  async function register() {
    setSetting(true);
    const formData = buildFormData();
    try {
      await api.post('/general/driver/register', formData);
      Alert.alert('Aviso', 'Motorista cadastrado com sucesso');
    } catch (error) {
      console.log(error);
    } finally {
      setSetting(false);
    }
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#C10C19" />
      {/* <Icon
        name="drivers-license"
        size={40}
        color="#fff"
        style={{alignSelf: 'center', marginBottom: 15}}
      /> */}

      {hasPrefecture && (
        <ContainerProfile>
          <PhotoPreview />
        </ContainerProfile>
      )}

      {!hasPrefecture && (
        <Form>
          <InformText>
            Para continuar é importante que você selecione a cidade onde irá
            trabalhar:
          </InformText>
          <Picker
            mode="dialog"
            selectedValue={idPrefectureSelected}
            onValueChange={(itemValue, itemIndex) => {
              console.log(itemValue);
              setIdPrefectureSelected(itemValue);
            }}>
            <Picker.Item label="Escolha uma cidade..." value={0} />
            {prefectureInfo?.data.map(data => {
              return (
                <Picker.Item
                  key={data.id}
                  label={data.city + ', ' + data.uf}
                  value={data.id}
                />
              );
              // console.log('rei');
            })}
          </Picker>
          <SubmitButton
            onPress={() => {
              if (idPrefectureSelected !== 0) {
                setHasPrefecture(true);
              } else {
                alert('Selecione a cidade.');
              }
            }}
            activeOpacity={0.8}>
            <SubmitText>Continuar</SubmitText>
          </SubmitButton>
        </Form>
      )}

      {hasPrefecture ? (
        <>
          <Form>
            <ItemForm
              label="Nome"
              placeholder="Digite seu nome"
              value={name}
              onChangeText={setName}
            />

            <ItemForm
              label="Email"
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
            />

            <ItemForm
              label="Telefone"
              placeholder="Digite seu telefone"
              value={phone}
              onChangeText={setPhone}
            />

            <ItemForm
              label="Documento"
              placeholder="Digite seu CPF"
              value={document}
              onChangeText={setDocument}
            />

            <ItemForm
              label="Endereço"
              placeholder="Ex.: Rua Novo Horizonte, Centro"
              value={address}
              onChangeText={setAddress}
            />
            <ItemForm
              label="Número"
              placeholder="140"
              value={number}
              onChangeText={setNumber}
            />

            <ItemForm label="Cidade" value={city} editable={false} />

            <ItemForm label="UF" placeholder="140" value={uf} />

            <ItemForm
              label="CEP"
              placeholder="Insira seu CEP"
              value={zipCode}
              onChangeText={setZipCode}
            />
            <ItemForm
              label="Carteira de Motorista"
              placeholder="Informe sua carteira"
              value={driverLicense}
              onChangeText={setDriverLicense}
            />
            <ItemForm
              label="Placa do Veículo"
              placeholder="XXX-0000"
              value={board}
              onChangeText={setBoard}
            />

            <ItemForm
              label="Renavam"
              placeholder="Ex.: 123456789"
              value={renavam}
              onChangeText={setRenavam}
            />
            <ItemForm
              label="Ano Fabricação"
              placeholder="Ex.: 2014"
              value={yearManufacture}
              onChangeText={setYearManufacture}
            />

            <ItemForm
              label="Ano Modelo"
              placeholder="Ex.: 2015"
              value={yearModel}
              onChangeText={setYearModel}
            />

            <ItemForm
              label="Quantidade Passageiros"
              placeholder="Ex: 15"
              value={passengers}
              onChangeText={setPassengers}
            />

            <ItemForm
              label="Senha"
              placeholder="********"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <ItemForm
              label="Confirmar Senha"
              placeholder="********"
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
              secureTextEntry={true}
            />

            {image ? <PreviewCNH source={{uri: image.path}} /> : null}
            <AddPhoto activeOpacity={0.8} onPress={() => takeLicenseImage()}>
              <Icon name="camera" size={20} color="#d32f2f" />
              <AddPhotoText>
                {!image ? 'Fotografar CNH' : 'Fotografar novamente'}
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
        </>
      ) : null}
    </Container>
  );
}
