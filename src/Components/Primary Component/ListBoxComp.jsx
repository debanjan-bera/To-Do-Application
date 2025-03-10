import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { updatedTodayDate } from "../../Backend/LocalStorage";
import { ToDoContext } from "../../Contexts/CreateContext";
import { handleDeleteTask, toggleChekedStatus, toggleTaskStatus } from "../../Backend/TaskFunctionality";
import { FiClock, FiTrash2, FiEdit2 } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAnimate, usePresence, motion, AnimatePresence } from "framer-motion";

export const TaskListComp = ({ curTask, pendingTask, openMenu, activeMenuId }) => {
  const [check, setCheck] = useState(false);
  const { taskArr, setTaskArr, filteredData, setFilteredData,setActiveMenuId} = useContext(ToDoContext);
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();
  const { id, content } = curTask;
  const isMenuOpen = activeMenuId === id;

  const handleCheckedTask = (event, id) => {
    setCheck(!check);
    if (pendingTask) toggleTaskStatus(id, taskArr, setTaskArr, setFilteredData);
    else toggleChekedStatus(event, filteredData, id, setFilteredData, setTaskArr, check, setCheck);
  };

  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        animate("p", { color: check ? "#6ee7b7" : "#fca5a5" }, { ease: "easeIn", duration: 0.125 });
        await animate(scope.current, { scale: 1.025 }, { ease: "easeIn", duration: 0.125 });
        await animate(scope.current, { opacity: 0, x: check ? 24 : -24 }, { delay: 0.75 });
        safeToRemove();
      };
      exitAnimation();
    }
  }, [isPresent, check, animate, safeToRemove, scope]);

  return (
    <motion.li ref={scope} layout
      className="p-3 m-3 rounded border border-zinc-700 bg-zinc-900 text-white text-xl font-medium flex justify-between items-center relative select-none md:mx-10">
      
      <div className="pb-1 flex flex-row gap-2 items-center">
        <input type="checkbox" checked={check} onChange={(e) => handleCheckedTask(e, id)} className="size-4 accent-indigo-400" />
        <motion.p className={`text-xl ${check && "line-through"}`}>{content}</motion.p>
      </div>

      <div className="ml-auto flex gap-1.5 relative">
        <section className="hidden md:inline">
          <div className="flex items-center gap-1.5 whitespace-nowrap rounded bg-zinc-800 px-1.5 py-1 text-xs text-zinc-400">
            <FiClock /> <span>{updatedTodayDate(id)}</span>
          </div>
        </section>

        {/* Three-dot Button */}
        <button className="ml-2 p-1 text-base scale-125 hover:bg-white/10 rounded-md" onClick={(e) => openMenu(e, id)}>
          <BsThreeDotsVertical />
        </button>

        {/* Context Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.ul
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 top-8 z-10 bg-zinc-800 border border-zinc-700 rounded-md text-white text-sm w-32 shadow-lg overflow-hidden">
              
              {/* Edit Option */}
              <li className="px-3 py-2 flex items-center gap-2 hover:bg-zinc-700 cursor-pointer"
                onClick={() => console.log(`Editing Task ${id}`)}>
                <FiEdit2 /> Edit
              </li>

              {/* Delete Option */}
              <li className="px-3 py-2 flex items-center gap-2 text-red-500 hover:bg-red-800 hover:text-red-300 cursor-pointer"
                onClick={() => handleDeleteTask(setTaskArr, setFilteredData, id, pendingTask,setActiveMenuId)}>
                <FiTrash2 /> Delete
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
};

TaskListComp.propTypes = {
  curTask: PropTypes.object.isRequired,
  pendingTask: PropTypes.bool.isRequired,
  openMenu: PropTypes.func.isRequired,
  activeMenuId: PropTypes.string,
};