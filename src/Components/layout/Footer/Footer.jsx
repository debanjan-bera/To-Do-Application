import { AiOutlineSetting } from "react-icons/ai"
import { GrHomeRounded } from "react-icons/gr"
import { LuCalendarDays } from "react-icons/lu"
import { MdOutlineAddTask } from "react-icons/md"
import { NavLink } from "react-router-dom"
import useIsMobile from "../../Functions/UseIsMobile"
import { MobileAddTaskButton } from "../../Functions/Button/AddButton"
import { useContext } from "react"
import { DateContext, ToDoContext } from "../../../Contexts/CreateContext"

export const Footer = ()=>{
  const isMobile = useIsMobile(670);

  const { handleAddTaskWindow,taskArr} = useContext(ToDoContext);
  const { setSelectedDate,setCurrentDate,setTargetDate,setTask,todayDate,todayDateString} = useContext(DateContext)
  const isShowTodayDate = taskArr.filter(
    (task) => task.createdDateForform === todayDateString
  );
  const navigateTodayDate = ()=>{
    setTargetDate(() => ({
      date: todayDate.getDate(),
      month: todayDate.getMonth(),
      year: todayDate.getFullYear(),
    }));
    setSelectedDate(todayDateString);
    setCurrentDate(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
    setTask(isShowTodayDate);
  }
    return(
      <>
        <section
        className="relative w-full h-full bg-zinc-800 border border-zinc-700 col-start-1 col-end-2 row-start-3 row-end-4
    flex items-center justify-around text-3xl text-white font-extrabold
    "
      >
        <NavLink to="/" className={({isActive})=>(isActive? 'text-white ' : 'text-zinc-600')}>
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
      {isMobile&&<MobileAddTaskButton addTask={handleAddTaskWindow} navigateFunction={navigateTodayDate}/>}
      </section>
      
      </>

    )
}