import React from 'react';
import useApp from '../../hooks/useApp';
import AddTabModal from './AddTabModal';

const AddTabButton = () => {
    const [state, setState] = React.useState({ modalVisible: false })
    const [appState, setAppState] = useApp()
    function handleClick() {
        showModal()
    }

    function alterModalVisibility(visible = false) {
        setState(prevState => ({ ...prevState, modalVisible: visible }))
    }

    function showModal() {
        alterModalVisibility(true)
    }

    function hideModal() {
        alterModalVisibility(false)
    }

    return (
        <>
            <button className='button1' onClick={handleClick}>Add</button>
            {
                state.modalVisible ? (
                    <AddTabModal onClose={hideModal} />
                ) : (<></>)
            }
        </>
    )
}

export default AddTabButton;