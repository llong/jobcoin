import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { postTransaction } from '../state/actions';

// Import Components
import TextInput from '../components/TextInput';
import Button from '../components/Button';

interface IProps {
  walletAddress: string;
  postTransaction: any;
}

const SendJobCoin: React.FC<IProps> = ({ walletAddress, postTransaction }) => {
  const [amountToSend, setAmountToSend] = useState('0');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [error, setError] = useState('');

  const handleSendJobcoin = (): void => {
    const url = 'http://jobcoin.gemini.com/rascal-alibi/api/transactions';

    // Check if transaction body is valid
    if (parseInt(amountToSend) > 0 && destinationAddress && walletAddress) {
      postTransaction({
        fromAddress: walletAddress,
        toAddress: destinationAddress,
        amount: amountToSend,
      });
      setAmountToSend('');
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

export default connect(null, { postTransaction })(SendJobCoin);
