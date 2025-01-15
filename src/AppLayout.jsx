import { Outlet } from "react-router-dom";
import "./App.css";
import { SideBar } from "./SideBarComponent/TodoSidebar";
 function AppLayout() {
  return (
    <>
      <main className=" cont h-lvh w-lvw grid grid-cols-[0.8fr_3fr_0.9fr] grid-rows-[0.4fr_0.4fr_3fr] gap-2  relative">
        <nav className="head row-start-1 row-end-2 col-start-2 col-end-4 bg-yellow-100">
          <h2 className="text-4xl font-semibold">Hello, Debanajan Bera</h2>
          <h3 className="text-3xl font-semibold">My Task</h3>
        </nav>
        <aside className="sideBar bg-yellow-200 col-start-1 row-start-1 row-end-4">
          <SideBar />
        </aside>
        <Outlet />
        <aside className="calender bg-yellow-300 row-start-2 row-end-4 col-start-3 ">
          <SideBar />
        </aside>
      </main>
    </>
  );
}
export default AppLayout