import { useContext, useState, useMemo, useCallback, memo } from "react";
import { AnimatePresence } from "framer-motion";
import { ToDoContext } from "../../Contexts/CreateContext";
import { TaskList } from "./TaskList";
import { BsArrowDownCircle } from "react-icons/bs";
import PropTypes from "prop-types";
import useResponsive from "../../Hooks/UseResponsive";

const TaskSection = ({ isCompleted }) => {
  const { taskArr, filteredData } = useContext(ToDoContext);
  const [showData, setShowCompleted] = useState(false);
  const isMobile = useResponsive(670);

  const allTasks = useMemo(() => (isCompleted ? filteredData : taskArr), [isCompleted, filteredData, taskArr]);

  const groupedTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize

    const sections = {
      today: [],
      upcoming: [],
      previous: [],
    };

    allTasks.forEach((task) => {
      const taskDate = new Date(task.createdDateForform);
      taskDate.setHours(0, 0, 0, 0);

      if (taskDate.getTime() === today.getTime()) {
        sections.today.push(task);
      } else if (taskDate.getTime() > today.getTime()) {
        sections.upcoming.push(task);
      } else {
        sections.previous.push(task);
      }
    });

    return sections;
  }, [allTasks]);

  const groupByDate = useCallback((arr) => {
    return arr.reduce((acc, item) => {
      const date = item.createdDateForform;
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});
  }, []);

  const renderSection = useCallback((title, sectionTasks) => {
    if (!sectionTasks.length) return null;

    const grouped = groupByDate(sectionTasks);

    return (
      <AnimatePresence>
      <ul>
        <div>
          <h2 className="text-2xl font-bold my-2 px-2">{title}</h2>
          {Object.entries(grouped)
            .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
            .map(([date, tasks]) => (
              <div key={date}>
                {title !== "Today" && (
                  <h3 className="text-lg text-zinc-400 px-4 my-1">{date}</h3>
                )}
                <AnimatePresence>
                  {tasks.map((task) => (
                    <TaskList key={task.id} activeTask={task} />
                  ))}
                </AnimatePresence>
              </div>
            ))}
        </div>
      </ul>
      </AnimatePresence>

    );
  }, [groupByDate]);

  return (
    <div
      className={`w-full h-full px-4 ${!isMobile && "overflow-y-auto main-scroll"}`}
    >
      {!isCompleted && renderSection("Today", groupedTasks.today)}
      {!isCompleted && renderSection("Upcoming", groupedTasks.upcoming)}
      {!isCompleted && renderSection("Due Tasks", groupedTasks.previous)}
      {isCompleted && renderSection("Completed Tasks", filteredData)}

      {!isCompleted && (
        <ul className="text-white">
          {filteredData.length > 0 && (
            <li
              className="p-3 mb-4 border border-zinc-700 bg-zinc-900 rounded inline-block text-white text-xl font-medium select-none"
              onClick={() => setShowCompleted(!showData)}
            >
              <p className="flex items-center gap-2">
                <span className={`${showData && "rotate-180 transition-all"}`}>
                  <BsArrowDownCircle />
                </span>
                {`Completed Tasks: ${filteredData.length}`}
              </p>
            </li>
          )}
          {showData && renderSection("", filteredData)}
        </ul>
      )}
    </div>
  );
};

TaskSection.propTypes = {
  isCompleted: PropTypes.bool.isRequired,
};

export default memo(TaskSection);
