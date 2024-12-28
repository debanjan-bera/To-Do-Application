import PropTypes from "prop-types";

export const TaskActionItem = ({ taskData, updatePrimaryTasks, filteredTasks, updateFilteredTasks }) => {
  const { id, content } = taskData;
  console.log(id);
  const toggleTaskStatus = () => {
    const taskToUpdate = filteredTasks.find((task) => task.id === id);
    if (taskToUpdate) {
      console.log("Updating Task:", taskToUpdate.content);
      const updatedTasks = filteredTasks.filter((task) => task.id !== id);
      updateFilteredTasks(updatedTasks);

      const toggledTask = { ...taskToUpdate, checked: !taskToUpdate.checked };
      updatePrimaryTasks((prevTasks) => [...prevTasks, toggledTask]);
    }
  };

  const deleteTask = () => {
    updateFilteredTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <li className="px-3 py-3 my-2 bg-black/60 text-white text-xl font-medium flex flex-row justify-between items-center relative">
      {content}
      <div>
        <button className="mr-3" onClick={toggleTaskStatus}> Mark</button>
        <button className="h-full p-1 bg-red-600 text-center" onClick={deleteTask}> Delete </button>
      </div>
    </li>
  );
};
TaskActionItem.propTypes = {
    taskData: PropTypes.object.isRequired,
    updatePrimaryTasks: PropTypes.func.isRequired,
    filteredTasks: PropTypes.array.isRequired,
    updateFilteredTasks : PropTypes.func.isRequired,
};
