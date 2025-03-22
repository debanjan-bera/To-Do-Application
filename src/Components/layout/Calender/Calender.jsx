import { useState, useEffect } from "react";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import "../../../App.css";
export const CalenderComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sundaysInMonth, setSundaysInMonth] = useState([]);

  const listOfMonth = ["January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"];
  const listOfDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const monthEnd = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDateOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
  const lastDayOfMonth = new Date(currentYear, currentMonth, monthEnd).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDate(null)

  }
  const nextMonth = () =>  {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDate(null)
  }

  const navigatePrevMonth = (value) => {
    prevMonth();
    setSelectedDate(value - 1);
  };
  const navigateNextMonth = (day) => {
    nextMonth();
    setSelectedDate(day - 1);

  };

  const activeDateColor = (date) => {
    const actualDate = date + 1;
    const isSunday = sundaysInMonth.includes(actualDate);
    if (new Date().toDateString() === new Date(currentYear, currentMonth, actualDate).toDateString()) {
      return "text-white bg-blue-400 hover:bg-blue-500";
    } else if (selectedDate === date) {
      return isSunday ? "bg-red-100 text-red-500" : "text-white bg-sky-400";
    }
    return isSunday ? "text-red-500 hover:bg-red-100" : "text-black hover:bg-gray-200";
  };

  useEffect(() => {
    let sundays = [];
    for (let day = 1; day <= monthEnd; day++) {
      if (new Date(currentYear, currentMonth, day).getDay() === 0) sundays.push(day);
    }
    setSundaysInMonth(sundays);
  }, [currentYear, currentMonth, monthEnd]);

  const handleCalendarClick = (event) => {
    const target = event.target;
    if (target.classList.contains("calendar-date")) {
      const selectedDay = Number(target.dataset.day);
      setSelectedDate(selectedDay - 1);

      const formattedDate = {
        date: selectedDay,
        month: listOfMonth[currentMonth],
        year: currentYear
      };
      console.log("Selected Date:", formattedDate);
    } else if (target.classList.contains("prev-month")) {
      navigatePrevMonth(Number(target.dataset.day));
    } else if (target.classList.contains("next-month")) {
      navigateNextMonth(Number(target.dataset.day));
    }
  };

  return (
    <aside className="calender bg-[#0B0D0E] border-l-[0.02rem] border-neutral-700 row-start-2 row-end-5 col-start-3 text-white text-base flex flex-col items-center">
      <section className="w-[94%] bg-white grid text-black p-2 mt-3 rounded-md aspect-square">
        <section className="w-full py-3 flex flex-row justify-between items-center ">
          <div className="text-[1.8rem] flex gap-1">
            <div>{listOfMonth[currentMonth]}</div>
            <div>{currentYear}</div>

          </div>
          <div className="flex gap-1 text-[1.8rem]">
            <button onClick={prevMonth}><IoMdArrowDropleftCircle /></button>
            <button onClick={nextMonth}><IoMdArrowDroprightCircle /></button> 
          </div>
        </section>

        {/* Calendar Grid with Event Delegation */}
        <div className="text-lg font-semibold cursor-pointer select-none grid grid-cols-7 grid-rows-6 gap-1 text-center transition-all"
         onClick=  {handleCalendarClick}>
          {listOfDays.map((day) => (
            <div key={day} className="text-base text-gray-700 px-[0.4rem]">{day}</div>
          ))}


          {[...Array(firstDateOfMonth).keys()].map((index) => (
            <span key={`empty-${index}`} data-day={lastDayOfPrevMonth - firstDateOfMonth + index + 1} 
              className="prev-month text-black/50 p-[0.3rem] aspect-square rounded-full border border-white scale-100 cursor-pointer select-none transition-all hover:bg-gray-200">
              {lastDayOfPrevMonth - firstDateOfMonth + index + 1}
            </span>
          ))}

          {[...Array(monthEnd).keys()].map((day) => (
            <span key={day + 1} data-day={day + 1} 
              className={`calendar-date py-[0.3rem] rounded-full border border-white scale-100 transition-all ${activeDateColor(day)}`}>
              {day + 1}
            </span>
          ))}

          {[...Array(6 - lastDayOfMonth).keys()].map((index) => (
            <span key={`next-${index}`} data-day={index + 1} 
              className="next-month text-neutral-500 p-[0.3rem] rounded-full border border-white scale-100 cursor-pointer select-none transition-all hover:bg-gray-200">
              {index + 1}
            </span>
          ))}
        </div>
      </section>
    </aside>
  );
};
