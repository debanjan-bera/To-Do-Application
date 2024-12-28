import PropTypes from "prop-types";
import { CheckBoxUiComponent } from "./Functional Component/CheckBox/CheckBoxComponent";

export const TaskActionItem = ({ taskData, updatePrimaryTasks, filteredTasks, updateFilteredTasks }) => {
  const { id, content } = taskData;
  const toggleTaskStatus = (event) => {
    if (event.target.checked) {
      setTimeout(()=>{
        const taskToUpdate = filteredTasks.find((task) => task.id === id);
        if (taskToUpdate) {
          console.log("Updating Task:", taskToUpdate.content);
          const updatedTasks = filteredTasks.filter((task) => task.id !== id);
          updateFilteredTasks(updatedTasks);
    
          const toggledTask = { ...taskToUpdate, checked: !taskToUpdate.checked };
          updatePrimaryTasks((prevTasks) => [...prevTasks, toggledTask]);
        }
      },900)
      // Additional functionality when checked
  } else {
      return;
      // console.log('Checkbox unchecked!');
      // Additional functionality when unchecked
  }

  };

  const deleteTask = () => {
    updateFilteredTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <li className="px-3 py-3 my-2 bg-black/60  flex flex-row justify-between items-center relative">
      <div className="text-white text-2xl font-medium flex flex-row gap-2 justify-between items-center">
        <CheckBoxUiComponent onChecked={toggleTaskStatus} />
        <p>{content}</p>
      </div>
      <button className="h-full p-1 bg-red-600 text-center" onClick={deleteTask}>Delete</button>
    </li>
  );
};
TaskActionItem.propTypes = {
    taskData: PropTypes.object.isRequired,
    updatePrimaryTasks: PropTypes.func.isRequired,
    filteredTasks: PropTypes.array.isRequired,
    updateFilteredTasks : PropTypes.func.isRequired,
};
