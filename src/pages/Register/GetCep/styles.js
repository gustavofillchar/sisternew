import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #212121;
  padding: 20px;
`;

export const ContainerProfile = styled.View`
  align-self: center;
  margin: 0 0 15px 0;
`;

export const InformText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color: #d32f2f;
  padding: 0 10px;
`;

export const Form = styled.View`
  background-color: #fff;
  flex: 1;
  padding: 20px 10px 10px 10px;
  border-radius: 5px;
  margin-bottom: 40px;
`;

export const SubmitText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: #d32f2f;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 5px;
`;

export const AddPhotoText = styled.Text`
  color: #d32f2f;
  font-size: 16px;
  margin-left: 20px;
  font-weight: 700;
`;

export const AddPhoto = styled.TouchableOpacity`
  border-color: #d32f2f;
  border-width: 1px;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: 0 0 15px 0;
  flex-direction: row;
  border-radius: 5px;
`;

export const PreviewCNH = styled.Image.attrs({
  resizeMode: 'cover',
})`
  height: 200px;
  width: 100%;
  margin: 0 0 15px 0;
  border-radius: 5px;
`;
