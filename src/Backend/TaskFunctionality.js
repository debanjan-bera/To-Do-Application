// export const handleDeleteTask = (taskArr,setTaskData,setFilter,id,pendingTask,setActiveMenuId) => {
//   if (setActiveMenuId) setActiveMenuId(null);
//   setTimeout(()=>{
//     if (pendingTask) setFilter((prevFilter) => prevFilter.filter((task) => task.id !== id))
//     else setTaskData((updateTask) => updateTask.filter((currentTask) => currentTask.id !== id));
//     console.log(`${id} is deleted`);
//   },200)

// };
// export const toggleTaskStatus = (id,taskData,setTaskData,setFilteredData) => {
//   const updatedTaskData = taskData.map((task) => task.id === id ? { ...task, checked: !task.checked } : task);
//   const checkedTask = updatedTaskData.find((task) => task.id === id);
//   setTaskData(()=>updatedTaskData.filter((task) => task.id !== id));
//   setTimeout(()=>{if (checkedTask?.checked) setFilteredData((prev) => [...prev, checkedTask])},1200);
// }
// export const toggleChekedStatus = (event,filteredTasks,id,updateFilteredTasks,updatePrimaryTasks) => {
//   if (!event.target.checked) return;
//   const taskToUpdate = filteredTasks.find((task) => task.id === id);
//   updateFilteredTasks(filteredTasks.filter((task) => task.id !== id));

//   if (!taskToUpdate) return;
//   console.log("Updating Task:", taskToUpdate.content);
//   setTimeout(() => {
//     updatePrimaryTasks((prev) => [
//       ...prev,
//       { ...taskToUpdate, checked: !taskToUpdate.checked },
//     ]);
//   }, 1200);
     

//   };


export const editTask = ()=>{
  
}
