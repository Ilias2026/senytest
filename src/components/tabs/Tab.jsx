import React from 'react';
import { Link } from 'react-router-dom';
import { css } from "@emotion/react";
import Tooltip from '../global/tooltips/Tooltip';
import Icon from "../global/icons/Icon";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import Modal from '../global/modal/Modal';
import useApp from '../../hooks/useApp';
import refreshTabs from '../../storage/refreshTabs';
import { useNavigate } from 'react-router-dom';

import constaintsStyles from '../../styles/constants';
const { red2 } = constaintsStyles;

const Tab = ({ tab, active }) => {
    const [appState, setAppState] = useApp()
    const [state, setState] = React.useState({})
    const navigate = useNavigate()

    const handleClickDelete = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setState(prevState => ({ ...prevState, isDeleting: true }))
    }

    const hideModal = () => {
        setState(prevState => ({ ...prevState, isDeleting: false }))
    }

    const deleteTab = () => {
        const newTabs = appState.tabs.filter(x => x._id !== tab._id)
        setAppState(prevState => ({ ...prevState, tabs: newTabs }))
        hideModal()
        navigate('/')
        refreshTabs(newTabs)
    }

    return (
        <>
            <Link to={"/insight/" + tab._id} className={('engage' + (active ? ' active' : ''))}>
                <div css={tabStyle}>
                    <div>
                        {tab.name}
                    </div>
                    <div onClick={handleClickDelete}>
                        <Tooltip message={`delete ${tab.name}`}>
                            <Icon icon={faTimesCircle} />
                        </Tooltip>
                    </div>
                </div>
            </Link>
            {
                state.isDeleting ? (
                    <Modal onClose={hideModal}>
                        <div css={modalStyle}>
                            <div className='title2'>
                                Are you sure you want to delete {tab.name} ?
                            </div>
                            <div className='btn-group'>
                                <button onClick={hideModal} className='button1'>
                                    Cancel
                                </button>
                                <button onClick={deleteTab} className='button deleteButton'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </Modal>
                ) : (<></>)
            }
        </>
    )
}

const tabStyle = () => {
    return css`
    display: flex;
    gap: 10px;
    `
}

const modalStyle = () => {
    return css`
    padding: 20px 30px;

    & .btn-group {
        display: flex;
        gap: 100px;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 20px;
    }

    & .deleteButton {
        background-color: ${red2};
        color: white;
    }
    `
}

export default Tab;