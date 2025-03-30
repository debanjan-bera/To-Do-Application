import { RxCross1 } from "react-icons/rx";
export const AboutModel = ()=>{
    return(
        <>
            <div className="w-full h-full bg-[#010101] absolute top-0 left-0 text-white">
                <div className="m-2 text-xl flex justify-end"><RxCross1 /></div>
                <div>
                    <p className="m-2 py-2 text-2xl">Task</p>
                    <p className="m-2 p-2 text-xl bg-[#1A1A1A] border border-neutral-600 rounded ">hello</p>
                </div>
                <div>
                    <p className="m-2 py-2 text-2xl">Category</p>
                    <p className="m-2 p-2 text-xl bg-neutral-800 border border-neutral-400 rounded ">Category</p>
                </div>
                <div>
                    <p className="m-2 py-2 text-2xl">Created </p>
                    <p className="m-2 p-2 text-xl bg-neutral-800 border border-neutral-400 rounded ">Category</p>
                </div>
                <div>
                    <p className="m-2 py-2 text-xl">Description</p>
                    <p className="m-2 p-2 text-xl bg-neutral-800 border border-neutral-400 rounded ">hello</p>
                </div>
                
                <div>Edit</div>
            </div>
        </>
    )
}