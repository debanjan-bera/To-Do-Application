import { useState } from "react";
import PropTypes from 'prop-types'
import "./todo.css";
import { DateAndTime } from "./Date";

export const InputBoxComponent = ({onAddTodo}) => {
  const [inputValue, setInputValue] = useState({id:'',content:'',checked:false});

  const handleFromInput = (value) => {
    setInputValue({id:value,content:value,checked:false});
  };
  const {content} = inputValue
  const handleFromSubmit = (event) => {
    event.preventDefault();
    if (!content) return;
    onAddTodo(inputValue)
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
  onAddTodo : PropTypes.func.isRequired,
}