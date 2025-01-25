import PropTypes from "prop-types";
import '../../To-Do/todo.css'
import { useContext } from "react";
import { ToDoContext } from "../../Contexts/CreateContext";

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
      const classList= `p-2 m-1 text-2xl text-white font-medium bg-red-500 ${emptyTask ? 'visible' : 'hidden'}`;
      return classList
}
    return(
      <div className="flex justify-center">
        <button className={hiddenCompo()} onClick={handleClearAll}>Clear</button>
      </div>)
}

ClearAllTask.propTypes = {
    pendingTask:PropTypes.bool.isRequired,
};