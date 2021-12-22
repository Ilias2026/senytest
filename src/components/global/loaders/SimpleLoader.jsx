import { css } from '@emotion/react';
import React from 'react';
import constaintsStyles from '../../../styles/constants';

const SimpleLoader = () => {
    return (
        <div css={loaderStyle}>
            <div className="modern-loader">
                <span>Loading...</span>
            </div>
        </div>
    );
}

const loaderStyle = () => {
    return css`
    position: relative;
    margin-top: 10%;
    
    .modern-loader {
        width: 10em;
        height: 10em;
        font-size: 25px;
        box-sizing: border-box;
        border-top: 0.3em solid ${constaintsStyles.colorOrange2};
        border-radius: 50%;
        position: relative;
        animation: rotating 2s ease-in-out infinite;
        --direction: 1;
        margin: 100px auto;
    }
    
    .modern-loader::before,
    .modern-loader::after {
        content: '';
        position: absolute;
        width: inherit;
        height: inherit;
        border-radius: 50%;
        box-sizing: border-box;
        top: -0.2em;
    }
    
    .modern-loader::before {
        border-top: 0.3em solid ${constaintsStyles.colorOrange1};
        transform: rotate(120deg);
    }
    
    .modern-loader::after {
        border-top: 0.3em solid ${constaintsStyles.blue1};
        transform: rotate(240deg);
    }
    
    .modern-loader span {
        position: absolute;
        width: inherit;
        height: inherit;
        text-align: center;
        line-height: 10em;
        font-family: sans-serif;
        animation: rotating 2s linear infinite;
        --direction: -1;
    }
    
    @keyframes rotating {
        50% {
            transform: rotate(calc(180deg * var(--direction)));
        }
    
        100% {
            transform: rotate(calc(360deg * var(--direction)));
        }
    }
    `
}

export default SimpleLoader;