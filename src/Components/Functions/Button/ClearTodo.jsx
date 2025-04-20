import PropTypes from "prop-types";
import '../../../To-Do/todo.css'
import { useContext } from "react";
import { ToDoContext } from "../../../Contexts/CreateContext";
// import { ToDoContext } from "../../Contexts/CreateContext";

export const ClearAllTask = ({pendingTask})=>{
    const {taskArr,setTaskArr} = useContext(ToDoContext)

    const handleClearAll = ()=> {
      setTaskArr([])
    }
    const hiddenCompo = ()=>{
      const emptyTask = pendingTask && taskArr.length 
      const classList= `mx-3 px-4 py-2 text-xl font-bold rounded-md text-white bg-red-600 hover:bg-red-700 ${emptyTask ? 'visible' : 'hidden'}`;
      return classList
}
    return <button className={hiddenCompo()} onClick={handleClearAll}>Clear</button>
}

ClearAllTask.propTypes = {
    pendingTask:PropTypes.bool.isRequired,
};