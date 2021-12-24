import React from 'react';

export const DateContext = React.createContext();

/*
a state provider for the date range
*/

export const DateProvider = ({ children }) => {
    const currDate = new Date()
    const prevDate = new Date(currDate.getTime() - (1000 * 60 * 60 * 24 * 7)) // 7 days ago by default
    const intialState = {
        startDate: prevDate,
        endDate: currDate,
        offset: currDate.getTimezoneOffset()
    }
    const [state, setState] = React.useState(intialState)
    return (
        <DateContext.Provider value={[state, setState]}>
            {children}
        </DateContext.Provider>
    )
}