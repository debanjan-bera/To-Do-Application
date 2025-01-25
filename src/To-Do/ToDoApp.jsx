import { useCallback, useContext, useEffect } from "react";
import "./todo.css";
import { AddTaskForm } from "./InputBox";
// import { TaskListComp } from "./ListBoxComp";
import { ClearAllTask } from "../Components/functionality/ClearTodo";
import {  setLocalStorage } from "../Backend/LocalStorage";
import { ToDoContext } from "../Contexts/CreateContext";
import { TaskListComp } from "../Components/Primary Component/ListBoxComp";

export const TodoApp = () => {
  const {taskArr,setTaskArr,windowOpen,setWindowClose,isOk,setOk,filteredData} = useContext(ToDoContext)
  useEffect(() => {
    setLocalStorage(taskArr,filteredData);
  }, [taskArr,filteredData]);

  const totalTask = taskArr.length + filteredData.length

  const checkTaskData = ()=>{
    if(!totalTask)return(<div>Hello</div>)
    else{
      return(taskArr.map((currentTask)=>{
          return( <TaskListComp key={currentTask.id} curTask={currentTask} pendingTask={true}/>)}))
    }}

    const handleAddTaskWindow = useCallback(() => {
      setWindowClose((prev) => !prev)
    }, [setWindowClose]);
    
  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if ( event.key === 'n' && !isOk) {
        console.log('Toggling Task Window');
        handleAddTaskWindow();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleAddTaskWindow,isOk]);

  return (
    <>
      {windowOpen && (<AddTaskForm taskdata={taskArr} primaryArr={setTaskArr} setWindowClose={setWindowClose} setOk={setOk} />)}

      <div className="bg-yellow-600 col-start-2 row-start-2 row-end-3 ">
        <h2 className="text-3xl font-medium ">
          {`Task ${taskArr.length} || Completed Task: ${filteredData.length}`}
          <ClearAllTask pendingTask={true}/>
        </h2>
      </div>
      <main className="row-start-3 row-end-4 col-start-2 bg-yellow-400 relative overflow-hidden">
        <section className="hello h-full w-full overflow-scroll">
          <section >
            <ul>{checkTaskData()}</ul>
            <h1>Completed Task</h1>
            <ul className="mytaskList text-2xl text-white">
              {filteredData.map((Task) => {
                return ( <TaskListComp key={Task.id} curTask={Task} pendingTask={false}/>);})}
            </ul>
          </section>
        </section>
      </main>
      <div className="mx-1 h-14 w-full text-white bg-black rounded-3xl cursor-pointer flex items-center justify-center row-start-4 row-end-5" onClick={handleAddTaskWindow}> Create New task </div>
    </>
  );
};
