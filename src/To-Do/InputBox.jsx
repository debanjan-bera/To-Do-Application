import { useState } from "react";
import PropTypes from 'prop-types'
import "./todo.css";
import { DateAndTime } from "./Functional Component/Date.jsx";
import { genaratedUniqueId } from "./Functional Component/LocalStorage.jsx"
export const InputBoxComponent = ({taskdata,setTaskData}) => {
  const [inputValue, setInputValue] = useState({id:'',content:'',isGroup:'',favourite:false,checked:false});
  const {id,content,isGroup,favourite,checked} = inputValue

  const taskId = genaratedUniqueId()
  const handleFromInput = (value) => {
    setInputValue({id:taskId,content:value,isGroup:'',favourite:false,checked:false});
  };
  const handleFromSubmit = (event) => {
    event.preventDefault();
    if (!content) return;
    const ifTododMatchedId = taskdata.find((currentTask) => currentTask.id === id)
    if (ifTododMatchedId) return;
    setTaskData((prevTask) => [...prevTask,{id,content,isGroup,favourite,checked}]);
    setInputValue({id:'',content:'',isGroup:'',favourite:false,checked:false});
  };
  

  return (
    <>
    <DateAndTime/>
    <form action="" className="todo-form" onSubmit={handleFromSubmit}>
      <div className="w-full">
        <input type="text" className="todo-input bg-black/50 backdrop-blur-xl text-white text-xl font-medium" autoComplete="off" value={content} onChange={(event) => handleFromInput(event.target.value)}/>
      </div>
      <div>
        <button className="buttonClass">Add Task</button>
      </div>
    </form>
    </>);
};

InputBoxComponent.propTypes={
  taskdata: PropTypes.array.isRequired,
  setTaskData: PropTypes.func.isRequired,
}