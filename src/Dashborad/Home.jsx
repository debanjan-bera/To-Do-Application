import { useContext, useEffect } from "react";
import { ToDoContext } from "../Contexts/CreateContext";
import { motion } from "framer-motion";
import { setLocalStorage } from "../Backend/LocalStorage";
import { IoStar, IoStarOutline } from "react-icons/io5";

export const TaskReSection = () => {
  const { taskArr, setTaskArr,filteredData } = useContext(ToDoContext);

  const handleCheckTask = (e,id) => {
    const isChecked = e.target.checked
    console.log(isChecked);
    const updatedTask = taskArr.map((curTasks) =>
      curTasks.id === id ? { ...curTasks, checked:  isChecked} : curTasks
    );
    setTaskArr(updatedTask)
    console.log(updatedTask);
  };
  const handleToggelImp = (id)=>{
    const updatedTasks = taskArr.map((task) =>
      task.id === id ? { ...task, favourite: !task.favourite } : task
    );
    setTaskArr(updatedTasks);
  }


  // const sortedData = [...taskArr].sort((a, b) => {
  //   // Step 1: Sort by status (Pending first, Completed later)
  //   if (a.status === "Pending" && b.status === "Completed") return -1;
  //   if (a.status === "Completed" && b.status === "Pending") return 1;

  //   // Step 2: If same status, sort by createdDateForform (newest first)
  //   const dateA = new Date(a.createdDateForform);
  //   const dateB = new Date(b.createdDateForform);
  //   if (dateA > dateB) return -1;
  //   if (dateA < dateB) return 1;

  //   return 0; // otherwise keep same
  // });
  useEffect(() => {
    setLocalStorage(taskArr, filteredData);
  }, [taskArr, filteredData]);
  
  // const deleteItem = (item)=>{
  //   console.log(item);
  //  setItems((items)=> items.filter((items)=> items !== item)) 
  // }
  
  return (
    <>
    <motion.ul
      className="flex flex-col gap-3 rounded-md p-3"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.09, // delay between list items
          },
        },
      }}
    >
      {taskArr.map((task) => {
        const {
          id,
          content,
          checked,
          priority,
          group,
          favourite,
          createdDateForform,
        } = task;
        return (
          <motion.li
            key={id}
            className="w-full flex flex-row justify-between gap-4 border bg-neutral-900 border-zinc-700 py-2 px-3 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 ,color: "#ffffff" }}
            // exit={{ opacity: 0, y: 50, scale: 0.9 ,color: "#7f1d1d"}}
            exit={{
              opacity: 0,
              x: 100,
              color: "#7f1d1d", // Red color when exiting
              transition: {
                delay: 0.3, // 🕒 Delay only on EXIT color change
                duration: 0.6, // Normal exit speed for color change
              }
            }}
            variants={{
              hidden: { opacity: 0, y: -20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 10,
            }}
          >
            <label className="h-full flex flex-col justify-center">
              <input
              id={task.id}
                type="checkbox"
                checked={checked}
                value={checked}
                onChange={(e) => handleCheckTask(e,id)}
                className={`w-4 h-4 rounded-md accent-green-500
  `}
              />
            </label>
            <div className="flex flex-col w-full">
              <p
                className={`text-lg font-bold transition-colors duration-300 ${
                  checked ? "text-green-400" : "text-white"
                }`}
              >
                {content}
              </p>
              <div className="w-full flex flex-row flex-wrap gap-4 text-sm text-neutral-500">
                <p>Created: {createdDateForform}</p>
                <p>Group: {group}</p>
                <p>Priority: {priority}</p>
                <p>{`${checked}`}</p>
              </div>
            </div>
            <div>
              <span>*</span>
              <span>:</span>
            </div>
                      <div id={id} className="flex flex-row items-center"
                      onClick={()=>{handleToggelImp(id)}}
                      >{!favourite ? (
                        <span className={`text-xl text-neutral-600 p-2 hover:bg-zinc-600/20 rounded-full aspect-square`}>
                          <IoStarOutline />
                        </span>
                      ) : (
                        <span className="text-xl text-yellow-500 p-2 hover:bg-zinc-600/20 rounded-full aspect-square ">
                          <IoStar />
                        </span>
                      )}
            
                      {/* Three-dot Button */}
                      </div>
          </motion.li>
        );
      })}
    </motion.ul>

    </>
  );
};
