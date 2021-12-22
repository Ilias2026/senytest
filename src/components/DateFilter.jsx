import React from "react";
import { css } from "@emotion/react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useApp from "../hooks/useApp";
import constaintsStyles from "../styles/constants";
import date from "../utils/date";
import useDate from "../hooks/useDate";
import Icon from "./global/icons/Icon";
import DateSVG from "../svg/DateSVG";

export default function DateFilter({ onChange }) {
  const [appState, setAppState] = useApp()
  const [dateState, setDateState] = useDate();
  const [state, setState] = React.useState({
    dates: {
      ...dateState,
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

  const deactivateDatePicker = (e, always = false) => {
    if (!always) {
      let { target } = e;
      do {
        if (target && target === pickerRef.current) {
          return false;
        }
      } while ((target = target && target.parentElement));
    }
    setState((prevState) => {
      return {
        ...prevState,
        active: false,
      };
    });
  };
  const _onChange = (e) => {
    deactivateDatePicker(null, true)
    setDateState(prevState => {
      return {
        ...prevState,
        ...state.dates
      }
    })
    typeof onChange === "function" && onChange();
  };

  React.useEffect(() => {
    document.addEventListener("click", deactivateDatePicker);
    return () => {
      document.removeEventListener("click", deactivateDatePicker);
    };
  });
  return (
    <div className="datefilter" css={datefilterStyle} ref={pickerRef}>
      <div css={inactiveStyle} className={("button1" + (state.active ? " active" : ""))} onClick={activateDatePicker}>
        <Icon>
          <DateSVG />
        </Icon>
        <div className="dateDisplay">{date.formatDateShort(state.dates.startDate)}</div>-
        <div className="dateDisplay">{date.formatDateShort(state.dates.endDate)}</div>
      </div>
      <div className="datepicker">
        {state.active ? (
          <>
            <DateRangePicker
              ranges={[state.dates]}
              onChange={handleChange}
              // minDate={fixedInterval[0]}
              maxDate={fixedInterval[1]}
              showDateDisplay={false}
              color={constaintsStyles.colorOrange1}
              rangeColors={[constaintsStyles.colorOrange1]}
            />
            <button className="button1" onClick={_onChange}>Apply</button>
          </>
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
    margin: 0 0px 0 auto;
    & .datepicker {
      position: absolute;
      right: 20px;
      box-shadow: 0px 2px 4px 0px #ddd;
      display: flex;
      flex-direction: column;
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
    & .dateDisplay {
      padding: 3px 5px;
    }
  `;
};
