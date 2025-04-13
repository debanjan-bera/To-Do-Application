import { memo, useContext, useEffect } from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { DateContext, ToDoContext } from "../../../Contexts/CreateContext";
import useIsMobile from "../../Functions/UseIsMobile";
import { AnimatePresence } from "framer-motion";
import { AddTaskForm } from "../../../To-Do/InputBox";

const MCalendarComponent = () => {
  const {
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
    todayDateString,
    listOfMonths,
    year,
    month,
    nextMonth,
    prevMonth,
  } = useContext(DateContext);

  const { taskArr, windowOpen, setActiveMenuId } = useContext(ToDoContext);

  const isTablet = useIsMobile(930);
  const isMobile = useIsMobile(570);
  const isLargeMobile = useIsMobile(670);

  const listOfDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const prevMonthDates = Array.from(
    { length: firstDay },
    (_, i) => prevMonthLastDay - firstDay + i + 1
  );
  const totalCells =
    Math.ceil((firstDay + lastDay) / 7) * 7 - (firstDay + lastDay);
  const nextMonthDays = Array.from({ length: totalCells }, (_, i) => i + 1);

  const isShowTodayDate = taskArr.filter(
    (task) => task.createdDateForform === todayDateString
  );

  const isDataAvilable = !selectedDate
    ? isShowTodayDate.length
    : showTask.length;

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

  const disableDayClass =
    "text-gray-400 rounded-full hover:bg-[#27272a]";
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
  }, [year, month, lastDay, setSunday]);

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
          isMobile ? "w-full px-2" : isMonth ? "w-full" : "w-[90%]"
        } rounded-xl relative`}
      >
        <div className="w-full p-1  text-white flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-semibold cursor-pointer border border-black/10 rounded-md hover:bg-[#171717] px-2 py-1">
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

        <section
          className="w-full max-h-[70vh] p-2  text-white text-sm sm:text-base grid grid-cols-7 auto-rows-[minmax(2rem,1fr)] gap-[2px] sm:gap-1 md:gap-3 cursor-pointer overflow-y-auto rounded-lg"
          onClick={handleDateClick}
        >
          {listOfDays.map((day) => (
            <div
              key={day}
              className="p-1 flex items-center justify-center aspect-square font-semibold"
            >
              {day}
            </div>
          ))}

          {prevMonthDates.map((date, index) => (
            <div
              key={`prev-${index}`}
              className={`${disableDayClass} ${flexClass} aspect-square`}
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
        </section>

        {isMonth && (
          <div className="w-full h-full top-0 left-0 absolute bg-black flex flex-col z-50">
            <div
              onClick={() => setMonth(false)}
              className="text-white text-xl px-3 py-2"
            >
              {"<- Select a Month"}
            </div>
            <div
              onClick={handleClickMonth}
              className="h-full w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-3"
            >
              {listOfMonths.map((ele, index) => (
                <p
                  key={index}
                  className="text-white text-base sm:text-lg flex items-center justify-center py-2 hover:bg-white/10"
                >
                  {ele}
                </p>
              ))}
            </div>
          </div>
        )}
      </section>

      <div
        className={`h-full w-full px-2 sm:px-3 border-y text-white mb-1 ${
          isDataAvilable
            ? "overflow-y-auto scrollEffect max-h-[25rem]"
            : "grid items-start grid-rows-[0.2fr_1.8fr]"
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
