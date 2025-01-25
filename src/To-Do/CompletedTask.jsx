// import PropTypes from "prop-types";
import { useContext } from "react";
import { ToDoContext } from "../Contexts/CreateContext";
import { TaskListComp } from "../Components/Primary Component/ListBoxComp";

export const TaskActionItem = () => {
      const { filteredData } = useContext(ToDoContext);
      return (
        <>
              <div className="bg-yellow-600 col-start-2 row-start-2 row-end-3 ">
                <h2 className="text-3xl font-medium ">
                  {`Completed Task: ${filteredData.length}`}
                  {/* <ClearAllTask setTaskData={setTaskArr} setCompletedTask={setFilteredData} emptyTask={totalTask}/> */}
                </h2>
              </div>
              <main className="row-start-3 row-end-5 col-start-2 bg-yellow-400 relative overflow-hidden">
                <section className="hello h-full w-full overflow-scroll">
                <h1>Completed Task</h1>
                    <ul className="mytaskList text-2xl text-white">
                      {filteredData.map((Task) => {
                        return ( <TaskListComp key={Task.id} curTask={Task} pendingTask={false}/>);
                        })}
                    </ul>
                </section>
              </main>
        </>
      )
        
};
// TaskActionItem.propTypes = {
//   taskData: PropTypes.object.isRequired,
//   updatePrimaryTasks: PropTypes.func.isRequired,
//   filteredTasks: PropTypes.array.isRequired,
//   updateFilteredTasks: PropTypes.func.isRequired,
// };
