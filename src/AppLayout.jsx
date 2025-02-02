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
      <main className={`cont h-lvh w-lvw grid ${sideBarClass} grid-rows-[0.3fr_0.3fr_3fr_0.2fr] gap-2  relative bg-zinc-950`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}>
        <nav className="head row-start-1 row-end-2 col-start-2 col-end-4 bg-zinc-900 p-4 pb-2">
          <h1 className="text-2xl font-medium text-white">Good morning! ☀️ Debanajan Bera</h1>
          <p className="text-zinc-400">{`Let's see what we've got to do today.`}</p>
          {/* <h2 className="text-4xl font-semibold">Hello, Debanajan Bera</h2>
          <h3 className="text-3xl font-semibold">My Task</h3> */}
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