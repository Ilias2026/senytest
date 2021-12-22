import React from 'react';
import readTabs from '../storage/readTabs';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const intialState = {
        tabs: readTabs(),
        dates: {
            startDate: new Date(),
            endDate: new Date()
        },
    }
    const [state, setState] = React.useState(intialState)
    return (
        <AppContext.Provider value={[state, setState]}>
            {children}
        </AppContext.Provider>
    )
}