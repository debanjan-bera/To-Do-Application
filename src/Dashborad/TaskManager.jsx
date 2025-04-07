import { useContext, useEffect, useState } from "react";
import "../App.css";
import { FormDataContext, ToDoContext } from "../Contexts/CreateContext";
import { ClearAllTask } from "../Components/Functions/Button/ClearTodo";
import { AnimatePresence } from "framer-motion";
import { AddTaskForm } from "../To-Do/InputBox.jsx";
import { handleFormCancel } from "../Backend/FormFunctionality";
import { setLocalStorage } from "../Backend/LocalStorage";
import { TaskListComp } from "../Components/Primary Component/ListBoxComp";
import { BsArrowDownCircle } from "react-icons/bs";
import {TaskListHello} from "../Utilities/TaskList.jsx";
import useIsMobile from "../Components/Functions/UseIsMobile.jsx";
import { PiBookBookmarkBold } from "react-icons/pi";
// import TaskList from './TaskList'
export const TaskManager = () => {
  const {
    taskArr,
    windowOpen,
    setWindowClose,
    filteredData,
    handleAddTaskWindow,
    activeMenuId,
    setActiveMenuId,
  } = useContext(ToDoContext);
  const { groupData } = useContext(FormDataContext);
  const [showData, setShowCompleted] = useState(false);
  const isTablet = useIsMobile(930)
  const isMobile = useIsMobile(670);

  const totalTasks = taskArr.length;
  const completedTasks = filteredData.length;
  const progressPercent = (completedTasks * 100) / totalTasks;
  const openMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenuId((prevId) => (prevId === id ? null : id));
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setActiveMenuId]);

  useEffect(() => {
    setLocalStorage(taskArr, filteredData);
  }, [taskArr, filteredData]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === "n") {
        event.preventDefault(); // Prevent default browser behavior (e.g., Ctrl+S saving the page)
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
        className="w-full h-full grid grid-cols-1 grid-rows-[0.5fr_0.4fr_2.8fr]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='50' height='50' fill='none' stroke-width='1' stroke='%239fa6ad29' %3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
      >
        <div className="w-full h-full grid grid-cols-2 grid-rows-2 px-6">
          <h1 className="text-3xl col-start-1 col-end-2 row-start-1 row-end-2">
            Overview
          </h1>
          <div className="flex flex-col justify-center items-start col-start-1 col-end-2 row-start-2 row-end-3">
            <div className="w-full h-4 border border-zinc-700 bg-zinc-900 rounded-2xl relative overflow-hidden">
              <div
                className={` h-4 bg-red-600 absolute top-0 left-0 rounded-2xl`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div>{`Task ${totalTasks} || Completed Task: ${completedTasks}`}</div>
          </div>
          <div className="flex justify-end items-center flex-row col-start-2 col-end-3 row-start-1 row-end-3">
            {/* <button className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700"> - Delete</button> */}
            {!isTablet&&<ClearAllTask pendingTask={true} />}
            {!isMobile&&<button
              className="px-4 py-2 text-xl font-bold bg-blue-600 rounded-md text-white hover:bg-blue-700 flex flex-row gap-2 items-center"
              onClick={() => handleAddTaskWindow()}
            >
              <PiBookBookmarkBold />
               Add Task
            </button>}
          </div>
        </div>
        <div className="w-full flex flex-row items-center overflow-x-auto custom-scroll">
          {groupData.map((ele) => (
            <p
              key={ele}
              className="mx-2 p-1 px-2 border border-zinc-700 bg-zinc-900 rounded"
            >
              {ele}
            </p>
          ))}
        </div>
        <div className="w-full h-full px-6 overflow-y-auto main-scroll">
          <ul>
            <AnimatePresence>
              {
                taskArr.map((activeTask)=>{
                  return(<TaskListHello key={activeTask.id} activeTask={activeTask}/>)
                })
              }
            </AnimatePresence></ul>
          <ul className=" text-white">
            <AnimatePresence>
              {filteredData.length > 0 && (
                <li
                  className="p-3  mb-4 border border-zinc-700 bg-zinc-900 rounded inline-block text-white text-xl font-medium select-none"
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

              {showData &&
                filteredData.map((Task) => {
                  return (
                    <TaskListComp
                      key={Task.id}
                      curTask={Task}
                      pendingTask={false}
                      openMenu={openMenu}
                      activeMenuId={activeMenuId}
                    />
                  );
                })}
            </AnimatePresence>
          </ul>
        </div>
      </section>
    </>
  );
};
