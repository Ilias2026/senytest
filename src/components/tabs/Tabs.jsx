import { css } from '@emotion/react';
import React from 'react';
import useApp from '../../hooks/useApp';
import constaintsStyles from '../../styles/constants';
import AddTabButton from './AddTabButton';
import Tab from './Tab';
const { lightShadow, colorOrange1, colorOrange2 } = constaintsStyles;
const Tabs = ({ children }) => {
  const [appState, setAppState] = useApp()
  return (
    <div>
      <div css={tabsStyle}>
        {
          Array.isArray(appState.tabs) && appState.tabs.map((tab, i) => (
            <Tab key={i} name={tab.name} />
          ))
        }
        <AddTabButton />
      </div>
      {children}
    </div>
  );
};

const tabsStyle = () => {
  return css`
      width: 75%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 25px auto 15px;
      gap: 10px;
      & > span, button {
        padding: 8px 12px;
        border: 1px solid transparent;
        cursor: pointer;
        background-color: white;
        ${lightShadow}
        transition: .3s;
        
        &:hover {
          border-color: ${colorOrange1};
        }
        &[active] {
          border-color: ${colorOrange1};
          background-color: ${colorOrange2};
        }
      }
    `;
};

export default Tabs;