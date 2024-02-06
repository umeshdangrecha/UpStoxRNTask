import React, {useCallback, useState} from 'react';
import {
  FlatList,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ListItem from '../ListItem';
import {useFetchStocksData} from './useFetchStocksData';

const List = () => {
  const [showDetails, setShowDetails] = useState(false);
  const {
    stocks,
    stocksFetching,
    todaysTotalPNL,
    totalCurrentValue,
    totalInvestment,
  } = useFetchStocksData();

  const handleShowDetails = useCallback(() => {
    LayoutAnimation.configureNext({
      duration: 1000,
      create: {type: 'linear', property: 'opacity', duration: 500},
      update: {type: 'spring', springDamping: 0.4},
      delete: {type: 'linear', property: 'opacity', duration: 500},
    });
    setShowDetails(prev => !prev);
  }, []);

  if (stocksFetching) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (!stocks) {
    return (
      <View>
        <Text>No Stocks Found</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={stocks}
          renderItem={({item}) => {
            return <ListItem stock={item} />;
          }}
          keyExtractor={item => {
            return item.symbol;
          }}
        />
      </View>
      <View style={styles.details}>
        <Pressable
          hitSlop={20}
          style={{alignItems: 'center', paddingVertical: 10}}
          onPress={handleShowDetails}>
          <Text>{showDetails ? '⬇️' : '⬆️'}</Text>
        </Pressable>
        {showDetails && (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Current Value:</Text>
              <Text style={styles.value}>₹ {totalCurrentValue.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Total Investment</Text>
              <Text style={styles.value}>₹ {totalInvestment.toFixed(2)}</Text>
            </View>
            <View style={[styles.row, styles.lastRow]}>
              <Text style={styles.label}>Today's Profit & Loss</Text>
              <Text style={styles.value}>₹ {todaysTotalPNL.toFixed(2)}</Text>
            </View>
          </>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>Profit & Loss: </Text>
          <Text style={styles.value}>
            ₹ {(totalCurrentValue - totalInvestment).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#c3c3c3',
  },
  list: {
    backgroundColor: 'white',
  },
  details: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: 'white',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  lastRow: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  value: {
    fontSize: 16,
    color: 'black',
  },
});

export default List;
