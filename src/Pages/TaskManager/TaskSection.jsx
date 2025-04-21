// import { useContext, useMemo, useCallback, memo } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { ToDoContext } from "../../Contexts/CreateContext";
// import { TaskList } from "./TaskList";
// // import { BsArrowDownCircle } from "react-icons/bs";
// // import PropTypes from "prop-types";
// import useResponsive from "../../Hooks/UseResponsive";

// const TaskSection = () => {
//   const { taskArr } = useContext(ToDoContext);
//   // const [showData, setShowCompleted] = useState(false);
//   const isMobile = useResponsive(670);

//   // const allTasks = useMemo(() => (isCompleted ? filteredData : taskArr), [isCompleted, filteredData, taskArr]);

//   const groupedTasks = useMemo(() => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // Normalize

//     const sections = {
//       today: [],
//       upcoming: [],
//       previous: [],
//     };

//     taskArr.forEach((task) => {
//       const taskDate = new Date(task.createdDateForform);
//       taskDate.setHours(0, 0, 0, 0);

//       if (taskDate.getTime() === today.getTime()) {
//         sections.today.push(task);
//       } else if (taskDate.getTime() > today.getTime()) {
//         sections.upcoming.push(task);
//       } else {
//         sections.previous.push(task);
//       }
//     });

//     return sections;
//   }, [taskArr]);

//   const groupByDate = useCallback((arr) => {
//     return arr.reduce((acc, item) => {
//       const date = item.createdDateForform;
//       if (!acc[date]) acc[date] = [];
//       acc[date].push(item);
//       return acc;
//     }, {});
//   }, []);

//   const renderSection = useCallback(
//     (title, sectionTasks) => {
//       const grouped = groupByDate(sectionTasks);

//       return (
//         <AnimatePresence>
//           {sectionTasks.length > 0 && (
//             <motion.div key={title}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//               transition={{ duration: 0.5 }}
//               className="bg-[#bbbbbb0b] p-2  mb-4 inset-3 border border-neutral-800 rounded-md">
//               <h2 className="text-xl font-semibold pb-3 text-zinc-400">
//                 {title}
//               </h2>
//               {Object.entries(grouped)
//                 .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
//                 .map(([date, tasks]) => (
//                   <div key={date}>
//                     {title !== "Today" && (
//                       <h3 className="text-lg text-zinc-500 pl-2 pb-2 ">
//                         {date}
//                       </h3>
//                     )}
//                     <AnimatePresence>
//                       {tasks.map((task) => (
//                         <TaskList key={task.id} activeTask={task} />
//                       ))}
//                     </AnimatePresence>
//                   </div>
//                 ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       );
//     },
//     [groupByDate]
//   );

//   return (
//     <div
//       className={`w-full h-full px-1 ${
//         !isMobile && "overflow-y-auto main-scroll"
//       }`}
//     >
//       {renderSection("Today", groupedTasks.today)}
//       {renderSection("Upcoming", groupedTasks.upcoming)}
//       {renderSection("Due Tasks", groupedTasks.previous)}
//       {/* {isCompleted && renderSection("Completed Tasks", filteredData)} */}

//       {/* {!isCompleted && (
//         <ul className="text-white">
//           {filteredData.length > 0 && (
//             <li
//               className="p-3 mb-4 border border-zinc-700 bg-zinc-900 rounded inline-block text-white text-xl font-medium select-none"
//               onClick={() => setShowCompleted(!showData)}
//             >
//               <p className="flex items-center gap-2">
//                 <span className={`${showData && "rotate-180 transition-all"}`}>
//                   <BsArrowDownCircle />
//                 </span>
//                 {`Completed Tasks: ${filteredData.length}`}
//               </p>
//             </li>
//           )}
//           {showData && renderSection("", filteredData)}
//         </ul>
//       )} */}
//     </div>
//   );
// };

// export default memo(TaskSection);
import { useContext, useMemo, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ToDoContext } from "../../Contexts/CreateContext";
import { TaskList } from "./TaskList";
import useResponsive from "../../Hooks/UseResponsive";
import PropTypes from "prop-types";

const TaskSection = ({isCompleted}) => {
  const { taskArr } = useContext(ToDoContext);
  const isMobile = useResponsive(670);
  // const allGroups = [...new Set(taskArr.map(task => task.group))];
  // const selectedGroups = ["Music", "Gaming"];
  // const selectedPriorities = ["High", "Moderate"];
  const selectedFavourites = [true];
  const selectedNotCompleted = [false];

  // // Apply both filters for group and priority
  const filteredTasks = taskArr.filter(
    (task) =>
      // selectedGroups.includes(task.group) &&
      // selectedPriorities.includes(task.priority)
      isCompleted? selectedFavourites.includes(task.checked):
      selectedNotCompleted.includes(task.checked)
  )

  // Sorting the filtered tasks
  const sortedData = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.createdDateForform);
    const dateB = new Date(b.createdDateForform);

    if (dateA > dateB) return -1; // Newest first
    if (dateA < dateB) return 1;

    return 0; // If dates are same
  });

  // console.log(sortedData);
  const groupedTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sections = {
      today: [],
      upcoming: [],
      previous: [],
    };

    sortedData.forEach((task) => {
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
  }, [sortedData]);

  const renderSection = (title, sectionTasks) => (
    <AnimatePresence>
      {sectionTasks.length > 0 && (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="bg-[#bbbbbb0b] p-2 mb-4 inset-3 border border-neutral-800 rounded-md"
        >
          <h2 className="text-xl font-semibold pb-3 text-zinc-400">{title}</h2>

          <AnimatePresence>
            {sectionTasks.map((task) => (
              <TaskList key={task.id} activeTask={task} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div
      className={`w-full h-full px-1 ${
        !isMobile && "overflow-y-auto main-scroll"
      }`}
    >
      {!isCompleted&&renderSection("Today", groupedTasks.today)}
      {!isCompleted&&renderSection("Upcoming", groupedTasks.upcoming)}
      {!isCompleted&&renderSection("Due Tasks", groupedTasks.previous)}
      {isCompleted&&renderSection("Completed Tasks", sortedData)}
    </div>
  );
};

TaskSection.propTypes = {
  isCompleted: PropTypes.bool,
};
export default memo(TaskSection);