
import "./todo.css";
import PropTypes from "prop-types";
export const TaskListComp = ({ curTask, taskData, setTaskData,setFilter }) => {

  const { id, content, checked } = curTask;
  const handleDeleteTask = () => {
    const updateTaskValue = taskData.filter((currentTask) => currentTask.id !== id);
    setTaskData(updateTaskValue);
    console.log(taskData);
  };


  const handleCheckedTask = () => {
    // Update the task's checked state
    const updatedTaskData = taskData.map((currentTask) =>
      currentTask.id === id ? { ...currentTask, checked: !currentTask.checked } : currentTask
    );
    const updateTaskValue = updatedTaskData.filter((currentTask) => !currentTask.checked);
    setTaskData(updateTaskValue);
    // setTaskData(updatedTaskData);
  
    // Compute the filtered tasks based on the updated state
    const updatedFilterTask = updatedTaskData.filter((task) => task.checked);
    setFilter(updatedFilterTask);
  };
  

  const todayDate = new Date();
  const formattedDate = todayDate.toLocaleDateString();
  return (
    <li className="px-3 py-3 my-2 bg-black/60  text-white text-xl font-medium flex flex-row justify-between items-center relative">
      <span className={`text-2xl mb-2 ${checked ? "line-through" : "no-underline"}`}> {content}</span>
      <div className="date absolute text-[0.7rem] bottom-[-0.29rem] left-0 px-3 text-white/50">
        {formattedDate}
      </div>
      <div></div>
      <div>
        <button onClick={() => handleCheckedTask()}>Checked</button>
        <button className="h-full p-1 bg-red-600 text-center"
          onClick={() => handleDeleteTask()}> Delete </button>
      </div>
    </li>
  );
};
TaskListComp.propTypes = {
  curTask: PropTypes.object.isRequired,
  taskData: PropTypes.array.isRequired,
  setTaskData: PropTypes.func.isRequired,
  filter: PropTypes.array.isRequired,
  setFilter: PropTypes.func.isRequired,
};
