// import PropTypes from "prop-types";
// import { CheckItem } from "../Components/functionality/CheckBox/CheckItem";
// import { updatedTodayDate } from "../Backend/LocalStorage";

// export const TaskActionItem = ({ taskData,updatePrimaryTasks, filteredTasks, updateFilteredTasks }) => {
//   const { id, content } = taskData;
//   const toggleTaskStatus = (event) => {
//     if (event.target.checked) {
//       setTimeout(()=>{
//         const taskToUpdate = filteredTasks.find((task) => task.id === id);
//         if (taskToUpdate) {
//           console.log("Updating Task:", taskToUpdate.content);
//           const updatedTasks = filteredTasks.filter((task) => task.id !== id);
//           updateFilteredTasks(updatedTasks);
//           const toggledTask = { ...taskToUpdate, checked: !taskToUpdate.checked };
//           updatePrimaryTasks((prevTasks) => [...prevTasks, toggledTask]);
//         }  
//       },900)
//   } else {
//       return;
//   }};

//   const deleteTask = () => {
//     updateFilteredTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
//   };
  
//   return (
//     <li className="px-3 py-3 my-3 bg-black/60  text-white text-xl font-medium flex flex-row justify-between items-center relative select-none">
//       <div className="mb-2 text-white text-2xl font-medium flex flex-row gap-2 justify-between items-center">
//         <CheckItem onChecked={toggleTaskStatus} />
//         <p>{content}</p>
//       </div>
//       <div className="date absolute text-[0.75rem] bottom-[-0.29rem] left-0 px-3 text-white/70">{updatedTodayDate(id)}</div>
//       <button className="h-full p-1 bg-red-600 text-center" onClick={deleteTask}>Delete</button>
//     </li>
//   );
// };
// TaskActionItem.propTypes = {
//     taskData: PropTypes.object.isRequired,
//     updatePrimaryTasks: PropTypes.func.isRequired,
//     filteredTasks: PropTypes.array.isRequired,
//     updateFilteredTasks : PropTypes.func.isRequired,
// };
