import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  Linking,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';

import {
  Message,
  Button,
  ButtonText,
  Container,
  ButtonsContainer,
} from './styles';
import Stars from './components/Stars';
import useModalRating, {rated, rating} from './useModalRating';

export default function ModalRating({visible}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const goToAppStore = useCallback(() => {
    Linking.openURL('itms-apps://itunes.apple.com/app/id1081949439');
  }, []);

  const goToPlayStore = useCallback(() => {
    Linking.openURL('market://details?id=br.com.cliqueiachei');
  }, []);

  const handleRating = useCallback(async () => {
    await rated();
    setIsVisible(false);
    if (Platform.OS === 'ios') {
      goToAppStore();
    } else {
      goToPlayStore();
    }
  }, [goToAppStore, goToPlayStore]);

  return (
    <Modal
      isVisible={isVisible}
      animationIn="bounceInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={500}
      useNativeDriver
      backdropOpacity={0.3}
      onBackdropPress={() => setIsVisible(false)}
      style={styles.modal}>
      <Container>
        <Message>O Cliquei Achei está facilitando sua vida?</Message>
        <Message>Nos avalie e deixe um comentário!</Message>
        <Stars />
        <ButtonsContainer>
          <Button onPress={() => setIsVisible(false)} backgroundColor="#ccc">
            <ButtonText>Fechar</ButtonText>
          </Button>
          <Button
            onPress={handleRating}
            style={styles.marginButton}
            backgroundColor="#7cb342">
            <ButtonText>Avaliar</ButtonText>
          </Button>
        </ButtonsContainer>
      </Container>
    </Modal>
  );
}

export {useModalRating, rating};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 15,
  },
  marginButton: {
    marginLeft: 10,
  },
});
