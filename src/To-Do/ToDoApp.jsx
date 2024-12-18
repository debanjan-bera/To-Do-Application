import { useState } from "react";
import "./todo.css";
import { DateAndTime } from "./Date";
import { InputBoxComponent } from "./InputBox";
import { TaskListComp } from "./ListBoxComp";
import { ClearAllTask } from "./ClearTodo";
export const TodoApp = () => {
  const [taskArr, setTaskArr] = useState([]);
  const handleFromSubmit = (inputValue) => {
    const {id,content,checked} = inputValue
    const ifTodoContentMatched = taskArr.find((currentTask) => currentTask.content === content)
    if (ifTodoContentMatched) return;
    setTaskArr((prevTask) => [...prevTask,{id,content,checked}]);
  };
  const handleDeleteTask = (value) => {
    const updateTaskValue = taskArr.filter((curTask) => curTask.content !== value);
    setTaskArr(updateTaskValue);
    console.log(updateTaskValue);
  };
  return (
    <>
      <main className="bg-black/50 h-lvh w-lvw  flex flex-col items-center">
        <header className="p-3 text-6xl text-white">
          <h2>To-Do Application</h2>
        </header>
        <main style={{width: "500px"}}>
          <DateAndTime/>
          <InputBoxComponent onAddTodo={handleFromSubmit} />
          <section>
            <h2 className="py-2 text-white/70 text-3xl font-medium">Task:</h2>
            <ul className="mytaskList">
              {taskArr.map((curTask) => {
                return (
                  <TaskListComp key={curTask.id} date={curTask.id} data={curTask.content} onDeleteTask={handleDeleteTask}/>
                );})}
            </ul>
            <ClearAllTask onTodoData={setTaskArr} lengthOfArr={taskArr.length}/>
          </section>
        </main>
      </main>
    </>
  );
};
