import { GrNotification } from "react-icons/gr";
import { RiAccountCircleLine } from "react-icons/ri";


const Home = ()=>{
  return(
    <>
    <header
      className={`h-auto  flex items-start justify-between  p-3`}
    >
      <div className="w-full flex flex-col justify-center">
        <h1 className="text-5xl font-normal text-pretty">HI, Debanjan</h1>
      </div>
      <div
        className={` w-full h-full flex justify-end items-center gap-2 text-xl font-extrabold`}
      >
        <span className="p-2 border  border-zinc-700 rounded-md aspect-square relative transition-all hover:bg-neutral-500/20">
          <GrNotification />
          <span
            className="p-[4px] rounded-full aspect-square absolute top-2 right-2 bg-green-500"
          
          ></span>
        </span>
        <RiAccountCircleLine />
      </div>
    </header>
    <main className="w-full h-full">
      <section className="w-full h-[16rem] bg-white/5 border border-neutral-700 rounded grid grid-cols-2 grid-rows-2 md:w-[22rem] gap-2 p-2">
        <div className="w-full h-full bg-red-600 ">Total Tasks</div>
        <div className="w-full h-full bg-green-500 ">Pendings</div>
        <div className="w-full h-full bg-sky-600 ">Completed Tasks</div>
        <div className="w-full h-full bg-yellow-600 ">Due Tasks</div>
      </section>
    </main>
    </>
  )
 }

export default Home;
