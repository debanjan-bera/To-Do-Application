import { useEffect, useState } from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";

export const CalenderComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todayDate, setTodayDate] = useState(new Date());
  const [isSunday, setSunday] = useState([]);

  const listOfDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const listOfMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const prevMonthDates = Array.from({ length: firstDay },(_, i) => prevMonthLastDay - firstDay + i + 1);
  const totalCells = Math.ceil((firstDay + lastDay) / 7) * 7 - (firstDay + lastDay);

  const nextMonthDays = Array.from({ length: totalCells }, (_, i) => i + 1);

  const flexClass = "flex items-center justify-center";
  const disableDayClass =
    "p-1 w-full h-full aspect-square text-gray-400 rounded-full hover:bg-[#27272a]";

  const trackTodayDate = (date) => {
    if (
      todayDate.getDate() === date &&
      todayDate.getMonth() === month &&
      todayDate.getFullYear() === year
    ) {
      return "border text-blue-700 font-bold bg-white  hover:bg-white";
    }
    return isSunday.includes(date) ? "text-red-500 hover:bg-red-900/30" : "text-white";
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  
  useEffect(() => {
    const sundays = [];
    for (let day = 1; day <= lastDay; day++) {
      if (new Date(year, month, day).getDay() === 0) sundays.push(day);
    }
    setSunday(sundays);
  }, [year, month, lastDay]);

  // useEffect(()=>{console.log(currentDate,month,year)},[currentDate,month,year])
  return (
    <>
      <aside className="calender bg-[#0B0D0E] border-l-[0.02rem] border-neutral-700 row-start-2 row-end-5 col-start-3 flex flex-col items-center">
        <section className="w-full font-bold border-b border-gray-500 text-white text-xl cursor-pointer"
          onClick={() => {
            if (currentDate.getFullYear() !== todayDate.getFullYear() ||currentDate.getMonth() !== todayDate.getMonth())
              setCurrentDate( new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
            else return;
          }}>
          <div className="p-3 hover:bg-white/10">
            {`${listOfDays[todayDate.getDay()]}, ${todayDate.getDate()} ${listOfMonths[todayDate.getMonth()]}`}
          </div>
        </section>
        <section className="w-[20rem]">
          <div className="w-full p-1 text-white flex items-center justify-between text-center">
            <span className="text-3xl p-1 text-center">{`${listOfMonths[month]}, ${year}`}</span>
            <div className="text-3xl p-1 text-center">
              <button className="" onClick={prevMonth}>
                <IoMdArrowDropleftCircle />
              </button>
              <button onClick={nextMonth}>
                <IoMdArrowDroprightCircle />
              </button>
            </div>
          </div>

          <section className="w-full h-[20.4rem] mb-1 text-lg text-white grid grid-cols-7 grid-rows-7 gap-1">
            {listOfDays.map((day) => (
              <div key={day} className={`p-1 ${flexClass}`}> {day} </div> ))}

            {prevMonthDates.map((day, index) => (
              <div key={`prev-${index}`} className="">
                <div className={`${disableDayClass} ${flexClass}`}>{day}</div>
              </div>
            ))}

            {Array.from({ length: lastDay }, (_, i) => i + 1).map((day, index) => (
                <div key={index}
                  className={`w-full h-full p-1 rounded-full ${flexClass} aspect-square ${trackTodayDate(day)}  hover:bg-[#27272a]`}
                  onClick={()=>{console.log(day,month+1,year)}}>
                  {day}
                </div>))}

            {nextMonthDays.map((day, index) => (<div key={`prev-${index}`} className={`${disableDayClass} ${flexClass}`}> {day} </div>))}
          </section>
        </section>
        <div className="h-[80%] w-full border-y text-white overflow-y-scroll"> hello</div>
        <div className="h-[20%] w-full bg-[#212121] text-white"> hello</div>
      </aside>
    </>
  );
};
