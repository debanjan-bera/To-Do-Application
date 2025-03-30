import { useEffect, useState } from "react";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";

export const CalenderComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isSunday, setSunday] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [targetDate, setTargetDate] = useState(null);
  const todayDate = new Date();
  const listOfDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const listOfMonths = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const prevMonthDates = Array.from({ length: firstDay }, (_, i) => prevMonthLastDay - firstDay + i + 1);
  const totalCells = Math.ceil((firstDay + lastDay) / 7) * 7 - (firstDay + lastDay);
  const nextMonthDays = Array.from({ length: totalCells }, (_, i) => i + 1);

  const trackTodayDate = (date) => {
    const isToday = todayDate.getDate() === date && month === todayDate.getMonth() && year === todayDate.getFullYear();
    const isTargetDate = targetDate?.date === date && targetDate?.month === month && targetDate?.year === year;
    const isSundayDate = isSunday.includes(date);

    if (isToday) return "border text-blue-700 font-bold bg-white hover:bg-white";
    if (isSundayDate && !isTargetDate) return "text-red-500 hover:bg-red-900/30";
    if (isTargetDate && isSundayDate) return "bg-red-900/30 border border-red-800 text-red-500 hover:bg-red-900/30";
    if (isTargetDate) return "bg-blue-800/20 text-blue-300 border border-blue-700 hover:bg-blue-800/40";
    return "text-white";
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

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
      setSelectedDate(formattedDate);
      console.log(`Selected Date: ${formattedDate}`);
    }
  };

  useEffect(() => {
    const sundays = [];
    for (let day = 1; day <= lastDay; day++) {
      if (new Date(year, month, day).getDay() === 0) sundays.push(day);
    }
    setSunday(sundays);
  }, [year, month, lastDay]);

  return (
    <>
      <section className="w-full font-bold border-b border-gray-500 text-white text-xl cursor-pointer"
        onClick={() => setCurrentDate(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1))}>
        <div className="p-3 hover:bg-white/10">
          {`${listOfDays[todayDate.getDay()]}, ${todayDate.getDate()} ${listOfMonths[todayDate.getMonth()]}`}
        </div>
      </section>
      <section className="w-[20rem]">
        <div className="w-full p-1 text-white flex items-center justify-between text-center">
          <span className="text-3xl p-1 text-center">{`${listOfMonths[month]}, ${year}`}</span>
          <div className="text-3xl p-1 text-center">
            <button onClick={prevMonth}><IoMdArrowDropleftCircle /></button>
            <button onClick={nextMonth}><IoMdArrowDroprightCircle /></button>
          </div>
        </div>

        <section className="w-full h-[20.4rem] mb-1 text-lg text-white grid grid-cols-7 grid-rows-7 gap-1 cursor-pointer" onClick={handleDateClick}>
          {listOfDays.map((day) => (
            <div key={day} className="p-1 flex items-center justify-center"> {day} </div>
          ))}

          {prevMonthDates.map((date, index) => (
            <div key={`prev-${index}`} className={`${disableDayClass} ${flexClass}`}>{date}</div>
          ))}

          {Array.from({ length: lastDay }, (_, i) => i + 1).map((date, index) => (
            <div key={index} className={`current-month rounded-full ${flexClass} aspect-square ${trackTodayDate(date)} hover:bg-[#27272a]`}>{date}</div>
          ))}

          {nextMonthDays.map((date, index) => (
            <div key={`next-${index}`} className={`${disableDayClass} ${flexClass}`}>{date}</div>
          ))}
        </section>
      </section>

      <div className="h-[80%] w-[90%] scroll border-y text-white mb-1 overflow-y-scroll">
        <p> Selected Date: {selectedDate || "None"}</p>
      </div>
      <div className="h-[20%] w-full bg-[#292D32] text-white"></div>
    </>
  );
};


// #1E1F25

// #15161A

// card - #1E1F25

// under the card #292D32
