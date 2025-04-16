
import { memo } from "react";
const ContributionGraph = () => {


  return (
    <section className="min-h-screen w-full bg-[#0E0E0E] text-white font-sans overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr_0.7fr] grid-rows-[auto_1fr] min-h-screen">
        
        {/* Sidebar */}
        <aside className="col-span-1 row-span-2 md:border-r border-zinc-700 bg-[#1E1F23] p-4">
          <h2 className="text-xl font-semibold text-[#6569F4] mb-4">Taskly</h2>
        </aside>

        {/* Header */}
        <header className="md:col-span-2 p-4 bg-[#1F2125] border-b border-zinc-700 shadow-md backdrop-blur-md bg-opacity-30">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        </header>

        {/* Main */}
        <main className="p-4 flex flex-col gap-8 bg-[#15161A]">
          {/* Task Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {["#86ABFA", "#5BC298", "#EE89D6", "#7068FF", "#FDC761"].map((color, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl shadow-xl backdrop-blur-md bg-opacity-10 border border-zinc-700 text-white"
                style={{
                  background: `linear-gradient(135deg, ${color}33, #1F2125)`,
                  borderColor: color,
                }}
              >
                <h3 className="text-lg font-semibold mb-2">Task {i + 1}</h3>
                <p className="text-sm">Details about task {i + 1}</p>
              </div>
            ))}
          </section>

          {/* Contribution Graph (Full Year) */}


        </main>

        {/* Right Sidebar */}
        <aside className="hidden md:block bg-[#1E1F23] border-l border-zinc-700 p-4">
          <h2 className="text-lg font-semibold text-[#6569F4]">Notes</h2>
        </aside>
      </div>
    </section>
  );
};

export default memo(ContributionGraph);
// import { useMemo } from "react";
// import { motion } from "framer-motion";

// const PRIMARY_COLORS = ["#15161A", "#86ABFA", "#5BC298", "#EE89D6", "#7068FF", "#FDC761"];

// const startDate = new Date("2024-01-01");
// const endDate = new Date("2024-12-31");

// function getStartOfWeek(date) {
//   const d = new Date(date);
//   d.setDate(d.getDate() - d.getDay());
//   return d;
// }

// function getEndOfWeek(date) {
//   const d = new Date(date);
//   d.setDate(d.getDate() + (6 - d.getDay()));
//   return d;
// }

// function formatDate(date) {
//   return date.toISOString().split("T")[0]; // YYYY-MM-DD
// }

// function getMonthLabel(date) {
//   return date.toLocaleString("default", { month: "short" });
// }

// function generateDateGrid() {
//   const days = [];
//   const start = getStartOfWeek(startDate);
//   const end = getEndOfWeek(endDate);
//   let current = new Date(start);

//   while (current <= end) {
//     days.push(new Date(current));
//     current.setDate(current.getDate() + 1);
//   }

//   return days;
// }

// const ContributionGraph = () => {
//   const dates = useMemo(() => generateDateGrid(), []);
//   const weeks = useMemo(() => {
//     const columns = [];
//     for (let i = 0; i < dates.length; i += 7) {
//       columns.push(dates.slice(i, i + 7));
//     }
//     return columns;
//   }, [dates]);

//   const getColor = (date) => {
//     const day = date.getDate();
//     return PRIMARY_COLORS[day % PRIMARY_COLORS.length];
//   };

//   const months = useMemo(() => {
//     const seen = new Set();
//     return weeks.map((week, i) => {
//       const label = getMonthLabel(week[0]);
//       if (!seen.has(label)) {
//         seen.add(label);
//         return { label, index: i };
//       }
//       return null;
//     }).filter(Boolean);
//   }, [weeks]);

//   return (
//     <div className="p-6 rounded-2xl bg-[#1E1F23]/60 backdrop-blur-md shadow-lg text-white w-fit max-w-full overflow-auto">
//       {/* Month Labels */}
//       <div className="flex ml-10 space-x-1 text-sm text-gray-400 mb-1">
//         {weeks.map((_, i) => {
//           const label = months.find((m) => m.index === i);
//           return (
//             <div key={i} style={{ width: 14, textAlign: "center" }}>
//               {label ? label.label : ""}
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex">
//         {/* Weekday Labels */}
//         <div className="flex flex-col justify-between text-sm text-gray-400 mr-2 h-[98px]">
//           {["Sun", "Tue", "Thu", "Sat"].map((d) => (
//             <span key={d} className="h-[14px] leading-none">{d}</span>
//           ))}
//         </div>

//         {/* Grid */}
//         <div className="flex space-x-[2px]">
//           {weeks.map((week, i) => (
//             <div key={i} className="flex flex-col space-y-[2px]">
//               {week.map((day, j) => (
//                 <motion.div
//                   key={j}
//                   className="w-[14px] h-[14px] rounded-md shadow-sm"
//                   style={{ backgroundColor: getColor(day) }}
//                   initial={{ scale: 0.7, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ delay: (i * 7 + j) * 0.002 }}
//                   title={formatDate(day)}
//                 />
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContributionGraph;




// const generateMockContributions = () => {
//     const contributions = [];
//     for (let i = 0; i < 365; i++) {
//       contributions.push(Math.floor(Math.random() * 5)); // values 0-4
//     }
//     return contributions;
//   };
  
//   const intensityColors = [
//     "#1F2125",   // level 0 (no activity)
//     "#313368",   // level 1
//     "#4B4EF0",   // level 2
//     "#6569F4",   // level 3
//     "#A0A2FA",   // level 4
//   ];

// const contributions = generateMockContributions();

//           <section>
//             <h2 className="text-xl font-bold text-[#6569F4] mb-4">Yearly Contribution Graph</h2>
//             <div className="overflow-x-auto">
//               <div className="flex gap-[2px]">
//                 {Array.from({ length: 52 }).map((_, weekIdx) => (
//                   <div key={weekIdx} className="flex flex-col gap-[2px]">
//                     {Array.from({ length: 7 }).map((_, dayIdx) => {
//                       const idx = weekIdx * 7 + dayIdx;
//                       const level = contributions[idx] || 0;
//                       return (
//                         <div
//                           key={dayIdx}
//                           className="w-3.5 h-3.5 rounded-sm"
//                           style={{
//                             backgroundColor: intensityColors[level],
//                           }}
//                         />
//                       );
//                     })}
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <p className="mt-2 text-xs text-gray-400">Simulated 365-day graph. Activity level colors from 0–4.</p>
//           </section>