import { useContext } from "react";
import { FormDataContext, ToDoContext } from "../../Contexts/CreateContext";
import { BiFilterAlt } from "react-icons/bi";
import useResponsive from "../../Hooks/UseResponsive";

const TaskCategory = () => {
  const isMobile = useResponsive(670);
  const {
    taskArr,
  } = useContext(ToDoContext);
  const { groupData } = useContext(FormDataContext);
  
  return (
    <div className="w-full px-6 flex gap-4 flex-row items-center ">
      {!isMobile && (
        <div className="bg-white text-black p-2 rounded-lg font-semibold">
          Category
        </div>
      )}
      <div className="w-full flex flex-row items-center overflow-x-auto custom-scroll">
        <p className="mx-2 p-1 px-3 border-2 border-zinc-700 bg-zinc-900 rounded flex gap-1">
          All <span>{`(${taskArr.length})`}</span>
        </p>
        {groupData.map((ele) => (
          <p
            key={ele}
            id={ele}
            className="mx-2 p-1 px-2 border border-zinc-700 bg-zinc-900 rounded"
          >
            {ele}
          </p>
        ))}
      </div>
      <div className="bg-white relative text-black p-2 rounded-lg font-semibold flex gap-1 flex-row items-center">
        Filter{" "}
        <span className="text-xl">
          <BiFilterAlt />
        </span>{" "}
        <span className="hidden px-2 py-1 text-xs text-white absolute top-[-1rem] right-[-0.4rem] bg-blue-600 rounded-full aspect-square text-center">
          1
        </span>
      </div>
    </div>
  );
};


export default TaskCategory