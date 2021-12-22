import { css } from '@emotion/react';
import React from 'react';

const Tooltip = ({ children, message }) => {
    return (
        <div css={tooltipStyle}>
            {children}
            <div className='tooltipContent'>
                {message}
            </div>
        </div>
    );
}

const tooltipStyle = () => {
    return css`
        position: relative;

        &:hover {
            .tooltipContent {
                display: block;
            }
        }

        & .tooltipContent{
            display: none;
            position: absolute;
            top: 0px;
            transform: translate(calc(-50% + 10px), -100%);
            color: white;
            background-color: rgba(0, 0, 0, .7);
            padding: 5px 15px;
            border-radius: 4px;

            white-space: nowrap;
        }
    `
}

export default Tooltip;