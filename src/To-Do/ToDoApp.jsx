import { useState } from "react";
import "./todo.css";
import { DateAndTime } from "./Date";
import { FormComp } from "./Form";
import { TaskListComp } from "./TaskComp";
import { ClearAllTask } from "./ClearTodo";
export const TodoApp = () => {
  const [taskArr, setTaskArr] = useState([]);
  const handleFromSubmit = (inputValue) => {
    if (taskArr.includes(inputValue)) return;
    setTaskArr((prevTask) => [...prevTask, inputValue]);
  };
  const handleDeleteTask = (value) => {
    const updateTaskValue = taskArr.filter((curTask) => curTask !== value);
    setTaskArr(updateTaskValue);
  };
  return (
    <>
      <main className="bg-black/50 h-lvh w-lvw  flex flex-col items-center">
        <header className="p-3 text-6xl text-white">
          <h2>To-Do Application</h2>
        </header>
        <main style={{width: "500px"}}>
          <section className="p-4">
            <h2>Date & Time</h2>
            <DateAndTime/>
          </section>
          <FormComp onAddTodo={handleFromSubmit} />
          <section>
            <h2 className="py-2 text-white/70 text-3xl font-medium">Task:</h2>
            <ul className="mytaskList">
              {taskArr.map((curTask, index) => {
                return (
                  <TaskListComp key={index} data={curTask} onDeleteTask={handleDeleteTask}/>
                );})}
            </ul>
            <div className="flex justify-center">
              <ClearAllTask onTodoData={setTaskArr} lengthOfArr={taskArr.length}/>
            </div>
          </section>
        </main>
      </main>
    </>
  );
};
