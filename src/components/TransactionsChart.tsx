import React, { ReactElement } from 'react';
import { format } from 'date-fns';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { ITransaction } from '../interfaces/transaction';
import { StyleSheet } from 'react-native';

interface IProps {
  transactions: {
    timestamp: string;
    toAddress: string;
    amount: string;
  }[];
}

const TransactionsChart: React.FC<IProps> = ({
  transactions,
}): ReactElement => {
  let sortTransactionsByDate: any = {};

  if (transactions?.length) {
    transactions.forEach(transaction => {
      const date = transaction.timestamp.split('T')[0];
      if (sortTransactionsByDate[date]) {
        sortTransactionsByDate[date].push(transaction);
      } else {
        sortTransactionsByDate[date] = [transaction];
      }
    });

    let graphData: any = [];

    const formatGraphData = Object.entries(sortTransactionsByDate).map(
      entry => {
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
      },
    );

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
  }

  return <ActivityIndicator size="large" />;
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

const mapStateToProps = ({ transactions }: { transactions: any }) => ({
  transactions,
});

export default connect(mapStateToProps)(TransactionsChart);
