import { useEffect, useState } from "react";
import "./todo.css";
import { InputBoxComponent } from "./InputBox";
import { TaskListComp } from "./ListBoxComp";
import { ClearAllTask } from "./ClearTodo";
import { getLocalStorage, setLocalStorage } from "./LocalStorage";
export const TodoApp = () => {
  const [taskArr, setTaskArr] = useState(() => getLocalStorage());
  const [filteredData, setFilteredData] = useState([]);
  const removeChecked = (id)=>{
    const findFilterData = filteredData.find((curTask)=> curTask.id === id)
    if(filteredData){
      console.log("Item to Remove:", findFilterData.content);
      const updatedData = filteredData.filter((curTask) => curTask.id !== id);
      setFilteredData(updatedData);
      const updatedTaskData = taskArr.map((currentTask) =>
        currentTask.id === id ? { ...currentTask, checked: !currentTask.checked } : currentTask
      );
      setTaskArr(updatedTaskData);
    }
    else return
    console.log(findFilterData);
  }
  const handleDeleteFilterTask = (id) => {
    setFilteredData((prevFilter)=> prevFilter.filter((task) => task.id !== id))
  };
  useEffect(() => {
    setLocalStorage(taskArr);
  }, [taskArr]);

  return (
    <>
      <main className="bg-black/30 h-lvh w-lvw  flex flex-col items-center">
        <header className="p-3 text-6xl text-white">
          <h2>To-Do Application</h2>
        </header>
        <main style={{ width: "500px" }}>
          <InputBoxComponent taskdata={taskArr} setTaskData={setTaskArr} />
          <section>
            <h2 className="my-2 text-white/80 text-3xl font-medium bg-black/10">{`Task ${taskArr.length} || Completed Task: 
            ${filteredData.length}`}</h2>
            <ul>
              {taskArr.map((curTask) => {
                // if (!curTask.checked) {
                  
                // }
                return (
                  <TaskListComp key={curTask.id} curTask={curTask} taskData={taskArr} setTaskData={setTaskArr} setFilter={setFilteredData}/>
                );
              })}
            </ul>
            <ClearAllTask
              setTaskData={setTaskArr}
              setCompletedTask={setFilteredData}
              lengthOfTaskArr={taskArr.length}
            />
            <ul className="mytaskList text-2xl text-white">
              {filteredData.map((curTask) => {
                return (
                  <li className="px-3 py-3 my-2 bg-black/60  text-white text-xl font-medium flex flex-row justify-between items-center relative"
                    key={curTask.id}> {curTask.content} 
                    <div>
                      <button className="mr-3" onClick={() => removeChecked(curTask.id)}>Mark</button>
                      <button className="h-full p-1 bg-red-600 text-center"
                      onClick={() => handleDeleteFilterTask(curTask.id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </main>
      </main>
    </>
  );
};
