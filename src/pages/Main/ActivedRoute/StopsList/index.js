import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import StopItem from './StopItem';

export default function StopsList({stops}) {
  const renderItemList = useCallback(({item, index}) => {
    return <StopItem stop={item} index={index + 1} />;
  }, []);

  return <FlatList data={stops} keyExtractor={(_, index) => index.toString()} renderItem={renderItemList} />;
}
