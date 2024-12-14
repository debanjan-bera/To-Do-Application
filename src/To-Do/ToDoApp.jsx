import { useState } from "react";
import "./todo.css";
import { DateAndTime } from "./Date";
export const TodoApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [taskArr, setTaskArr] = useState([]);
  const handleFromInput = (value) => {
    setInputValue(value);
  };
  const handleFromSubmit = (event) => {
    event.preventDefault();
    if (!inputValue) return;
    if (taskArr.includes(inputValue)) return;
    setTaskArr((prevTask) => [...prevTask, inputValue]);
    setInputValue("");
  };
  const handleBtnSubmit = () => {
    if (!inputValue) return;
    if (taskArr.includes(inputValue)) setInputValue("");
    else {
      console.log(inputValue);
      console.log(taskArr);
    }
  };
  const handleDeleteTask= (value) =>{
    console.log(value);
    const updateTaskValue = taskArr.filter((curTask)=> curTask !== value)
    setTaskArr(updateTaskValue)
  }
  const handleClearAll = ()=>{
    setTaskArr([])
  }
  return (
    <>
      <section className=" h-lvh w-lvw bg-pink-400 flex flex-col items-center gap-4">
        <header className="p-5">
          <h2 className=" text-6xl">To-Do Application</h2>
        </header>
        <main className="">
            <section className="p-4">
                <DateAndTime/>
            </section>
          <form action="" className="todo-form" onSubmit={handleFromSubmit}>
           
            <div className="w-full">
              <input type="text" className="todo-input" autoComplete="off" value={inputValue}
                onChange={(event) => handleFromInput(event.target.value)}
              />
            </div>
            <div>
              <button className="buttonClass" onClick={handleBtnSubmit}> Add Task
              </button>
            </div>
            
            
          </form>
          <ul className="mytaskList">
            {taskArr.map((curTask, index) => {
              return (
                <li key={index}>
                  <span>{curTask}</span>
                  <button className="h-8 p-2 bg-red-600 text-center"
                  onClick={()=> handleDeleteTask(curTask)}
                  >Delete</button>
                </li>
              );
 
            })}

          </ul>
        </main>
        <div>
            <button onClick={handleClearAll}>Clear</button>
        </div>
      </section>
    </>
  );
};
