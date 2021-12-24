import { css } from '@emotion/react';
import React from 'react';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import Icon from '../icons/Icon';

/*
a simple, animated icon for simulating a loader
*/

const SimpleLoader = () => {
    return (
        <div css={loaderStyle}>
            <div className="simple-loader">
                <Icon icon={faCircleNotch} size='80px' />
            </div>
        </div>
    );
}

const loaderStyle = () => {
    return css`
    position: relative;
    margin-top: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    & .simple-loader {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        50% {
            transform: rotate(180deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
    `
}

export default SimpleLoader;