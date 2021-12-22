import { css } from '@emotion/react';
import React from 'react';
import newPRSchema from '../../dataSchema/newPRSchema';
import Modal from '../global/modal/Modal';
import useApp from '../../hooks/useApp'
import flake from '../../utils/flake';
import addTab from '../../storage/addTab';
import Icon from '../global/icons/Icon';
import Tooltip from '../global/tooltips/Tooltip';
import InfoSVG from '../../svg/InfoSVG';
import { useNavigate } from 'react-router-dom';

const AddTabModal = ({ onClose }) => {
    const navigate = useNavigate()
    const [state, setState] = React.useState({
        selected: {}
    })
    const [appState, setAppState] = useApp()

    const nameChange = (e) => {
        const { value: name } = e.target;
        setState(prevState => {
            return { ...prevState, name }
        })
    }

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

    const addNewTab = () => {
        if (!state.name || !state.name.trim()) {
            return false;
        }
        const chosenMetrics = Object.entries(state.selected).filter(entry => !!entry[1]).map(entry => entry[0])
        if (!chosenMetrics.length) {
            return false;
        }
        const newTab = {
            _id: flake.gen(),
            name: state.name.trim(),
            metrics: chosenMetrics
        }
        addTab(newTab) //add tab to local storage
        setAppState(prevState => {
            return {
                ...prevState,
                tabs: [
                    ...(prevState.tabs || []),
                    newTab
                ]
            }
        })
        navigate('/insight/' + newTab._id)
        onClose()
    }

    return (
        <Modal onClose={onClose}>
            <div css={addContainerStyle}>
                <h2 className='title'>Adding new Metric</h2>
                <label className='inputContainer'>
                    Name: <input className='input' autoFocus name="name" value={state.name || ""} onChange={nameChange} />
                </label>
                <div className="addContent">
                    {
                        newPRSchema.options.map((option, i) => {
                            return (
                                <label key={option.key} className={'button1 addOption' + (state.selected[option.key] ? ' active' : '')}>
                                    <input hidden type="checkbox" name={option.key} value={option.name} checked={state.selected[option.key] || false}
                                        onChange={() => {
                                            optionChange(option)
                                        }} />
                                    <div>{option.name}</div>
                                    <Tooltip message={option.tip} >
                                        <Icon>
                                            <InfoSVG />
                                        </Icon>
                                    </Tooltip>
                                </label>
                            )
                        })
                    }
                </div>
                <div>
                    <button className='button1 addButton' onClick={addNewTab}>Add new</button>
                </div>
            </div>
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