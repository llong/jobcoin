import React, {createContext, useState} from 'react';
import Screens from './components/Screens';
import {GlobalStateProvider} from './state/GlobalState';

const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <Screens />
    </GlobalStateProvider>
  );
};

export default App;
