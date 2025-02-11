import { useContext, useEffect } from "react";
import { ToDoContext } from "../Contexts/CreateContext";
import { TaskListComp } from "../Components/Primary Component/ListBoxComp";
import { ClearAllTask } from "../Components/functionality/ClearTodo";
import { AnimatePresence } from "framer-motion";
import { setLocalStorage } from "../Backend/LocalStorage";
export const TaskActionItem = () => {
  const { taskArr,filteredData } = useContext(ToDoContext);
    useEffect(() => {
      setLocalStorage(taskArr, filteredData);
    }, [taskArr, filteredData]);
  return (
    <>
      <main
        className="bg-neutral-950 col-start-2 row-start-2 row-end-5 rounded-lg "
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}>
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
                  return <TaskListComp key={Task.id} curTask={Task} pendingTask={false}/>
                })}
              </AnimatePresence>
            </ul>
          </section>
      </section>
      </main>
    </>
  );
};
