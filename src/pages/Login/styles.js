import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
  flex: 1;
  background-color: #212121;
  justify-content: center;
  align-items: center;
`;

export const ContainerForm = styled.View`
  padding: 15px;
  width: 100%;
`;

export const InputHere = styled.TextInput`
  font-size: 16px;
  color: #333;
  padding: 0;
  margin-left: 10px;
  flex: 1;
  height: 100%;
`;

export const BoxInput = styled.View`
  background-color: #f9f9f9;
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
  border-radius: 4px;
  margin-bottom: 10px;
  height: 50px;
  border: solid #f2f2f2 1px;
`;

export const LoginButton = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 50px;
  background-color: #c10c19;
  margin-bottom: 10px;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  opacity: 0.9;
`;

export const RegisterButton = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 50px;
  border: solid 1px #f5f5f5;
`;

export const TextRegister = styled.Text`
  color: #f5f5f5;
  font-weight: 700;
  font-size: 16px;
  opacity: 0.9;
`;

export const LogoBox = styled.View`
  height: 91px;
  width: 100%;
  margin: 0 0 15px 0;
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 100%;
  width: 100%;
`;
