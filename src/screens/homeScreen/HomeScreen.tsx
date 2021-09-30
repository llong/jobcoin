import React, { ReactElement } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { useGlobalState } from '../../state/GlobalState';
import { getTransactions, getWalletAddress } from '../../api/apiService';

// Import components
import JobCoinBalance from '../../components/JobCoinBalance';
import SendJobCoin from '../../components/SendJobCoin';
import Header from './components/Header';
import TransactionsChart from '../../components/TransactionsChart';

const HomeScreen: React.FC = (): ReactElement => {
  const { state, setState } = useGlobalState();
  const { walletData } = state;

  React.useEffect(() => {
    if (!!state.walletAddress) {
      getWalletAddress(state.walletAddress).then(data =>
        setState(prevState => ({ ...prevState, walletData: data })),
      );
      getTransactions().then(data =>
        setState(prevState => ({ ...prevState, transactions: data })),
      );
    }
  }, []);

  const handleSignOut = (): void => {
    setState(prev => ({ ...prev, walletAddress: '' }));
  };

  if (state.walletAddress && state.walletData) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          walletAddress={state.walletAddress}
          signOutAction={handleSignOut}
        />

        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.screenContainer}>
            <View style={styles.widgetContainer}>
              <JobCoinBalance balance={walletData?.balance} />
            </View>
            <View style={styles.widgetContainer}>
              <SendJobCoin walletAddress={state.walletAddress} />
            </View>
            <View style={styles.widgetContainer}>
              <TransactionsChart />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  return <ActivityIndicator size="large" />;
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 16,
    flexGrow: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#999',
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  widgetContainer: {
    marginBottom: 16,
  },
});

export default HomeScreen;
