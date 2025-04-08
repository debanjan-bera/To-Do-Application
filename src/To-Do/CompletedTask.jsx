import { useContext, useEffect} from "react";
import "./todo.css";
import { AddTaskForm } from "./InputBox";
import { setLocalStorage } from "../Backend/LocalStorage";
import { ToDoContext } from "../Contexts/CreateContext";
import { TaskListComp } from "../Components/Primary Component/ListBoxComp";
import { handleFormCancel } from "../Backend/FormFunctionality";
import { AnimatePresence} from "framer-motion";
import { PiBookBookmarkBold } from "react-icons/pi";
import { MobileAddTaskButton } from "../Components/Functions/Button/AddButton";
import { ClearAllTask } from "../Components/Functions/Button/ClearTodo";
export const TaskActionItem = () => {
  const { taskArr, windowOpen, setWindowClose, filteredData,handleAddTaskWindow,activeMenuId, setActiveMenuId} = useContext(ToDoContext);


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
        <section className="m-3  text-white flex flex-row justify-between items-center ">
          <h2 className="text-2xl font-semibold ">
            {`Task ${taskArr.length} || Completed Task: ${filteredData.length}`}
          </h2>
          <div>
            <ClearAllTask pendingTask={true} />
          <button className="px-4 py-2 bg-blue-600 rounded-md text-white hidden  md:inline hover:bg-blue-700" onClick={()=>{
            // e.stopPropagation();///importent
            handleAddTaskWindow();
          }}>
            <div className="text-xl flex flex-row items-center gap-1"> 
              <PiBookBookmarkBold />
              <h3 className="text-lg font-bold">New Task</h3>
            </div>
          </button>
          </div>
        </section>
        <section className="h-full w-full overflow-hidden ">
          {/* <div className="bottom-bar h-[4rem] w-full z-20 "></div> */}
          <div className="main-bar h-full w-full hello overflow-x-hidden overflow-y-scroll ">
            <ul className=" text-white">
              <AnimatePresence>
              <li className="py-3 mx-3 text-white text-2xl font-medium select-none md:mx-14">{filteredData.length ?'Completed Task':''}</li>
                {filteredData.map((Task) => {
                  return (
                    <TaskListComp key={Task.id} curTask={Task} pendingTask={false} openMenu={openMenu} activeMenuId={activeMenuId}/>
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
