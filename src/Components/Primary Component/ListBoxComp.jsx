import "../../To-Do/todo.css";
import PropTypes from "prop-types";
import { updatedTodayDate } from "../../Backend/LocalStorage";
import { useContext, useEffect, useState } from "react";
import { ToDoContext } from "../../Contexts/CreateContext";
import { handleCheckedTask, handleDeleteTask, toggleTaskStatus, } from "../../Backend/TaskFunctionality";
import { FiClock, FiTrash2 } from "react-icons/fi";
import { useAnimate, usePresence } from "framer-motion";
import { motion } from "framer-motion";
import { CheckItem } from "../functionality/CheckBox/CheckItem";
export const TaskListComp = ({ curTask,pendingTask}) => {
  const [check,setCheck] = useState(false)
  const {taskArr,filteredData,setTaskArr,setFilteredData} = useContext(ToDoContext)
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();
  const { id, content} = curTask;
  
  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        animate(
          "p",
          {
            color: check ? "#6ee7b7" : "#fca5a5",
          },
          {
            ease: "easeIn",
            duration: 0.125,
          }
        );
        await animate(
          scope.current,
          {
            scale: 1.025,
          },
          {
            ease: "easeIn",
            duration: 0.125,
          }
        );

        await animate(
          scope.current,
          {
            opacity: 0,
            x: check ? 0 : -24,
          },
          {
            delay: 0.75,
          }
        );
        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent,animate,check,safeToRemove,scope]);
  
  // const deleteTaskAnimation = deleteTask? `deleteTaskAnimation` : ''
  const onHandleCheckedTask = (event) => {
    if(pendingTask) handleCheckedTask(taskArr,id,setCheck,check,setTaskArr,setFilteredData)
    else toggleTaskStatus(event,filteredData,id,setFilteredData,setTaskArr,check,setCheck)
  };
  return (
    <motion.div
    ref={scope}
    layout className={`p-3 my-3 mx-3 rounded border border-zinc-700 bg-zinc-900 text-white text-xl font-medium flex flex-row justify-between items-center relative select-none md:mx-14
      `}>
      <div className="pb-1 flex flex-row gap-2 justify-between items-center">
        <CheckItem   onChecked={(e) => onHandleCheckedTask(e)} />
        {/* <input
        type="checkbox"
        checked={check}
        onChange={(e) => onHandleCheckedTask(e)}
        className="size-4 accent-indigo-400" */}
        <p className={`text-xl ${check && "line-through text-gray-500"}`}>{content}</p>
      </div>
      <div className="ml-auto flex gap-1.5">
        <section className="hidden  md:inline">
          <div className="flex items-center gap-1.5 whitespace-nowrap rounded bg-zinc-800 px-1.5 py-1 text-xs text-zinc-400">
            <FiClock />
            <span>{updatedTodayDate(id)}</span>
          </div>
        </section>

        <button className="rounded bg-red-300/20 px-1.5 py-1 text-xs text-red-300 transition-colors hover:bg-red-600 hover:text-red-200"
        onClick={() => handleDeleteTask(setTaskArr, setFilteredData, id, pendingTask)}>
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
};

TaskListComp.propTypes = {
  curTask: PropTypes.object.isRequired,
  pendingTask:PropTypes.bool.isRequired,
};