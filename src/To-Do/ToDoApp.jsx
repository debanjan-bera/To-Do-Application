import { useState } from "react";
import "./todo.css";
import { InputBoxComponent } from "./InputBox";
import { TaskListComp } from "./ListBoxComp";
import { ClearAllTask } from "./ClearTodo";
import { getLocalStorage,setLocalStorage } from "./LocalStorage";
export const TodoApp = () => {
  const [taskArr, setTaskArr] = useState(()=> getLocalStorage());
  setLocalStorage(taskArr)

  const handleDeleteTask = (id) => {
    const updateTaskValue = taskArr.filter((currentTask) => currentTask.id !== id);
    setTaskArr(updateTaskValue);
    console.log(taskArr);
  };
  const handleCheckedTask = (id) =>{
    const updateTaskValue = taskArr.map((currentTask)=>{
      if(currentTask.id === id) return {...currentTask, checked:!currentTask.checked}
      else return currentTask;
    })
    setTaskArr(updateTaskValue);
  }
  return (
    <> 
      <main className="bg-black/30 h-lvh w-lvw  flex flex-col items-center">
        <header className="p-3 text-6xl text-white">
          <h2>To-Do Application</h2>
        </header>
        <main style={{width: "500px"}}>
          <InputBoxComponent  taskdata={taskArr} setTaskData={setTaskArr}/>
          <section>
            <h2 className="py-2 text-white/70 text-3xl font-medium">Task:{taskArr.length}</h2>
            <ul className="mytaskList">
              {taskArr.map((curTask) => {
                return (
                  <TaskListComp key={curTask.id} id={curTask.id} data={curTask.content} isChecked={curTask.checked} onCheckedTask={handleCheckedTask} onDeleteTask={handleDeleteTask}/>
                );})}
            </ul>
            <ClearAllTask  setTaskData={setTaskArr} lengthOfTaskArr={taskArr.length}/>
          </section>
        </main>
      </main>
    </>
  );
};
