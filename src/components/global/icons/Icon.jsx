import { css } from '@emotion/react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Icon = (props) => {
    const options = {
        icon: props.icon,
        color: props.color,
    }
    return (
        <div css={iconStyle}>
            <FontAwesomeIcon {...options} style={{
                fontSize: props.size || '1em'
            }} />
        </div>
    );
}

const iconStyle = () => {
    return css`
    
    `
}

export default Icon;