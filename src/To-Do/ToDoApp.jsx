import { useContext, useEffect } from "react";
import "./todo.css";
import { AddTaskForm } from "./InputBox";
import { ClearAllTask } from "../Components/functionality/ClearTodo";
import { setLocalStorage } from "../Backend/LocalStorage";
import { ToDoContext } from "../Contexts/CreateContext";
import { TaskListComp } from "../Components/Primary Component/ListBoxComp";
import { MobileAddTaskButton } from "../Components/functionality/CheckBox/AddButton";
import { handleFormCancel } from "../Backend/FormFunctionality";
import { AnimatePresence } from "framer-motion";
export const TodoApp = () => {
  const { taskArr, windowOpen, setWindowClose, filteredData,handleAddTaskWindow} = useContext(ToDoContext);
  const totalTask = taskArr.length + filteredData.length;
  const checkTaskData = () => {
    if (!totalTask) return <div>Hello</div>;
    return taskArr.map((currentTask) => (
      <TaskListComp key={currentTask.id} curTask={currentTask} pendingTask={true}/>
    ));
  };
  useEffect(() => {
    setLocalStorage(taskArr, filteredData);
  }, [taskArr, filteredData]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === "n") {
        event.preventDefault(); // Prevent default browser behavior (e.g., Ctrl+S saving the page)
        handleAddTaskWindow();
      }
      if (event.key === "Escape") handleFormCancel(setWindowClose);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleAddTaskWindow, setWindowClose]);


  return (
    <>
      {windowOpen && <AddTaskForm />}
      <div className="text-white col-start-2 row-start-2 row-end-3 colsLine">
        <h2 className="text-2xl font-semibold ">
          {`Task ${taskArr.length} || Completed Task: ${filteredData.length}`}
          <ClearAllTask pendingTask={true} />
        </h2>
        <button className="w-20 h-10 text-white hidden md:inline" onClick={handleAddTaskWindow}>Add a task</button>
      </div>
      <main className="row-start-3 row-end-5 col-start-2 relative colsLine  overflow-hidden">
        <section className="hello h-full w-full  overflow-y-scroll">
        
        <ul>
          <AnimatePresence>{checkTaskData()}</AnimatePresence>
        </ul>
        
            
            <h1>Completed Task</h1>
            <ul className="mytaskList text-2xl text-white">
              {filteredData.map((Task) => {
                return <TaskListComp key={Task.id} curTask={Task} pendingTask={false}/>
              })}
            </ul>
        </section>
        <MobileAddTaskButton addTask={handleAddTaskWindow}/>
      </main>
    </>
  );
};
