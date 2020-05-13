import ImagePicker from 'react-native-image-crop-picker';

export default async function openCamera() {
  const image = await ImagePicker.openCamera({
    width: 300,
    height: 400,
    compressImageMaxWidth: 1000,
    compressImageMaxHeight: 1000,
    compressImageQuality: 0.9,
  });
  return image;
}
