import { memo, useContext, useEffect } from "react";
import { DateContext, ToDoContext } from "../../../Contexts/CreateContext";

const RenderCalendar = () => {
  const {
    isSunday,
    setSunday,
    selectedDate,
    setSelectedDate,
    targetDate,
    setTargetDate,
    setTask,
    todayDate,
    todayDateString,
    listOfMonths,
    year,
    month,
  } = useContext(DateContext);
  const { taskArr, setActiveMenuId } = useContext(ToDoContext);
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
    <section
      className="w-full max-h-[70vh]  text-white text-base sm:text-base grid grid-cols-7 auto-rows-[minmax(2rem,1fr)] gap-[2px] sm:gap-1 md:gap-3 cursor-pointer overflow-y-auto rounded-lg"
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

      {Array.from({ length: lastDay }, (_, i) => i + 1).map((date, index) => (
        <div
          key={index}
          className={`current-month rounded-full ${flexClass} aspect-square ${trackTodayDate(
            date
          )} hover:bg-[#27272a]`}
        >
          {date}
        </div>
      ))}

      {nextMonthDays.map((date, index) => (
        <div
          key={`next-${index}`}
          className={`${disableDayClass} ${flexClass} aspect-square`}
        >
          {date}
        </div>
      ))}
    </section>
  );
};

export default memo(RenderCalendar);
