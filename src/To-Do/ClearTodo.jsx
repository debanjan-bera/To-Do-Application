import PropTypes from "prop-types";
import './todo.css'
export const ClearAllTask = ({onTodoData,lengthOfArr})=>{
    const handleClearAll = ()=> onTodoData([])
    const hiddenCompo = ()=>{
        const classList= `p-2 m-1 text-2xl text-white font-medium bg-red-500 ${lengthOfArr!== 0 ? 'visible' : 'hidden'}`;
        return classList
      }
    return(<button className={hiddenCompo()} onClick={handleClearAll}>Clear</button>)
}

ClearAllTask.propTypes = {
  onTodoData: PropTypes.func.isRequired, 
  lengthOfArr: PropTypes.number.isRequired,

};