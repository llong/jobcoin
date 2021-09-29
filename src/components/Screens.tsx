import React, { ReactElement } from 'react';
import { connect } from 'react-redux';

// Import Screens
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/homeScreen/HomeScreen';

interface IProps {
  walletAddress?: string;
}

const Screens: React.FC<IProps> = ({ walletAddress }): ReactElement => {
  return !!walletAddress ? <HomeScreen /> : <SignInScreen />;
};

function mapStateToProps({ walletAddress }: { walletAddress: string }) {
  return {
    walletAddress,
  };
}

export default connect(mapStateToProps)(Screens);
