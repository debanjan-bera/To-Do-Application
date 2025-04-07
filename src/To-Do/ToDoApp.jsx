import { useContext, useEffect, useState} from "react";
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
  const [showData,setShowCompleted] = useState(false)

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
      <section className="h-[8rem] mt-6 overflow-x-hidden">
        <div className="grid grid-cols-2 mx-9">
          <div className="w-full h-full flex flex-row flex-wrap items-center bg-red-900">
            <div className=" w-full h-3 rounded-xl border border-zinc-700 bg-zinc-900"></div>
            {`Task ${taskArr.length} || Completed Task: ${filteredData.length}`}
          </div>
          <div className="w-full flex justify-end ">
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
        </div>
        <div className="w-full text-white ml-9 mt-6 ">

          <div className=" w-full grid grid-cols-12 overflow-x-scroll">{groupData.map((ele, index) => {
            return (
              <p
                key={index}
                className=" mx-2 p-1 px-5 border border-zinc-700 bg-zinc-900 rounded "
              >
                {ele}
              </p>
            );
          })}
          {groupData.map((ele, index) => {
            return (
              <p
                key={index}
                className=" mx-2 p-1 px-2 border border-zinc-700 bg-zinc-900 rounded "
              >
                {ele}
              </p>
            );
          })}
          </div>
        </div>
      </section>
      <section className="w-full h-full overflow-hidden hello">
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
                  <li className="p-3 mx-3 mb-4 border border-zinc-700 bg-zinc-900 rounded inline-block text-white text-xl font-medium select-none md:mx-10"
                  onClick={()=> setShowCompleted((!showData))}>
                    <p className="flex items-center gap-2"
                    >
                      <span className={`${showData&& 'rotate-180 transition-all'}`}><BsArrowDownCircle /></span>
                      
                      {`Completed Tasks: ${filteredData.length}`}
                    </p>
                  </li>
                )}

                {showData&&filteredData.map((Task) => {
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
      </section>


      <MobileAddTaskButton addTask={handleAddTaskWindow} />
    </>
  );
};
