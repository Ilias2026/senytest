import { css } from '@emotion/react';
import React from 'react';
import logo from '../logo-grey.png';
import DateFilter from './DateFilter';
import { Routes, Route, } from 'react-router-dom';
import Insights from './Insights/Insights';
import constaintsStyles from '../styles/constants';
import { Link } from 'react-router-dom';
import Home from './Home';
const { lightShadow, colorOrange1, colorOrange2, input, inputContainer } = constaintsStyles;

const Main = () => {
  return (
    <div css={appStyle}>
      <header>
        <Link to="/">
          <img src={logo} alt="athenian-logo" />
        </Link>
        <h1>Athenian WebApp Tech Assessment</h1>
      </header>
      <div className="body">
        <DateFilter />
        <div className="insights">
          <h2 className='title'>Insights</h2>
          <Routes>
            <Route exact path="/insight/:_id" element={<Insights />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <div className="control">

          </div>
        </div>
      </div>
    </div>
  )
}

const padding = 50;

const appStyle = () => {
  return css`
      width: 100%;
      height: calc(100vh - ${padding * 2}px);
      overflow: auto;
      background: whitesmoke;
      padding: ${padding}px 0;
  
      & header {
          text-align: center;
      }

      & .body {
        width: clamp(90%, 900px, 100%);
        margin: 0 auto;
      }
  
      & div.insights {
        padding: 30px 0 60px 0;
        ${lightShadow}
        & .title {
            text-align: center;
        }
      }

      & .button1 {
        padding: 8px 12px;
        border: 1px solid transparent;
        cursor: pointer;
        background-color: white;
        color: black;
        text-decoration: none;
        ${lightShadow}
        transition: border .3s;
        
        &:hover {
          border-color: ${colorOrange1};
        }
        &.active {
          border-color: ${colorOrange1};
          background-color: ${colorOrange2};
        }
      }


      & ${inputContainer}
      & ${input}
    `;
};

export default Main;