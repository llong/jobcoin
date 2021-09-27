import React, { ReactElement } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface IHeader {
  walletAddress: string;
  signOutAction: () => void;
}

const Header: React.FC<IHeader> = ({
  walletAddress,
  signOutAction,
}): ReactElement => {
  return (
    <View style={styles.mainContainer}>
      <Text>{walletAddress}</Text>
      <Button title="Sign Out" onPress={signOutAction} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 48,
    borderBottomWidth: 1,
    borderColor: '#999',
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
});

export default Header;
