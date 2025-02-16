import { WiSunrise,WiNightClear } from "react-icons/wi"; // Weather Icons
export const DateAndTime = () => {
  const hour = new Date().getHours()
  const { greeting, icon } =
    hour >= 5 && hour < 12
      ? { greeting: "Good Morning", icon: <WiSunrise className="text-yellow-400 text-4xl" /> }
      : hour >= 12 && hour < 18
      ? { greeting: "Good Afternoon", icon: '☀️' }
      : { greeting: "Good Evening", icon: <WiNightClear className="text-blue-400 text-5xl" /> };

  return (
    <div className="flex items-center justify-center ">
      <h1>{greeting}</h1>{icon}
    </div>
  );
};