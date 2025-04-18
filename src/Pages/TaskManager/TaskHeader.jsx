import { memo, useContext, useEffect } from "react";
import useResponsive from "../../Hooks/UseResponsive";
import { RxDashboard } from "react-icons/rx";
import { PiBookBookmarkBold } from "react-icons/pi";
import { ClearAllTask } from "../../Components/Functions/Button/ClearTodo";
import { ToDoContext } from "../../Contexts/CreateContext";
import { handleFormCancel } from "../../Backend/FormFunctionality";
import PropTypes from "prop-types";

const TaskHeader = ({isCompleted}) => {
  const {
    taskArr,
    filteredData,
    setWindowClose,
    handleAddTaskWindow,
  } = useContext(ToDoContext);
  
  const isTablet = useResponsive(960);
  const isMobile = useResponsive(670);
  const pendingTasks = taskArr.length;
  const completedTasks = filteredData.length;
  const totalTasks = pendingTasks + completedTasks;
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks * 100) / totalTasks);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === "n") {
        event.preventDefault();
        handleAddTaskWindow();
      }
      if (event.key === "Escape") handleFormCancel(setWindowClose);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleAddTaskWindow, setWindowClose]);
  return(
  <div
    className={`w-full h-full ${
      isMobile
        ? "flex justify-start flex-col items-start"
        : "grid grid-cols-2 grid-rows-2 justify-items-start "
    } px-6`}
  >
    <div className="col-start-1 col-end-2 row-start-1 row-end-2 mt-3 ">
      <div className=" flex items-center gap-3 p-2  rounded-full border border-zinc-600 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
        <span className="text-xl aspect-square rounded-full bg-lime-500/10 text-lime-400 p-3 flex items-center justify-center border border-lime-400">
          <RxDashboard />
        </span>
        <h1 className="text-xl font-semibold tracking-wide">
          {isCompleted ? "Achivement" : "Dashboard"}
        </h1>
      </div>
    </div>

    {/* Progress bar */}
    {totalTasks && (
      <div
        className={`w-full bg-zinc-900 border border-zinc-600 p-2 rounded-lg ${
          isMobile && "py-4 my-3"
        } flex flex-col justify-center items-start col-start-1 ${
          isTablet ? "col-end-3" : "col-end-2"
        } row-start-2 row-end-3`}
      >
        <h1 className="text-2xl py-1 font-bold">
          <span className="text-white/50">My</span> Tasks 
        </h1>
        {progressPercent > 0 && (
          <div className="w-full flex items-end justify-between">
            <span className="text-3xl font-bold">{`${progressPercent}%`}</span>{" "}
            <span className="text-sm text-zinc-400 font-light">{`${completedTasks} / ${totalTasks} done`}</span>
          </div>
        )}
        <div className="w-full h-4 mt-2 border border-zinc-700 bg-zinc-900 rounded-2xl relative overflow-hidden">
          <div
            className="h-4 bg-gradient-to-r from-pink-500 to-red-600 absolute top-0 left-0 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
    )}

    {!isMobile && (
      <div
        className={`w-full flex justify-end items-center flex-row col-start-2 col-end-3 row-start-1 ${
          isTablet ? "row-end-2" : "row-end-3"
        }`}
      >
        {!isTablet && <ClearAllTask pendingTask={true} />}
        <button
          title="Alt + N"
          className="px-4 py-3 text-xl font-bold bg-blue-600 rounded-md text-white hover:bg-blue-700 flex flex-row gap-2 items-center"
          onClick={handleAddTaskWindow}
        >
          <PiBookBookmarkBold />
          Add Task
        </button>
      </div>
    )}
  </div>)
};
export default memo(TaskHeader);


TaskHeader.propTypes = {
  isCompleted: PropTypes.bool.isRequired,
};