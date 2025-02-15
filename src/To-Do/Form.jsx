import { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const weekStart = new Date(monthStart);
  weekStart.setDate(monthStart.getDate() - monthStart.getDay());
  const weekEnd = new Date(monthEnd);
  weekEnd.setDate(monthEnd.getDate() + (6 - monthEnd.getDay()));

  const getDaysArray = (start, end) => {
    let days = [];
    let day = new Date(start);
    while (day <= end) {
      days.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }
    return days;
  };

  const days = getDaysArray(weekStart, weekEnd);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth}>←</button>
        <h2 className="text-lg font-semibold">{currentDate.toLocaleString("default", { month: "long", year: "numeric" })}</h2>
        <button onClick={nextMonth}>→</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="font-semibold text-gray-700">{day}</div>
        ))}
        {days.map(day => (
          <div key={day} className={`p-2 rounded-full ${day.toDateString() === new Date().toDateString() ? "bg-blue-500 text-white" : "text-gray-900"}`}>
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
        // <section className="bg-black/10  fill-transparent w-[3.3rem]">
        //   <label className="hamburger cursor-pointer ">
        //     <input type="checkbox" className="hidden" />
        //     <svg viewBox="0 0 32 32" className="h-[3em]">
        //       <path
        //         className="line line-top-bottom"
        //         d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
        //       ></path>
        //       <path className="line" d="M7 16 27 16"></path>
        //     </svg>
        //   </label>
        // </section>