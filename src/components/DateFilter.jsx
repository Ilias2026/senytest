import React from "react";
import { css } from "@emotion/react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import formatDate from "../utils/formatDate";

export default function DateFilter({ onChange }) {
  const [state, setState] = React.useState({
    dates: {
      startDate: new Date(),
      endDate: new Date(),
      key: "dates",
    },
  });

  const interval = 1000 * 60 * 60 * 24 * 30 * 3;
  const currDate = new Date();
  const minDate = new Date(currDate.getTime() - interval);
  const fixedInterval = [minDate, currDate];
  const pickerRef = React.useRef();

  const isDateRangeValid = (date1, date2) => {
    return date2.getTime() - date1.getTime() <= interval;
  };

  const handleChange = (data) => {
    const { dates } = data;
    const { startDate, endDate } = dates;
    if (!isDateRangeValid(startDate, endDate)) return false;
    setState((prevState) => {
      return {
        ...prevState,
        dates: dates,
      };
    });
  };

  const activateDatePicker = () => {
    setState((prevState) => {
      return {
        ...prevState,
        active: true,
      };
    });
  };

  const deactivateDatePicker = (e) => {
    let { target } = e;
    do {
      if (target && target === pickerRef.current) {
        return false;
      }
    } while ((target = target && target.parentElement));
    setState((prevState) => {
      return {
        ...prevState,
        active: false,
      };
    });
  };
  const _onChange = (data) => {
    typeof onChange === "function" && onChange();
  };

  React.useEffect(_onChange, [state]);
  React.useEffect(() => {
    document.addEventListener("click", deactivateDatePicker);
    return () => {
      document.removeEventListener("click", deactivateDatePicker);
    };
  });
  return (
    <div className="datefilter" css={datefilterStyle} ref={pickerRef}>
      <div css={inactiveStyle} onClick={activateDatePicker}>
        <div className="dateDisplay">{formatDate(state.dates.startDate)}</div>-
        <div className="dateDisplay">{formatDate(state.dates.endDate)}</div>
      </div>
      <div className="datepicker">
        {state.active ? (
          <DateRangePicker
            ranges={[state.dates]}
            onChange={handleChange}
            minDate={fixedInterval[0]}
            maxDate={fixedInterval[1]}
            showDateDisplay={false}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

const datefilterStyle = () => {
  return css`
    width: fit-content;
    margin: 0 20px 0 auto;
    & .datepicker {
      position: absolute;
      right: 20px;
      box-shadow: 0px 2px 4px 0px #ddd;
    }
  `;
};

const inactiveStyle = () => {
  return css`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    margin: 10px 0px;
    padding: 5px 8px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, .3);
    & .dateDisplay {
      padding: 3px 5px;
    }
  `;
};
