import "../../To-Do/todo.css";
import PropTypes from "prop-types";
import { updatedTodayDate } from "../../Backend/LocalStorage";
import { useContext, useState } from "react";
import { CheckItem } from "../functionality/CheckBox/CheckItem";
import { ToDoContext } from "../../Contexts/CreateContext";
import { handleCheckedTask, handleDeleteTask, toggleTaskStatus } from "../../Backend/TaskFunctionality";
import { FiClock, FiTrash2 } from "react-icons/fi";

export const TaskListComp = ({ curTask,pendingTask}) => {
  const [check,setCheck] = useState(false)
  const [deleteTask,setDeleteTask] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const {taskArr,setTaskArr,filteredData,setFilteredData} = useContext(ToDoContext)
  const { id, content} = curTask;
  const handleRemoveTask = () => {
    setDeleteTask(true);
    setTimeout(() => {
      setIsHidden(true); // Hide after animation
      console.log(isHidden);
      handleDeleteTask(setTaskArr, setFilteredData, id, pendingTask);
    }, 600);
  };
  const deleteTaskAnimation = deleteTask? `deleteTaskAnimation` : ''
  const onHandleCheckedTask = (event) => {
    if(pendingTask) handleCheckedTask(taskArr,id,setCheck,check,setTaskArr,setFilteredData)
    else toggleTaskStatus(event,filteredData,id,setFilteredData,setTaskArr,check,setCheck)
  };
  return (
    <li className={`p-3 my-3 mx-3 rounded border border-zinc-700 bg-zinc-900 text-white text-xl font-medium flex flex-row justify-between items-center relative select-none md:mx-14 ${deleteTaskAnimation} 
      ${isHidden && "scale-50 hidden"}`}>
      <div className="pb-1 flex flex-row gap-2 justify-between items-center">
        <CheckItem onChecked={(e) => onHandleCheckedTask(e)} />
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
        onClick={() => handleRemoveTask()}>
          <FiTrash2 />
        </button>
      </div>
    </li>
  );
};

TaskListComp.propTypes = {
  curTask: PropTypes.object.isRequired,
  pendingTask:PropTypes.bool.isRequired,
};