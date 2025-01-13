import { Outlet } from "react-router-dom";
import "./App.css";
import { SideBar } from "./To-Do/SideBarComponent/TodoSidebar";
import { TodoApp } from "./To-Do/ToDoApp";
 function AppLay() {
  return (
    <>
      <section className="h-lvh w-lvw  flex-row items-center backGroundImg hidden">
        <aside className="h-lvh w-[20rem]">
          <SideBar />
        </aside>
        <TodoApp />
        <aside className="h-lvh w-[29rem]">
          <SideBar />
        </aside>
      </section>

      <main className=" cont h-lvh w-lvw grid grid-cols-[0.8fr_3fr_0.9fr] grid-rows-[0.4fr_0.4fr_3fr] gap-2 bg-yellow-50 relative">
        <aside className="bg-yellow-200 col-start-1 row-start-1 row-end-4">
          <SideBar />
        </aside>
        <Outlet/>
        <aside className=" bg-yellow-300 row-start-2 row-end-4 col-start-3 ">
          <SideBar />
        </aside>
      </main>
    </>
  );
}
export default AppLay