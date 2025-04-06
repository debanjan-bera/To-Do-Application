import { useContext, useEffect} from "react";
import "./todo.css";
import { AddTaskForm } from "./InputBox";
import { setLocalStorage } from "../Backend/LocalStorage";
import { FormDataContext, ToDoContext } from "../Contexts/CreateContext";
import { TaskListComp } from "../Components/Primary Component/ListBoxComp";
import { handleFormCancel } from "../Backend/FormFunctionality";
import { AnimatePresence} from "framer-motion";
import { PiBookBookmarkBold } from "react-icons/pi";
import { MobileAddTaskButton } from "../Components/Functions/Button/AddButton";
import { ClearAllTask } from "../Components/Functions/Button/ClearTodo";
import { BsArrowDownCircle } from "react-icons/bs";
export const TodoApp = () => {
  const { taskArr, windowOpen, setWindowClose, filteredData,handleAddTaskWindow,activeMenuId, setActiveMenuId} = useContext(ToDoContext);
  const { groupData } = useContext(FormDataContext);
  

  // Handle context menu open/close
  const openMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenuId((prevId) => (prevId === id ? null : id));
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setActiveMenuId]);

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
      {/* stroke='%2318181b' */}
      <AnimatePresence>{windowOpen && <AddTaskForm />}</AnimatePresence>
      <section className="mx-9 pt-3 text-white grid grid-cols-2 grid-rows-2 gap-y-5 ">
        {/* <h2 className="text-2xl font-semibold col-start-1 col-end-2 row-start-1 row-end-2">
          {/* 

        </h2> */}
        <div className="w-full h-full col-start-1 col-end-2 row-start-1 row-end-2 flex flex-row flex-wrap items-center"> 
          <div className=" w-full h-3 rounded-xl border border-zinc-700 bg-zinc-900"></div>
          {`Task ${taskArr.length} || Completed Task: ${filteredData.length}`} 
        </div>
        <div className="  flex justify-end col-start-2 col-end-3 row-start-1 row-end-2">
          <ClearAllTask pendingTask={true} />
          <button
            className="px-4 py-2 bg-blue-600 rounded-md text-white hidden  md:inline hover:bg-blue-700 "
            onClick={() => {
              // e.stopPropagation();///importent
              handleAddTaskWindow();
            }}
          >
            <div className="text-xl flex flex-row items-center gap-1">
              <PiBookBookmarkBold />
              <h3 className="text-lg font-bold">New Task</h3>
            </div>
          </button>
        </div>
        <ul className=" col-start-1 col-end-3 row-start-2 row-end-3 flex flex-row items-center">{groupData.map((ele,index)=>{
          return(
            <li key={index} className=" mx-2 p-2 border border-zinc-700 bg-zinc-900 rounded " >{ele}</li>
          )
        })}</ul>
      </section>
      <section className="h-full w-full  overflow-hidden ">
        {/* <div className="bottom-bar h-[4rem] w-full z-20 "></div> */}
        <div className="main-bar h-full w-full hello overflow-x-hidden overflow-y-scroll ">
          <ul>
            <AnimatePresence>
              {taskArr.length ? (
                taskArr.map((currentTask) => (
                  <TaskListComp
                    key={currentTask.id}
                    curTask={currentTask}
                    pendingTask={true}
                    openMenu={openMenu}
                    activeMenuId={activeMenuId}
                  />
                ))
              ) : (
                <div className="text-white text-center py-4">
                  No Pending Tasks
                </div>
              )}
            </AnimatePresence>
          </ul>
          <ul className=" text-white">
            <AnimatePresence>
              {filteredData.length > 0 && (
                <li className="p-3 mx-3 border border-zinc-700 bg-zinc-900 rounded inline-block text-white text-xl font-medium select-none md:mx-10">
                  <p className="flex items-center gap-2">
                    <BsArrowDownCircle />
                    {`Completed Tasks: ${filteredData.length}`}
                  </p>
                </li>
              )}

              {filteredData.map((Task) => {
                return (
                  <TaskListComp
                    key={Task.id}
                    curTask={Task}
                    pendingTask={false}
                    openMenu={openMenu}
                    activeMenuId={activeMenuId}
                  />
                );
              })}
            </AnimatePresence>
          </ul>
        </div>
      </section>

      <MobileAddTaskButton addTask={handleAddTaskWindow} />
    </>
  );
};
