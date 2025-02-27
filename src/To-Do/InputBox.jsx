import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { handleFormCancel, handleFromSubmit } from "../Backend/FormFunctionality";
import { FormDataContext, ToDoContext } from "../Contexts/CreateContext";
import { motion } from "framer-motion";
import { useDragControls } from "framer-motion";
import "./todo.css";

export const AddTaskForm = () => {
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      group: "",
    },
  });

  const { taskArr, setTaskArr, setWindowClose, setmobileAddButton } = useContext(ToDoContext);
  const { groupData } = useContext(FormDataContext);
  const controls = useDragControls();

  // State for selected group and custom group input
  const [selectedGroup, setSelectedGroup] = useState("");
  const [customGroup, setCustomGroup] = useState("");

  const onSubmit = (data) => {
    // If "Others" is selected, replace group with custom input
    const finalData = { 
      ...data, 
      group: selectedGroup === "Others" ? customGroup : selectedGroup 
    };
    
    handleFromSubmit(finalData, taskArr, setTaskArr, setWindowClose, setmobileAddButton);
  };
  useEffect(() => {
      const handleClickOutside = () => setWindowClose(null);
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, [setWindowClose]);

  return (
    <section className="register-cont w-lvw h-lvh absolute top-0 left-0 bg-black/70 z-10 flex items-center justify-center">
      <motion.form
        className="bg-neutral-100 p-4 rounded-md"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 25 }}
        drag="y"
        dragControls={controls}
        dragConstraints={{ top: 0, bottom: 0 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="mb-2 flex items-center justify-center">
          <div className="w-14 h-2 bg-neutral-400 rounded-full cursor-grab active:cursor-grabbing"></div>
        </label>

        <label>
          <h1 className="text-3xl font-bold">Create new task...</h1>
        </label>

        <label>
          <p className="text-xl font-bold py-1">Task:</p>
          <input
            type="text"
            placeholder="Add your important task..."
            autoFocus
            className="w-[22rem] p-[0.5rem] outline-none text-xl rounded border-[1.5px] border-gray-400"
            autoComplete="off"
            {...register("content", { required: true })}
          />
          <p className="h-6 text-base text-red-600">
            {errors.content && <span>This field is required</span>}
          </p>
        </label>
        {
          selectedGroup !== "Others" && <label>
            <p className="text-xl font-bold py-1">Group:</p>
            <select
              {...register("group")}
              className="w-[22rem] p-[0.5rem] text-lg rounded outline-none border-[1.5px] border-gray-400"
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              {groupData.map((e, index) => (
                <option key={index} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </label>
        }
        {selectedGroup === "Others" && (
          <label>
            <p className="text-xl font-bold py-1">Custom Group Name:</p>
            <input
              type="text"
              placeholder="Enter custom group name..."
              className="w-[22rem] p-[0.5rem] outline-none text-xl rounded border-[1.5px] border-gray-400"
              value={customGroup}
              onChange={(e) => setCustomGroup(e.target.value)}
            />
          </label>
        )}

        <label>
          <p className="text-xl font-bold py-1">Description:</p>
          <textarea
            placeholder="Add your important description for the task..."
            rows="5"
            className="w-full p-[0.5rem] text-lg rounded outline-none border-[1.5px] border-gray-400"
            autoComplete="off"
            {...register("description", { required: true })}
          />
          <p className="h-6 text-base text-red-600">
            {errors.description && <span>This field is required</span>}
          </p>
        </label>

        <div className="mt-4 flex justify-end cursor-pointer">
          <button
            type="button"
            className="w-24 h-10 my-2 mr-2 bg-white border-2 border-black text-lg font-semibold"
            onClick={() => handleFormCancel(setWindowClose, setmobileAddButton)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="button-submit w-24 h-10 bg-black my-2 text-white text-lg font-semibold border-2 border-black cursor-pointer"
          >
            Save
          </button>
        </div>
      </motion.form>
    </section>
  );
};
