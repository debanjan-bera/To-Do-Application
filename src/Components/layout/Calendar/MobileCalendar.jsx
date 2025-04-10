import { useContext, useEffect, useState } from "react";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { nextMonth, prevMonth } from "../../../Backend/DateMethod";
import { ToDoContext } from "../../../Contexts/CreateContext";
import useIsMobile from "../../Functions/UseIsMobile";
import { MobileAddTaskButton } from "../../Functions/Button/AddButton";

import { AnimatePresence } from "framer-motion";
import { AddTaskForm } from "../../../To-Do/InputBox";
export const MCalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isSunday, setSunday] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [targetDate, setTargetDate] = useState(null);
  const [showTask, setTask] = useState([]);
  const [isMonth, setMonth] = useState(false);
  const { taskArr,windowOpen,handleAddTaskWindow,setActiveMenuId} = useContext(ToDoContext);
  const isTablet = useIsMobile(930);
  const isMobile = useIsMobile(570); // Check mobile screen width

  const todayDate = new Date();
  const listOfDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const listOfMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const todayDateString = `${todayDate.getDate()} ${listOfMonths[month]} ${year}`;

  const prevMonthDates = Array.from(
    { length: firstDay }, (_, i) => prevMonthLastDay - firstDay + i + 1);
  const totalCells =
    Math.ceil((firstDay + lastDay) / 7) * 7 - (firstDay + lastDay);
  const nextMonthDays = Array.from({ length: totalCells }, (_, i) => i + 1);
  const isShowTodayDate = taskArr.filter(
    (task) => task.createdDateForform === todayDateString
  );
  const isDataAvilable = !selectedDate? isShowTodayDate.length: showTask.length;

  const trackTodayDate = (date) => {
    const isToday =
      todayDate.getDate() === date &&
      month === todayDate.getMonth() &&
      year === todayDate.getFullYear();
    const isTargetDate =
      targetDate?.date === date &&
      targetDate?.month === month &&
      targetDate?.year === year;
    const isSundayDate = isSunday.includes(date);

    if (isToday && selectedDate === todayDateString)
      return "border-2 text-white border-blue-300 font-bold bg-blue-600 hover:bg-blue-700";
    if (isToday)
      return "border text-blue-700 font-bold bg-white hover:bg-white/80";
    if (isSundayDate && !isTargetDate)
      return "text-red-500 hover:bg-red-900/30";
    if (isTargetDate && isSundayDate)
      return "bg-red-900/30 border border-red-800 text-red-500 hover:bg-red-900/30";
    if (isTargetDate)
      return "bg-blue-800/20 text-blue-300 border border-blue-700 hover:bg-blue-800/40";
    return "text-white";
  };

  const disableDayClass = "text-gray-400 rounded-full hover:bg-[#27272a]";
  const flexClass = "flex items-center justify-center";

  const handleDateClick = (e) => {
    const clickedElement = e.target;
    if (!clickedElement.classList.contains("current-month")) return;
    const date = parseInt(clickedElement.textContent);
    setTargetDate({ date, month, year });

    if (selectedDate === `${date} ${listOfMonths[month]} ${year}`) return;

    if (!isNaN(date)) {
      const formattedDate = `${date} ${listOfMonths[month]} ${year}`;
      const tempTask = taskArr.filter(
        (task) => task.createdDateForform === formattedDate
      );
      setSelectedDate(formattedDate);
      setTask(tempTask);
    }
  };
  const handleClickMonth = (event) => {
    // Ensure the clicked element is a <p> tag (prevents capturing clicks on parent div)
    if (event.target.tagName === "P") {
      console.log("Clicked Month:", event.target.textContent);
      const months = event.target.textContent;
      const monthIndex = listOfMonths.indexOf(months);
      console.log(monthIndex);
      setCurrentDate(new Date(year, monthIndex + 1, 0));
      setMonth(false);
    }
  };
  const navigateTodayDate = ()=>{
    setTargetDate(() => ({
      date: todayDate.getDate(),
      month: todayDate.getMonth(),
      year: todayDate.getFullYear(),
    }));
    setSelectedDate(todayDateString);
    setCurrentDate(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
    setTask(isShowTodayDate);
  }

  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setActiveMenuId]);
  useEffect(() => {
    const sundays = [];
    for (let day = 1; day <= lastDay; day++) {
      if (new Date(year, month, day).getDay() === 0) sundays.push(day);
    }
    setSunday(sundays);
  }, [year, month, lastDay]);

  return (
    <>
      {isMobile&&<AnimatePresence>{windowOpen && <AddTaskForm />}</AnimatePresence>}

      {!isTablet&&<section
        className="w-full font-bold border-b border-gray-500 text-white text-xl cursor-pointer"
        onClick={() => {navigateTodayDate() }}
      >
        {(!isMobile|| isTablet)&&<div className=" p-3 hover:bg-white/10">
          {`${listOfDays[todayDate.getDay()]}, ${todayDate.getDate()} ${listOfMonths[todayDate.getMonth()]}`}
        </div>}
      </section>}
      <section
        className={`${
          isMobile ? "w-[98%]" : isMonth ? "w-full" : "w-full"
        } rounded-xl relative`}
      >
        <div className="w-full p-1 text-white flex items-center justify-between text-center">
          <span className="text-3xl p-1 text-center cursor-pointer border border-black/10 rounded-md hover:bg-[#171717] hover: hover:border-[#454545be]">
            <span className=""
              onClick={() => setMonth(true)}
            >{`${listOfMonths[month]}, ${year}`}</span>
          </span>
          <div className="text-3xl p-1 text-center">
            <button onClick={() => prevMonth(setCurrentDate, year, month)}>
              <IoMdArrowDropleftCircle />
            </button>
            <button onClick={() => nextMonth(setCurrentDate, year, month)}>
              <IoMdArrowDroprightCircle />
            </button>
          </div>
        </div>

        <section className="w-full h-[20.4rem]  text-lg text-white grid grid-cols-7 grid-rows-7 gap-1 cursor-pointer"
          onClick={handleDateClick} >
          {listOfDays.map((day) => (
            <div key={day}
              className="p-1 flex items-center justify-center aspect-square" >
              {day}
            </div>
          ))}

          {prevMonthDates.map((date, index) => (
            <div key={`prev-${index}`}
              className={`${disableDayClass} ${flexClass} aspect-square`}>
              {date}
            </div>
          ))}

          {Array.from({ length: lastDay }, (_, i) => i + 1).map(
            (date, index) => (
              <div key={index}
                className={`current-month rounded-full ${flexClass} aspect-square ${trackTodayDate(date)} hover:bg-[#27272a]`}>
                {date}
              </div>
            )
          )}

          {nextMonthDays.map((date, index) => (
            <div key={`next-${index}`} className={`${disableDayClass} ${flexClass} aspect-square`}>
              {date}
            </div>
          ))}
        </section>
        {isMonth && (
          <div className="w-full h-full top-0 left-0 absolute bg-black flex flex-shrink flex-col">
            <div onClick={() => setMonth(false)} className="text-white text-2xl">
              {"<-Select a Month"}
            </div>
            <div onClick={handleClickMonth} className="h-full w-full grid grid-cols-3 grid-rows-4">
              {listOfMonths.map((ele, index) => (
                <p key={index} className="text-white text-xl flex items-center justify-center hover:bg-white/10">
                  {ele}
                </p>
              ))}
            </div>
          </div>
        )}
      </section>
      <div
        className={`h-full w-full px-3  border-y text-white mb-1  ${
          isDataAvilable ? "overflow-y-scroll scrollEffect" : "grid items-start  grid-rows-[0.2fr_1.8fr]"
        }`}
      >
        <p className="pt-2 text-xl">
          Selected Date: {selectedDate ? selectedDate : "Today"}
        </p>

        {isDataAvilable ? (
          <ul>
            {(selectedDate
              ? selectedDate === todayDateString
                ? isShowTodayDate
                : showTask
              : isShowTodayDate
            ).map((ele, index) => (
              <li
                className={`w-full px-2  my-3  grid grid-cols-[0.05fr_1.9fr] gap-3 justify-center  justify-items-start items-center rounded border border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 ${
                  isMobile ? "text-2xl py-4" : "py-3 text-xl"
                }`}
                key={index}
              >
                <div
                  className={`w-full h-full rounded ${
                    ele.priority === "High"
                      ? "bg-red-500"
                      : ele.priority === "Moderate"
                      ? "bg-yellow-500"
                      : "bg-green-400"
                  }`}
                ></div>
                {ele.content}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full w-full  text-gray-400 text-lg">
            <p>No tasks available for the selected date.</p>
          </div>
        )}
      </div>

      {!isMobile && (
        <div className="h-[20%] w-full bg-[#292D32] text-white"></div>
      )}
      {isMobile&&<MobileAddTaskButton addTask={handleAddTaskWindow} navigateFunction={navigateTodayDate}/>}
    </>
  );
};


// #1E1F25

// #15161A

// card - #1E1F25

// under the card #292D32
