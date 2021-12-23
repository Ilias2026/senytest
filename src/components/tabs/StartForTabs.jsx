import { css } from '@emotion/react';
import React from 'react';
import useApp from '../../hooks/useApp';

import Icon from "../global/icons/Icon";
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons'

const StartForTabs = () => {
    const [appState] = useApp()
    const isNew = !appState.tabs || !appState.tabs.length;
    return (
        <div css={welcomeStyle}>
            <div className='welcomeTitle'>
                <div className="emoji">
                    <Icon icon={faArrowAltCircleUp} />
                </div>
                <div>
                    start by {
                        isNew ? "adding a new" : "selecting a"
                    } tab
                </div>
            </div>
        </div>
    );
}

const welcomeStyle = () => {
    return css`
    & .welcomeTitle {
        font-size: 30pt;
        display: flex;
        gap: 10px;
        align-items: center;
        width: fit-content;
        margin: 140px auto;
    }

    & .emoji {
        font-size: 1em;
        animation: emojiAnim 1s ease-in-out infinite;
    }

    @keyframes emojiAnim {
        0%, 100% {
            transform: translate(0%, 10%);
        }

        50% {
            transform: translate(0%, -10%);
        }

    }
    `
}

export default StartForTabs;