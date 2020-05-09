import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const MapBox = styled.View`
  background-color: #888;
  flex: 1;
  height: 500px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
`;

export const QRCameraReaderBox = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

{
  /* <ContainerPanel>
<Header>
  <Title>Olá, Nome de Usuário</Title>
</Header>
</ContainerPanel> */
}

export const ContainerPanel = styled.ImageBackground`
  background-color: #333;
  flex: 1;
`;

export const Header = styled.View`
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #dd5050;
  text-align: center;
`;

export const Logout = styled.TouchableOpacity`
  padding: 17px;
`;

export const BoxButtons = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const ButtonScanner = styled.TouchableOpacity`
  background-color: #7cb342;
  padding: 30px 20px;
  /* justify-content: center; */
  align-items: center;
  flex-direction: row;
  border-radius: 7px;
  width: 100%;
`;

export const ButtonScannerText = styled.Text`
  color: #fff;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 700;
  margin-left: 20px;
`;

export const ButtonAvailable = styled.TouchableOpacity`
  padding: 30px 20px;
  /* justify-content: center; */
  background-color: #b71c1c;
  align-items: center;
  flex-direction: row;
  border-radius: 7px;
  width: 100%;
  margin-top: 15px;
`;

export const ButtonAvailableText = styled.Text`
  color: #fff;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 700;
  margin-left: 20px;
`;
