import { css } from '@emotion/react';
import React from 'react';
import newPRSchema from '../../dataSchema/newPRSchema';
import Modal from '../global/modal/Modal';
import useApp from '../../hooks/useApp'
import flake from '../../utils/flake';
import addTab from '../../storage/addTab';
import Tooltip from '../global/tooltips/Tooltip';
import { useNavigate } from 'react-router-dom';

import Icon from '../global/icons/Icon';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

/*
Modal for adding new tabs
*/

/**
 * 
 * @param {Object} props
 * @param {CallableFunction} props.onClose - function to close the modal
 * @returns 
 */
const AddTabModal = ({ onClose }) => {
    const navigate = useNavigate()
    const [state, setState] = React.useState({
        selected: {}
    })
    const [, setAppState] = useApp()

    //handling name state change
    const nameChange = (e) => {
        const { value: name } = e.target;
        setState(prevState => {
            return { ...prevState, name }
        })
    }

    //handling metric state change
    const optionChange = (option) => {
        const { key, name } = option
        setState(prevState => {
            return {
                ...prevState,
                name, //set name with predicted name from metric option
                selected: {
                    // ...prevState.selected,
                    [key]: !prevState.selected[key]
                }
            }
        })
    }

    //handling submit
    const addNewTab = (e) => {
        e.preventDefault(); //prevent form from redirecting
        if (!state.name || !state.name.trim()) {
            return false;
        }

        //we get chosen metrics from state (for this case there's only one)
        const chosenMetrics = Object.entries(state.selected).filter(entry => !!entry[1]).map(entry => entry[0])
        if (!chosenMetrics.length) {
            return false;
        }
        const newTab = {
            _id: flake.gen(), //generating a random id for each tab using flakeid
            name: state.name.trim(),
            metrics: chosenMetrics
        }
        //store tab in local storage
        addTab(newTab) 

        //update app state to render new tab
        setAppState(prevState => {
            return {
                ...prevState,
                tabs: [
                    ...(prevState.tabs || []),
                    newTab
                ]
            }
        })

        //navigate to the new tab
        navigate('/insight/' + newTab._id)

        //call onClose CallableFunction to dismiss modal
        onClose()
    }

    return (
        <Modal onClose={onClose}>
            <form css={addContainerStyle} onSubmit={addNewTab}>
                <h2 className='title'>Adding new Metric</h2>
                <label className='inputContainer'>
                    Name: <input className='input' autoFocus name="name" value={state.name || ""} onChange={nameChange} />
                </label>
                <div className="addContent">
                    {
                        newPRSchema.options.map((option, i) => {
                            return (
                                <label key={option.key} className={'engage addOption' + (state.selected[option.key] ? ' active' : '')}>
                                    <input hidden type="checkbox" name={option.key} value={option.name} checked={state.selected[option.key] || false}
                                        onChange={() => {
                                            optionChange(option)
                                        }} />
                                    <div>{option.name}</div>
                                    <Tooltip message={option.tip} >
                                        <Icon icon={faQuestionCircle} color="#777" size={'.9em'} />
                                    </Tooltip>
                                </label>
                            )
                        })
                    }
                </div>
                <div>
                    <button className='button1 addButton' type="submit">Add new</button>
                </div>
            </form>
        </Modal>
    )
}

const addContainerStyle = () => {
    return css`

        & .title {
            width: fit-content;
            margin: 0px 10px 20px auto;
        }

        & .addContent {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-gap: 8px;
            margin: 30px 0px;
        }

        & .addOption {
            display: flex;
            align-items: center;
            // justify-content: space-between;
            gap: 10px;
        }

        & .addButton {
            display: block;
            margin: 20px 10px 10px auto;
        }
    `
}

export default AddTabModal;