import { useEffect, useState } from "react";
import "./todo.css";
import { InputBoxComponent } from "./InputBox";
import { TaskListComp } from "./ListBoxComp";
import { ClearAllTask } from "./Functional Component/ClearTodo";
import { getFilteredLocalStorage, getLocalStorage, setLocalStorage } from "../Backend/LocalStorage";
import { TaskActionItem } from "./CompletedTask";
import { AddTaskForm } from "./Functional Component/PopUp/AddTask";
export const TodoApp = () => {
  const [taskArr, setTaskArr] = useState(() => getLocalStorage());
  const [windowOpen,setWindowClose] = useState(false)
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
    const checkAddTaskWindow = ()=>{
      setWindowClose(!windowOpen)
    }
  return (
    <>
      <main className="bg-black/30 h-full w-full   flex-col items-center relative hidden">
        <InputBoxComponent taskdata={taskArr} setTaskData={setTaskArr} />
        <main className="w-full overflow-auto hello px-4 relative">
          <section>
            <h2 className="my-2 text-white/80 text-3xl font-medium bg-black/10">{`Task ${taskArr.length} || Completed Task: 
            ${filteredData.length}`}</h2>
            <ul>{checkTaskData()}</ul>

            <ClearAllTask
              setTaskData={setTaskArr}
              setCompletedTask={setFilteredData}
              emptyTask={totalTask}
            />
            <ul className="mytaskList text-2xl text-white">
              {filteredData.map((curTask) => {
                return (
                  <TaskActionItem
                    key={curTask.id}
                    taskData={curTask}
                    updatePrimaryTasks={setTaskArr}
                    filteredTasks={filteredData}
                    updateFilteredTasks={setFilteredData}
                  />
                );
              })}
            </ul>
          </section>
        </main>
      </main>
      {windowOpen && (
        <AddTaskForm
          taskdata={taskArr}
          primaryArr={setTaskArr}
          setWindowClose={setWindowClose}
        />
      )}

      <div className="bg-yellow-600 col-start-2 row-start-2 row-end-3  ">
        <h2 className="text-3xl font-medium ">
          {`Task ${taskArr.length} || Completed Task: ${filteredData.length}`}
        </h2>
      </div>
      <main className="row-start-3 row-end-4 col-start-2 bg-yellow-400 relative overflow-hidden">
        <section className="h-full w-full overflow-scroll">
          <section >
            <ul>{checkTaskData()}</ul>
            <ul className="mytaskList text-2xl text-white">
              {filteredData.map((curTask) => {
                return (
                  <TaskActionItem
                    key={curTask.id}
                    taskData={curTask}
                    updatePrimaryTasks={setTaskArr}
                    filteredTasks={filteredData}
                    updateFilteredTasks={setFilteredData}
                  />
                );
              })}
            </ul>
          </section>
        </section>

        <div
          className="h-14 w-full bg-purple-300 sticky bottom-0"
          onClick={checkAddTaskWindow}
        ></div>
      </main>
    </>
  );
};
