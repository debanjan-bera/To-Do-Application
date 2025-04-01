import { RxCross1 } from "react-icons/rx";
import { FormDataContext, ToDoContext } from "../../../Contexts/CreateContext";
import { useContext, useState } from "react";
export const AboutModel = ()=>{
  const [isDisable, setDisable] = useState(true);

    const { isShowInfoId, setInfoId, taskArr,filteredData } = useContext(ToDoContext);

    const { isInfoOpen,setInfoOpen} = useContext(FormDataContext);
    const closeModel = ()=>{
        setInfoOpen(false)
        setInfoId(null)
        setDisable(true) /////
    }
    const findTask = isShowInfoId && taskArr.find((task)=> task.id === isShowInfoId) || filteredData.find((task)=> task.id === isShowInfoId)
    const {content, checked, createdDateForform, description,group} = findTask || ''
    const isPending = !checked? 'Pending' : 'Completed'
    // const isPendingColor = !checked? 'bg-yellow-700/30 text-yellow-200' : 'bg-[#05281480] text-[#17c964] border border-[#095028]'
    const isPendingColor = !checked
  ? 'bg-yellow-400/30 text-yellow-200'
  : 'bg-[hsl(146,78%,9%,0.5)]/80 text-[hsl(146,79%,44%,1)] border border-[hsl(150,60%,20%)]';

    return(
        <>
            {isInfoOpen && isShowInfoId && <div className="w-full h-full bg-neutral-950 absolute top-0 left-0 text-white grid grid-cols-1 grid-rows-[8%_70%_22%]">
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
                    <p className="m-2 mb-4 p-2 text-xl bg-[#1A1A1A] border border-neutral-600 rounded ">{group||'group'}</p>
                </div>
                <div className="m-2  py-3 text-xl border-y grid grid-cols-[30%_10%_60%] grid-rows-2 gap-y-2">
                    <p className="">Priority</p>
                    <span>:</span>
                    <div className="flex items-center gap-2 ">
                        <p className="p-1 px-2 rounded border backdrop-blur-3xl border-pink-900 text-red-500 bg-[hsl(340,84.91%,10.39%)]/50 text-lg">High</p>
                    </div>
                    <p className="">Status</p>
                    <span>:</span>
                    <span className="flex items-center gap-2 ">
                        <p className={`p-1 px-2 rounded backdrop-blur-3xl ${isPendingColor} text-lg`}>{isPending}</p>
                    </span>
                    <p className="">Created</p>
                    <span>:</span>
                    <p>{createdDateForform}</p>
                </div>

                <div>
                    <p className="m-2 py-2 text-xl">Description</p>
                    <p className="m-2 p-2 text-xl bg-[#1A1A1A] border border-neutral-600 rounded ">{description||'Decription'}</p>
                </div>
                </section>
                
                
                <div className="w-full h-full flex justify-end items-end">
                    <button disabled={isDisable} onClick={()=>console.log('hello')} className="my-3 mx-2 bg-blue-700 p-2 px-3 rounded font-bold hover:bg-blue-600">Save Changes</button>
                </div>
            </div>}
        </>
    )
}