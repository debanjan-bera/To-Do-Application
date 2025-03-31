// import { useContext } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {FiTrash2, FiEdit2, FiAlertCircle } from "react-icons/fi";
import { handleDeleteTask, infoModelOpen } from "../../../Backend/TaskFunctionality";
import { ToDoContext } from "../../../Contexts/CreateContext";
import { useContext } from "react";
import PropTypes from "prop-types";

export const ContextMenuPopUp = ({id,pendingTask,isMenuOpen})=>{
    const { setTaskArr,  setFilteredData, setActiveMenuId} = useContext(ToDoContext);
    
    return(
        <>
        <AnimatePresence>
          {isMenuOpen&&(
            <motion.ul initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 top-8 z-10 bg-zinc-800 border border-zinc-700 rounded-md text-white text-sm w-32 shadow-lg overflow-hidden">
              
              {/* Edit Option */}
              <li className="px-3 py-2 flex items-center gap-2 hover:bg-zinc-700 cursor-pointer"
                onClick={() => console.log(`Editing Task ${id}`)}>
                <FiEdit2 /> Edit
              </li>
              <li className="px-3 py-2 flex items-center gap-2 border-y border-neutral-600 hover:bg-zinc-700 cursor-pointer"
                onClick={() => infoModelOpen()}>
                <FiAlertCircle /> Info
              </li>

              {/* Delete Option */}
              <li className="px-3 py-2 flex items-center gap-2 text-red-400 hover:bg-red-800/20  cursor-pointer"
                onClick={() => handleDeleteTask(setTaskArr, setFilteredData, id, pendingTask,setActiveMenuId)}>
                <FiTrash2 /> Delete
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
        </>
    )
}

ContextMenuPopUp.propTypes = {
  pendingTask: PropTypes.bool.isRequired,
  isMenuOpen:  PropTypes.bool.isRequired,
  id: PropTypes.string,
};