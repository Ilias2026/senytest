import { css } from '@emotion/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import useApp from '../../hooks/useApp'
import Tabs from '../tabs/Tabs'
import network from '../../utils/network';
import RegisterChart from './RegisterChart'
import { Line, Bar } from 'react-chartjs-2';

import constaintsStyles from '../../styles/constants';
import date from '../../utils/date';
import useDate from '../../hooks/useDate';
import SimpleLoader from '../global/loaders/SimpleLoader';
import color from '../../utils/color';
import getPRInfo from '../../dataSchema/getPRInfo';
import newPRSchema from '../../dataSchema/newPRSchema';
const { lightShadow } = constaintsStyles;

//register dependecies for chartjs 3.0.0+
RegisterChart.register()

const Insights = () => {
  const [state, setState] = React.useState({
    serverLoaded: false,
  })
  //we consume date state and app state
  const [dateState] = useDate()
  const [appState] = useApp()
  const params = useParams()
  const { _id } = params;
  //retrieve tabs info from app state
  const tab = appState.tabs && appState.tabs.find(tab => tab._id === _id)

  React.useEffect(() => {
    //in case a tab is unavailable, we mount a notFound component
    if (!tab) {
      setState(prevState => {
        return {
          ...prevState,
          serverLoaded: true,
          notFound: true,
        }
      })
      return false;
    }

    //set serverLoaded to false to show a loader until the server responds
    setState(prevState => {
      return {
        ...prevState,
        serverLoaded: false,
      }
    })

    const repositories = [
      "github.com/athenianco/athenian-api",
      "github.com/athenianco/athenian-webapp",
      "github.com/athenianco/infrastructure",
      "github.com/athenianco/metadata"
    ]

    //start fetching data from the server
    network.post("https://api.athenian.co/v1/metrics/pull_requests", {
      for: [
        {
          repositories,
          repogroups: repositories.map((r, i) => [i])
        }
      ],
      metrics: tab.metrics,
      date_from: date.formatDateHTML(dateState.startDate),
      date_to: date.formatDateHTML(dateState.endDate),
      granularities: ["day"],
      exclude_inactive: true,
      account: 1,
      timezone: dateState.offset || 0
    }).then(data => {
      //map reduce the data
      const { metrics, calculated } = data;
      //we calculate the days between the start and end date to know how many days we have to iterate
      const daysInterval = date.calculateDaysInterval(data.date_to, data.date_from)
      
      //this tells us how many dates will be visible in the charts (we may see an extra day if the range is not a multiple of maxLabelCount)
      const maxLabelCount = 4

      //this is just to tell us the maximum data count from the repos (in case there's a mismatch)
      const maxDataArray = calculated.reduce((prev, c) => (c.values.length > prev.values.length) ? c : prev, { values: [] })
      const maxDataCount = maxDataArray.values.length

      //we calculate the step in which we show data in the charts
      const step = Math.ceil(daysInterval / maxLabelCount)

      const timeLabels = []
      const timeData = []

      //get a readable form of repos urls
      const reposLabels = calculated.map(c => c.for.repositories[0].split('/').slice(1).join('/'))

      //an array that weill have the repos average data
      const reposData = new Array(reposLabels.length).fill(0)

      let total = 0

      const dataIndex = 0
      const metricInfo = getPRInfo(metrics[dataIndex])

      const metricType = (metricInfo && metricInfo.type) || 'count'; // count default (could be time)

      //we get the time from the server as a string (exp: 1222s) so we use the type time to get parsed
      const parser = newPRSchema.parsers[metricType]

      //we use these variables to calculate the average in each interval of time step
      let count = 0
      let perCount = 0


      for (let i = 0; i < maxDataCount; i++) {

        //sum the current value from all repos
        const accrossData = calculated.reduce((prev, curr, repoIndex) => {
          //we get the value using the parser (we need this for time because we get string from the server)
          let value = parser(curr.values[i].values[dataIndex]) || 0;

          //we add the value for each concerned repo
          reposData[repoIndex] += value;
          return prev + value //this is the total from all repos
        }, 0)
        count += accrossData
        perCount += 1

        //if we reach the step, we add the average to the timeLabels and timeData
        if (i % step === 0 || i === maxDataCount - 1) {
          timeLabels.push(date.formatDateSmall(maxDataArray.values[i].date))
          // timeData.push(accrossData)
          timeData.push(count / perCount)

          //we reset the count and perCount for the next step
          count = perCount = 0
        }
        total += accrossData;
      }
      const repoAverage = reposData.map(x => x / maxDataCount);
      const averageData = total / maxDataCount

      //set the final state
      setState(prevState => {
        return {
          ...prevState,
          serverLoaded: true,
          tab,
          metricInfo,
          data,
          timeLabels,
          timeData,
          average: averageData,
          averagePerRep: repoAverage.reduce((a, b) => a + b, 0) / repoAverage.length,
          reposLabels,
          repoAverage,
        }
      })
    })

  }, [params, dateState, tab])

  //chartjs options
  const options = {
    responsive: true,
    tension: .3,
    plugins: {
      legend: {
        display: false
      },
    }
  }

  //we get the metric type to show a friendly information (exp: time => 2H 12M 3S)
  let simplifier;
  if (state.metricInfo) {
    //set simplifier for current metric
    simplifier = newPRSchema.simplifiers[state.metricInfo.type]
    if (simplifier) {
      options.plugins.tooltip = {
        enabled: true,
        usePointStyle: true,
        callbacks: {
          // To change title in tooltip
          // title: (data) => { return data[0].parsed.x },

          // To change label in tooltip
          label: (data) => {
            return simplifier(data.parsed.y)
          }
        },
      }
    }
  }
  return (
    <>
      <Tabs />
      <div key={_id}>
        {
          state.serverLoaded ? (
            state.notFound ? (
              <div>404 Not Found!</div>
            ) : (
              //content
              <div css={boxStyle}>
                <h2>
                  Insights for metric {state.metricInfo.name}
                </h2>
                <div className='charts'>
                  <div>
                    <Line
                      options={options}
                      data={{
                        labels: state.timeLabels || [],
                        datasets: [
                          {
                            fill: true,
                            data: state.timeData || [],
                            backgroundColor: 'rgba(255, 0, 0, .1)',
                            borderColor: 'rgba(255, 0, 0, .5)',
                          }, {
                            data: new Array(state.timeData.length).fill(state.average),
                            pointRadius: 0,
                            borderDash: [10, 5],
                            backgroundColor: '#aedee4',
                            borderColor: '#aedee4',
                          },
                        ],
                      }}
                    />
                  </div>

                  <div>
                    <Bar
                      options={options}
                      data={{
                        labels: state.reposLabels || [],
                        datasets: [
                          {
                            fill: true,
                            data: state.repoAverage || [],
                            backgroundColor: color.getRandomColors(state.reposLabels.length),
                            // backgroundColor: '#aedee4',
                            borderColor: '#aedee4',
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
                <div className='kpiCon'>
                  <div className='kpi engage'>
                    <span>Average</span>
                    <span>{simplifier ? simplifier(state.average) : Number(state.average).toFixed(2)}</span>
                  </div>
                  <div className='kpi engage'>
                    <span>Average Per Repo</span>
                    <span>{simplifier ? simplifier(state.averagePerRep) : Number(state.averagePerRep).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )
          ) : (
            <SimpleLoader />
          )
        }
      </div>
    </>
  )
}

const boxStyle = () => {
  return css`
      width: clamp(75%, 800px, 100%);
      margin: 0px auto;
      text-align: center;
      ${lightShadow}
      background-color: white;
      padding: 20px 40px;
  
      & .charts {
        display: flex;
        flex-wrap: wrap;
        gap: 50px;
        margin: 50px 0px 20px 0px;

        & div {
          flex: 1
        }
      }
  
      & .kpiCon{
        display: flex;
        gap: 100px;
        justify-content: center;
        & .kpi {
          min-width: 200px;
          display: flex;
          gap: 20px;
          justify-content: space-between;
          
          & span:first-of-type {
            text-transform: uppercase;
            color: #555;
          }

          & span:last-of-type {
            font-weight: bold;
          }
        }
      }
    `;
};


export default Insights;