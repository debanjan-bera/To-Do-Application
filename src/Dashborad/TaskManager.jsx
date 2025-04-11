import { useContext, useEffect, useState } from "react";
import "../App.css";
import PropTypes from "prop-types";
import { FormDataContext, ToDoContext } from "../Contexts/CreateContext";
import { ClearAllTask } from "../Components/Functions/Button/ClearTodo";
import { AnimatePresence } from "framer-motion";
import { AddTaskForm } from "../To-Do/InputBox.jsx";
import { handleFormCancel } from "../Backend/FormFunctionality";
import { setLocalStorage } from "../Backend/LocalStorage";
import { BsArrowDownCircle } from "react-icons/bs";
import { TaskListHello } from "../Utilities/TaskList.jsx";
import useIsMobile from "../Components/Functions/UseIsMobile.jsx";
import { PiBookBookmarkBold } from "react-icons/pi";
// import { MobileAddTaskButton } from "../Components/Functions/Button/AddButton.jsx";
import { RxDashboard } from "react-icons/rx";
import { BiFilterAlt } from "react-icons/bi";
export const TaskManager = ({isCompletedDashBoard}) => {
  const { taskArr, windowOpen, setWindowClose, filteredData, handleAddTaskWindow, setActiveMenuId,} = useContext(ToDoContext);
  const { groupData } = useContext(FormDataContext);
  const [showData, setShowCompleted] = useState(false);
  const isTablet = useIsMobile(960);
  const isMobile = useIsMobile(670);// Check if it's the login page

  const pendingTasks = taskArr.length;
  const completedTasks = filteredData.length;
  const totalTasks = pendingTasks + completedTasks
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks * 100) / totalTasks);


  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setActiveMenuId]);

  // Save to localStorage
  useEffect(() => {
    setLocalStorage(taskArr, filteredData);
  }, [taskArr, filteredData]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === "n") {
        event.preventDefault();
        handleAddTaskWindow();
      }
      if (event.key === "Escape") handleFormCancel(setWindowClose);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleAddTaskWindow, setWindowClose]);

  return (
    <>
      <AnimatePresence>{windowOpen && <AddTaskForm />}</AnimatePresence>
      <section
        className="relative w-full h-full grid grid-cols-1 grid-rows-[0.5fr_0.4fr_2.8fr]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='50' height='50' fill='none' stroke-width='1' stroke='%239fa6ad29' %3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
      >
      {/* %236e6e6e */}
        <div
          className={`w-full h-full ${
            isMobile
              ? "flex justify-start flex-col items-start"
              : "grid grid-cols-2 grid-rows-2 justify-items-start "
          } px-6`}
        >
          <div className="col-start-1 col-end-2 row-start-1 row-end-2 mt-3 ">
          <div className=" flex items-center gap-3 p-2  rounded-full border border-zinc-600 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
            <span className="text-xl aspect-square rounded-full bg-lime-500/10 text-lime-400 p-3 flex items-center justify-center border border-lime-400">
              <RxDashboard />
            </span>
            <h1 className="text-xl font-semibold tracking-wide">
              {isCompletedDashBoard ? "Achivement" : "Dashboard"}
            </h1>
          </div>
          </div>

          {/* Progress bar */}
          {totalTasks&&<div className={`w-full bg-zinc-900 border border-zinc-600 p-2 rounded-lg ${isMobile && 'py-4 my-3'} flex flex-col justify-center items-start col-start-1 ${isTablet? 'col-end-3':'col-end-2'} row-start-2 row-end-3`}>
          <h1 className="text-2xl py-1 font-bold">My Task {`(${completedTasks} / ${totalTasks})`}</h1> 
            {(progressPercent > 0)&&<div className="w-full text-lg text-zinc-400 flex justify-between">
              <span className="">Progreesing </span>{" "}
              <span>{`${progressPercent}%`}</span>
            </div>}
            <div className="w-full h-4 mt-2 border border-zinc-700 bg-zinc-900 rounded-2xl relative overflow-hidden">
              <div
                className="h-4 bg-gradient-to-r from-pink-500 to-red-600 absolute top-0 left-0 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>}

          
          {!isMobile && (
            <div className={`w-full flex justify-end items-center flex-row col-start-2 col-end-3 row-start-1 ${isTablet? 'row-end-2':'row-end-3'}`}>
              {!isTablet && <ClearAllTask pendingTask={true} />}
              <button
                title="Alt + N"
                className="px-4 py-3 text-xl font-bold bg-blue-600 rounded-md text-white hover:bg-blue-700 flex flex-row gap-2 items-center"
                onClick={handleAddTaskWindow}
              >
                <PiBookBookmarkBold />
                Add Task
              </button>
            </div>
          )}
        </div>

        {/* Group Tags */}
        <div className="w-full px-6 flex gap-4 flex-row items-center ">
          {!isMobile&&<div className="bg-white text-black p-2 rounded-lg font-semibold">Category</div>}
          <div className="w-full flex flex-row items-center overflow-x-auto custom-scroll">
            <p className="mx-2 p-1 px-3 border-2 border-zinc-700 bg-zinc-900 rounded flex gap-1">All <span>{`(${taskArr.length})`}</span></p>
            {groupData.map((ele) => ( 
              <p
                key={ele} id={ele}
                className="mx-2 p-1 px-2 border border-zinc-700 bg-zinc-900 rounded"
              >
                {ele}
              </p>
            ))}

          </div>
          <div className="bg-white relative text-black p-2 rounded-lg font-semibold flex gap-1 flex-row items-center">Filter <span className="text-xl"><BiFilterAlt /></span> <span className="px-2 py-1 text-xs text-white absolute top-[-1rem] right-[-0.4rem] bg-blue-600 rounded-full aspect-square text-center">1</span></div>

        </div>

        {/* Task List */}
        <div className="w-full h-full px-6 overflow-y-auto main-scroll">
          <ul>
            <AnimatePresence>
              {(isCompletedDashBoard ? filteredData : taskArr).map(
                (activeTask) => (
                  <TaskListHello key={activeTask.id} activeTask={activeTask} />
                )
              )}
            </AnimatePresence>
          </ul>

          {/* Completed Task Toggle */}
          <AnimatePresence>
          {!isCompletedDashBoard && (
            <ul className="text-white">

                {filteredData.length > 0 && (
                  <li
                    className="p-3 mb-4 border border-zinc-700 bg-zinc-900 rounded inline-block text-white text-xl font-medium select-none"
                    onClick={() => setShowCompleted(!showData)}
                  >
                    <p className="flex items-center gap-2">
                      <span
                        className={`${showData && "rotate-180 transition-all"}`}
                      >
                        <BsArrowDownCircle />
                      </span>
                      {`Completed Tasks: ${filteredData.length}`}
                    </p>
                  </li>
                )}
                 
              {(showData)&&filteredData.map(
                (activeTask) => (
                  <TaskListHello key={activeTask.id} activeTask={activeTask} />
                )
              )}
              </ul>
              
            )}
            </AnimatePresence>
        </div>
      </section>

      {/* FAB for mobile */}
      {/* {isMobile && <MobileAddTaskButton addTask={handleAddTaskWindow} />} */}
    </>
  );
};
TaskManager.propTypes = {
  isCompletedDashBoard: PropTypes.bool.isRequired,
};