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
  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='50' height='50' fill='none' stroke-width='1' stroke='%239fa6ad29' %3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
  }), []);

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
        style={backgroundStyle}
      >
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




