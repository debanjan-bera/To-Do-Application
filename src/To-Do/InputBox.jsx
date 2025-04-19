import { useState, useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {handleFormCancel,handleFromSubmit} from "../Backend/FormFunctionality";
import { DateContext, FormDataContext, ToDoContext } from "../Contexts/CreateContext";
import { motion } from "framer-motion";
import { useDragControls } from "framer-motion";
import "./todo.css";

export const AddTaskForm = () => {
  const modalRef = useRef(null);
  const { taskArr, setTaskArr, setWindowClose, setmobileAddButton,isEditTask,setTaskEdit} = useContext(ToDoContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset
  } = useForm({ defaultValues: isEditTask || {content: "", group: "", priority: "" , description: ""} });

  const {createdDate} = useContext(DateContext)
  const { groupData } = useContext(FormDataContext);
  const controls = useDragControls();

  // State for selected group and custom group input
  const [selectedGroup, setSelectedGroup] = useState("");
  const [customGroup, setCustomGroup] = useState("");
  const selectedPriority = watch('priority');

  const priorities = [
    {
      value: 'High',
      className:
        'text-red-700 bg-red-400/30 border-red-800 hover:bg-red-500/40 hover:text-red-900',
    },
    {
      value: 'Moderate',
      className:
        'text-yellow-700 bg-yellow-400/30 border-yellow-600 hover:bg-yellow-500/40 hover:text-yellow-900',
    },
    {
      value: 'Low',
      className:
        'text-green-800 bg-green-400/30 border-green-700 hover:bg-green-500/40 hover:text-green-900',
    },
  ];
  
  const onSubmit = (data) => {
    const finalData = {
      ...data,
      group: selectedGroup === "Others" ? customGroup : selectedGroup,
      createdDateForform: isEditTask?.createdDateForform || createdDate,
      favourite: isEditTask?.favourite || false,
      checked: isEditTask?.checked || false,
      status: isEditTask?.status || 'Pending',
    };
    
    if(isEditTask){
      const updatedTask = taskArr.map((curTask)=> curTask.id === isEditTask.id? {...finalData,id:isEditTask.id} : curTask)
      setTaskArr(updatedTask)
    }
    else handleFromSubmit( finalData, taskArr, setTaskArr);

    setWindowClose(false);
    setmobileAddButton(false);
  };
  useEffect(() => {
    if (isEditTask) {
      reset({
        content: isEditTask.content,
        description: isEditTask.description,
        priority: isEditTask.priority,
      });
      setSelectedGroup(isEditTask.group === "Others" ? "Others" : isEditTask.group);
      setCustomGroup(isEditTask.group === "Others" ? isEditTask.group : "");
    }
  }, [isEditTask, reset]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setWindowClose(false);
        setmobileAddButton(false)
        setTaskEdit(null)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setWindowClose,setmobileAddButton,setTaskEdit]);

  return (
    <section className="register-cont w-lvw h-dvh absolute top-0 left-0 bg-black/70 z-10 text-black flex items-center justify-center">
      <motion.form
        ref={modalRef} className="bg-neutral-100 p-4 rounded-md"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}exit={{ opacity: 0, y: 25 }} 
        drag="y" dragControls={controls} dragConstraints={{ top: 0, bottom: 0 }}
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
        {selectedGroup !== "Others" && (
          <label>
            <p className="text-xl font-bold py-1">Group:</p>
            <select
              {...register("group")}
              className="w-full p-[0.5rem] text-lg rounded outline-none border-[1.5px] border-gray-400"
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              {groupData.map((e, index) => (
                <option key={index} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </label>
        )}
        {selectedGroup === "Others" && (
          <label>
            <p className="text-xl font-bold py-1">Custom Group Name:</p>
            <input
              type="text"
              placeholder="Enter custom group name..."
              className="w-[22rem] p-[0.5rem] outline-none text-xl rounded border-[1.5px] border-gray-400"
              value={customGroup}
              onChange={(e) => {
                setCustomGroup(e.target.value)
                
              }}
            />
          </label>
        )}
        <div className="flex items-center my-4 gap-2">
          <label className="text-xl font-bold">Priority: </label>
          <div>
            {priorities.map((priority) => (
              <label
                key={priority.value}
                style={{
                  marginRight: '10px',
                  display: 'inline-block',
                }}
              >
                <input
                  type="radio"
                  value={priority.value}
                  {...register('priority', { required: true })}
                  className="hidden"
                />
                {/* color: selectedPriority === priority ? 'red' : 'black', */}
                <p className={`text-lg font-bold py-1 px-3 border backdrop-blur-lg  ${selectedPriority === priority.value ? priority.className : 'bg-[#dff7ff]  border-[#0349b4] text-[#023b95] hover:bg-[#0349b4] hover:text-white'}
                rounded-full
                 transition-colors`}>{priority.value}</p>
                
              </label>
            ))}
          </div>

        </div>

        <label>
          <p className="text-xl font-bold py-1">Description:</p>
          <textarea
            placeholder="Add your important description for the task..."
            className="w-full p-[0.5rem] text-lg rounded outline-none border-[1.5px] border-gray-400 field-sizing-content overscroll-none"
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
            onClick={() => handleFormCancel(setWindowClose, setmobileAddButton,setTaskEdit)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="button-submit w-24 h-10 bg-black my-2 text-white text-lg font-semibold border-2 border-black cursor-pointer"
          >
            {isEditTask? 'Edit' : 'Save'}
          </button>
        </div>
      </motion.form>
    </section>
  );
};
