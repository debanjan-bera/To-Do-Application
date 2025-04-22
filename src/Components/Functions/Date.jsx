import { WiSunrise,WiNightClear } from "react-icons/wi"; // Weather Icons
export const DateAndTime = () => {
  const hour = new Date().getHours()
  const { greeting, icon } =
    hour >= 5 && hour < 12
      ? { greeting: "Good Morning", icon: <WiSunrise className="text-yellow-400 text-4xl pl-1" /> }
      : hour >= 12 && hour < 18
      ? { greeting: "Good Afternoon", icon: '☀️' }
      : { greeting: "Good Evening", icon: <WiNightClear className="text-blue-400 text-4xl" /> };

  return (
    <div className="flex items-center flex-wrap">    
      <div className="h-full flex items-center justify-center ">
        <div className="h-full rounded-full p-[0.1rem] bg-black border-[0.02rem] border-neutral-600 mr-3 flex items-center justify-center text-center">{icon}</div>
        
        </div>
        
      <h1 className=" text-center font-semibold text-lg"><span className="text-2xl">{greeting}</span>{`, Debanjan Bera`}</h1>
    </div>
  );
};