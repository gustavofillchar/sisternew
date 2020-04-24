import React, {useCallback} from 'react';
import {TagItem, TagBoxer, TagItemImage, TagItemText} from './style';
import {isConnected} from '~/utils/isConnected';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export async function getRecentlyCategories() {
  const recentlyCategories =
    JSON.parse(await AsyncStorage.getItem('recently-categories')) || [];
  return recentlyCategories;
}

async function addCategoryToTop(categoryId) {
  let categoriesId = await getRecentlyCategories();

  const repeatedIndex = categoriesId.indexOf(categoryId);
  if (repeatedIndex !== -1) {
    categoriesId = categoriesId.filter(category => {
      return category !== categoryId;
    });
  }

  await AsyncStorage.setItem(
    'recently-categories',
    JSON.stringify([categoryId, ...categoriesId]),
  );
}

export default function Category({
  category,
  onPress,
  largeStyle = false,
  //
  navigation,
  selectedCity,
}) {
  const searchByCategory = useCallback(async () => {
    if (!(await isConnected())) {
      Alert.alert(
        'Você está sem internet',
        'Para pesquisar é necessário estar conectado a internet.',
      );
      return;
    }

    await addCategoryToTop(category.id);

    const searchParams = {
      Cidade: selectedCity.Url_Cidade,
      Uf: selectedCity.Sigla_UF,
      Termo: category.id,
    };

    navigation.navigate('SearchResult', {
      selectedCity: selectedCity,
      search: searchParams,
    });
  }, [category, navigation, selectedCity]);
  return (
    <TagItem
      onPress={() => {
        if (onPress) {
          onPress();
          return;
        }
        searchByCategory();
      }}
      largeStyle={largeStyle}>
      <TagBoxer largeStyle={largeStyle}>
        <TagItemImage source={category.image} largeStyle={largeStyle} />
        <TagItemText largeStyle={largeStyle}>
          {category.description}
        </TagItemText>
      </TagBoxer>
    </TagItem>
  );
}
