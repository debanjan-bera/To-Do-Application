import PropTypes from "prop-types";
import { useState } from "react";
import { DateContext } from "./CreateContext";

export const DateManagerProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isSunday, setSunday] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [targetDate, setTargetDate] = useState(null);
  const [showTask, setTask] = useState([]);
  const [isMonth, setMonth] = useState(false);
  const [todayDate, setToday] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const listOfMonths = ["January","February","March","April","May","June","July","August","September","October","November","December",];
  const todayDateString = `${todayDate.getDate()} ${listOfMonths[month]} ${year}`;
  const nextMonth = (setCurrentDate, year, month) =>
    setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = (setCurrentDate, year, month) =>
    setCurrentDate(new Date(year, month - 1, 1));
  const createdDate = `${todayDate.getDate()} ${listOfMonths[month]} ${year}`
  return (
    <DateContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        isSunday,
        setSunday,
        selectedDate,
        setSelectedDate,
        targetDate,
        setTargetDate,
        showTask,
        setTask,
        isMonth,
        setMonth,
        todayDate,
        setToday,
        todayDateString,
        listOfMonths,
        year,
        month,
        nextMonth,
        prevMonth,
        createdDate
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

DateManagerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
