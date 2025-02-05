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
    if (!totalTask) return <div className="">Hello</div>;
    return taskArr.map((currentTask) => 
      <TaskListComp key={currentTask.id} curTask={currentTask} pendingTask={true}/>)};
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
      <main className="col-start-2 col-end-3 row-start-2 row-end-5 grid grid-cols[1fr] grid-rows-[0.2fr_3fr] overflow-hidden rounded-t-md bg-zinc-950 "
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
      >
        <AnimatePresence>{windowOpen && <AddTaskForm />}</AnimatePresence>
        <section className=" text-white">
          <h2 className=" text-2xl font-semibold ">
            {`Task ${taskArr.length} || Completed Task: ${filteredData.length}`}
            <ClearAllTask pendingTask={true} />
          </h2>
          <button className="w-32 h-10 text-lg text-white hidden md:inline" onClick={handleAddTaskWindow}>
            Add a task
          </button>
        </section>
        <section className="h-full w-full relative overflow-hidden">
          <div className=" h-full w-full hello overflow-x-hidden overflow-y-scroll ">
            <ul> <AnimatePresence>{checkTaskData()}</AnimatePresence></ul>
            <ul className=" text-white">
              <AnimatePresence>
              <li className="py-3 mx-3 text-white text-2xl font-medium select-none md:mx-14">Completed Task</li>
                {filteredData.map((Task) => {
                  return (
                    <TaskListComp key={Task.id} curTask={Task} pendingTask={false}/>
                  );
                })}
              </AnimatePresence>
            </ul>
          </div>
        </section>
        <MobileAddTaskButton addTask={handleAddTaskWindow} />
      </main>
    </>
  );
};
