import React from 'react';
import AddTabModal from './AddTabModal';

const AddTabButton = () => {
    const [state, setState] = React.useState({ modalVisible: false })
    function handleClick() {
        showModal()
    }

    //toggle modal visibility
    function alterModalVisibility(visible = false) {
        setState(prevState => ({ ...prevState, modalVisible: visible }))
    }

    //show modal to add new tab
    function showModal() {
        alterModalVisibility(true)
    }

    //dismiss the modal
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