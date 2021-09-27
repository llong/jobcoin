import React, {ReactElement} from 'react';
import {useGlobalState} from '../state/GlobalState';

// Import Screens
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/homeScreen/HomeScreen';

const Screens: React.FC = (): ReactElement => {
  const {state} = useGlobalState();
  return !!state.walletAddress ? <HomeScreen /> : <SignInScreen />;
};

export default Screens;
