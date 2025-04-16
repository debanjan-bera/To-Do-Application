import { motion, AnimatePresence } from "framer-motion";
import {FiTrash2, FiEdit2, FiAlertCircle } from "react-icons/fi";
import { handleDeleteTask } from "../../../Backend/TaskFunctionality";
import { FormDataContext, ToDoContext } from "../../../Contexts/CreateContext";
import { memo, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { GrCompliance } from "react-icons/gr";
import useResponsive from "../../../Hooks/UseResponsive";

const ContextMenuPopUp = ({id,curTask,pendingTask,isMenuOpen})=>{
    const { taskArr,setTaskArr, isShowInfoId, setFilteredData, setActiveMenuId, setInfoId,isTaskEdit,setTaskEdit,windowOpen, setWindowClose} = useContext(ToDoContext);
    const {  setInfoOpen } = useContext(FormDataContext);
    const isMobile = useResponsive(570); // Check mobile screen width

    const infoModelOpen = useCallback(()=>{
         if(id === isShowInfoId){
            setInfoOpen(false)
            setInfoId(null)
        }
        else{
          setInfoOpen(true)
          setInfoId(id)
        }
    },[id,isShowInfoId,setInfoOpen,setInfoId])




    return(
        <>
        <AnimatePresence>
          {isMenuOpen&&(
            <motion.ul initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-9 right-2 z-10 bg-zinc-800 border border-zinc-700 rounded-md text-white text-sm w-32 shadow-lg overflow-hidden">
              
              {/* Edit Option */}
              <li className="px-3 py-2 flex items-center gap-2 hover:bg-zinc-700 cursor-pointer"
                onClick={() => {
                  console.log(`Editing Task ${id}`);
                  setTaskEdit(curTask)
                  setWindowClose(!windowOpen)
                  }}>
                <FiEdit2 /> Edit
              </li>
              <li className="px-3 py-2 flex items-center gap-2 border-y border-neutral-600 hover:bg-zinc-700 cursor-pointer"
                onClick={() => infoModelOpen()}>
                <FiAlertCircle /> Info
              </li>
              {isMobile&&<li className="px-3 py-2 flex items-center gap-2 border-y border-neutral-600 hover:bg-zinc-700 cursor-pointer">
                <GrCompliance /> Completed
              </li>}
              <li className="px-3 py-2 flex items-center gap-2 border-y border-neutral-600 hover:bg-zinc-700 cursor-pointer">
                Favourite
              </li>
              {/* Delete Option */}
              <li className="px-3 py-2 flex items-center gap-2 text-red-400 hover:bg-red-800/20  cursor-pointer"
                onClick={() => handleDeleteTask(taskArr,setTaskArr, setFilteredData, id, pendingTask,setActiveMenuId)}>
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
  curTask: PropTypes.object.isRequired,
  id: PropTypes.string,
};
export default memo(ContextMenuPopUp)