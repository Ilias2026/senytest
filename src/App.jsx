import React from 'react';
import { AppProvider } from './context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import { DateProvider } from './context/DateContext';

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <DateProvider>
          <Main />
        </DateProvider>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
