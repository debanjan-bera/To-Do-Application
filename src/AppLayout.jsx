import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { SideBar } from "./Components/layout/SideBar/TodoSidebar";
import { CalenderComponent } from "./Components/layout/Calender Component/Calender";
import { useState } from "react";
import { DataProvider } from "./Contexts/DataWhereHouse";
export const AppLayout = () => {
  const [isSideBar, setSideBar] = useState(false);
  const location = useLocation(); // Get current route
  const isLoginPage = location.pathname === "/login"; // Apply layout only if it's NOT the Login page
  const sideBarClass = isSideBar ? "grid-cols-[0.23fr_3fr_0.9fr]" : "grid-cols-[0.45fr_3fr_0.9fr]"; // Sidebar class for responsive design
  return isLoginPage ? (
    <Outlet /> // No header, sidebar, or calendar for login page
  ) : (
    <DataProvider>
      <section className={`cont h-lvh w-lvw grid ${sideBarClass} grid-rows-[0.3fr_0.3fr_3fr] relative bg-zinc-800 `}>
        <header className="head row-start-1 row-end-2 col-start-2 col-end-4 p-4 pb-2">
          <h1 className="text-2xl font-medium text-white">Good morning! ☀️ Debanjan Bera</h1>
          <p className="text-zinc-400">{"Let's see what we've got to do today."}</p>
        </header>
        <SideBar setSideBar={setSideBar} />{/* Sidebar, Main Content, and Calendar */}
        <Outlet /> {/* Main Page Content (To-Do, Completed Tasks, etc.) */}
        <CalenderComponent />
      </section>
    </DataProvider>
  );
};
export default AppLayout;