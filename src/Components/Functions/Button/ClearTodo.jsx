import PropTypes from "prop-types";
import '../../../To-Do/todo.css'
import { useContext } from "react";
import { ToDoContext } from "../../../Contexts/CreateContext";
// import { ToDoContext } from "../../Contexts/CreateContext";

export const ClearAllTask = ({pendingTask})=>{
    const {taskArr,setTaskArr,filteredData,setFilteredData} = useContext(ToDoContext)

    const handleClearAll = ()=> {
      if(pendingTask && taskArr && filteredData){
        setTaskArr([])
        setFilteredData([])
      }
      if(!pendingTask && filteredData) setFilteredData([])
    }
    const hiddenCompo = ()=>{
      const emptyTask = pendingTask ? taskArr.length : filteredData.length
      const classList= `mx-3 px-4 py-2 text-xl font-bold rounded-md text-white bg-red-600 hover:bg-red-700 ${emptyTask ? 'visible' : 'hidden'}`;
      return classList
}
    return <button className={hiddenCompo()} onClick={handleClearAll}>Clear</button>
}

ClearAllTask.propTypes = {
    pendingTask:PropTypes.bool.isRequired,
};