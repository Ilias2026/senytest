import { css } from '@emotion/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import useApp from '../../hooks/useApp';
import AddTabButton from './AddTabButton';
import Tab from './Tab';

/*
just a list of tabs consumed for app state
*/

const Tabs = ({ children }) => {
  const [appState] = useApp()
  const params = useParams()
  const { _id } = params;
  return (
    <div>
      <div css={tabsStyle}>
        {
          Array.isArray(appState.tabs) && appState.tabs.map((tab, i) => (
            <Tab key={tab._id} tab={tab} active={_id === tab._id} />
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
    `;
};

export default Tabs;