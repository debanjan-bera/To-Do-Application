import { useContext, useEffect } from "react";
import { ToDoContext } from "../Contexts/CreateContext";
import { TaskListComp } from "../Components/Primary Component/ListBoxComp";
import { AnimatePresence } from "framer-motion";
import { setLocalStorage } from "../Backend/LocalStorage";
import { ClearAllTask } from "../Components/Functions/Button/ClearTodo";
export const TaskActionItem = () => {
  const { taskArr, filteredData } = useContext(ToDoContext);
  useEffect(() => {
    setLocalStorage(taskArr, filteredData);
  }, [taskArr, filteredData]);
  return (
    <>
      <h2 className="text-3xl font-medium ">
        {`Completed Task: ${filteredData.length}`}
        <ClearAllTask pendingTask={false} />
      </h2>
      <section className="row-start-3 row-end-5 col-start-2 relative overflow-hidden">
        <section className="hello h-full w-full overflow-scroll">
          <h1>Completed Task</h1>
          <ul className="mytaskList text-2xl text-white">
            <AnimatePresence>
              {filteredData.map((Task) => {
                return ( <TaskListComp key={Task.id} curTask={Task} pendingTask={false} /> );
              })}
            </AnimatePresence>
          </ul>
        </section>
      </section>
    </>
  );
};
