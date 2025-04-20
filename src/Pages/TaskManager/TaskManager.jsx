import { memo, useCallback, useContext, useEffect, useMemo } from "react";
import "../../App.css";
import PropTypes from "prop-types";
import { AnimatePresence } from "framer-motion";
import TaskHeader from "./TaskHeader.jsx";
import TaskCategory from "./TaskCategory.jsx";
import TaskSection from "./TaskSection.jsx";
import { ToDoContext } from "../../Contexts/CreateContext.jsx";
import { AddTaskForm } from "../../To-Do/InputBox.jsx";
import { setLocalStorage } from "../../Backend/LocalStorage.js";
import useResponsive from "../../Hooks/UseResponsive.jsx";

const TaskManager = ({ isCompletedDashBoard }) => {
  const {taskArr,windowOpen,filteredData,setActiveMenuId,} = useContext(ToDoContext);

  const isMobile = useResponsive(670); // Check if it's the login page
  const handleClickOutside = useCallback(() => {
    setActiveMenuId(null);
  }, [setActiveMenuId]);
  
  // Memoized background style


  useEffect(() => {;
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  // Save to localStorage
  useEffect(() => {
    setLocalStorage(taskArr, filteredData);
  }, [taskArr, filteredData]);


  return (
    <>
      <AnimatePresence>{windowOpen && <AddTaskForm />}</AnimatePresence>
      <section
        className={`relative w-full h-full grid grid-cols-1 grid-rows-[0.5fr_0.4fr_2.8fr]  ${
          isMobile && "overflow-y-auto main-scroll"
        }`}
      >
                      {/* <div className="w-full h-full overflow-hidden">
                <div className="p-4 bg-white/5 rounded-2xl text-2xl font-semibold shadow-inner">
                  🧊 Welcome to your beautifully glassy dashboard!
                </div>
                <ul className="w-full h-full flex flex-col gap-3 rounded-md p-3 overflow-y-scroll">
                  <TaskReSection />
                </ul>
              </div> */}
        {/* %236e6e6e */}
        <TaskHeader isCompleted={isCompletedDashBoard}/>

        {/* Group Tags */}
        <TaskCategory/>
        <TaskSection isCompleted={isCompletedDashBoard}/>
      </section>
    </>
  );
};
TaskManager.propTypes = {
  isCompletedDashBoard: PropTypes.bool.isRequired,
};

export default memo(TaskManager);