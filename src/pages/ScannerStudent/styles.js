import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const ActionContainer = styled.View`
  z-index: 2;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 10px;
`;

export const ActiveCameraButton = styled.TouchableOpacity`
  padding: 20px;
  background-color: #42a5f5;
  margin: 20px 0 20px 0;
`;

export const ActiveCameraText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export const BackgroundQRCode = styled.ImageBackground.attrs({
  source: require('~/assets/bg.png'),
})`
  flex: 1;
`;

export const ContainerCameraInactive = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const Info = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;
