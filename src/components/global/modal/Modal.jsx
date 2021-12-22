import React from 'react';
import { css } from '@emotion/react';

const Modal = ({ children, onClose }) => {
    const ref = React.useRef()

    function onClickOut(e) {
        if (e.target === ref.current) {
            typeof onClose === 'function' && onClose(e)
        }
    }
    return (
        <div ref={ref} css={ModalStyle} onClick={onClickOut}>
            <div className='modalContent'>
                {children}
            </div>
        </div>
    )
}

const ModalStyle = () => {
    return css`
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .2);
    height: 100vh;
    overflow: auto;
    
    .modalContent {
        background-color: white;
        padding: 20px;
    }
    `
}

export default Modal;