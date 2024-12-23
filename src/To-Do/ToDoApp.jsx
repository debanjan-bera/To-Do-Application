import {useEffect, useState } from "react";
import "./todo.css";
import { InputBoxComponent } from "./InputBox";
import { TaskListComp } from "./ListBoxComp";
import { ClearAllTask } from "./ClearTodo";
import { getLocalStorage,setLocalStorage } from "./LocalStorage";
export const TodoApp = () => {
  const [taskArr, setTaskArr] = useState(()=> getLocalStorage());
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    setLocalStorage(taskArr);
  }, [taskArr]);


  return (
    <> 
      <main className="bg-black/30 h-lvh w-lvw  flex flex-col items-center">
        <header className="p-3 text-6xl text-white">
          <h2>To-Do Application</h2>
        </header>
        <main style={{width: "500px"}}>
          <InputBoxComponent  taskdata={taskArr} setTaskData={setTaskArr}/>
          <section>
            <h2 className="my-2 text-white/80 text-3xl font-medium bg-black/10">{`Task ${taskArr.length} || Completed Task: ${filteredData.length}`}</h2>
            <ul>
              {taskArr.map((curTask) => {
                return (
                  <TaskListComp key={curTask.id} curTask={curTask} taskData={taskArr} setTaskData={setTaskArr} setFilter={setFilteredData}/>);
                })}
            </ul>
            <ClearAllTask  setTaskData={setTaskArr} setCompletedTask={setFilteredData} lengthOfTaskArr={taskArr.length}/>
            <ul className="mytaskList text-2xl text-white">
              {filteredData.map((curTask,index) => {
                return (
                  <li className="px-3 py-3 my-2 bg-black/60  text-white text-xl font-medium flex flex-row justify-between items-center relative" key={index}>{curTask.content}</li>
                );
                })}
            </ul>
          </section>
        </main>
      </main>
    </>
  );
};
