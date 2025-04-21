import { NavLink } from "react-router-dom";
// import PropTypes from "prop-types";
import "./SideBar.css";
import { memo } from "react";
 const SideBar = () => {
  return (
    <>
      <aside
        className={`hidden md:grid grid-cols-1 grid-rows-[auto_1fr] justify-center gap-4 py-4  row-span-3 backdrop-blur-md shadow-inner`}
      >
        <div className="">
          {" "}
          <p className="text-3xl italic font-bold">Taskly</p>
        </div>
        <div className="w-full border">
          {" "}
          <NavLink to="/">
            <h1>Home</h1>
          </NavLink>
          <NavLink to="/todo">
            <h1>Todo Tasks</h1>
          </NavLink>
          <NavLink to="/completedTask">
            <h1>Completed Task</h1>
          </NavLink>
        </div>
      </aside>
    </>
  );
};


export default memo(SideBar)