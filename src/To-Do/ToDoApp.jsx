import { useState } from "react";
import "./todo.css";
import { DateAndTime } from "./Date";
import { FormComp } from "./Form";
import { TaskListComp } from "./TaskComp";
export const TodoApp = () => {
  const [taskArr, setTaskArr] = useState([]);
  const handleFromSubmit = (inputValue) => {
    if (taskArr.includes(inputValue)) return;
    setTaskArr((prevTask) => [...prevTask, inputValue]);
  };

  const handleDeleteTask= (value) =>{
    console.log(value);
    const updateTaskValue = taskArr.filter((curTask)=> curTask !== value )
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
        <main>
            <section className="p-4">
                <DateAndTime/>
            </section>
          <FormComp onAddTodo={handleFromSubmit} />
          <ul className="mytaskList">
            { taskArr.map((curTask, index) => {
              return (
                <TaskListComp key={index} data={curTask} onDeleteTask={handleDeleteTask}/>
              )})}
          </ul>
        </main>
        <div>
            <button onClick={handleClearAll}>Clear</button>
        </div>
      </section>
    </>
  );
};
