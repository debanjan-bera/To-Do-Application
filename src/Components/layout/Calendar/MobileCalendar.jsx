import { memo, useCallback, useContext, useMemo } from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { DateContext, ToDoContext } from "../../../Contexts/CreateContext";
import useResponsive from "../../../Hooks/UseResponsive";
import { AnimatePresence } from "framer-motion";
import { AddTaskForm } from "../../../To-Do/InputBox";
import RenderCalendar from "./RenderCalendar";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import  '../../../App.css'
const MCalendarComponent = () => {
  const {setCurrentDate,selectedDate,setSelectedDate,setTargetDate,showTask,setTask,isMonth,setMonth,todayDate,todayDateString,listOfMonths,year,month,nextMonth,prevMonth} = useContext(DateContext);

  const { taskArr, windowOpen } = useContext(ToDoContext);

  const isTablet = useResponsive(930);
  const isMobile = useResponsive(570);
  const listOfDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const isShowTodayDate = useMemo(
    () => taskArr.filter((task) => task.createdDateForform === todayDateString),
    [taskArr, todayDateString]
  );

  const isDataAvailable = useMemo(() => {
    return !selectedDate ? isShowTodayDate.length : showTask.length;
  }, [selectedDate, isShowTodayDate, showTask]);
  const handleClickMonth = useCallback(
    (event) => {
      if (event.target.tagName === "P") {
        const months = event.target.textContent;
        const monthIndex = listOfMonths.indexOf(months);
        setCurrentDate(new Date(year, monthIndex + 1, 0));
        setMonth(false);
      }
    },
    [listOfMonths, year, setCurrentDate, setMonth]
  );

  const navigateTodayDate = useCallback(() => {
    setTargetDate(() => ({
      date: todayDate.getDate(),
      month: todayDate.getMonth(),
      year: todayDate.getFullYear(),
    }));
    setSelectedDate(todayDateString);
    setCurrentDate(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
    setTask(isShowTodayDate);
  }, [
    todayDate,
    todayDateString,
    setTargetDate,
    setSelectedDate,
    setCurrentDate,
    setTask,
    isShowTodayDate,
  ]);

  const renderTasks = useMemo(() => {
    const list = selectedDate
      ? selectedDate === todayDateString
        ? isShowTodayDate
        : showTask
      : isShowTodayDate;

    return list.map((ele, index) => (
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
    ));
  }, [selectedDate, todayDateString, isShowTodayDate, showTask]);

  return (
    <>
    <section className="w-full h-full flex flex-col items-center gap-3 overflow-scroll main-scroll">
    {isMobile && (
        <AnimatePresence>{windowOpen && <AddTaskForm />}</AnimatePresence>
      )}

      {!isTablet && (
        <section
          className="w-full  font-semibold border-b border-gray-500 text-white text-base sm:text-lg md:text-xl cursor-pointer"
          onClick={navigateTodayDate}
        >
          <div className="p-2 sm:p-3 hover:bg-white/10">
            {`${listOfDays[todayDate.getDay()]}, ${todayDate.getDate()} ${
              listOfMonths[todayDate.getMonth()]
            }`}
          </div>
        </section>
      )}

      <section
        className={`${
          isMobile ? "w-[98%] p-3 " : "w-full p-2"
        } rounded-xl bg-neutral-950/60 border border-neutral-800 `}
      >
        <div className="w-full py-1  text-white flex items-center justify-between">
          <span className="text-xl text-neutral-400 sm:text-2xl font-semibold cursor-pointer border border-black/10 rounded-md hover:bg-[#1E1F28] py-1">
            <span
              className="px-2 flex items-center gap-2 text-xl "
              onClick={() => setMonth(true)}
            >
              <FaRegCalendarAlt />
              <span>{`${listOfMonths[month]}, ${year}`}</span>
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
        {isMonth && (
          <div className="w-full h-full top-0 left-0 absolute bg-black flex flex-shrink flex-col">
            <div
              onClick={() => setMonth(false)}
              className="text-white text-2xl flex items-center gap-2 p-2"
            >
              <span>
                <MdArrowBack />
              </span>
              {"Month"}
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
          !isDataAvailable
            ? "grid items-start grid-rows-[0.2rem_1.8fr]"
            : isMobile
            ? "max-h-[25rem]"
            : "overflow-y-auto scrollEffect max-h-[25rem] main-scroll"
        }`}
      >
        <p className="pt-2 text-base sm:text-lg">
          Selected Date: {selectedDate ? selectedDate : "Today"}
        </p>

        {isDataAvailable ? (
          <ul>{renderTasks}</ul>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full w-full text-neutral-700 text-lg">
            <p>No tasks available for the selected date.</p>
          </div>
        )}
      </div>
    </section>
      
    </>
  );
};

export default memo(MCalendarComponent);
