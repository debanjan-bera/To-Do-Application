import PropTypes from 'prop-types';
import './checkBox.css'
import { useContext } from 'react';
import { ToDoContext } from '../../../Contexts/CreateContext';
import { LuPencilLine } from "react-icons/lu";
export const MobileAddTaskButton =({addTask,navigateFunction = ()=>{}})=>{
  const {mobileAddButton,setmobileAddButton} = useContext(ToDoContext)
  const handleAddTaskWindow = (event)=>{
    setmobileAddButton(event.target.checked);
    addTask()
  }
    return(
      <div className="wrapper h-[55px] w-[55px] absolute bottom-16 right-5 cursor-pointer" >
          <input type="checkbox" id="toogle" checked={mobileAddButton} className={`trigger ${mobileAddButton? 'hidden-trigger':''} hidden`} onChange={handleAddTaskWindow}/>
          <label htmlFor="toogle" className="circle h-full text-2xl aspect-square relative p-0 m-auto rounded-full flex items-center justify-center">
            <LuPencilLine />
          </label>
          <div className=' h-[55px] w-[55px] text-2xl font-bold rounded-full absolute top-0 left-[-4rem] bg-blue-700 flex items-center justify-center'
          onClick={()=>navigateFunction()}
          >6</div>
      </div>
    )
}
MobileAddTaskButton.propTypes = {
  addTask: PropTypes.func.isRequired,
  navigateFunction: PropTypes.func,
};