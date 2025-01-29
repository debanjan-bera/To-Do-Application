import { useCallback, useContext, useEffect } from "react";
import "./todo.css";
import { AddTaskForm } from "./InputBox";
import { ClearAllTask } from "../Components/functionality/ClearTodo";
import { setLocalStorage } from "../Backend/LocalStorage";
import { ToDoContext } from "../Contexts/CreateContext";
import { TaskListComp } from "../Components/Primary Component/ListBoxComp";
import { handleFormCancel } from "../Backend/FormFunctionality";
import { MobileAddTaskButton } from "../Components/functionality/CheckBox/AddButton";

export const TodoApp = () => {
  const { taskArr, windowOpen, setWindowClose, filteredData } = useContext(ToDoContext);
  useEffect(() => {
    setLocalStorage(taskArr, filteredData);
  }, [taskArr, filteredData]);
  
  const totalTask = taskArr.length + filteredData.length;
  
  const checkTaskData = () => {
    if (!totalTask) return <div>Hello</div>;
    return taskArr.map((currentTask) => (
      <TaskListComp key={currentTask.id} curTask={currentTask} pendingTask={true}/>
    ));
  };
  const handleAddTaskWindow = useCallback(() => {
    setWindowClose((prev) => !prev);
  }, [setWindowClose]);

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
      <div className="bg-yellow-600 col-start-2 row-start-2 row-end-3 colsLine">
        <h2 className="text-3xl font-medium ">
          {`Task ${taskArr.length} || Completed Task: ${filteredData.length}`}
          <ClearAllTask pendingTask={true} />
        </h2>
      </div>
      <main className="row-start-3 row-end-4 col-start-2 bg-yellow-400 relative colsLine overflow-hidden">
        <section className="hello h-full w-full overflow-scroll">
          <section>
            <ul>{checkTaskData()}</ul>
            <h1>Completed Task</h1>
            <ul className="mytaskList text-2xl text-white">
              {filteredData.map((Task) => {
                return <TaskListComp key={Task.id} curTask={Task} pendingTask={false}/>
              })}
            </ul>
          </section>
        </section>
        <MobileAddTaskButton addTask={handleAddTaskWindow}/>
      </main>
      <footer className="w-full h-[4rem] text-white cols-2 row-start-4 row-end-5 colsLine">
        <div className="h-[90%] font-bold bg-black rounded-lg flex items-center cursor-pointer" onClick={handleAddTaskWindow}>
          <span className="h-full px-2 text-[1.6rem] font-extrabold text-center flex items-center"> + </span>
          <span className="h-full text-xl flex items-center text-center"> Add a task </span>
        </div>
      </footer>
    </>
  );
};
