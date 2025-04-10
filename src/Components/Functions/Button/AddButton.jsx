import PropTypes from 'prop-types';
import './checkBox.css'
import { useContext } from 'react';
import { DateContext, ToDoContext } from '../../../Contexts/CreateContext';
import { LuPencilLine } from "react-icons/lu";
import { useLocation } from 'react-router-dom';
export const MobileAddTaskButton =({addTask,navigateFunction = ()=>{}})=>{
  const {mobileAddButton,setmobileAddButton} = useContext(ToDoContext)
    const {todayDate} = useContext(DateContext)
  const handleAddTaskWindow = (event)=>{
    setmobileAddButton(event.target.checked);
    addTask()
  }
  const location = useLocation(); // Get current route
  const isCalendar = location.pathname === "/calendar"; // Check if it's the login page // Check if it's the login page

    return(
      <div className="wrapper h-[55px] w-[55px] absolute bottom-16 right-5 cursor-pointer" >
          <input type="checkbox" id="toogle" checked={mobileAddButton} className={`trigger ${mobileAddButton? 'hidden-trigger':''} hidden`} onChange={handleAddTaskWindow}/>
          <label htmlFor="toogle" className="circle h-full text-2xl aspect-square relative p-0 m-auto rounded-full flex items-center justify-center">
            <LuPencilLine />
          </label>
          {isCalendar&&<div className=' h-[55px] w-[55px] text-2xl font-bold rounded-full absolute top-0 left-[-4rem] bg-blue-700 flex items-center justify-center'
          onClick={()=>navigateFunction()}
          >{todayDate.getDate()}</div>}
      </div>
    )
}
MobileAddTaskButton.propTypes = {
  addTask: PropTypes.func.isRequired,
  navigateFunction: PropTypes.func,
};