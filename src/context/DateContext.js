import React from 'react';

export const DateContext = React.createContext();

export const DateProvider = ({ children }) => {
    const currDate = new Date()
    const prevDate = new Date(currDate.getTime() - (1000 * 60 * 60 * 24 * 7))
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