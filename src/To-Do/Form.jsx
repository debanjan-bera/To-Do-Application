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
