import { Outlet } from "react-router-dom";
import "./App.css";
import { SideBar } from "./Components/layout/SideBar/TodoSidebar";
import { CalenderComponent } from "./Components/layout/Calender Component/Calender";
import { useState } from "react";
import { DataProvider } from "./Contexts/DataWhereHouse";
 const AppLayout=()=>{
  const [isSideBar,setSideBar] = useState(false)
  const sideBarClass = isSideBar ? 'grid-cols-[0.23fr_3fr_0.9fr]' : 'grid-cols-[0.45fr_3fr_0.9fr]';

  return (
    <>
      <main className={`cont h-lvh w-lvw grid ${sideBarClass} grid-rows-[0.3fr_0.3fr_3fr_0.2fr] gap-2  relative`}>
        <nav className="head row-start-1 row-end-2 col-start-2 col-end-4 bg-yellow-100">
          <h2 className="text-4xl font-semibold">Hello, Debanajan Bera</h2>
          <h3 className="text-3xl font-semibold">My Task</h3>
        </nav>
        <DataProvider>
          <SideBar setSideBar={setSideBar} />
          <Outlet />
          <CalenderComponent />
        </DataProvider>
      </main>
    </>
  );
}
export default AppLayout