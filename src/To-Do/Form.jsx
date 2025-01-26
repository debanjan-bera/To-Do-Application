import { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { genaratedUniqueId } from "../Backend/LocalStorage";
import "./todo.css";
import { ToDoContext } from "../Contexts/CreateContext";
export const AddaskForm = ()=>{
    const {taskArr,setTaskArr,setWindowClose,setOk} = useContext(ToDoContext)
  
      const [inputValue, setInputValue] = useState({id:'',content:'',groupName:'',description:'',favourite:false,checked:false}); 
      const {id,content,groupName,description,favourite,checked} = inputValue
      const taskId = genaratedUniqueId()

      const handleFromInput = (event) => {
        const { name, value } = event.target;
        name === 'content' ? setInputValue((prevData) => ({ ...prevData, [name]: value,id:taskId })): 
        setInputValue((prevData) => ({ ...prevData, [name]: value }));
      };
      const handleFromSubmit = (e) => {
        e.preventDefault();
        if (!content) return;
        const ifTododMatchedId = taskArr.find((currentTask) => currentTask.id === id)
        const ifTododMatchedContent = taskArr.find((currentTask) => currentTask.content === content)
        if (ifTododMatchedId && ifTododMatchedContent) return;
        setTaskArr((prevTask) => [...prevTask,{id,content,groupName,description,favourite,checked}]);
        setInputValue({id:'',content:'',groupName:'',description:'',favourite:false,checked:false});
        setOk(false)
        setWindowClose(false)
      };
      const handleFormCancel = ()=>{
          setInputValue({id:'',content:'',groupName:'',description:'',favourite:false,checked:false});
          setWindowClose(()=>false)
          setOk(false)
      }
      useEffect(() => {
        if (content || groupName || description) setOk(true);
        else setOk(false);
      }, [content, groupName, description,setOk]);
      
    return(
    <section className={` register-cont w-lvw h-lvh absolute top-0 left-0 bg-red-200/50 z-10  flex items-center justify-center `}>
        <form action="" className=" bg-white p-4 rounded-md " onSubmit={(e)=>handleFromSubmit(e)}>
            <label htmlFor="" className="flex items-center justify-center">
                <div className="w-[6rem] h-1 bg-gray-300 rounded-lg mb-2"></div>
            </label>
            <label htmlFor=""><h1 className="text-3xl font-bold">Create new task.....</h1></label>
            <label htmlFor="">
                <p className="text-xl font-bold py-2">Task:</p>
                <input type="text" placeholder="Add your importent Task..." className="w-[22rem] p-[0.5rem] outline-none text-xl rounded border-[1.5px] border-gray-400" autoComplete="off" name="content" value={content} onChange={(event) => handleFromInput(event)}/>
            </label>
            <label htmlFor="">
                <p className="text-xl font-bold py-2">Group:</p>
                <input type="text" placeholder="Add your importent description for Task..." className="w-[22rem] p-[0.5rem] text-lg rounded outline-none border-[1.5px] border-gray-400" autoComplete="off" name="groupName" value={groupName} onChange={(event) => handleFromInput(event)}/>
            </label>
            <label htmlFor="">
                <p className="text-xl font-bold py-2">Description:</p>
                <textarea type="text" placeholder="Add your importent description for Task..." rows="5" required="" className="w-full p-[0.5rem] text-lg rounded outline-none border-[1.5px] border-gray-400" autoComplete="off" name='description' value={description} onChange={(event) => handleFromInput(event)}/>
            </label>
            <div className="mt-4 flex justify-end cursor-pointer">
                <button  type="button"className="w-24 h-10 my-2 mr-2 bg-white border-2 border-black text-lg font-semibold" onClick={()=> handleFormCancel()}>Cancel</button >
                <button type="submit" className="button-submit w-24 h-10 bg-black my-2 text-white text-lg font-semibold border-2 border-black cursor-pointer" >Save</button>
            </div>
        </form>
        {/* <input {...register("example")} /> */}

{/* include validation with required or other standard HTML validation rules */}
{/* <input {...register("description", { required: true })} /> */}
{/* errors will return when field validation fails  */}
{/* {errors.exampleRequired && <span>This field is required</span>} */}
    </section>)
}
AddaskForm.propTypes={
  taskdata: PropTypes.array.isRequired,
  primaryArr: PropTypes.func.isRequired,
  setWindowClose: PropTypes.func.isRequired,
  setOk:PropTypes.func.isRequired,
}