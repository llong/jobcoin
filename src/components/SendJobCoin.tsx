import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useGlobalState } from '../state/GlobalState';
import { getWalletAddress, sendTransaction } from '../api/apiService';

// Import Components
import TextInput from '../components/TextInput';
import Button from '../components/Button';

interface IProps {
  walletAddress: string;
}

const SendJobCoin: React.FC<IProps> = ({ walletAddress }) => {
  const [amountToSend, setAmountToSend] = useState('0');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [error, setError] = useState('');
  const { setState } = useGlobalState();

  const handleSendJobcoin = (): void => {
    const url = 'http://jobcoin.gemini.com/rascal-alibi/api/transactions';

    // Check if transaction body is valid
    if (parseInt(amountToSend) > 0 && destinationAddress && walletAddress) {
      sendTransaction({
        fromAddress: walletAddress,
        toAddress: destinationAddress,
        amount: amountToSend,
      })
        .then(_ => {
          getWalletAddress(walletAddress).then(res =>
            setState(prevState => ({ ...prevState, walletData: res })),
          );
          setAmountToSend('');
        })
        .catch(err => setError(err));
    } else {
      Alert.alert('please enter a valid address and amount to send.');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        {!!error && <Text>{error}</Text>}
        <Text>Destination Address</Text>
        <TextInput
          placeholder="Enter Destination Address"
          value={destinationAddress}
          onChangeText={input => setDestinationAddress(input)}
        />
      </View>
      <View>
        <Text>Amount to Send</Text>
        <TextInput
          value={amountToSend}
          onChangeText={input => setAmountToSend(input)}
        />
      </View>
      <Button label="Send Jobcoin" onPress={handleSendJobcoin} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
  },
});

export default SendJobCoin;
