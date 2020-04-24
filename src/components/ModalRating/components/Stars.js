import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, StyleSheet} from 'react-native';

export default function Stars() {
  return (
    <View style={styles.container}>
      {[...Array(5)].map((element, index) => {
        return <Icon key={index} name="star" size={40} color="#fbc02d" />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});
