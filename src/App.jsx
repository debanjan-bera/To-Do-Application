import "./App.css";
import { SideBar } from "./SideBarComponent/TodoSidebar";
import { TodoApp } from "./To-Do/ToDoApp";
function App() {
  return (
    <>
      <section className="h-lvh w-lvw flex flex-row items-center backGroundImg">
        <aside className="h-lvh w-[20rem]">
          <SideBar/>
        </aside>
        <TodoApp />
        <aside className="h-lvh w-[29rem]">
          <SideBar/>
        </aside>
      </section>
    </>
  );
}

export default App;
