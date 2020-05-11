import React, {useState, useEffect, useReducer, useRef} from 'react';

import {StatusBar, ActivityIndicator, Alert} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import api from '~/services/api';

import axios from 'axios';

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
  CepInput,
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
  const [driverLicenseImage, setDriverLicenseImage] = useState({});
  const [imageLicense, setImageLicense] = useState({});
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [resultCep, setResultCep] = useState({});
  const [myCEP, setMyCEP] = useState('');

  const [validation, setValidation] = useState({
    name: true,
    phone: true,
    document: true,
    email: true,
    driverLicense: true,
    driverLicenseImage: true,
    imageLicense: true,
    address: true,
    number: true,
    uf: true,
    city: true,
    zipCode: true,
    password: true,
    passwordConfirmation: true,
  });

  function validEntries() {
    const valid = {};
    if (name.trim() !== '') {
      valid.name = true;
    } else {
      valid.name = false;
    }

    if (email.trim() !== '') {
      valid.email = true;
    } else {
      valid.email = false;
    }

    if (phone.trim() !== '') {
      valid.phone = true;
    } else {
      valid.phone = false;
    }

    if (document.trim() !== '') {
      valid.document = true;
    } else {
      valid.document = false;
    }

    if (driverLicense.trim() !== '') {
      valid.driverLicense = true;
    } else {
      valid.driverLicense = false;
    }

    if (Object.keys(driverLicenseImage).length > 0) {
      valid.driverLicenseImage = true;
    } else {
      valid.driverLicenseImage = false;
    }

    // if (Object.keys(imageLicense).length > 0) {
    //   valid.imageLicense = true;
    // } else {
    //   valid.imageLicense = false;
    // }

    if (address.trim() !== '') {
      valid.address = true;
    } else {
      valid.address = false;
    }

    if (number.trim() !== '') {
      valid.number = true;
    } else {
      valid.number = false;
    }

    if (uf.trim() !== '') {
      valid.uf = true;
    } else {
      valid.uf = false;
    }

    if (city.trim() !== '') {
      valid.city = true;
    } else {
      valid.city = false;
    }

    if (zipCode.trim() !== '') {
      valid.zipCode = true;
    } else {
      valid.zipCode = false;
    }

    if (password.trim() !== '') {
      valid.password = true;
    } else {
      valid.password = false;
    }

    if (passwordConfirmation.trim() !== '') {
      valid.passwordConfirmation = true;
    } else {
      valid.passwordConfirmation = false;
    }

    setValidation(valid);
    return !Object.values(valid).some((value) => !value);
  }

  useEffect(() => {
    api
      .get('general/prefectures')
      .then(async (response) => {
        setPrefectureInfo(response.data);
        // setHasPrefecture(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (hasPrefecture) {
      prefectureInfo?.data.map((data) => {
        if (data.id === idPrefectureSelected) {
          setCity(data.city);
          setUf(data.uf);
        }
      });
    }
  }, [hasPrefecture, idPrefectureSelected, prefectureInfo]);

  function getCity(cep) {
    axios
      .get('https://viacep.com.br/ws/' + cep + '/json/')
      .then(async (response) => {
        setResultCep(response.data);
        setHasPrefecture(true);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (setResultCep) {
      setAddress(resultCep.logradouro);
      setUf(resultCep.uf);
      setCity(resultCep.localidade);
      setZipCode(resultCep.cep);
    }
  }, [resultCep]);

  function buildFormData() {
    console.log(driverLicenseImage);
    console.log(imageLicense);
    const formData = new FormData();
    formData.append('prefecture_id', 1);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('document', document);
    formData.append('driver_license', driverLicense);
    formData.append('driver_license_image', driverLicenseImage);
    formData.append('address', address);
    formData.append('number', number);
    formData.append('uf', uf);
    formData.append('city', city);
    formData.append('zip_code', zipCode);
    formData.append('player_id', 'one_id');
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);
    formData.append('image_license', imageLicense);
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
      await api.post('/general/driver/register', formData);
      Alert.alert('Aviso', 'Motorista cadastrado com sucesso');
      navigation.navigate('VehicleRegister');
    } catch (error) {
      console.warn(error);
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
            Insira o seu CEP para identificarmos a sua cidade.
          </InformText>

          <CepInput
            value={myCEP}
            onChangeText={(e) => setMyCEP(e)}
            keyboardType="number-pad"
          />

          <SubmitButton
            onPress={() => {
              getCity(myCEP);
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
              valid={validation.name}
              invalidMessage="Digite seu nome corretamente"
            />

            <ItemForm
              label="Email"
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
              valid={validation.email}
              invalidMessage="Digite seu e-mail corretamente"
            />

            <ItemForm
              label="Telefone"
              placeholder="Digite seu telefone"
              value={phone}
              onChangeText={setPhone}
              valid={validation.phone}
              invalidMessage="Preencha com o seu telefone corretamente"
              mask="([00]) [00000]-[0000]"
              keyboardType="numeric"
            />

            <ItemForm
              label="Documento"
              placeholder="Digite seu CPF"
              value={document}
              onChangeText={setDocument}
              valid={validation.document}
              invalidMessage="Preencha com o seu CPF"
              keyboardType="numeric"
              mask="[000].[000].[000]-[00]"
            />

            <ItemForm
              label="Endereço"
              placeholder="Ex.: Rua Novo Horizonte, Centro"
              value={address}
              onChangeText={setAddress}
              valid={validation.address}
              invalidMessage="Preencha com o seu endereço"
            />
            <ItemForm
              label="Número"
              placeholder="140"
              value={number}
              onChangeText={setNumber}
              valid={validation.number}
              keyboardType="numeric"
              invalidMessage="Preencha com o número do seu endereço"
            />

            <ItemForm
              label="Cidade"
              value={city}
              valid={validation.city}
              invalidMessage="Insira sua cidade corretamente"
            />

            <ItemForm
              label="UF"
              placeholder="140"
              value={uf}
              valid={validation.uf}
              invalidMessage="Insira seu estado corretamente"
            />

            <ItemForm
              label="CEP"
              placeholder="Insira seu CEP"
              value={zipCode}
              onChangeText={setZipCode}
              valid={validation.zipCode}
              invalidMessage="Preencha o campo corretamente"
            />
            <ItemForm
              label="Carteira de Motorista"
              placeholder="Informe sua carteira"
              value={driverLicense}
              onChangeText={setDriverLicense}
              valid={validation.driverLicense}
              invalidMessage="Preencha o campo corretamente"
            />

            <ItemForm
              label="Senha"
              placeholder="********"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              valid={validation.password}
              invalidMessage="Preecha o campo corretamente"
            />

            <ItemForm
              label="Confirmar Senha"
              placeholder="********"
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
              secureTextEntry={true}
              valid={validation.passwordConfirmation}
              invalidMessage="Tenha certeza das senhas serem idênticas"
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
