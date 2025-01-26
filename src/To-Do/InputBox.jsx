import { useForm } from "react-hook-form"
import { handleFormCancel } from "../Backend/FormFunctionality"
import { useContext } from "react"
import { ToDoContext } from "../Contexts/CreateContext"

export const AddTaskForm = () =>{
  const {register,handleSubmit
    // formState: { errors },
  } = useForm()
  const {setWindowClose,setOk} = useContext(ToDoContext)
  const onSubmit = (data) =>{
    const{content,group,description} = data
    console.log(content,group,description);
    console.log(data)
  }

  // console.log(watch("example")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <section className={` register-cont w-lvw h-lvh absolute top-0 left-0 bg-red-200/50 z-10  flex items-center justify-center `}>
      <form  className=" bg-white p-4 rounded-md " onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor="" className="flex items-center justify-center">
                <div className="w-[6rem] h-1 bg-gray-300 rounded-lg mb-2"></div>
            </label>
            <label htmlFor=""><h1 className="text-3xl font-bold">Create new task.....</h1></label>
            <label htmlFor="">
                <p className="text-xl font-bold py-2">Task:</p>
                <input type="text" placeholder="Add your importent Task..." className="w-[22rem] p-[0.5rem] outline-none text-xl rounded border-[1.5px] border-gray-400" autoComplete="off" {...register("content")}/>
            </label>
            <label htmlFor="">
                <p className="text-xl font-bold py-2">Group:</p>
                <input type="text" placeholder="Add your importent description for Task..." className="w-[22rem] p-[0.5rem] text-lg rounded outline-none border-[1.5px] border-gray-400" autoComplete="off" {...register("group")}/>
            </label>
            <label htmlFor="">
                <p className="text-xl font-bold py-2">Description:</p>
                <textarea type="text" placeholder="Add your importent description for Task..." rows="5" required="" className="w-full p-[0.5rem] text-lg rounded outline-none border-[1.5px] border-gray-400" autoComplete="off" {...register("description")}/>
            </label>
            <div className="mt-4 flex justify-end cursor-pointer">
                <button  type="button"className="w-24 h-10 my-2 mr-2 bg-white border-2 border-black text-lg font-semibold" onClick={handleFormCancel(setWindowClose, setOk)}>Cancel</button >
                <button type="submit" className="button-submit w-24 h-10 bg-black my-2 text-white text-lg font-semibold border-2 border-black cursor-pointer">Save</button>
            </div>
      </form>
    </section>
  );
}