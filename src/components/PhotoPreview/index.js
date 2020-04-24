import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {Container, BoxImage, ImageProfile, IconBox} from './styles';
import {Image, StyleSheet} from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';

function PhotoPreview(
  {size, onSelectPhoto, valid = true, initialImage = null, disabled = false},
  ref,
) {
  const [photoPreview, setPhotoPreview] = useState(initialImage);

  useImperativeHandle(ref, () => ({
    restart: () => {
      setPhotoPreview(null);
    },
    pickPhoto: () => {
      openImagePicker();
    },
  }));

  function openImagePicker() {
    ImagePicker.openCamera({
      width: 500,
      mediaType: 'photo',
      height: 500,
      includeBase64: true,
      cropping: true,
      useFrontCamera: true,
    }).then(image => {
      // console.log(image);

      setPhotoPreview({uri: 'data:image/jpeg;base64,' + image.data});

      onSelectPhoto({
        uri: image.path,
        type: image.mime,
        name: image.path.split('/').pop(),
      });
    });
  }

  function getSourceImage() {
    if (!photoPreview) {
      return require('~/assets/default-user.jpg');
    }
    return photoPreview;
  }

  return (
    <Container onPress={openImagePicker} activeOpacity={0.8}>
      <BoxImage>
        <ImageProfile source={getSourceImage()} />
      </BoxImage>
      <IconBox>
        <MDIcon name="image-plus" size={18} color="#fff" />
      </IconBox>
    </Container>
  );
}

export default forwardRef(PhotoPreview);
