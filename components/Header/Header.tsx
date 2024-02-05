import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {HeaderProps} from './Header.types';

const Header = (props: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#810679',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});

export default Header;
