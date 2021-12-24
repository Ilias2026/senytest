import React from 'react';
import readTabs from '../storage/readTabs';

export const AppContext = React.createContext();

/*
a global app state for managing all the tabs
*/

export const AppProvider = ({ children }) => {
    const intialState = {
        tabs: readTabs(),
    }
    const [state, setState] = React.useState(intialState)
    return (
        <AppContext.Provider value={[state, setState]}>
            {children}
        </AppContext.Provider>
    )
}