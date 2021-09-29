import React, { ReactElement } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

import { fetchTransactionss, fetchWallet, signOut } from '../../state/actions';
import { useGlobalState } from '../../state/GlobalState';

// Import components
import JobCoinBalance from '../../components/JobCoinBalance';
import SendJobCoin from '../../components/SendJobCoin';
import Header from './components/Header';
import TransactionsChart from '../../components/TransactionsChart';
import { IWallet } from '../../interfaces/wallet';

interface IProps {
  fetchTransactionss: any;
  fetchWallet?: any;
  walletAddress?: string;
  walletData: IWallet;
  signOut: any;
}

const HomeScreen: React.FC<IProps> = ({
  fetchTransactionss,
  fetchWallet,
  walletAddress,
  walletData,
  signOut,
}): ReactElement => {
  const { state, setState } = useGlobalState();

  React.useEffect(() => {
    if (!!walletAddress) {
      fetchWallet(walletAddress);
      fetchTransactionss();
    }
  }, []);

  const handleSignOut = (): void => {
    signOut();
  };

  if (walletAddress && walletData?.balance) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header walletAddress={walletAddress} signOutAction={handleSignOut} />

        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.screenContainer}>
            <View style={styles.widgetContainer}>
              <JobCoinBalance balance={walletData?.balance} />
            </View>
            <View style={styles.widgetContainer}>
              <SendJobCoin walletAddress={walletAddress} />
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

const mapStateToProps = (state: any) => {
  return {
    transactions: state.transactions,
    walletAddress: state.walletAddress,
    walletData: state.walletData,
  };
};

export default connect(mapStateToProps, {
  fetchTransactionss,
  fetchWallet,
  signOut,
})(HomeScreen);
