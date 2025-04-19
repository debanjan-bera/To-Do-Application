import { memo} from "react";
import useResponsive from "../Hooks/UseResponsive";
import Header from "../Components/layout/Header/Header";

import { DataProvider } from "../Contexts/DataWhereHouse";
import { DateManagerProvider } from "../Contexts/DateManagement";
import { UserFormData } from "../Contexts/AddititonalData";
import  MCalendarComponent  from "../Components/layout/Calendar/MobileCalendar";

import { TaskReSection } from "./Home";


const ReDashBoard = () => {
  const isSmallLaptop = useResponsive(1020);
  const isMediumDevice = useResponsive(767);
  // const { taskArr, setTaskArr,} = useContext(ToDoContext);


  // const data = useMemo(
  //   () => [
  //     {
  //       id: "18/04/2025&16:13:06",
  //       content: "rf",
  //       group: "Music",
  //       description: "fff",
  //       favourite: false,
  //       checked: false,
  //       status: "Pending",
  //       priority: "Moderate",
  //       createdDateForform: "18 April 2025",
  //     },
  //     {
  //       id: "17/04/2025&16:15:07",
  //       content: "5",
  //       group: "Traveling",
  //       description: "5",
  //       favourite: false,
  //       checked: false,
  //       status: "Pending",
  //       priority: "High",
  //       createdDateForform: "17 April 2025",
  //     },
  //     {
  //       id: "18/04/2025&16:20:02",
  //       content: "ede",
  //       group: "Traveling",
  //       description: "4444",
  //       favourite: false,
  //       checked: false,
  //       status: "Pending",
  //       priority: "High",
  //       createdDateForform: "17 April 2025",
  //     },
  //     {
  //       id: "17/04/2025&16:22:11",
  //       content: "Learn guitar",
  //       group: "Music",
  //       description: "Practice chords",
  //       favourite: true,
  //       checked: false,
  //       status: "Pending",
  //       priority: "Moderate",
  //       createdDateForform: "17 April 2025",
  //     },
  //     {
  //       id: "17/04/2025&16:24:50",
  //       content: "Plan Goa trip",
  //       group: "Traveling",
  //       description: "Find hotels and flights",
  //       favourite: false,
  //       checked: false,
  //       status: "Pending",
  //       priority: "High",
  //       createdDateForform: "20 April 2025",
  //     },
  //     {
  //       id: "17/04/2025&16:26:34",
  //       content: "Buy groceries",
  //       group: "Personal",
  //       description: "Milk, Bread, Eggs",
  //       favourite: true,
  //       checked: true,
  //       status: "Completed",
  //       priority: "Low",
  //       createdDateForform: "17 April 2025",
  //     },
  //     {
  //       id: "19/04/2025&16:29:09",
  //       content: "Study React",
  //       group: "Education",
  //       description: "Hooks, Context API",
  //       favourite: false,
  //       checked: false,
  //       status: "Pending",
  //       priority: "High",
  //       createdDateForform: "21 April 2025",
  //     },
  //     {
  //       id: "27/04/2025&16:31:45",
  //       content: "Exercise",
  //       group: "Fitness",
  //       description: "Morning run",
  //       favourite: true,
  //       checked: false,
  //       status: "Pending",
  //       priority: "Moderate",
  //       createdDateForform: "17 April 2025",
  //     },
  //     {
  //       id: "17/04/2025&16:35:27",
  //       content: "Meditation",
  //       group: "Fitness",
  //       description: "15 min breathing",
  //       favourite: true,
  //       checked: true,
  //       status: "Completed",
  //       priority: "Low",
  //       createdDateForform: "20 April 2025",
  //     },
  //     {
  //       id: "17/04/2025&16:38:02",
  //       content: "Call mom",
  //       group: "Personal",
  //       description: "Weekly check-in",
  //       favourite: true,
  //       checked: false,
  //       status: "Pending",
  //       priority: "Moderate",
  //       createdDateForform: "17 April 2025",
  //     },
  //     {
  //       id: "17/04/2025&16:40:15",
  //       content: "Read a book",
  //       group: "Education",
  //       description: "Finish current novel",
  //       favourite: false,
  //       checked: false,
  //       status: "Pending",
  //       priority: "Low",
  //       createdDateForform: "17 April 2025",
  //     },
  //     {
  //       id: "19/04/2025&16:43:00",
  //       content: "Project work",
  //       group: "Music",
  //       description: "Frontend UI updates",
  //       favourite: true,
  //       checked: true,
  //       status: "Completed",
  //       priority: "High",
  //       createdDateForform: "17 April 2025",
  //     },
  //   ],
  //   []
  // );

  // const allGroups = [...new Set(data.map(task => task.group))];
  // const selectedGroups = ["Music", "Personal"];
  // const selectedPriorities = ["High", "Moderate"];
  // const selectedFavourites = [true];
  // // Apply both filters for group and priority
  // const filteredTasks = data.filter(
  //   (task) =>
  //     selectedGroups.includes(task.group) &&
  //     selectedPriorities.includes(task.priority) &&
  //     selectedFavourites.includes(task.favourite)
  // );


  // Sorting the filtered tasks
  // const sortedData = [...filteredTasks].sort((a, b) => {
  //   // Step 1: Sort by status (Pending first, Completed later)
  //   if (a.status === "Pending" && b.status === "Completed") return -1;
  //   if (a.status === "Completed" && b.status === "Pending") return 1;

  //   // Step 2: If same status, sort by createdDateForform (newest first)
  //   const dateA = new Date(a.createdDateForform);
  //   const dateB = new Date(b.createdDateForform);
  //   if (dateA > dateB) return -1;
  //   if (dateA < dateB) return 1;

  //   return 0; // otherwise keep same
  // });

  // console.log(sortedData);

  return (
    <DataProvider>
    <DateManagerProvider>
      <UserFormData>
      <section className=" min-h-screen w-full grid grid-cols-1 p-0 md:grid-cols-[11rem_2fr_20rem] md:pb-3 grid-rows-[auto_1fr] bg-[#101010] text-white font-sans">
      {/* Sidebar A */}
      {!isMediumDevice && (
        <aside className="hidden md:grid grid-rows-[auto_1fr] justify-center gap-4 p-4 col-span-1 row-span-2  backdrop-blur-md shadow-inner">
          <p className="text-3xl italic font-bold">Taskly</p>
          <nav className="flex flex-col gap-2 text-sm">
            {["🏠 Home", "✅ Tasks", "📅 Calendar", "⚙️ Settings"].map(
              (item) => (
                <button
                  key={item}
                  className="px-4 py-2 rounded-xl  hover:bg-white/10 transition-all text-left"
                >
                  {item}
                </button>
              )
            )}
          </nav>
        </aside>
      )}

      {/* Header */}
      <Header />

      {/* Main */}
      <main className="bg-neutral-950/60 border rounded-none col-span-3 md:col-start-2 border-neutral-800 col-end-4 lg:col-end-2 p-3  backdrop-blur-xl shadow-xl  flex flex-col gap-6 lg:rounded-lg">
        <div className="p-4  bg-white/5 rounded-2xl text-2xl font-semibold shadow-inner">
          🧊 Welcome to your beautifully glassy dashboard!
        </div>
        <ul className="flex flex-col gap-3  rounded-md p-3">
          <TaskReSection/>
        </ul>
        <div>

        </div>
      </main>

      {/* Sidebar C */}
      {!isSmallLaptop && (
        <aside className=" hidden lg:flex flex-col items-center gap-4 p-2">
          {/* <div className="w-full flex flex-col gap-4 bg-white/10 p-3 rounded-2xl text-sm">
            <div className="w-full p-3 bg-black/40 rounded-md text-center text-base font-medium">

            </div>
            <ul className="flex flex-col gap-2 text-center text-black">
              {[1, 2, 3, 4].map((item) => (
                <li
                  key={item}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-md font-bold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div> */}
          <MCalendarComponent/>
        </aside>
      )}
    </section>
      </UserFormData>
    </DateManagerProvider>
  </DataProvider>

  );
};

export default memo(ReDashBoard);


// const ReDashBoard = () => {
//   return (
//     <>
//       <section className="h-lvh w-svw grid grid-cols-[0.5fr_2fr_0.7fr] grid-rows-[0.4fr_3fr] bg-[#1E1F23] text-color">
//         <header className="w-full h-full  col-start-2 col-end-4 row-start-1 row-end-2 border-b border-zinc-700">Header</header>
//         <aside className="w-full h-full col-start-1 col-end-2 row-start-1 row-end-3 border-r border-zinc-700">A</aside>
//         <main className="w-full h-full bg-[#15161A] col-start-2 col-end-4 row-start-2 row-end-3 flex flex-row items-start " >
//             <div className="my-3 mx-8 p-2 w-full bg-[#1D1E22] text-2xl text-white border border-zinc-700">1</div>
//         </main>
//         <aside className="w-full h-full hidden col-start-3 col-end-4 row-start-2 row-end-3 border-l border-zinc-700">C</aside>
//       </section>
//     </>
//   );
// };

// export default memo(ReDashBoard);


//bg-[#141414] bg-#1B1A1D
// bg-[#0D1116] bg-[#161C23]
// bg-[#1E1F23] bg-[#15161A]