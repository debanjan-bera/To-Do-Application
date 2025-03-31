import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { SideBar } from "./Components/layout/SideBar/TodoSidebar";
import { CalenderComponent } from "./Components/layout/Calender/Calender";
import { useState } from "react";
import { DataProvider } from "./Contexts/DataWhereHouse";
import { DateAndTime } from "./Components/Functions/Date";
import { UserFormData } from "./Contexts/AddititonalData";
import { AboutModel } from "./Components/Functions/Models/TaskAboutModel";

export const AppLayout = () => {
  const [isSideBar, setSideBar] = useState(false);
  const location = useLocation(); // Get current route
  const isLoginPage = location.pathname === "/login"; // Check if it's the login page
  const sideBarClass = isSideBar ? "isSideBarDashBoard" : "dashboard";
  if (isLoginPage) return <Outlet />;

  return (
    <DataProvider>
      <section
        className={`h-dvh w-lvw relative bg-[#0B0D0E] grid ${sideBarClass} grid-rows-[0.3fr_0.3fr_3fr]`}
      >
        <header className="head row-start-1 row-end-2 col-start-2 col-end-4 p-4 py-2 border-b-[0.02rem] border-neutral-700">
          <div className="text-2xl font-medium text-white flex flex-row items-center justify-start gap-3">
            <DateAndTime />
          </div>
          <p className="text-zinc-400">
            {"Let's see what we've got to do today."}
          </p>
        </header>
        <UserFormData>
          <SideBar setSideBar={setSideBar} />
          <main
            className="col-start-2 col-end-3 row-start-2 row-end-5 grid grid-cols[1fr] grid-rows-[0.2fr_3fr] overflow-hidden rounded-t-xl bg-[#000000]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='50' height='50' fill='none' stroke-width='1' stroke='%239fa6ad29' %3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
            }} >
              <Outlet /> 
            </main>
          <aside className="calender bg-[#0B0D0E] relative border-l-[0.02rem] border-neutral-700 row-start-2 row-end-5 col-start-3 flex flex-col items-center">
            <CalenderComponent />
            <AboutModel />
          </aside>
        </UserFormData>
      </section>
    </DataProvider>
  );
};

export default AppLayout;
