import React, {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import RouteItem from './RouteItem';
import ListEmpty from './ListEmpty';
import {Separator} from './styles';
import Header from './Header';

export default function RoutesList({routes, onRoutePress}) {
  const renderItemList = useCallback(
    ({item, index}) => {
      return (
        <RouteItem
          route={item}
          index={index + 1}
          onPress={() => {
            onRoutePress(item);
          }}
        />
      );
    },
    [onRoutePress],
  );

  return (
    <FlatList
      data={routes}
      contentContainerStyle={styles.list}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItemList}
      ListHeaderComponent={() => <Header />}
      ItemSeparatorComponent={() => <Separator />}
      ListEmptyComponent={() => <ListEmpty routes={routes} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    padding: 10,
  },
});
