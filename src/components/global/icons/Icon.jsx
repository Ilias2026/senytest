import { css } from '@emotion/react';
import React from 'react';

const Icon = ({ children }) => {
    return (
        <div css={iconStyle}>
            {children}
        </div>
    );
}

const iconStyle = () => {
    return css`
            display: flex;
            & svg {
                width: 1.2em;
                height: 1.2em;
            }
            `
}

export default Icon;