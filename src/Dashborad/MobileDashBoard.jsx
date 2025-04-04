import { NavLink, Outlet, useLocation } from "react-router-dom";
import { DataProvider } from "../Contexts/DataWhereHouse";
import { UserFormData } from "../Contexts/AddititonalData";
import { AboutModel } from "../Components/Functions/Models/TaskAboutModel";

export const MobileComponent = () => {
  const location = useLocation(); // Get current route
  const isLoginPage = location.pathname === "/login"; // Check if it's the login page

  if (isLoginPage) return <Outlet />;

  return (
    <DataProvider>
      <section
        className={`h-dvh w-lvw relative bg-[#0B0D0E] grid grid-cols-1 grid-rows-[0.14fr_1.8fr]`}
      >
        <header className=" row-start-1 row-end-2 p-4 py-2 border-b-[0.02rem] border-neutral-700">
          <div className="text-2xl font-medium text-white flex flex-row items-center justify-start gap-3"></div>
          <p className="text-zinc-400 flex flex-row gap-2">
            {/* {"Let's see what we've got to do today."} */}
            <NavLink to="/">
              <h1>Home</h1>
            </NavLink>
            <NavLink to="/completedTask">
              <h1>Completed Task</h1>
            </NavLink>
            <NavLink to="/calendar">
              <h1>Calender</h1>
            </NavLink>
          </p>
        </header>
        <UserFormData>
          <main
            className="row-start-2 row-end-[-1] flex flex-col overflow-hidden rounded-t-xl bg-[#000000] items-center"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='50' height='50' fill='none' stroke-width='1' stroke='%239fa6ad29' %3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
            }}
          >
            <Outlet />
            <AboutModel />
          </main>
        </UserFormData>
      </section>
      {/* col-start-2 col-end-3 row-start-2 row-end-5 flex flex-col overflow-hidden rounded-t-xl bg-[#000000] */}
    </DataProvider>
  );
};

export default MobileComponent;
