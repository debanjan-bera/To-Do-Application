import { useState, useEffect } from "react";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";

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

  const handleEventCalender = (index) =>{
    setSelectedDate(index);
    console.log(index);
  }

  const prevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  const navigatePrevMonth = (day)=>{
    console.log(day);
    prevMonth()
  }
  const navigateNextMonth = (day)=>{
    nextMonth()
    setSelectedDate(day-1)
    console.log(day,listOfMonth[currentMonth+1],currentYear);

  }

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
      if (new Date(currentYear, currentMonth, day).getDay() === 0) {
        sundays.push(day);
      }
    }
    setSundaysInMonth(sundays);
  }, [currentYear, currentMonth,monthEnd]);

  return (
    <aside className="calender bg-[#1E1F24] row-start-2 row-end-5 col-start-3 text-white text-base flex flex-col items-center">
      <section className="w-[94%] bg-white grid text-black p-2 rounded-md">
        <section className="w-full py-4 flex flex-row justify-between items-center">
          <div className="text-[1.8rem] flex gap-1">
            <div>{listOfMonth[currentMonth]}</div>
            <div>{currentYear}</div>
          </div>
          <div className="flex gap-1 text-[1.8rem]">
            <button onClick={prevMonth}><IoMdArrowDropleftCircle /></button>
            <button onClick={nextMonth}><IoMdArrowDroprightCircle /></button> 
          </div>
        </section>
        <div className="text-lg font-semibold cursor-pointer select-none grid grid-cols-7 gap-1 text-center transition-all">
          {listOfDays.map((day) => (
            <div key={day} className="text-base text-gray-700 px-[0.3rem]">{day}</div>
          ))}
          {[...Array(firstDateOfMonth).keys()].map((index) => (
            <span key={`empty-${index}`} className="text-black/50 p-[0.3rem] rounded-full border border-white scale-100 cursor-pointer select-none transition-all hover:bg-gray-200" onClick={()=>navigatePrevMonth(index)}>
              {lastDayOfPrevMonth - firstDateOfMonth + index + 1}
            </span>
          ))}
          {[...Array(monthEnd).keys()].map((day) => (
            <span key={day + 1} onClick={() => handleEventCalender(day)}
              className={`p-[0.3rem] rounded-full border border-white scale-100 transition-all ${activeDateColor(day)}`}>
              {day + 1}
            </span>))}
          {[...Array(6 - lastDayOfMonth).keys()].map((index) => (
            <span key={`next-${index}`} className="text-neutral-500 p-[0.3rem] rounded-full border border-white scale-100 cursor-pointer select-none transition-all hover:bg-gray-200" 
            onClick={()=>navigateNextMonth(index+1)}>
              {index + 1}
            </span>))}
        </div>
      </section>
    </aside>
  );
};
