import { memo, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DataProvider } from "../Contexts/DataWhereHouse";
import { UserFormData } from "../Contexts/AddititonalData";
// import { CalendarComponent } from "../Components/layout/Calendar/Calendar";
import MCalendarComponent from "../Components/layout/Calendar/MobileCalendar";
import { AboutModel } from "../Components/Functions/Models/TaskAboutModel";
import "../App.css";
import { SideBar } from "../Components/layout/SideBar/TodoSidebar";
import Login from "../Components/Login";
import Header from "../Components/layout/Header/Header";
import { Footer } from "../Components/layout/Footer/Footer";
import { DateManagerProvider } from "../Contexts/DateManagement";
import useResponsive from "../Hooks/UseResponsive";

const DashBoard = () => {
  const location = useLocation();

  const isLoginPage = useMemo(
    () => location.pathname === "/login",
    [location.pathname]
  );
  const isCalendar = useMemo(
    () => location.pathname === "/calendar",
    [location.pathname]
  );
  const isCalendarActive = isCalendar;

  const isMobile = useResponsive(670);
  const isTablet = useResponsive(930);

  const isSmallLaptop = useResponsive(1020);
  const isMediumDevice = useResponsive(767);

  return (
    <DataProvider>
      <DateManagerProvider>
        <UserFormData>
          <section
            className={`
h-dvh w-full bg-[#101010] text-white font-sans grid grid-cols-1 p-0 grid-rows-[0.28fr_3fr_0.25fr] md:grid-cols-[11rem_2fr_20rem] md:pb-3 md:grid-rows-[auto_1fr]"}
            `}
          >
            {!isMediumDevice && (
              <aside className="hidden md:grid grid-rows-[auto_1fr] justify-center gap-4 p-4  row-span-3 backdrop-blur-md shadow-inner">
                <p className="text-3xl italic font-bold">Taskly</p>
                {/* <nav className="flex flex-col gap-2 text-sm">
                  {["🏠 Home", "✅ Tasks", "📅 Calendar", "⚙️ Settings"].map(
                    (item) => (
                      <button
                        key={item}
                        className="px-4 py-2 rounded-xl hover:bg-white/10 transition-all text-left"
                      >
                        {item}
                      </button>
                    )
                  )}
                </nav> */}
              </aside>
            )}
            <Header />

            <section
              className={`
                w-full h-full  
                bg-neutral-950/60 border
                rounded-none
                col-span-3
                md:col-start-2 col-end-4 row-start-2 row-end-4
                lg:col-end-3
                text-white
                md:rounded-lg border-neutral-800
              `}
            >
              <Outlet />
            </section>

            {isMobile && <Footer />}

            {!isSmallLaptop && (
              <section className="hidden p-2 
              gap-4 lg:w-full h-full relative col-start-3 col-end-4 row-start-2 row-end-4 lg:flex flex-col items-center">
                <MCalendarComponent />
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
