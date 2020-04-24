import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export async function rated() {
  const amountSearch =
    JSON.parse(await AsyncStorage.getItem('amount-search')) || 0;
  await AsyncStorage.setItem('user-rated-value', JSON.stringify(amountSearch));
}

export async function rating() {
  const amountSearch =
    JSON.parse(await AsyncStorage.getItem('amount-search')) || 0;
  await AsyncStorage.setItem('amount-search', JSON.stringify(amountSearch + 1));
}

async function isUserRated() {
  const ratedValue = await AsyncStorage.getItem('user-rated-value');
  return ratedValue !== null;
}

export default function useModalRating(navigation) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function showModal() {
      const amountSearch =
        JSON.parse(await AsyncStorage.getItem('amount-search')) || 0;

      const userValueRated = JSON.parse(
        await AsyncStorage.getItem('user-rated-value'),
      );

      const isRated = await isUserRated();

      if (
        (amountSearch % 5 === 0 && amountSearch > 0 && !isRated) ||
        (isRated && amountSearch === userValueRated + 30)
      ) {
        if (isRated) {
          await rated();
        }
        setVisible(true);
      } else {
        setVisible(false);
      }
    }

    const listener = navigation.addListener('didFocus', showModal);

    return () => listener.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return visible;
}
