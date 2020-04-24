import ImagePicker from 'react-native-image-crop-picker';

export default async function openCamera() {
  const image = await ImagePicker.openCamera({
    width: 300,
    height: 400,
  });
  console.log(image);
  return image;
}
