import { memo, useState, useMemo, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DataProvider } from "../Contexts/DataWhereHouse";
import { UserFormData } from "../Contexts/AddititonalData";
import { CalendarComponent } from "../Components/layout/Calendar/Calendar";
import { AboutModel } from "../Components/Functions/Models/TaskAboutModel";
import "../App.css";
import { SideBar } from "../Components/layout/SideBar/TodoSidebar";
import Login from "../Components/Login";
import Header from "../Components/layout/Header/Header";
import { Footer } from "../Components/layout/Footer/Footer";
import { DateManagerProvider } from "../Contexts/DateManagement";
import useResponsive from "../Hooks/UseResponsive";

const DashBoard = () => {
  const [isSideBar, setSideBar] = useState(false);
  const location = useLocation();

  const isLoginPage = useMemo(() => location.pathname === "/login", [location.pathname]);
  const isCalendar = useMemo(() => location.pathname === "/calendar", [location.pathname]);
  const isCalendarActive = isCalendar;

  const isMobile = useResponsive(670);
  const isTablet = useResponsive(930);

  const sideBarClass = useMemo(() => (isSideBar ? "isSideBarDashBoard" : "dashboard"), [isSideBar]);

  // ✅ Memoized setter
  const handleSidebarToggle = useCallback(() => setSideBar(prev => !prev), []);

  if (isLoginPage) return <Login />;

  return (
    <DataProvider>
      <DateManagerProvider>
        <UserFormData>
          <section
            className={`
              h-dvh w-dvw bg-[#171717] grid 
              ${isMobile ? "grid-cols-1 " : isTablet ? "grid-cols-[12rem_3fr]" : "grid-cols-[12rem_3fr_20rem]"}
              ${isMobile ? "grid-rows-[0.28fr_3fr_0.25fr]" : "grid-rows-[0.35fr_3fr_0.2fr]"}
            `}
          >
            <Header />

            {!isMobile && <SideBar setSideBar={handleSidebarToggle} />}

            <section
              className={`
                w-full h-full ${isMobile ? "bg-[#111111]" : "bg-[#0E0E10]"} 
                ${isCalendar && "px-4"} 
                ${(isCalendar && isMobile) && "overflow-y-auto"} 
                ${isMobile
                  ? "col-start-1 col-end-2 row-start-2 row-end-3 overflow-hidden"
                  : "col-start-2 col-end-3 row-start-2 row-end-4"
                }
                ${isCalendarActive && "flex flex-col items-center"}
                text-white
              `}
            >
              <Outlet />
            </section>

            {isMobile && <Footer />}

            {!isTablet && (
              <section className="w-full h-full bg-[#121212] border relative border-zinc-700 col-start-3 col-end-4 row-start-2 row-end-4 flex flex-col items-center">
                <CalendarComponent />
                <AboutModel />
              </section>
            )}

            {(isTablet || isMobile) && <AboutModel />}
          </section>
        </UserFormData>
      </DateManagerProvider>
    </DataProvider>
  );
};

export default memo(DashBoard);
