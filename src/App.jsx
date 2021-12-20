import React from 'react';
import { AppProvider } from './context/AppContext';
import Main from './components/Main';

const App = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

export default App;
