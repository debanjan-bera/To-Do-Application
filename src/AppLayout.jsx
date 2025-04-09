// import { useContext, useEffect, useState } from "react";
// import "../App.css";
// import PropTypes from "prop-types";
// import { FormDataContext, ToDoContext } from "../Contexts/CreateContext";
// import { ClearAllTask } from "../Components/Functions/Button/ClearTodo";
// import { AnimatePresence } from "framer-motion";
// import { AddTaskForm } from "../To-Do/InputBox.jsx";
// import { handleFormCancel } from "../Backend/FormFunctionality";
// import { setLocalStorage } from "../Backend/LocalStorage";
// import { BsArrowDownCircle } from "react-icons/bs";
// import { TaskListHello } from "../Utilities/TaskList.jsx";
// import useIsMobile from "../Components/Functions/UseIsMobile.jsx";
// import { PiBookBookmarkBold } from "react-icons/pi";
// import { MobileAddTaskButton } from "../Components/Functions/Button/AddButton.jsx";
// import { RxDashboard } from "react-icons/rx";
// import { BiFilterAlt } from "react-icons/bi";

// export const TaskManager = ({ isCompletedDashBoard }) => {
//   const {
//     taskArr,
//     windowOpen,
//     setWindowClose,
//     filteredData,
//     handleAddTaskWindow,
//     setActiveMenuId,
//   } = useContext(ToDoContext);

//   const { groupData } = useContext(FormDataContext);
//   const [showData, setShowCompleted] = useState(false);
//   const isTablet = useIsMobile(960);
//   const isMobile = useIsMobile(670);

//   const pendingTasks = taskArr.length;
//   const completedTasks = filteredData.length;
//   const totalTasks = pendingTasks + completedTasks;
//   const progressPercent =
//     totalTasks === 0 ? 0 : Math.round((completedTasks * 100) / totalTasks);

//   useEffect(() => {
//     const handleClickOutside = () => setActiveMenuId(null);
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [setActiveMenuId]);

//   useEffect(() => {
//     setLocalStorage(taskArr, filteredData);
//   }, [taskArr, filteredData]);

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.altKey && event.key === "n") {
//         event.preventDefault();
//         handleAddTaskWindow();
//       }
//       if (event.key === "Escape") handleFormCancel(setWindowClose);
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [handleAddTaskWindow, setWindowClose]);

//   return (
//     <>
//       <AnimatePresence>{windowOpen && <AddTaskForm />}</AnimatePresence>
//       <section className="relative w-full h-full grid grid-cols-1 grid-rows-[0.5fr_0.4fr_2.8fr] bg-white text-gray-900">
//         {/* Header section */}
//         <div
//           className={`w-full h-full ${
//             isMobile
//               ? "flex flex-col justify-start items-start"
//               : "grid grid-cols-2 grid-rows-2 justify-items-start"
//           } px-6`}
//         >
//           <div className="col-start-1 col-end-2 row-start-1 row-end-2 mt-3">
//             <div className="flex items-center gap-3 p-2 rounded-full border border-gray-300 bg-white text-gray-800 shadow hover:shadow-md transition-all duration-300">
//               <span className="text-xl aspect-square rounded-full bg-green-100 text-green-600 p-3 flex items-center justify-center border border-green-400">
//                 <RxDashboard />
//               </span>
//               <h1 className="text-xl font-semibold tracking-wide">
//                 {isCompletedDashBoard ? "Achievement" : "Dashboard"}
//               </h1>
//             </div>
//           </div>

//           {/* Progress bar */}
//           <div
//             className={`w-full flex flex-col justify-center items-start col-start-1 ${
//               isTablet ? "col-end-3" : "col-end-2"
//             } row-start-2 row-end-3`}
//           >
//             {progressPercent > 0 && (
//               <div className="w-full p-2 flex justify-between">
//                 <span>Progress</span>
//                 <span>{`${progressPercent}%`}</span>
//               </div>
//             )}
//             <div className="w-full h-4 border border-gray-300 bg-gray-200 rounded-2xl relative overflow-hidden">
//               <div
//                 className="h-4 bg-gradient-to-r from-blue-400 to-blue-600 absolute top-0 left-0 transition-all duration-500"
//                 style={{ width: `${progressPercent}%` }}
//               ></div>
//             </div>
//             <div className="w-full pt-1 text-base text-gray-600 mt-1">
//               <span className="font-medium pr-3">
//                 Total Tasks:{" "}
//                 <span className="bg-gray-100 text-gray-800 text-sm py-[0.2rem] px-[0.4rem] rounded-full">
//                   {totalTasks}
//                 </span>
//               </span>
//               <span className="font-medium pr-3">
//                 Pending:{" "}
//                 <span className="bg-red-200 text-red-800 font-bold text-sm py-[0.2rem] px-[0.5rem] rounded-full">
//                   {pendingTasks}
//                 </span>
//               </span>
//               <span className="font-medium pr-3">
//                 Completed:{" "}
//                 <span className="bg-green-200 text-green-800 font-bold text-sm py-[0.2rem] px-[0.5rem] rounded-full">
//                   {completedTasks}
//                 </span>
//               </span>
//             </div>
//           </div>

//           {!isMobile && (
//             <div
//               className={`w-full flex justify-end items-center col-start-2 col-end-3 row-start-1 ${
//                 isTablet ? "row-end-2" : "row-end-3"
//               }`}
//             >
//               {!isTablet && <ClearAllTask pendingTask={true} />}
//               <button
//                 title="Alt + N"
//                 className="px-4 py-2 text-xl font-bold bg-blue-600 rounded-md text-white hover:bg-blue-700 flex flex-row gap-2 items-center"
//                 onClick={handleAddTaskWindow}
//               >
//                 <PiBookBookmarkBold />
//                 Add Task
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Group Tags */}
//         <div className="w-full px-6 flex gap-4 items-center">
//           <div className="bg-white text-gray-900 border border-gray-300 shadow-sm px-3 py-2 rounded-lg font-semibold">
//             Category
//           </div>
//           <div className="w-full flex items-center overflow-x-auto custom-scroll">
//             {groupData.map((ele) => (
//               <p
//                 key={ele}
//                 className="mx-2 px-3 py-1 border border-gray-300 bg-gray-100 text-gray-800 rounded shadow-sm"
//               >
//                 {ele}
//               </p>
//             ))}
//           </div>
//           <div className="bg-white text-gray-900 border border-gray-300 shadow-sm px-3 py-2 rounded-lg font-semibold flex items-center gap-1">
//             Filter <span className="text-xl"><BiFilterAlt /></span>
//           </div>
//         </div>

//         {/* Task List */}
//         <div className="w-full h-full px-6 overflow-y-auto main-scroll">
//           <ul>
//             <AnimatePresence>
//               {(isCompletedDashBoard ? filteredData : taskArr).map(
//                 (activeTask) => (
//                   <TaskListHello key={activeTask.id} activeTask={activeTask} />
//                 )
//               )}
//             </AnimatePresence>
//           </ul>

//           {!isCompletedDashBoard && (
//             <ul className="text-gray-900">
//               <AnimatePresence>
//                 {filteredData.length > 0 && (
//                   <li
//                     className="p-3 mb-4 border border-gray-300 bg-white rounded inline-block text-xl font-medium cursor-pointer shadow-sm hover:shadow"
//                     onClick={() => setShowCompleted(!showData)}
//                   >
//                     <p className="flex items-center gap-2">
//                       <span
//                         className={`transition-transform ${
//                           showData ? "rotate-180" : ""
//                         }`}
//                       >
//                         <BsArrowDownCircle />
//                       </span>
//                       {`Completed Tasks: ${filteredData.length}`}
//                     </p>
//                   </li>
//                 )}

//                 {showData &&
//                   filteredData.map((activeTask) => (
//                     <TaskListHello
//                       key={activeTask.id}
//                       activeTask={activeTask}
//                     />
//                   ))}
//               </AnimatePresence>
//             </ul>
//           )}
//         </div>
//       </section>

//       {/* FAB for mobile */}
//       {isMobile && <MobileAddTaskButton addTask={handleAddTaskWindow} />}
//     </>
//   );
// };

// TaskManager.propTypes = {
//   isCompletedDashBoard: PropTypes.bool.isRequired,
// };
