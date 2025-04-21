import { memo } from "react";
import { Outlet } from "react-router-dom";
import { DataProvider } from "../Contexts/DataWhereHouse";
import { UserFormData } from "../Contexts/AddititonalData";
import MCalendarComponent from "../Components/layout/Calendar/MobileCalendar";
import { AboutModel } from "../Components/Functions/Models/TaskAboutModel";
import "../App.css";
import Header from "../Components/layout/Header/Header";
import { Footer } from "../Components/layout/Footer/Footer";
import { DateManagerProvider } from "../Contexts/DateManagement";
import useResponsive from "../Hooks/UseResponsive";
import SideBar from '../Components/layout/SideBar/TodoSidebar'
const DashBoard = () => {
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
              <SideBar/>
            )}
            <Header />

            <section
              className={` w-full h-full bg-neutral-950/40 border rounded-none p-2 col-span-3 row-end-3 overflow-hidden md:col-start-2 col-end-4 row-start-2  md:row-end-4 md:overflow-none lg:col-end-3 text-white md:rounded-lg border-neutral-800
              `}
            >
              <Outlet />
            </section>

            {isMediumDevice && <Footer />}

            {!isSmallLaptop && (
              <section
                className="hidden p-2 
              gap-4 lg:w-full h-full relative col-start-3 col-end-4 row-start-2 row-end-4 lg:flex flex-col items-center"
              >
                <MCalendarComponent />
                <AboutModel />
              </section>
            )}

            {(isSmallLaptop || isMediumDevice) && <AboutModel />}
          </section>
        </UserFormData>
      </DateManagerProvider>
    </DataProvider>
  );
};

export default memo(DashBoard);
