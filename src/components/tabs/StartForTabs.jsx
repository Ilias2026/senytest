import { css } from '@emotion/react';
import React from 'react';
import useApp from '../../hooks/useApp';

const StartForTabs = () => {
    const [appState] = useApp()
    const isNew = !appState.tabs || !appState.tabs.length;
    return (
        <div css={welcomeStyle}>
            <div className='welcomeTitle'>
                <div class="emoji">&#9757;</div>
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
        gap: 5px;
        align-items: center;
        width: fit-content;
        margin: 150px auto;
    }

    & .emoji {
        font-size: 1.5em;
        animation: emojiAnim 1s ease-in-out infinite;
    }

    @keyframes emojiAnim {
        0%, 100% {
            transform: translate(0%, 0%);
        }

        50% {
            transform: translate(0%, -25%);
        }

    }
    `
}

export default StartForTabs;