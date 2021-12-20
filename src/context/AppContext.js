import React from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [state, setState] = React.useState({})
    return (
        <AppContext.Provider value={[state, setState]}>
            {children}
        </AppContext.Provider>
    )
}