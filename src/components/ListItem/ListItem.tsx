import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ListItemProps} from './ListItem.types';

const ListItem = (props: ListItemProps) => {
  const {
    stock: {avgPrice, close, ltp, quantity, symbol},
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.data}>
          LTP: <Text style={styles.value}>₹ {ltp}</Text>
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.data}>{quantity}</Text>
        <Text style={styles.data}>
          P/L:{' '}
          <Text style={styles.value}>
            ₹ {((ltp - avgPrice) * quantity).toFixed(2)}
          </Text>
        </Text>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 2,
  },
  symbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  data: {
    fontSize: 16,
    color: 'black',
  },
  value: {
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: '#dcdcdd',
    height: 1,
    marginTop: 8,
  },
});

export default ListItem;
