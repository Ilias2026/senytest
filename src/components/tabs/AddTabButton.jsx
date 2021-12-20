import React from 'react';
import useApp from '../../hooks/useApp';

const AddTabButton = () => {
    const [appState, setAppState] = useApp()
    function handleClick() {
        setAppState(prevState => {
            const newState = { ...prevState };
            if (!newState.tabs) {
                newState.tabs = []
            }
            newState.tabs.push({
                name: 'tab ' + Date.now()
            })
            return { ...newState }
        })
    }

    return (
        <button onClick={handleClick}>Add</button>
    )
}

export default AddTabButton;