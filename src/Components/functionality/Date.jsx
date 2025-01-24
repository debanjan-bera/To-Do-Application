import { useEffect, useState } from "react";

export const DateAndTime = () => {
  const [nowDateTime, setDateTime] = useState("");
  useEffect(() => {
    const setInterVal = setInterval(() => {
      const todayDate = new Date();
      const formattedDate = todayDate.toLocaleDateString();
      const formattedTime = todayDate.toLocaleTimeString();
      setDateTime(`${formattedDate} - ${formattedTime}`);
    }, 1000);
    return () => clearInterval(setInterVal);
  }, []);

  return (
    <>
      <section className="p-4 pl-0">
        <h1 className="text-xl text-white font-semibold">{nowDateTime}</h1>
      </section>
    </>
  )
};
