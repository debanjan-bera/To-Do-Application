import { useState } from "react";
import PropTypes from 'prop-types'
import "./todo.css";

export const FormComp = ({onAddTodo}) => {
  const [inputValue, setInputValue] = useState("");
  const handleFromInput = (value) => {
    setInputValue(value);
  };
  const handleFromSubmit = (event) => {
    event.preventDefault();
    if (!inputValue) return;
    onAddTodo(inputValue)
    setInputValue("");
  };

  return (
    <form action="" className="todo-form" onSubmit={handleFromSubmit}>
      <div className="w-full">
        <input type="text" className="todo-input bg-black/50 backdrop-blur-xl text-white text-2xl font-medium" autoComplete="off" value={inputValue} onChange={(event) => handleFromInput(event.target.value)}
        />
      </div>
      <div>
        <button className="buttonClass">Add Task</button>
      </div>
    </form>
  );
};

FormComp.propTypes={
  onAddTodo : PropTypes.func.isRequired,
}