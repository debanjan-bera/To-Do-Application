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
import { MobileAddTaskButton } from "../Components/Functions/Button/AddButton.jsx";
import { RiDashboardLine } from "react-icons/ri";
export const TaskManager = ({isCompletedDashBoard}) => {
  const { taskArr, windowOpen, setWindowClose, filteredData, handleAddTaskWindow, setActiveMenuId,} = useContext(ToDoContext);
  const { groupData } = useContext(FormDataContext);
  const [showData, setShowCompleted] = useState(false);
  const isTablet = useIsMobile(930);
  const isMobile = useIsMobile(670);

  const pendingTasks = taskArr.length;
  const completedTasks = filteredData.length;
  const totalTasks = pendingTasks + completedTasks
  const progressPercent = totalTasks === 0 ? 0 : (completedTasks * 100) / totalTasks;


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
        }}>
        <div className={`w-full h-full ${isMobile ? 'flex justify-start flex-col items-start': 'grid grid-cols-2 grid-rows-2 justify-items-start '} px-6`}>
          <div className="text-2xl col-start-1 col-end-2 row-start-1 row-end-2 flex items-center my-2 px-2 py-1 rounded-3xl justify-start gap-2 border-2 border-neutral-600 bg-neutral-400/20">
            <span className="h-[92%] text-center aspect-square rounded-full bg-white text-black p-2"><RiDashboardLine /></span>
            <h1 className="">{isCompletedDashBoard? 'Completed Task' : 'Overview'}</h1>
          </div>
          

          {/* Progress bar */}
          <div className="flex flex-col justify-center items-start col-start-1 col-end-2 row-start-2 row-end-3">
            <div className="w-full h-4 border border-zinc-700 bg-zinc-900 rounded-2xl relative overflow-hidden">
              <div className="h-4 bg-red-600 absolute top-0 left-0 rounded-2xl transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div>{`Total Task ${totalTasks} || Pending Task ${pendingTasks} || Completed Task: ${completedTasks}`}</div>
          </div>

          {/* Add Task + Clear Buttons */}
          {!isMobile && (
            <div className="w-full flex justify-end items-center flex-row col-start-2 col-end-3 row-start-1 row-end-3">
              {!isTablet && <ClearAllTask pendingTask={true} />}
              <button title="Alt + N" className="px-4 py-2 text-xl font-bold bg-blue-600 rounded-md text-white hover:bg-blue-700 flex flex-row gap-2 items-center"
                onClick={handleAddTaskWindow}>
                <PiBookBookmarkBold />
                Add Task
              </button>
            </div>
          )}
        </div>

        {/* Group Tags */}
        <div className="w-full flex flex-row items-center overflow-x-auto custom-scroll">
          {groupData.map((ele) => (
            <p key={ele} className="mx-2 p-1 px-2 border border-zinc-700 bg-zinc-900 rounded">
              {ele}
            </p>
          ))}
        </div>

        {/* Task List */}
        <div className="w-full h-full px-6 overflow-y-auto main-scroll">
          <ul>
            <AnimatePresence>
              {(isCompletedDashBoard? filteredData : taskArr).map((activeTask) => (<TaskListHello key={activeTask.id} activeTask={activeTask} />))}
            </AnimatePresence>
          </ul>

          {/* Completed Task Toggle */}
          {
            !isCompletedDashBoard&&<ul className="text-white">
            <AnimatePresence>
              {filteredData.length > 0 && (
                <li
                  className="p-3 mb-4 border border-zinc-700 bg-zinc-900 rounded inline-block text-white text-xl font-medium select-none"
                  onClick={() => setShowCompleted(!showData)}>
                  <p className="flex items-center gap-2">
                    <span className={`${showData && "rotate-180 transition-all"}`}>
                      <BsArrowDownCircle />
                    </span>
                    {`Completed Tasks: ${filteredData.length}`}
                  </p>
                </li>
              )}

              {showData &&
                filteredData.map((activeTask) => (
                  <TaskListHello key={activeTask.id} activeTask={activeTask}/>
                ))}
            </AnimatePresence>
          </ul>
          }
          
        </div>
      </section>

      {/* FAB for mobile */}
      {isMobile&&<MobileAddTaskButton addTask={handleAddTaskWindow} />}
    </>
  );
};
TaskManager.propTypes = {
  isCompletedDashBoard: PropTypes.bool.isRequired,
};