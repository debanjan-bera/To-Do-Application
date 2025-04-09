import { AiOutlineSetting } from "react-icons/ai"
import { GrHomeRounded } from "react-icons/gr"
import { LuCalendarDays } from "react-icons/lu"
import { MdOutlineAddTask } from "react-icons/md"
import { NavLink } from "react-router-dom"

export const Footer = ()=>{
    return(
        <section
        className="w-full h-full bg-zinc-800 border border-zinc-700 col-start-1 col-end-2 row-start-3 row-end-4
    flex items-center justify-around text-3xl text-white font-extrabold
    "
      >
        <NavLink to="/" className={({isActive})=>(isActive? 'text-white' : 'text-zinc-600')}>
          <GrHomeRounded />
          
        </NavLink>
        <NavLink to="/calendar" className={({isActive})=>(isActive? 'text-white' : 'text-zinc-600')}>
          <LuCalendarDays />
        </NavLink>
        <NavLink to="/completedTask" className={({isActive})=>(isActive? 'text-white' : 'text-zinc-600')}>
          <MdOutlineAddTask />
        </NavLink>
        <NavLink to="/login" className={({isActive})=>(isActive? 'text-white' : 'text-zinc-600')}>
          <AiOutlineSetting />
        </NavLink>
      </section>
    )
}