import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'
import './SideBar.css'
export const SideBar = ({setSideBar})=>{
  const openSideBar=()=>{
    setSideBar((SideBarComponent)=> !SideBarComponent)
  }
  return (
    <>
      <aside className={`sideBar bg-[#07060D] text-white border-r-[0.02rem] border-neutral-700 col-start-1 row-start-1 row-end-5`}>
        <label className={`hamburger cursor-pointer `}>
          <input type="checkbox" className="hidden" onClick={() => openSideBar()}/>
          <svg viewBox="0 0 32 32" className="h-[3em]">
            <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
            <path className="line" d="M7 16 27 16"></path>
          </svg>
        </label>
        <NavLink to="/"><h1>Home</h1></NavLink>
        <NavLink to="/completedTask"><h1>Completed Task</h1></NavLink>

        {/* <NavLink to="/calendar"><h1>Login</h1></NavLink> */}
      </aside>
    </>
  );
}
SideBar.propTypes={
  setSideBar: PropTypes.func,
}