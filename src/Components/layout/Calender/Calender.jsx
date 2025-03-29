import { useEffect, useState } from "react";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";

export const CalenderComponent = () => {
  const [currentDate,setCurrentDate] = useState(new Date())
  const [isSunday, setSunday] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  
  const todayDate = new Date()
  const listOfDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const listOfMonths = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const prevMonthDates = Array.from({ length: firstDay }, (_, i) => prevMonthLastDay - firstDay + i + 1);
  const totalCells = Math.ceil((firstDay + lastDay) / 7) * 7 - (firstDay + lastDay);
  const nextMonthDays = Array.from({ length: totalCells }, (_, i) => i + 1);

  const trackTodayDate = (date) => {
    if (todayDate.getDate() === date && todayDate.getMonth() === month && todayDate.getFullYear() === year) {
      return "border text-blue-700 font-bold bg-white hover:bg-white";
    }
    return isSunday.includes(date) ? "text-red-500 hover:bg-red-900/30" : "text-white";
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const disableDayClass =
    "text-gray-400 rounded-full hover:bg-[#27272a]";
  const flexClass = "flex items-center justify-center";

  const handleDateClick = (e) => {
    const clickedElement = e.target;

    if (!clickedElement.classList.contains("current-month")) return; // Only allow clicks on current month days
    const day = parseInt(clickedElement.textContent);
    if(selectedDate ===  `${day} ${listOfMonths[month]} ${year}`) return

    if (!isNaN(day)) {
      const formattedDate = `${day} ${listOfMonths[month]} ${year}`;
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
    <aside className="calender bg-[#0B0D0E] border-l-[0.02rem] border-neutral-700 row-start-2 row-end-5 col-start-3 flex flex-col items-center">
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

        {/* Calendar Grid with Event Propagation */}
        <section
          className="w-full h-[20.4rem] mb-1 text-lg text-white grid grid-cols-7 grid-rows-7 gap-1"
          onClick={handleDateClick}>
          {listOfDays.map((day) => (
            <div key={day} className="p-1 flex items-center justify-center"> {day} </div>
          ))}

          {/* Previous Month Days */}
          {prevMonthDates.map((date, index) => (
            <div key={`prev-${index}`} className={`${disableDayClass} ${flexClass}`}>{date}</div>
          ))}

          {/* Current Month Days */}
          {Array.from({ length: lastDay }, (_, i) => i + 1).map((date) => (
            <div key={date}
              className={`current-month rounded-full flex items-center justify-center aspect-square ${trackTodayDate(date)} hover:bg-[#27272a]`}>
              {date}
            </div>
          ))}

          {/* Next Month Days */}
          {nextMonthDays.map((date, index) => (
            <div key={`next-${index}`} className={`${disableDayClass} ${flexClass}`}>{date}</div>
          ))}
        </section>
      </section>

      {/* Display Selected Date */} 
      <div className="h-[80%] w-[90%] scroll border-y text-white mb-1  overflow-y-scroll hello"><p>Selected Date: {selectedDate}</p> 

      </div>
      <div className="h-[20%] w-full bg-[#212121] text-white"> hello</div>
    </aside>
  );
};
