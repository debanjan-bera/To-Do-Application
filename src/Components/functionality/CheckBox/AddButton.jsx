import PropTypes from 'prop-types';
import './checkBox.css'
import { useContext } from 'react';
import { ToDoContext } from '../../../Contexts/CreateContext';
export const MobileAddTaskButton =({addTask})=>{
  const {mobileAddButton,setmobileAddButton} = useContext(ToDoContext)
  const handleAddTaskWindow = (event)=>{
    setmobileAddButton(event.target.checked);
    addTask()
  }
    return(
      <div className="wrapper h-[60px] w-[60px] absolute bottom-2 right-2" >
          <input type="checkbox" id="toogle" checked={mobileAddButton} className={`trigger ${mobileAddButton? 'hidden-trigger':''} hidden`} onChange={handleAddTaskWindow}/>
          <label htmlFor="toogle" className="circle  h-[60px] w-[60px] relative p-0 m-auto block rounded-full text-center">
            <svg className="absolute top-[50%] left-2/4 ml-[-16px] mt-[-16px] w-[32px] h-[32px] svg" width={48} height={48} xmlSpace="preserve"       version="1.1" viewBox="0 0 48 48">
              <image width={48} height={48} xlinkHref="data:image/png;base64,     iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAbElEQVR4Ae3XwQnFQAiE4eVVsGAP1mkPFjwvQvYSWCQYCYGZv4Dv5MGB5ghcIiDQI     +kCftCzNsAR8y5gYu2rwCBAgMBTgEC3rek2yQEtAZoDjso8AyaKexmIDJUZD40AAQIE0gwx449GgMC9/t0b7GTsa7J+AAAAAElFTkSuQmCC"/>
            </svg>
          </label>
      </div>
    )
}
MobileAddTaskButton.propTypes = {
  addTask: PropTypes.func.isRequired,
};