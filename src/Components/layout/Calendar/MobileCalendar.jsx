import { memo, useContext} from "react";
import {IoMdArrowDropleftCircle,IoMdArrowDroprightCircle,} from "react-icons/io";
import { DateContext, ToDoContext } from "../../../Contexts/CreateContext";
import useResponsive from "../../../Hooks/UseResponsive";
import { AnimatePresence } from "framer-motion";
import { AddTaskForm } from "../../../To-Do/InputBox";
import RenderCalendar from "./RenderCalendar";

const MCalendarComponent = () => {
  const {setCurrentDate,selectedDate,setSelectedDate,setTargetDate,showTask,setTask,isMonth,setMonth,todayDate,todayDateString,listOfMonths,year,month,nextMonth,prevMonth,
  } = useContext(DateContext);

  const { taskArr, windowOpen } = useContext(ToDoContext);

  const isTablet = useResponsive(930);
  const isMobile = useResponsive(570);
  const isLargeMobile = useResponsive(670);
  const listOfDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const isShowTodayDate = taskArr.filter((task) => task.createdDateForform === todayDateString);

  const isDataAvilable = !selectedDate ? isShowTodayDate.length : showTask.length;

  const handleClickMonth = (event) => {
    if (event.target.tagName === "P") {
      const months = event.target.textContent;
      const monthIndex = listOfMonths.indexOf(months);
      setCurrentDate(new Date(year, monthIndex + 1, 0));
      setMonth(false);
    }
  };

  const navigateTodayDate = () => {
    setTargetDate(() => ({
      date: todayDate.getDate(),
      month: todayDate.getMonth(),
      year: todayDate.getFullYear(),
    }));
    setSelectedDate(todayDateString);
    setCurrentDate(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
    setTask(isShowTodayDate);
  };


  return (
    <>
      {isMobile && (
        <AnimatePresence>{windowOpen && <AddTaskForm />}</AnimatePresence>
      )}

      {!isTablet&&<section
        className="w-full font-semibold border-b border-gray-500 text-white text-base sm:text-lg md:text-xl cursor-pointer"
        onClick={navigateTodayDate}
      >
        <div className="p-2 sm:p-3 hover:bg-white/10">
          {`${listOfDays[todayDate.getDay()]}, ${todayDate.getDate()} ${
            listOfMonths[todayDate.getMonth()]
          }`}
        </div>
      </section>}

      <section
        className={`${
          isMobile ? "w-full pb-3" : isMonth ? "w-full" : "w-[90%]"
        } rounded-xl relative`}
      >
        <div className="w-full py-1  text-white flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-semibold cursor-pointer border border-black/10 rounded-md hover:bg-[#1E1F28] py-1">
            <span onClick={() => setMonth(true)}>
              {`${listOfMonths[month]}, ${year}`}
            </span>
          </span>
          <div className="flex gap-2 text-2xl sm:text-3xl">
            <button onClick={() => prevMonth(setCurrentDate, year, month)}>
              <IoMdArrowDropleftCircle />
            </button>
            <button onClick={() => nextMonth(setCurrentDate, year, month)}>
              <IoMdArrowDroprightCircle />
            </button>
          </div>
        </div>
          <RenderCalendar />
        {/* <section
          className="w-full max-h-[70vh] bg-[#15141B] text-white text-base sm:text-base grid grid-cols-7 auto-rows-[minmax(2rem,1fr)] gap-[2px] sm:gap-1 md:gap-3 cursor-pointer overflow-y-auto rounded-lg"
          onClick={handleDateClick}
        >
          {listOfDays.map((day) => (
            <div
              key={day}
              className="flex items-center justify-center aspect-square font-semibold"
            >
              {day}
            </div>
          ))}

          {prevMonthDates.map((date, index) => (
            <div
              key={`prev-${index}`}
              className={`${disableDayClass} ${flexClass} aspect-square font-medium`}
            >
              {date}
            </div>
          ))}

          {Array.from({ length: lastDay }, (_, i) => i + 1).map(
            (date, index) => (
              <div
                key={index}
                className={`current-month rounded-full ${flexClass} aspect-square ${trackTodayDate(
                  date
                )} hover:bg-[#27272a]`}
              >
                {date}
              </div>
            )
          )}

          {nextMonthDays.map((date, index) => (
            <div
              key={`next-${index}`}
              className={`${disableDayClass} ${flexClass} aspect-square`}
            >
              {date}
            </div>
          ))}
        </section> */}
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
        className={`h-full w-full border-t border-t-gray-700 text-white mb-1 ${
          !isDataAvilable
            ? "grid items-start grid-rows-[0.2rem_1.8fr]"
            : isMobile ? 'max-h-[25rem]':"overflow-y-auto scrollEffect max-h-[25rem]"
        }`}
      >
        <p className="pt-2 text-base sm:text-lg">
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
                key={index}
                className={`w-full px-2 my-2 grid grid-cols-[0.05fr_1.9fr] gap-3 items-center rounded border border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 
                text-base sm:text-lg md:text-xl py-2 sm:py-3`}
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
          <div className="flex flex-col items-center justify-center text-center h-full w-full text-gray-400 text-lg">
            <p>No tasks available for the selected date.</p>
          </div>
        )}
      </div>

      {!isLargeMobile && (
        <div className="h-[20%] w-full bg-[#292D32] text-white"></div>
      )}
    </>
  );
};

export default memo(MCalendarComponent);
