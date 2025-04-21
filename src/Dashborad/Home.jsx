// import { useMemo } from "react";

// const Home = () => {
//   const today = new Date();
  
//   // Generate 365 days data
//   const days = useMemo(() => {
//     const arr = [];
//     const current = new Date();
//     current.setHours(0, 0, 0, 0);

//     for (let i = 0; i < 365; i++) {
//       arr.unshift({
//         date: new Date(current),
//         count: Math.floor(Math.random() * 5), // Random contribution count (0 to 4)
//       });
//       current.setDate(current.getDate() - 1);
//     }
//     return arr;
//   }, []);

//   const getColor = (count) => {
//     if (count === 0) return "bg-neutral-800";
//     if (count === 1) return "bg-green-200";
//     if (count === 2) return "bg-green-400";
//     if (count === 3) return "bg-green-500";
//     if (count >= 4) return "bg-green-600";
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold text-white mb-4">Contribution Graph</h1>
//       <div className="flex gap-1 overflow-x-auto">
//         {/* Weekdays */}
//         <div className="flex flex-col gap-1 text-xs text-zinc-400 mt-6">
//           <div>Mon</div>
//           <div>Wed</div>
//           <div>Fri</div>
//         </div>

//         {/* Graph */}
//         <div className="grid grid-flow-col auto-cols-max gap-1">
//           {Array.from({ length: 53 }).map((_, weekIndex) => (
//             <div key={weekIndex} className="flex flex-col gap-1 items-center">
//               {Array.from({ length: 7 }).map((_, dayIndex) => {
//                 const index = weekIndex * 7 + dayIndex;
//                 const day = days[index];
//                 if (!day) return <div key={dayIndex} className="h-4 w-4"></div>;

//                 return (
//                   <div key={dayIndex} className="flex flex-col items-center group">
//                     <div
//                       className={`h-4 w-4 rounded-sm ${getColor(day.count)}`}
//                       title={`${day.date.toDateString()} - ${day.count} contributions`}
//                     ></div>
//                     <span className="hidden group-hover:block text-[8px] text-gray-400">
//                       {day.date.getDate()}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
 const Home = ()=>{
  return(
    <>
    </>
  )
 }

export default Home;
