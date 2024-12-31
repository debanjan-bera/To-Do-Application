import "./todo.css";
import PropTypes from "prop-types";
import { updatedTodayDate } from "./Functional Component/LocalStorage";
import { CheckBoxUiComponent } from "./Functional Component/CheckBox/CheckBoxComponent";
import { useState } from "react";
export const TaskListComp = ({ curTask, taskData, setTaskData,setFilter}) => {
  //Just checking 
  const [check,setCheck] = useState(false)

  const { id, content} = curTask;

  const handleDeleteTask = () => {
    setTaskData((updateTask)=> updateTask.filter((currentTask) => currentTask.id !== id));
    //it's now temporary
    setFilter((prevFilter)=> prevFilter.filter((task) => task.id !== id))
  };

  const handleCheckedTask = () => {
    const updatedTaskData = taskData.map((currentTask) =>
      currentTask.id === id ? { ...currentTask, checked: !currentTask.checked } : currentTask);

    const checkedTask = updatedTaskData.find((task) => task.id === id);
    if(checkedTask.checked) setCheck(!check)
    setTimeout(()=>{
      if (checkedTask && checkedTask.checked) setFilter((prevFilter) => [...prevFilter, checkedTask]);

      console.log(checkedTask,checkedTask.checked);
      setTaskData(()=>updatedTaskData.filter((currentTask) => currentTask.id !== id));
    },950)
  };
  
  return (
    <li className="px-3 py-3 my-3 bg-black/60  text-white text-xl font-medium flex flex-row justify-between items-center relative">
      <div className="pb-1 flex flex-row gap-2 justify-between items-center">
      <CheckBoxUiComponent onChecked={handleCheckedTask} />
        <p className={`text-2xl ${check ? "line-through text-gray-500" : "no-underline"}`}>{content}</p>
      </div>

      <div className="date absolute text-[0.67rem] bottom-[-0.29rem] left-0 px-3 text-white/50">{updatedTodayDate(id)}
      </div>

      <button className="h-full p-1 bg-red-600 text-center" onClick={() => handleDeleteTask()}> Delete</button>
    </li>
  );
};

TaskListComp.propTypes = {
  curTask: PropTypes.object.isRequired,
  taskData: PropTypes.array.isRequired,
  setTaskData: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};
