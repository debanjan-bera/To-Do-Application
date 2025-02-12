import { useForm } from "react-hook-form"
import { handleFormCancel, handleFromSubmit } from "../Backend/FormFunctionality"
import { useContext } from "react"
import { ToDoContext } from "../Contexts/CreateContext"
import { motion} from "framer-motion"
import { useDragControls } from "motion/react"
import "./todo.css";

export const AddTaskForm = () =>{
  const {register,formState: { errors },handleSubmit} = useForm({
    defaultValues: {
      group: "",
    },
  })
  const {taskArr, setTaskArr,setWindowClose,setmobileAddButton} = useContext(ToDoContext)
  const controls = useDragControls()
  // const y = useMotionValue(0);
  const onSubmit = (data) =>{
    handleFromSubmit(data,taskArr, setTaskArr,setWindowClose,setmobileAddButton);
  }
  return (
    <section className="register-cont w-lvw h-lvh absolute top-0 left-0 bg-black/70 z-10  flex items-center justify-center ">
      <motion.form className=" bg-neutral-100 p-4 rounded-md " 
      initial={{ opacity: 0, y: 25 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 25 }}
      drag = "y"
      dragControls={controls}
      dragConstraints={{
        top:0,
        bottom:0
      }}
      onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="" className=" mb-2 flex items-center justify-center">
          <div className="w-14 h-2 bg-neutral-400 rounded-full cursor-grab active:cursor-grabbing"></div>
        </label>
        <label htmlFor="">
          <h1 className="text-3xl font-bold">Create new task.....</h1>
        </label>
        <label htmlFor="">
          <p className="text-xl font-bold py-1">Task:</p>
          <input type="text" placeholder="Add your importent Task..." autoFocus
            className="w-[22rem] p-[0.5rem] outline-none text-xl rounded border-[1.5px] border-gray-400"
            autoComplete="off"
            {...register("content", { required: true })}/>
          <p className="h-6 text-base text-red-600">
            {errors.content && <span>This field is required</span>}
          </p>
        </label>
        <label htmlFor="">
          <p className="text-xl font-bold py-1">Group:</p>
          <select
            {...register("group")}
            placeholder="Select One Option"
            className="w-[22rem] p-[0.5rem] text-lg rounded outline-none border-[1.5px] border-gray-400">
            <option value="reading">Reading</option>
            <option value="gaming">Gaming</option>
            <option value="traveling">Traveling</option>
            <option value="music">Music</option>
            <option value="music">College</option>
            <option value="music">Others</option>
          </select>
          <p className="h-6 text-base text-red-600"></p>
        </label>
        <label htmlFor="">
          <p className="text-xl font-bold py-1">Description:</p>
          <textarea type="text" placeholder="Add your importent description for Task..." rows="5" required=""
            className="w-full p-[0.5rem] text-lg rounded outline-none border-[1.5px] border-gray-400"
            autoComplete="off"
            {...register("description")}/>
          <p className="h-6 text-base text-red-600">
            {errors.description && <span>This field is required</span>}
          </p>
        </label>
        <div className="mt-4 flex justify-end cursor-pointer">
          <button
            type="button"
            className="w-24 h-10 my-2 mr-2 bg-white border-2 border-black text-lg font-semibold"
            onClick={() => handleFormCancel(setWindowClose, setmobileAddButton)}> Cancel
          </button>
          <button
            type="submit"
            className="button-submit w-24 h-10 bg-black my-2 text-white text-lg font-semibold border-2 border-black cursor-pointer"> Save
          </button>
        </div>
      </motion.form>
    </section>
  );
}