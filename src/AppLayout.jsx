import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { SideBar } from "./Components/layout/SideBar/TodoSidebar";
import { CalenderComponent } from "./Components/layout/Calender Component/Calender";
import { useState } from "react";
import { DataProvider } from "./Contexts/DataWhereHouse";
import { DateAndTime } from "./Components/functionality/Date";

export const AppLayout = () => {
  const [isSideBar, setSideBar] = useState(false);
  const location = useLocation(); // Get current route
  const isLoginPage = location.pathname === "/login"; // Check if it's the login page

  const sideBarClass = isSideBar ? "isSideBarDashBoard" : "dashboard";
  if (isLoginPage) return <Outlet />;

  return (
    <DataProvider>
      <section className={`h-lvh w-lvw relative bg-[#1E1F24] grid ${sideBarClass} grid-rows-[0.3fr_0.3fr_3fr]`}>
        <header className="head row-start-1 row-end-2 col-start-2 col-end-4 p-4 pb-2">
          <div className="text-2xl font-medium text-white flex flex-row items-center justify-start gap-3">
            <DateAndTime />
            <h1>Debanjan Bera</h1>
          </div>
          <p className="text-zinc-400">{"Let's see what we've got to do today."}</p>
        </header>
        <SideBar setSideBar={setSideBar} />
        <Outlet />
        <CalenderComponent />
      </section>
    </DataProvider>
  );
};

export default AppLayout;
