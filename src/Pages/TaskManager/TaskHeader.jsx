import { memo, useContext, useEffect } from "react";
import useResponsive from "../../Hooks/UseResponsive";
import { RxDashboard } from "react-icons/rx";
import { PiBookBookmarkBold } from "react-icons/pi";
import { ClearAllTask } from "../../Components/Functions/Button/ClearTodo";
import { ToDoContext } from "../../Contexts/CreateContext";
import { handleFormCancel } from "../../Backend/FormFunctionality";
import PropTypes from "prop-types";

const TaskHeader = ({isCompleted}) => {
  const { setWindowClose, handleAddTaskWindow} = useContext(ToDoContext);
  
  const isTablet = useResponsive(960);
  const isMobile = useResponsive(670);

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
    className={`w-full h-full flex justify-start flex-row items-start px-6`}
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