import { useEffect, useState } from "react";

export const DateAndTime = () => {
  // console.log('hello')

  const [nowDateTime, setDateTime] = useState("");
  useEffect(() => {
    const setInterVal = setInterval(() => {
      const todayDate = new Date();
      const formattedDate = todayDate.toLocaleDateString();
      const formattedTime = todayDate.toLocaleTimeString();
      setDateTime(`${formattedDate} - ${formattedTime}`);
    }, 1000);
    return ()=> clearInterval(setInterVal)
  },[]);

  return <h1 className="text-xl text-white font-semibold">{nowDateTime}</h1>;
};
