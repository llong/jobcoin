import React, { createContext, useState } from 'react';
import Screens from './components/Screens';
import { GlobalStateProvider } from './state/GlobalState';
import { Provider } from 'react-redux';
import store from './state/store';

const initialState = {
  walletAddress: '',
  walletData: {},
  transactions: [],
};

const App: React.FC = () => {
  return (
    <Provider store={store(initialState)}>
      <GlobalStateProvider>
        <Screens />
      </GlobalStateProvider>
    </Provider>
  );
};

export default App;
