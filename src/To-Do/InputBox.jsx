import { useState } from "react";
import PropTypes from 'prop-types'
import { genaratedUniqueId } from "../Backend/LocalStorage";

export const AddTaskForm = ({taskdata, primaryArr,setWindowClose})=>{
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
        const ifTododMatchedId = taskdata.find((currentTask) => currentTask.id === id)
        const ifTododMatchedContent = taskdata.find((currentTask) => currentTask.content === content)
        if (ifTododMatchedId && ifTododMatchedContent) return;
        primaryArr((prevTask) => [...prevTask,{id,content,groupName,description,favourite,checked}]);
        setInputValue({id:'',content:'',groupName:'',description:'',favourite:false,checked:false});
        setWindowClose(false)
      };

      const handleFormCancel = ()=>{
          setInputValue({id:'',content:'',groupName:'',description:'',favourite:false,checked:false});
          setWindowClose(false)
      }
    return(
    <section className={`w-lvw h-lvh absolute top-0 left-0 bg-red-200/50 z-10  flex items-center justify-center `}>
        <form action="" className=" bg-blue-100 p-4 rounded-md " onSubmit={(e)=>handleFromSubmit(e)}>
            <label htmlFor=""><h1 className="text-3xl font-bold">Create new task.....</h1></label>
            <label htmlFor="">
                <p className="text-xl font-bold py-2">Task:</p>
                <input type="text" placeholder="Add your importent Task..." className="w-[22rem] p-[0.5rem] outline-none text-xl rounded" autoComplete="off" name="content" value={content} onChange={(event) => handleFromInput(event)}/>
            </label>
            <label htmlFor="">
                <p className="text-xl font-bold py-2">Group:</p>
                <input type="text" placeholder="Add your importent description for Task..." className="w-[22rem] p-[0.5rem] text-lg rounded" autoComplete="off" name="groupName" value={groupName} onChange={(event) => handleFromInput(event)}/>
            </label>
            <label htmlFor="">
                <p className="text-xl font-bold py-2">Description:</p>
                <input type="text" placeholder="Add your importent description for Task..." className="w-[22rem] p-[0.5rem] text-lg rounded" autoComplete="off" name='description' value={description} onChange={(event) => handleFromInput(event)}/>
            </label>
            <div className="mt-4 flex justify-end">
                <button  type="button"className="w-24 h-10 my-2 mr-2 bg-white border-2 border-black text-lg font-semibold" onClick={()=> handleFormCancel()}>Cancel</button >
                <button type="submit" className="w-24 h-10 bg-black my-2 text-white text-lg font-semibold hover:bg-white border-black border-2 hover:text-black" >Save</button>
            </div>
        </form>
    </section>)
}
AddTaskForm.propTypes={
  taskdata: PropTypes.array.isRequired,
  primaryArr: PropTypes.func.isRequired,
  setWindowClose: PropTypes.func.isRequired,
}