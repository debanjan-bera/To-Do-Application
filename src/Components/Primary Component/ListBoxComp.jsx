import "../../To-Do/todo.css";
import PropTypes from "prop-types";
import { updatedTodayDate } from "../../Backend/LocalStorage";
import { useContext, useState } from "react";
import { CheckItem } from "../functionality/CheckBox/CheckItem";
import { ToDoContext } from "../../Contexts/CreateContext";
import { handleCheckedTask, handleDeleteTask, toggleTaskStatus } from "../../Backend/TaskFunctionality";
export const TaskListComp = ({ curTask,pendingTask}) => {
  const [check,setCheck] = useState(false)
  const [deleteTask,setDeleteTask] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const {taskArr,setTaskArr,filteredData,setFilteredData} = useContext(ToDoContext)
  const { id, content} = curTask;
  const onHandleDeleteTask = () => {
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
    <li className={`p-3 my-3 mx-10 rounded border border-zinc-700 bg-zinc-900 text-white text-xl font-medium flex flex-row justify-between items-center relative select-none ${deleteTaskAnimation} ${isHidden? "scale-50 hidden" : "visible"}`}>
      <div className="pb-1 flex flex-row gap-2 justify-between items-center">
      <CheckItem onChecked={(e)=>onHandleCheckedTask(e)} />
        <p className={`text-2xl ${check ? "line-through text-gray-500" : "no-underline"}`}>{content}</p>
      </div>
      <div className="date absolute text-[0.67rem] bottom-[-0.29rem] left-0 px-3 text-white/50">{updatedTodayDate(id)}
      </div>
      <button className="h-full p-1 bg-red-600 text-center" onClick={() => onHandleDeleteTask()}> Delete</button>
    </li>
  );
};

TaskListComp.propTypes = {
  curTask: PropTypes.object.isRequired,
  pendingTask:PropTypes.bool.isRequired,
};