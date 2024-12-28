import "./todo.css";
import PropTypes from "prop-types";
import { updatedTodayDate } from "./LocalStorage";
export const TaskListComp = ({ curTask, taskData, setTaskData,setFilter}) => {

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

    if (checkedTask && checkedTask.checked) setFilter((prevFilter) => [...prevFilter, checkedTask]);
    else setFilter((prevFilter) => prevFilter.filter((task) => task.id !== id));

    setTaskData(()=>updatedTaskData.filter((currentTask) => currentTask.id !== id));

  };
  
  return (
    <li className="px-3 py-3 my-2 bg-black/60  text-white text-xl font-medium flex flex-row justify-between items-center relative">
      <div>

      <input  type="checkbox" id="cbx-12" onChange={() => handleCheckedTask()} />
        <span className="text-2xl mb-3"> {content}</span>
      </div>

      <div className="date absolute text-[0.67rem] bottom-[-0.29rem] left-0 px-3 text-white/50">
        {" "}
        {updatedTodayDate()}
      </div>

      <button
        className="h-full p-1 bg-red-600 text-center"
        onClick={() => handleDeleteTask()}
      >
        {" "}
        Delete
      </button>
    </li>
  );
};
TaskListComp.propTypes = {
  curTask: PropTypes.object.isRequired,
  taskData: PropTypes.array.isRequired,
  setTaskData: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};
