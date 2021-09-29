import React, { ReactElement } from 'react';
import { format } from 'date-fns';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { Dimensions, Text, View } from 'react-native';

import { useGlobalState } from '../state/GlobalState';
import { ITransaction } from '../interfaces/transaction';
import { StyleSheet } from 'react-native';

const TransactionsChart: React.FC = (): ReactElement => {
  let sortTransactionsByDate: any = {};

  const { state } = useGlobalState();
  const { transactions = [] } = state;
  transactions.forEach(transaction => {
    const date = transaction.timestamp.split('T')[0];
    if (sortTransactionsByDate[date]) {
      sortTransactionsByDate[date].push(transaction);
    } else {
      sortTransactionsByDate[date] = [transaction];
    }
  });

  let graphData: any = [];

  const formatGraphData = Object.entries(sortTransactionsByDate).map(entry => {
    const [key, value] = entry as any;
    const daySum = {
      date: format(Date.parse(key), 'MMM/d'),
      sum: value.reduce(
        (total: number, transaction: ITransaction) =>
          total + parseInt(transaction.amount),
        0,
      ),
    };
    graphData.push(daySum);
  });

  return (
    <>
      <Text style={styles.chartHeaderText}>Jobcoin Transactions Per Day</Text>
      <View style={styles.chartContainer}>
        <VictoryChart
          width={Dimensions.get('window').width - 32}
          theme={VictoryTheme.material}
          domainPadding={10}>
          <VictoryBar
            data={graphData}
            x="date"
            y="sum"
            style={{ data: { fill: '#006af7' } }}
          />
        </VictoryChart>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    borderWidth: 1,
    borderColor: '#999',
  },
  chartHeaderText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 8,
  },
});

export default TransactionsChart;
