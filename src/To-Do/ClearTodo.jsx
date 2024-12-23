import PropTypes from "prop-types";
import './todo.css'
export const ClearAllTask = ({setTaskData,setCompletedTask,lengthOfTaskArr})=>{
    const handleClearAll = ()=> {
      setTaskData([])
      setCompletedTask([])
    } 
    
    const hiddenCompo = ()=>{
        const classList= `p-2 m-1 text-2xl text-white font-medium bg-red-500 ${lengthOfTaskArr!== 0 ? 'visible' : 'hidden'}`;
        return classList
      }
    return(
      <div className="flex justify-center">
        <button className={hiddenCompo()} onClick={handleClearAll}>Clear</button>
      </div>)
}

ClearAllTask.propTypes = {
  setTaskData: PropTypes.func.isRequired,
  setCompletedTask:PropTypes.func.isRequired,
  lengthOfTaskArr: PropTypes.number.isRequired,

};