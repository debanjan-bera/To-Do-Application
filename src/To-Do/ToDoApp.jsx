import { useEffect, useState } from "react";
import "./todo.css";
import { InputBoxComponent } from "./InputBox";
import { TaskListComp } from "./ListBoxComp";
import { ClearAllTask } from "./Functional Component/ClearTodo";
import { getFilteredLocalStorage, getLocalStorage, setLocalStorage } from "./Functional Component/LocalStorage";
import { TaskActionItem } from "./CompletedTask";
export const TodoApp = () => {
  const [taskArr, setTaskArr] = useState(() => getLocalStorage());
  const [filteredData, setFilteredData] = useState(()=> getFilteredLocalStorage());
  useEffect(() => {
    setLocalStorage(taskArr,filteredData);
  }, [taskArr,filteredData]);

  const totalTask = taskArr.length + filteredData.length
  const checkTaskData = ()=>{
    if(!totalTask){
      return(<div>Hello</div>)
    }
    else{
      return(
        taskArr.map((currentTask)=>{
          return( <TaskListComp key={currentTask.id} curTask={currentTask} taskData={taskArr} setTaskData={setTaskArr} setFilter={setFilteredData}/>)
        }))
    }}

  return (
    <>
      <main className="bg-black/30 h-full w-full  flex flex-col items-center">
        <header className="w-full p-3 text-white">
          <h2 className="text-4xl font-semibold">Hello, Debanajan Bera</h2>
          <h3 className="text-3xl font-semibold">My Task</h3>
        </header>
        <main  className="w-full overflow-auto">
          <InputBoxComponent taskdata={taskArr} setTaskData={setTaskArr} />
          <section >
            <h2 className="my-2 text-white/80 text-3xl font-medium bg-black/10">{`Task ${taskArr.length} || Completed Task: 
            ${filteredData.length}`}</h2>
            <ul>{checkTaskData()}</ul>

            <ClearAllTask setTaskData={setTaskArr} setCompletedTask={setFilteredData} emptyTask={totalTask}/>
            <ul className="mytaskList text-2xl text-white">
              {filteredData.map((curTask) => {
                return (
                  <TaskActionItem key={curTask.id} taskData={curTask} updatePrimaryTasks={setTaskArr} filteredTasks={filteredData} updateFilteredTasks={setFilteredData}/>
                );
              })}
            </ul>
          </section>
        </main>
      </main>
    </>
  );
};
