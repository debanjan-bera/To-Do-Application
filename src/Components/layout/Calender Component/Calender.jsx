// import { NavLink } from "react-router-dom";

import { useState } from "react";

export const CalenderComponent = () => {
  const [calender,setCal] = useState(Array(35).fill(''))
  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = new Date();
  const [currentMonth,setCurrentMonth] = useState(currentDate.getMonth())
  const [currentYear,setCurrentYear] = useState(currentDate.getFullYear())
  const listOfMonth = ["January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"]
  const listOfDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const daysInMonth = new Date(currentYear,currentMonth + 1,0).getDate()
  const fastDayOfMonth = new Date(currentYear,currentMonth , 1).getDay()
  console.log(new Date('2025-02-14'),daysInMonth,fastDayOfMonth);
  const handleEventCalender = (index) => {
    setSelectedDate(index);  // Store the selected date index
  };
  const activeDateColor = (index) => selectedDate === index ? 'text-white bg-black' : 'text-black hover:bg-sky-100'
  const todayActiveDate = (date)=>{
    return currentDate.getDate() === date && 'text-white bg-blue-400 hover:border-black' 
  }
  
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

// Example usage:
const colorOnSunday=(day)=>{
  const sundays = checkOnSunday(currentYear, currentMonth);
  return sundays.includes(day) && 'text-red-500'; 
}

  return (
    <>
      <aside className="calender bg-[#1E1F24] row-start-2 row-end-5 col-start-3 text-white text-base flex flex-col  items-center">
        <section className="bg-black/10  fill-transparent w-[3.3rem]">
          <label className="hamburger cursor-pointer ">
            <input type="checkbox" className="hidden" />
            <svg viewBox="0 0 32 32" className="h-[3em]">
              <path
                className="line line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              ></path>
              <path className="line" d="M7 16 27 16"></path>
            </svg>
          </label>
        </section>
        <section className="w-[94%] bg-white grid  text-black p-2 rounded-md">
          <div className="py-4 text-[2rem] flex gap-1">
            <div>{listOfMonth[currentMonth]}</div>
            <div>{currentYear}</div>
          </div>
          <div className="grid grid-cols-7 gap-1 gap-y-2 text-center">
            {listOfDays.map((day) => (
              <div key={day} className="font-semibold text-gray-700 px-[0.3rem]">
                {day}
              </div>
            ))}

            {[...Array(fastDayOfMonth).keys()].map((index)=> (
              <span key={`empty-${index}`}></span>
            ))}
            {[...Array(daysInMonth).keys()].map((day)=> (
              <span key={day + 1}
              onClick={() => handleEventCalender(day)}
               className={`text-lg font-semibold p-[0.3rem] rounded-full border border-white scale-100 transition-all
                ${colorOnSunday(day+1)}
                ${todayActiveDate(day+1)}
                ${activeDateColor(day)} `}> {day+1} </span>
            ))}
          </div>
        </section>
      </aside>
    </>
  );
};
