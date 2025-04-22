import { memo, useCallback, useContext, useEffect } from "react";
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
  const { taskArr, windowOpen,setActiveMenuId } =
    useContext(ToDoContext);

  const isMobile = useResponsive(670); 
  const handleClickOutside = useCallback(() => {
    setActiveMenuId(null);
  }, [setActiveMenuId]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);
  // useEffect(() => {
  //   const data = localStorage.getItem('todoFilterItems');
  
  //   if (data) {
  //     localStorage.removeItem('todoFilterItems');
  //   }
  // }, []);
  // Save to localStorage
  useEffect(() => {
    setLocalStorage(taskArr);
  }, [taskArr]);

  return (
    <>
      <AnimatePresence>{windowOpen && <AddTaskForm />}</AnimatePresence>
      <section
        className={`relative w-full h-full grid grid-cols-1 grid-rows-[0.3fr_0.4fr_2.8fr] px-2  ${
          isMobile && "overflow-y-auto main-scroll"
        }`}
      >

        <TaskHeader />
        <TaskCategory />
        <TaskSection isCompleted={isCompletedDashBoard} />
      </section>
    </>
  );
};
TaskManager.propTypes = {
  isCompletedDashBoard: PropTypes.bool,
};

export default memo(TaskManager);
