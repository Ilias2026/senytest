import React from 'react';
import { AppProvider } from './context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';

/*
<Main> is wrapped in <BrowserRouter> to provide routing and <AppProvider> to provide the context.
*/

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Main />
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
