export const nextMonth = (setCurrentDate,year,month) => setCurrentDate(new Date(year, month + 1, 1));
export const prevMonth = (setCurrentDate,year,month) => setCurrentDate(new Date(year, month - 1, 1));
const listOfMonths = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
const todayDate = new Date();
const date = todayDate.getDate()
const month = todayDate.getMonth()
const year = todayDate.getFullYear()
export const createdDate = ()=> `${date} ${listOfMonths[month]} ${year}`