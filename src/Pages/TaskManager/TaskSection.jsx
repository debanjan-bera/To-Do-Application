// import { useContext, useMemo, memo } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { ToDoContext } from "../../Contexts/CreateContext";
// import { TaskList } from "./TaskList";
// import useResponsive from "../../Hooks/UseResponsive";
// import PropTypes from "prop-types";

// const TaskSection = ({ isCompleted }) => {
//   const { taskArr } = useContext(ToDoContext);
//   const isMobile = useResponsive(670);
//   // const allGroups = [...new Set(taskArr.map(task => task.group))];
//   // const selectedGroups = ["Music", "Gaming"];
//   // const selectedPriorities = ["High", "Moderate"];
//   const selectedFavourites = [true];
//   const selectedNotCompleted = [false];

//   // // Apply both filters for group and priority
//   const filteredTasks = taskArr.filter((task) =>
//     // selectedGroups.includes(task.group) &&
//     // selectedPriorities.includes(task.priority)
//     isCompleted
//       ? selectedFavourites.includes(task.checked)
//       : selectedNotCompleted.includes(task.checked)
//   );

//   // Sorting the filtered tasks
//   const sortedData = [...filteredTasks].sort((a, b) => {
//     const dateA = new Date(a.createdDateForform);
//     const dateB = new Date(b.createdDateForform);

//     if (dateA > dateB) return -1; // Newest first
//     if (dateA < dateB) return 1;

//     return 0; // If dates are same
//   });

//   // console.log(sortedData);
//   const groupedTasks = useMemo(() => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const sections = {
//       today: [],
//       upcoming: [],
//       previous: [],
//     };

//     sortedData.forEach((task) => {
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
//   }, [sortedData]);
//   const handleMinimize = (title)=>{
//     console.log(title);
//   }
//   const renderSection = (title, sectionTasks) => (
//     <AnimatePresence>
//       {sectionTasks.length > 0 && (
//         <motion.div
//           key={title}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 10 }}
//           transition={{ duration: 0.5 }}
//           className="bg-[#bbbbbb0b] p-2 mb-4 inset-3 border border-neutral-800 rounded-md"
//         >
//           <h2 className="text-xl font-semibold pb-3 text-zinc-400"
//           onClick={()=>handleMinimize(title)}
//           >{title}</h2>

//           <motion.ul
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{
//             opacity: 0, x: 100, color: "#7f1d1d", // Red color when exiting
//             transition: {
//               delay: 0.3, // 🕒 Delay only on EXIT color change
//               duration: 0.6, // Normal exit speed for color change
//             },
//           }}

//           >
//             <AnimatePresence>
//               {sectionTasks.map((task) => (
//                 <TaskList key={task.id} activeTask={task} />
//               ))}
//             </AnimatePresence>
//           </motion.ul>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );

//   return (
//     <div
//       className={`w-full h-full px-1 ${
//         !isMobile && "overflow-y-auto main-scroll"
//       }`}
//     >
//       {!isCompleted && renderSection("Today", groupedTasks.today)}
//       {!isCompleted && renderSection("Upcoming", groupedTasks.upcoming)}
//       {!isCompleted && renderSection("Due Tasks", groupedTasks.previous)}
//       {renderSection("Completed Tasks", sortedData)}
//     </div>
//   );
// };

// TaskSection.propTypes = {
//   isCompleted: PropTypes.bool,
// };
// export default memo(TaskSection);
import { useContext, useMemo, useState, memo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ToDoContext } from "../../Contexts/CreateContext";
import { TaskList } from "./TaskList";
import useResponsive from "../../Hooks/UseResponsive";
import PropTypes from "prop-types";

const TaskSection = ({ isCompleted }) => {
  const { taskArr } = useContext(ToDoContext);
  const isMobile = useResponsive(670);

  const selectedFavourites = [true];
  const selectedNotCompleted = [false];

  const filteredTasks = taskArr.filter((task) =>
    isCompleted
      ? selectedFavourites.includes(task.checked)
      : selectedNotCompleted.includes(task.checked)
  );

  const sortedData = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.createdDateForform);
    const dateB = new Date(b.createdDateForform);
    return dateB - dateA;
  });

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

  // ✅ For handling minimize/expand sections
  const [collapsedSections, setCollapsedSections] = useState({});

  const handleMinimize = useCallback((title) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [title]: !prev[title], // Toggle
    }));
  }, []);

  const renderSection = useCallback(
    (title, sectionTasks) => (
      <AnimatePresence mode="wait">
        {sectionTasks.length > 0 && (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="bg-[#bbbbbb0b] p-2 mb-4 border border-neutral-800 rounded-md flex flex-col gap-4"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleMinimize(title)}
            >
              <h2 className="text-xl font-semibold text-zinc-400">{title}</h2>
              <motion.span
                animate={{ rotate: collapsedSections[title] ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-zinc-400"
              >
                {'>'}
              </motion.span>
            </div>

            {/* Collapsible Content */}
            <AnimatePresence initial={false}>
              {!collapsedSections[title] && (
                <motion.ul
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <AnimatePresence>
                    {sectionTasks.map((task) => (
                      <TaskList key={task.id} activeTask={task} />
                    ))}
                  </AnimatePresence>
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    ),
    [collapsedSections, handleMinimize]
  );

  return (
    <div
      className={`w-full h-full px-1 ${
        !isMobile && "overflow-y-auto main-scroll"
      }`}
    >
      {!isCompleted && renderSection("Today", groupedTasks.today)}
      {!isCompleted && renderSection("Upcoming", groupedTasks.upcoming)}
      {!isCompleted && renderSection("Due Tasks", groupedTasks.previous)}
      {isCompleted && renderSection("Completed Tasks", sortedData)}
    </div>
  );
};

TaskSection.propTypes = {
  isCompleted: PropTypes.bool,
};

export default memo(TaskSection);
// {isCompleted
//   ? renderSection(
//       "Completed Tasks",
//       sortedData.length > 0 ? sortedData : []
//     )
//   : (
//       <>
//         {renderSection("Today", groupedTasks.today)}
//         {renderSection("Upcoming", groupedTasks.upcoming)}
//         {renderSection("Due Tasks", groupedTasks.previous)}
//       </>
//     )
// }
// const renderSection = useCallback((title, sectionTasks) => (
//   <AnimatePresence mode="wait">
//     <motion.div
//       key={title}
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 10 }}
//       transition={{ duration: 0.4 }}
//       className={`p-2 mb-4 border border-neutral-800 rounded-md ${
//         title === "Completed Tasks" ? "bg-green-900/20" : "bg-[#bbbbbb0b]"
//       }`}
//     >
//       {/* Header */}
//       <div
//         className="flex items-center justify-between cursor-pointer"
//         onClick={() => handleMinimize(title)}
//       >
//         <h2 className="text-xl font-semibold text-zinc-400">{title}</h2>
//         <motion.span
//           animate={{ rotate: collapsedSections[title] ? 180 : 0 }}
//           transition={{ duration: 0.3 }}
//           className="text-zinc-400"
//         >
//           ▼
//         </motion.span>
//       </div>

//       {/* Collapsible Content */}
//       <AnimatePresence initial={false}>
//         {!collapsedSections[title] && (
//           <motion.ul
//             key="content"
//             initial="collapsed"
//             animate="open"
//             exit="collapsed"
//             variants={{
//               open: { opacity: 1, height: "auto" },
//               collapsed: { opacity: 0, height: 0 },
//             }}
//             transition={{ duration: 0.5, ease: "easeInOut" }}
//             className="overflow-hidden"
//           >
//             {sectionTasks.length > 0 ? (
//               sectionTasks.map((task) => (
//                 <TaskList key={task.id} activeTask={task} />
//               ))
//             ) : (
//               <motion.li
//                 className="text-center py-6 text-zinc-400 italic"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 🎉 No tasks completed yet! Keep going 💪
//               </motion.li>
//             )}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   </AnimatePresence>
// ), [collapsedSections, handleMinimize]);
