export const handleDeleteTask = (setTaskData,setFilter,id,pendingTask) => {
  setTaskData((updateTask) =>
    updateTask.filter((currentTask) => currentTask.id !== id)
  );
  console.log(`${id} is deleted`);
  //it's now temporary
  if(!pendingTask) setFilter((prevFilter) => prevFilter.filter((task) => task.id !== id))
};
export const handleCheckedTask = (taskData,id,setCheck,check,setTaskData,setFilter) => {
    const updatedTaskData = taskData.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      );
    
      const checkedTask = updatedTaskData.find((task) => task.id === id);
      if (checkedTask?.checked) setCheck(!check);
    
      setTimeout(() => {
        if (checkedTask?.checked) setFilter((prev) => [...prev, checkedTask]);
        setTaskData(updatedTaskData.filter((task) => task.id !== id));
      }, 950);
};

export const toggleTaskStatus = (event,filteredTasks,id,updateFilteredTasks,updatePrimaryTasks,check) => {
    if (!event.target.checked) return;
  
    setTimeout(() => {
      const taskToUpdate = filteredTasks.find((task) => task.id === id);
      if (!taskToUpdate) return;
  
      console.log("Updating Task:", taskToUpdate.content);
      console.log(check);
      updateFilteredTasks(filteredTasks.filter((task) => task.id !== id));
  
      updatePrimaryTasks((prev) => [...prev, { ...taskToUpdate, checked: !taskToUpdate.checked }]);
    }, 900);
  };
  