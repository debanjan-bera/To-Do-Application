import {useState } from "react";
import "./todo.css";
import { InputBoxComponent } from "./InputBox";
import { TaskListComp } from "./ListBoxComp";
import { ClearAllTask } from "./ClearTodo";
import { getLocalStorage,setLocalStorage } from "./LocalStorage";
export const TodoApp = () => {
  const [taskArr, setTaskArr] = useState(()=> getLocalStorage());
  const [filteredData, setFilteredData] = useState([]);

  setLocalStorage(taskArr)

  return (
    <> 
      <main className="bg-black/30 h-lvh w-lvw  flex flex-col items-center">
        <header className="p-3 text-6xl text-white">
          <h2>To-Do Application</h2>
        </header>
        <main style={{width: "500px"}}>
          <InputBoxComponent  taskdata={taskArr} setTaskData={setTaskArr}/>
          <section>
            <h2 className="py-2 text-white/70 text-3xl font-medium">Task:{filteredData.length}</h2>
            <ul className="mytaskList">
              {taskArr.map((curTask) => {
                return (
                  <TaskListComp key={curTask.id} curTask={curTask} taskData={taskArr} setTaskData={setTaskArr} filter={filteredData} setFilter={setFilteredData}/>);
                })}
            </ul>
            <ClearAllTask  setTaskData={setTaskArr} lengthOfTaskArr={taskArr.length}/>
            <ul className="mytaskList text-2xl text-white">
              {filteredData.map((curTask,index) => {
                return (
                  <li key={index}>{curTask.content}</li>
                );
                })}
            </ul>
          </section>
        </main>
      </main>
    </>
  );
};
