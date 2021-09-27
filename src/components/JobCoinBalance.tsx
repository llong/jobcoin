import React, {ReactElement} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface IJobCoinBalance {
  balance?: string;
}

const JobCoinBalance: React.FC<IJobCoinBalance> = ({
  balance,
}): ReactElement | null => {
  if (!!balance) {
    return (
      <View style={styles.mainContainer}>
        <Text>Jobcoin Balance</Text>
        <Text>{balance}</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
  },
});

export default JobCoinBalance;
