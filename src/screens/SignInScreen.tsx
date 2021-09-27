import React, {ReactElement} from 'react';
import {Text, SafeAreaView, StyleSheet, View} from 'react-native';
import {useGlobalState} from '../state/GlobalState';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

const SignInScreen: React.FC = (): ReactElement => {
  const [walletAddress, setWalletAddress] = React.useState<string>('');
  const {state, setState} = useGlobalState();
  const handleSignIn = (): void => {
    if (walletAddress) {
      setState(prev => ({...prev, walletAddress}));
    }
  };

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView>
        <Text>Sign In</Text>
        <TextInput
          placeholder="Enter Your Jobcoin Address"
          onChangeText={input => setWalletAddress(input)}
        />
        <Button onPress={handleSignIn} label="Sign In" />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 16,
    justifyContent: 'center',
    height: '100%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#999',
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'rgb(20,20,150)',
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});

export default SignInScreen;
