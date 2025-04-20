import { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ContextMenuPopUp from "../../Components/Functions/Models/ContextMenuBar.jsx";
import {  motion } from "framer-motion";
import PropTypes from "prop-types";
// import { FiClock } from "react-icons/fi";
import { IoStarOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { ToDoContext } from "../../Contexts/CreateContext.jsx";
// import useResponsive from "../../Hooks/UseResponsive.jsx";
export const TaskList = ({ activeTask }) => {
  const { taskArr, setTaskArr, activeMenuId, group, setActiveMenuId } =
    useContext(ToDoContext);
  // const isMobile = useResponsive(570); // Check mobile screen width

  const {id,content,checked,createdDateForform,favourite,priority} = activeTask;
  const isMenuOpen = activeMenuId === id;

  const openMenu = (e) => {
    e.stopPropagation();
    setActiveMenuId((prevId) => (prevId === id ? null : id));
  };
  // const findPriorityColor = () => {
  //   if (priority === "High") return `bg-red-800/30 text-red-400`;
  //   if (priority === "Moderate") return `bg-yellow-500/30 text-yellow-300`;
  //   return `bg-green-800/40 text-green-400`;
  // };

  const handleCheckTask = (e, id) => {
    const isChecked = e.target.checked;
    const updatedTask = taskArr.map((curTasks) =>
      curTasks.id === id ? { ...curTasks, checked: isChecked } : curTasks
    );
    setTaskArr(updatedTask);
  };
  const handleToggelImp = (id) => {
    const updatedTasks = taskArr.map((task) =>
      task.id === id ? { ...task, favourite: !task.favourite } : task
    );
    setTaskArr(updatedTasks);
  };
  return (
    <>
      <motion.li
        key={id}
        className="w-full flex relative flex-row items-center justify-between gap-4 mb-3 border rounded-md bg-neutral-900 border-zinc-700 py-2 px-3 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, color: "#ffffff" }}
        // exit={{ opacity: 0, y: 50, scale: 0.9 ,color: "#7f1d1d"}}
        exit={{
          opacity: 0,
          x: 100,
          color: "#7f1d1d", // Red color when exiting
          transition: {
            delay: 0.3, // 🕒 Delay only on EXIT color change
            duration: 0.6, // Normal exit speed for color change
          },
        }}
        variants={{
          hidden: { opacity: 0, y: -20 },
          show: { opacity: 1, y: 0 },
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 10,
        }}
      >
        <label className="h-full flex flex-col justify-center">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            value={checked}
            onChange={(e) => handleCheckTask(e, id)}
            className={`w-4 h-4 rounded-md accent-green-500
  `}
          />
        </label>
        <div className="flex flex-col w-full">
          <p
            className={`text-lg font-bold transition-colors duration-300 ${
              checked ? "text-green-600 line-through" : "text-white"
            }`}
          >
            {content}
          </p>
          <div className="w-full flex flex-row flex-wrap gap-4 text-sm text-neutral-500">
            <p>Created: {createdDateForform}</p>
            <p>Group: {group}</p>
            <p>Priority: {priority}</p>
            <p className="text-red-400">status: {`${checked}`}</p>
          </div>
        </div>

        <div
          id={id}
          className="flex flex-row items-center"
          onClick={() => {
            handleToggelImp(id);
          }}
        >
          {!favourite ? (
            <span
              className={`text-xl text-neutral-600 p-2 hover:bg-zinc-600/20 rounded-full aspect-square`}
            >
              <IoStarOutline />
            </span>
          ) : (
            <span className="text-xl text-yellow-500 p-2 hover:bg-zinc-600/20 rounded-full aspect-square ">
              <IoStar />
            </span>
          )}

          {/* Three-dot Button */}
        </div>
        <div>
          <button id={id} aria-labelledby={`${id}`}
            className="ml-2 p-1 text-base scale-125 hover:bg-white/10 rounded-md"
            onClick={(e) => openMenu(e, id)}
          >
            <BsThreeDotsVertical />
          </button>
        </div>
        <ContextMenuPopUp id={id} curTask={activeTask} isMenuOpen={isMenuOpen} />
      </motion.li>
    </>
  );
};

TaskList.propTypes = {
  activeTask: PropTypes.object.isRequired,
};
