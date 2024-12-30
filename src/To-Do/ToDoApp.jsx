import { useEffect, useState } from "react";
import "./todo.css";
import { InputBoxComponent } from "./InputBox";
import { TaskListComp } from "./ListBoxComp";
import { ClearAllTask } from "./Functional Component/ClearTodo";
import { getFilteredLocalStorage, getLocalStorage, setLocalStorage } from "./LocalStorage";
import { TaskActionItem } from "./CompletedTask";
export const TodoApp = () => {
  const [taskArr, setTaskArr] = useState(() => getLocalStorage());
  const [filteredData, setFilteredData] = useState(()=> getFilteredLocalStorage());
  const checkTaskData = ()=>{
    if(taskArr.length === 0){
      return(<div>Hello</div>)
    }
    else{
      return(
        taskArr.map((currentTask)=>{
          return( <TaskListComp key={currentTask.id} curTask={currentTask} taskData={taskArr} setTaskData={setTaskArr} setFilter={setFilteredData}/>)
        })
      )
    }
  }
  useEffect(() => {

    setLocalStorage(taskArr,filteredData);
  }, [taskArr,filteredData]);

  return (
    <>
      <main className="bg-black/30 h-full w-full  flex flex-col items-center">
        <header className="p-3 text-6xl text-white">
          <h2>To-Do Application</h2>
        </header>
        <main style={{ width: "500px" }}>
          <InputBoxComponent taskdata={taskArr} setTaskData={setTaskArr} />
          <section>
            <h2 className="my-2 text-white/80 text-3xl font-medium bg-black/10">{`Task ${taskArr.length} || Completed Task: 
            ${filteredData.length}`}</h2>
            <ul>
              {checkTaskData()}
            </ul>

            <ClearAllTask setTaskData={setTaskArr} setCompletedTask={setFilteredData} lengthOfTaskArr={taskArr.length}
            />
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
