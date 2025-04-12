import { useContext, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ToDoContext } from "../Contexts/CreateContext";
import { ContextMenuPopUp } from "../Components/Functions/Models/ContextMenuBar.jsx";
import { useAnimate, usePresence, motion } from "framer-motion";
import {
  toggleChekedStatus,
  toggleTaskStatus,
} from "../Backend/TaskFunctionality.js";
import PropTypes from "prop-types";
// import { GrFavorite } from "react-icons/gr";
// import { MdFavorite } from "react-icons/md";
import useIsMobile from "../Components/Functions/UseIsMobile.jsx";
import { FiClock } from "react-icons/fi";
import { IoStarOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
export const TaskListHello = ({ activeTask }) => {
  const {
    taskArr,
    setTaskArr,
    filteredData,
    setFilteredData,
    activeMenuId,
    setActiveMenuId,
  } = useContext(ToDoContext);
  const isMobile = useIsMobile(570); // Check mobile screen width

  const { id, content, checked, createdDateForform, favourite, priority} = activeTask;
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();
  const [check, setCheck] = useState(false);
  const isMenuOpen = activeMenuId === id;

  const openMenu = (e) => {
    e.stopPropagation();
    setActiveMenuId((prevId) => (prevId === id ? null : id));
  };
  const handleCheckedTask = (event) => {
    console.log(checked);
    setCheck(!check);
    if (!checked) toggleTaskStatus(id, taskArr, setTaskArr, setFilteredData);
    else
      toggleChekedStatus(event,filteredData,id,setFilteredData,setTaskArr,check,setCheck);
  };
  const findPriorityColor = () => {
    if (priority === "High") return `bg-red-800/30 text-red-400`;
    if (priority === "Moderate") return `bg-yellow-500/30 text-yellow-300`;
    return `bg-green-800/40 text-green-400`;
  };
  
  console.log(findPriorityColor);
  const handleToggelImp = () => {
    const updatedTasks = taskArr.map((task) =>
      task.id === id ? { ...task, favourite: !task.favourite } : task
    );
    setTaskArr(updatedTasks);
    setFilteredData(
      filteredData.map((task) =>
        task.id === id ? { ...task, favourite: !task.favourite } : task
      )
    );
    console.log(taskArr);
    console.log(priority);
  };
  
  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        animate(
          "p",
          { color: check ? "#6ee7b7" : "#fca5a5" },
          { ease: "easeIn", duration: 0.125 }
        );
        await animate(
          scope.current,
          { scale: 1.025 },
          { ease: "easeIn", duration: 0.125 }
        );
        await animate(
          scope.current,
          { opacity: 0, x: check ? 24 : -24 },
          { delay: 0.75 }
        );
        safeToRemove();
      };
      exitAnimation();
    }
  }, [isPresent, check, animate, safeToRemove, scope]);

  return (
    <>
      <motion.li
        ref={scope}
        layout
        className={`px-3 py-1 my-3 rounded border border-l-4 ${priority === 'High'?'border-l-red-500': priority === 'Low' ? 'border-l-green-500' : 'border-l-yellow-600'} border-zinc-700  bg-zinc-900 text-white text-xl font-medium flex ${isMobile?'flex-col items-start':'justify-between items-center'} relative select-none`}
      >
        <div className="pb-1 flex flex-row gap-3 items-center">
          {!isMobile&&<div>
            <input
              id={id}
              type="checkbox"
              checked={check}
              onChange={(e) => handleCheckedTask(e, id)}
              className="size-4 accent-indigo-400"
            />
          </div>}
          <div className=" flex flex-col items-start gap-2">
            <motion.p className={`text-xl ${check && "line-through"}`}>
              {content}
            </motion.p>
            <span className="flex flex-row gap-2">
            {!isMobile&&<section className="">
              <div className="flex items-center gap-1.5 whitespace-nowrap rounded bg-zinc-800 px-1.5 py-1 text-xs text-zinc-500">
                <FiClock /> <span>{createdDateForform}</span>
              </div>
            </section>}
            {!isMobile&&<section className="">
              <div className={`flex items-center gap-1.5 whitespace-nowrap rounded ${findPriorityColor('bg')} px-1.5 py-1 text-xs `}>
                <FiClock /> <span>{priority}</span>
              </div>
            </section>}
            {!isMobile&&<section className="">
              <div className="flex items-center gap-1.5 whitespace-nowrap rounded bg-zinc-800 px-1.5 py-1 text-xs text-zinc-500">
                <FiClock /> <span>{createdDateForform}</span>
              </div>
            </section>}
            </span>

          </div>
        </div>
        <div className={`ml-auto flex gap-1.5 relative ${isMobile&& 'w-full items-center justify-between'}`}>
          <span>
            {isMobile&&<section className="">
                <div className="flex items-center gap-1.5 whitespace-nowrap rounded bg-zinc-800 px-1.5 py-1 text-xs text-zinc-500">
                  <FiClock /> <span>{createdDateForform}</span>
                </div>
            </section>}
            
          </span>

          <div id={id} className="flex flex-row items-center"
          onClick={()=>{handleToggelImp()}}
          >{!favourite ? (
            <span className={`text-xl text-yellow-500 p-2 hover:bg-zinc-600/20 rounded-full aspect-square`}>
              <IoStarOutline />
            </span>
          ) : (
            <span className="text-xl text-yellow-500 p-2 hover:bg-zinc-600/20 rounded-full aspect-square ">
              <IoStar />
            </span>
          )}

          {/* Three-dot Button */}
          <button
            id={id}
            aria-labelledby={`${id}`}
            className="ml-2 p-1 text-base scale-125 hover:bg-white/10 rounded-md"
            onClick={(e) => openMenu(e)}
          >
            <BsThreeDotsVertical />
          </button>
          </div>
          {/* Context Menu */}
          <ContextMenuPopUp
            id={id}
            pendingTask={checked}
            isMenuOpen={isMenuOpen}
          />
        </div>
      </motion.li>
    </>
  );
};

TaskListHello.propTypes = {
  activeTask: PropTypes.object.isRequired,
};
