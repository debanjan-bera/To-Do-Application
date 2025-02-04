export const handleDeleteTask = (setTaskData,setFilter,id,pendingTask) => {
  if (!pendingTask) setFilter((prevFilter) => prevFilter.filter((task) => task.id !== id))
  else setTaskData((updateTask) => updateTask.filter((currentTask) => currentTask.id !== id));
  console.log(`${id} is deleted`);
  //it's now temporary
};
export const toggleTaskStatus = (id,taskData,setTaskData,setFilteredData) => {
  
  const updatedTaskData = taskData.map((task) => task.id === id ? { ...task, checked: !task.checked } : task);
  const checkedTask = updatedTaskData.find((task) => task.id === id);
  // if (checkedTask?.checked) setCheck(!check);
  // console.log(check);
  setTaskData(updatedTaskData.filter((task) => task.id !== id));
  setTimeout(()=>{if (checkedTask?.checked) setFilteredData((prev) => [...prev, checkedTask])},1300);
}
export const toggleChekedStatus = (event,filteredTasks,id,updateFilteredTasks,updatePrimaryTasks,check,) => {
  console.log(check);
    if (!event.target.checked) return;
    const taskToUpdate = filteredTasks.find((task) => task.id === id);
    // if (taskToUpdate?.checked) setCheck(!check);
    updateFilteredTasks(filteredTasks.filter((task) => task.id !== id));

      if (!taskToUpdate) return;
      console.log("Updating Task:", taskToUpdate.content);
      setTimeout(()=>{ updatePrimaryTasks((prev) => [...prev, { ...taskToUpdate, checked: !taskToUpdate.checked }])}, 1300)
     

  };
  