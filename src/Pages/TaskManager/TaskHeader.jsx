import { memo, useContext, useEffect } from "react";
import useResponsive from "../../Hooks/UseResponsive";
import { RxDashboard } from "react-icons/rx";
import { PiBookBookmarkBold } from "react-icons/pi";
import { ToDoContext } from "../../Contexts/CreateContext";
import { handleFormCancel } from "../../Backend/FormFunctionality";
import { useParams } from "react-router-dom";

const TaskHeader = () => {
  const { setWindowClose, handleAddTaskWindow } = useContext(ToDoContext);

  const isMobile = useResponsive(670);
const { category } = useParams();
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
  return (
    <>
      <div className="w-full h-full flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2 text-3xl font-extrabold"><span><RxDashboard /></span><p>{category? `${category} Tasks`:"Dashboard"}</p></div>
        {!isMobile && <div>
          <button
              title="Alt + N"
              className="px-4 py-2 text-xl font-bold bg-blue-600 rounded-md text-white hover:bg-blue-700 flex flex-row gap-2 items-center"
              onClick={handleAddTaskWindow}
            >
              <PiBookBookmarkBold />
              Add Task
            </button>
        </div>}
      </div>
    </>
  );
};
export default memo(TaskHeader);

