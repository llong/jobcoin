import React, { ReactElement } from 'react';
import { Text, SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { useGlobalState } from '../state/GlobalState';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { Alert } from 'react-native';

const SignInScreen: React.FC = (): ReactElement => {
  const [walletAddress, setWalletAddress] = React.useState<string>('');
  const { setState } = useGlobalState();
  const handleSignIn = (): void => {
    if (walletAddress) {
      setState(prev => ({ ...prev, walletAddress }));
    } else {
      Alert.alert('Please enter a valid wallet address');
    }
  };

  const logoURL =
    'https://th.bing.com/th/id/R.77436e4b88acd5b33881ebf0ebd2cfb2?rik=YXnXIi%2bLIdqm2A&pid=ImgRaw&r=0';

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView>
        <Image source={{ uri: logoURL }} style={styles.logo} />
        <Text style={styles.headerText}>
          Welcome! Sign in with your jobcoin address.
        </Text>
        <Text>Jobcoin Address</Text>
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
    alignItems: 'center',
    flexGrow: 1,
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
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 48,
  },
  logo: {
    resizeMode: 'contain',
    alignSelf: 'stretch',
    height: 200,
    marginTop: -48, // counteract the padding on the logo image
  },
});

export default SignInScreen;
