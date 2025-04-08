import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { DataProvider } from "../Contexts/DataWhereHouse";
import { DateAndTime } from "../Components/Functions/Date";
import { UserFormData } from "../Contexts/AddititonalData";
// import { SideBar } from "../Components/layout/SideBar/TodoSidebar";
import { GrHomeRounded, GrNotification } from "react-icons/gr";
import { MCalendarComponent } from "../Components/layout/Calendar/MobileCalendar";
import { AboutModel } from "../Components/Functions/Models/TaskAboutModel";
import "../App.css";
import useIsMobile from "../Components/Functions/UseIsMobile";
import { SideBar } from "../Components/layout/SideBar/TodoSidebar";
import { RiAccountCircleLine } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlineAddTask } from "react-icons/md";
export const DashBoard = () => {
  const [isSideBar, setSideBar] = useState(false);
  const location = useLocation(); // Get current route
  const isLoginPage = location.pathname === "/login"; // Check if it's the login page
  const sideBarClass = isSideBar ? "isSideBarDashBoard" : "dashboard";
  const isMobile = useIsMobile(670);
  const isTablet = useIsMobile(930);
  const isCalendarActive = location.pathname === "/calendar";
  if (isLoginPage) return <Outlet />;

  return (
    <DataProvider>
      <UserFormData>
        <section
          className={`h-dvh w-dvw bg-[#0B0D0E] grid ${
            isMobile
              ? "grid-cols-1 "
              : isTablet
              ? "grid-cols-[12rem_3fr]"
              : "grid-cols-[12rem_3fr_20rem]"
          } ${
            isMobile
              ? "grid-rows-[0.28fr_3fr_0.25fr]"
              : "grid-rows-[0.35fr_3fr_0.2fr]"
          } `}
        >
          <section
            className={`w-full px-4 border-b-[0.02rem]  border-neutral-700 ${
              isMobile
                ? "col-start-1 col-end-2"
                : "col-start-2 col-end-4 row-start-1 row-end-2"
            }  text-2xl font-medium text-white flex justify-center flex-row`}
          >
            <div className="w-full flex flex-col justify-center">
              {!isMobile ? (
                <>
                  <DateAndTime />
                  <p className="text-base text-zinc-400">
                    {"Let's see what we've got to do today."}
                  </p>
                </>
              ) : (
                "TaskSavvy"
              )}
            </div>

            <div className="flex justify-end items-center">
              <GrNotification /> <RiAccountCircleLine />
            </div>
          </section>

          {!isMobile && <SideBar setSideBar={setSideBar} />}
          <section
            className={`w-full h-full bg-[#000000] border  border-zinc-700   ${
              isMobile
                ? "col-start-1 col-end-2 row-start-2 row-end-3 overflow-hidden"
                : " col-start-2 col-end-3 row-start-2 row-end-4"
            } ${isCalendarActive&&'flex flex-col items-center'} text-white `}
          >
            <Outlet />
          </section>
          {isMobile && (
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
              <NavLink to="/" className={({isActive})=>(isActive? 'text-white' : 'text-zinc-600')}>
                <AiOutlineSetting />
              </NavLink>
            </section>
          )}
          {!isTablet && (
            <section className=" w-full h-full bg-[#121212] border relative border-zinc-700  col-start-3 col-end-4 row-start-2 row-end-4 flex flex-col items-center">
              <MCalendarComponent /> <AboutModel />
            </section>
          )}
          {(isTablet||isMobile) && <AboutModel />}
        </section>
      </UserFormData>
    </DataProvider>
  );
};
