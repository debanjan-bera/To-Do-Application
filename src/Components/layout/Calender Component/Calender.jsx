// import { NavLink } from "react-router-dom";

import { useState } from "react";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
export const CalenderComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // const currentDate = new Date();
  const [currentMonth,setCurrentMonth] = useState(currentDate.getMonth())
  const [currentYear,setCurrentYear] = useState(currentDate.getFullYear())
  const listOfMonth = ["January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"]
  const listOfDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const daysInMonth = new Date(currentYear,currentMonth + 1,0).getDate()
  const fastDayOfMonth = new Date(currentYear,currentMonth , 1).getDay()
  const handleEventCalender = (index) => {
    setSelectedDate(index);  // Store the selected date index
  };

  
  const checkOnSunday = (year, month) => {
    let sundays = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the month
  
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      if (date.getDay() === 0) { // 0 means Sunday
        sundays.push(day);
      }
    }
    return sundays;
  };
  const handelPrevMonth = () =>{
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  }
  const handelNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), setCurrentMonth(currentMonth+1), 1));

// Example usage:
// styling elements
const activeDateColor = (date) => {
  const actualDate = date + 1;
  const sundays = checkOnSunday(currentYear, currentMonth);
  const isSunday = sundays.includes(actualDate)
  if (currentDate.getDate() === actualDate) return "text-white bg-blue-400 hover:bg-blue-500"; // Default today styling (unclicked)
  else if(selectedDate === date){
    return isSunday ? "bg-red-100 text-red-500" : "text-white bg-sky-400"; 
  }
  if (isSunday) return "text-red-500 hover:bg-red-100"
  return "text-black hover:bg-sky-100"; // Normal styling for other dates
};


  return (
    <>
      <aside className="calender bg-[#1E1F24] row-start-2 row-end-5 col-start-3 text-white text-base flex flex-col  items-center">

        <section className="w-[94%] bg-white grid  text-black p-2 rounded-md">
          <section className="w-full py-4 flex flex-row justify-between items-center">
            <div className="text-[1.8rem] flex gap-1">
              <div>{listOfMonth[currentMonth]}</div>
              {/* <div>September</div> */}
              <div>{currentYear}</div>
            </div>
            <div className="flex gap-1 text-[1.8rem]">
              <button onClick={handelPrevMonth}><IoMdArrowDropleftCircle /></button>
              <button onClick={handelNextMonth}><IoMdArrowDroprightCircle /></button> 
            </div>
          </section>
          <div className="grid grid-cols-7 gap-1 text-center">
            {listOfDays.map((day) => (
              <div
                key={day}
                className="font-semibold text-gray-700 px-[0.3rem]">
                {day}
              </div>
            ))}

            {[...Array(fastDayOfMonth).keys()].map((index) => (
              <span key={`empty-${index}`}></span>
            ))}
            {[...Array(daysInMonth).keys()].map((day) => (
              <span
                key={day + 1}
                onClick={() => handleEventCalender(day)}
                className={`text-lg font-semibold p-[0.3rem] rounded-full border border-white scale-100 cursor-pointer select-none transition-all
                ${activeDateColor(day)} `}>
                {day + 1}
              </span>
            ))}
          </div>
        </section>
      </aside>
    </>
  );
};
