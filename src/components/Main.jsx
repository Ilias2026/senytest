import { css } from '@emotion/react';
import React from 'react';
import Insights from './Insights';
import logo from '../logo-grey.png';
import kpiScreen from '../kpi-screen.png';
import DateFilter from './DateFilter';
import Tabs from './tabs/Tabs';

const Main = () => {
    return (
        <div css={appStyle}>
            <header>
                <a
                    href="https://athenian.co"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={logo} alt="athenian-logo" />
                </a>
                <h1>Athenian WebApp Tech Assessment</h1>
            </header>
            <div className="body">
                <DateFilter />
                <div className="insights">
                    <h2>Insights</h2>
                    <Tabs>
                        <Box metricName="X"></Box>
                    </Tabs>
                    <div className="control">

                    </div>
                </div>
            </div>
        </div>
    )
}

const Box = ({ metricName }) => {
    return (
        <div css={boxStyle}>
            <button>X</button>
            <h3>Insights for metric {metricName}</h3>
            <Insights />
            <img className="kpi" src={kpiScreen} alt="kpi" />
        </div>
    );
};


const lightShadow = `box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, .3);`

const appStyle = () => {
    return css`
      width: 100%;
      text-align: center;
      background: whitesmoke;
      padding: 50px 0;
  
      & .body {
        width: clamp(90%, 900px, 100%);
        margin: 0 auto;
      }
  
      & div.insights {
        padding: 30px 0 60px 0;
        ${lightShadow}
      }
    `;
};

const boxStyle = () => {
    return css`
      width: clamp(75%, 800px, 100%);
      margin: 0px auto;
      text-align: center;
      ${lightShadow}
      background-color: white;
  
      & img.chart {
        width: 45%;
        height: 200px;
        margin: 5px 5px;
      }
  
      & img.kpi {
        width: 45%;
        height: 50px;
        margin: 5px 5px;
      }
    `;
};

export default Main;