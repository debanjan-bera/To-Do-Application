import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DataProvider } from "../Contexts/DataWhereHouse";
import { DateAndTime } from "../Components/Functions/Date";
import { UserFormData } from "../Contexts/AddititonalData";
// import { SideBar } from "../Components/layout/SideBar/TodoSidebar";
import { MCalendarComponent } from "../Components/layout/Calendar/MobileCalendar";
import { AboutModel } from "../Components/Functions/Models/TaskAboutModel";
import "../App.css";
import useIsMobile from "../Components/Functions/UseIsMobile";
import { SideBar } from "../Components/layout/SideBar/TodoSidebar";
export const DashBoard = () => {
  const [isSideBar, setSideBar] = useState(false);
  const location = useLocation(); // Get current route
  const isLoginPage = location.pathname === "/login"; // Check if it's the login page
  const sideBarClass = isSideBar ? "isSideBarDashBoard" : "dashboard";
  const isMobile = useIsMobile(570);
  const isTablet = useIsMobile(930)
  if (isLoginPage) return <Outlet />;

  return (
    // <DataProvider>
    //       <section
    //         className={`h-dvh w-lvw relative bg-[#0B0D0E] grid ${sideBarClass} grid-rows-[0.3fr_0.3fr_3fr]`}>
    //         <header className="head row-start-1 row-end-2 col-start-2 col-end-4 p-4 py-2 border-b-[0.02rem] border-neutral-700">
    //           <div className="text-2xl font-medium text-white flex flex-row items-center justify-start gap-3">
    //             <DateAndTime />
    //           </div>
    //           <p className="text-zinc-400">
    //             {"Let's see what we've got to do today."}
    //           </p>
    //         </header>
    //         <UserFormData>
    //           <SideBar setSideBar={setSideBar} />
    //           <main
    //             className="col-start-2 col-end-3 row-start-2 row-end-5 grid grid-cols[1fr] grid-rows-[0.2fr_3fr] rounded-t-xl bg-[#000000]"
    //             style={{
    //               backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='50' height='50' fill='none' stroke-width='1' stroke='%239fa6ad29' %3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
    //             }}
    //           >
    //             
    //           </main>
    //           <aside className="calender bg-[#121212] relative border-l-[0.02rem] border-neutral-700 row-start-2 row-end-5 col-start-3 flex flex-col items-center">
    //             <MCalendarComponent />
    //             <AboutModel />
    //           </aside>
    //         </UserFormData>
    //       </section>

    // </DataProvider>
    <DataProvider>
        <UserFormData>
            <section className={`h-lvh w-lvw bg-[#0B0D0E] grid ${isMobile? 'grid-cols-1': isTablet? 'grid-cols-[12rem_3fr]':'grid-cols-[12rem_3fr_20rem]'} grid-rows-[0.35fr_3fr_0.2fr]`}>
                <section className={`w-full px-4 border-b-[0.02rem]  border-neutral-700 ${isMobile? 'col-start-1 col-end-2':'col-start-2 col-end-4 row-start-1 row-end-2'}  text-2xl font-medium text-white flex justify-center flex-col`}>
                    <DateAndTime />
                    <p className="text-base text-zinc-400">
                        {"Let's see what we've got to do today."}
                    </p>
                </section>
                {/* <section className="w-full h-full border bg-[#0E1217] border-zinc-700  col-start-1 col-end-2 row-start-1 row-end-4"> 
                </section>*/}
                {!isMobile&&<SideBar setSideBar={setSideBar} />}
            {/* <section className="w-full h-full bg-[#101010] border  border-zinc-700 col-start-2 col-end-3 row-start-2 row-end-4 rounded-t-md text-white">
                

                </section> */}
            <section className={`w-full h-full bg-[#000000] border  border-zinc-700   ${isMobile ? 'col-start-1 col-end-2 row-start-2 row-end-3 overflow-hidden':' col-start-2 col-end-3 row-start-2 row-end-4'}  text-white `}>
            {/* <DashBoardComponent/>  */}
                <Outlet />
                {/* <TaskManager/> */}
            </section>
            {isMobile&&<section className="w-full h-full bg-red-900 border  border-zinc-700 col-start-1 col-end-2 row-start-3 row-end-4"></section>}
            {!isTablet&&<section className=" w-full h-full bg-[#121212] border relative border-zinc-700  col-start-3 col-end-4 row-start-2 row-end-4 flex flex-col items-center">
                <MCalendarComponent />
                <AboutModel />
            </section>}
        </section>
        </UserFormData>
    </DataProvider>
  );
};
