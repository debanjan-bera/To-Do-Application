import { RxCross1 } from "react-icons/rx";
import { FormDataContext, ToDoContext } from "../../../Contexts/CreateContext";
import { useContext } from "react";
export const AboutModel = ()=>{
    const { isShowInfoId, setInfoId, taskArr } = useContext(ToDoContext);
    const { isInfoOpen,setInfoOpen} = useContext(FormDataContext);
    const closeModel = ()=>{
        setInfoOpen(false)
        setInfoId(null)
    }
    const findTask = isShowInfoId && taskArr.find((task)=> task.id === isShowInfoId)
    const {content, checked, createdDateForform, description,group} = findTask || ''
    
    return(
        <>
            {isInfoOpen && isShowInfoId && <div className="w-full h-full bg-[#010101] absolute top-0 left-0 text-white grid grid-cols-1 grid-rows-[8%_70%_22%]">
                <div className="m-2  flex justify-between items-center ">
                    <p className="pb-1 text-3xl border-b">About</p>
                    <button onClick={()=> closeModel()} className="p-2 text-2xl rounded-full hover:text-white/80 hover:bg-neutral-700"><RxCross1 /></button>
                
                </div>
                <section>
                <div>
                    <p className="m-2 py-2 text-xl">Task</p>
                    <p className="m-2 p-2 text-xl bg-[#1A1A1A] border border-neutral-600 rounded ">{content}</p>
                </div>
                <div>
                    <p className="m-2 py-2 text-xl">Category</p>
                    <p className="m-2 mb-4 p-2 text-xl bg-[#1A1A1A] border border-neutral-600 rounded ">{group}</p>
                </div>
                <div className="m-2  py-3 text-xl border-y grid grid-cols-[30%_10%_60%] grid-rows-2 gap-y-2">
                    <p className="">Priority</p>
                    <span>:</span>
                    <div className="flex items-center gap-2 ">
                        <p className="p-1 px-2 rounded border border-red-500/20 text-red-400 bg-red-800/20 text-lg">High</p>
                    </div>
                    <p className="">Status</p>
                    <span>:</span>
                    <span className="flex items-center gap-2 ">
                        <p className="p-1 px-2 rounded bg-yellow-700/30 text-yellow-200 text-lg ">{!checked? 'Pending' : 'Completed'}</p>
                    </span>
                    <p className="">Created</p>
                    <span>:</span>
                    <p>{createdDateForform}</p>
                </div>

                <div>
                    <p className="m-2 py-2 text-xl">Description</p>
                    <p className="m-2 p-2 text-xl bg-[#1A1A1A] border border-neutral-600 rounded ">{description}</p>
                </div>
                </section>
                
                
                <div className="w-full h-full flex justify-end items-end">
                    <button onClick={()=>console.log(findTask)} className="my-3 mx-2 bg-blue-700 p-2 px-3 rounded font-bold hover:bg-blue-600">Save Changes</button>
                </div>
            </div>}
        </>
    )
}