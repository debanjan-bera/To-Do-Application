import { useState } from "react";
import PropTypes from 'prop-types'
import "./todo.css";
import { DateAndTime } from "./Date";

export const InputBoxComponent = ({taskdata,setTaskData}) => {
  const [inputValue, setInputValue] = useState({id:'',content:'',checked:false});
  const {id,content,checked} = inputValue
  const setUniqueId = ()=>{
    const todayDate = new Date();
    const formattedDate = todayDate.toLocaleDateString();
    const formattedTime = todayDate.toLocaleTimeString();
    return formattedDate +'&'+ formattedTime;
  }
  const taskId =  setUniqueId()
  const handleFromInput = (value) => {
    setInputValue({id:taskId,content:value,checked:false});
  };
  const handleFromSubmit = (event) => {
    event.preventDefault();
    if (!content) return;
    const ifTodoContentMatched = taskdata.find((currentTask) => currentTask.content === content)
    const ifTododMatchedId = taskdata.find((currentTask) => currentTask.id === id)
    if (ifTodoContentMatched || ifTododMatchedId) return;
    setTaskData((prevTask) => [...prevTask,{id,content,checked}]);
    setInputValue({id:'',content:'',checked:false});
  };
  

  return (
    <>
    <DateAndTime/>
    <form action="" className="todo-form" onSubmit={handleFromSubmit}>
      <div className="w-full">
        <input type="text" className="todo-input bg-black/50 backdrop-blur-xl text-white text-xl font-medium" autoComplete="off" value={content} onChange={(event) => handleFromInput(event.target.value)}
        />
      </div>
      <div>
        <button className="buttonClass">Add Task </button>
      </div>
    </form>
    </>);
};

InputBoxComponent.propTypes={
  taskdata: PropTypes.array.isRequired,
  setTaskData: PropTypes.func.isRequired,

}