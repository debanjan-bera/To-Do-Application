import { memo, useState} from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DataProvider } from "../Contexts/DataWhereHouse";
import { UserFormData } from "../Contexts/AddititonalData";
import MCalendarComponent from "../Components/layout/Calendar/MobileCalendar";
import { AboutModel } from "../Components/Functions/Models/TaskAboutModel";
import "../App.css";
import Header from "../Components/layout/Header/Header";
import { Footer } from "../Components/layout/Footer/Footer";
import { DateManagerProvider } from "../Contexts/DateManagement";
import useResponsive from "../Hooks/UseResponsive";
import SideBar from "../Components/layout/SideBar/TodoSidebar";
const DashBoard = () => {
  const isSmallLaptop = useResponsive(1020);
  const isMediumDevice = useResponsive(767);
  const isHomePage = useLocation();
  const isHomeActive = isHomePage.pathname === "/home";
  const [isOpen, setIsMenuOpen] = useState(false);
  return (
    <DataProvider>
      <DateManagerProvider>
        <UserFormData>
          <section
            className={`h-dvh w-full bg-[#101010] text-white font-sans grid grid-cols-1 p-0 sm:gap-0 ${isHomeActive ? "grid-rows-[0.7fr_3fr_0.25fr] md:pr-3" : "grid-rows-[0.28fr_3fr_0.25fr] lg:pr-0"} ${isOpen ? 'md:grid-cols-[11rem_2fr_20rem]':"md:grid-cols-[3.8rem_2fr_20rem]"} md:grid-rows-[auto_1fr]  md:pr-2 md:pb-3 md:gap-1 
  `}
          >
            {!isMediumDevice && <SideBar isOpen={isOpen} setIsOpen={setIsMenuOpen}/>}
            {(!isMediumDevice||!isHomeActive)&&<Header />}

            <section
              className={` w-full h-full text-white bg-neutral-900/30 border rounded-none p-2 col-span-3 row-end-3 overflow-hidden md:col-start-2 col-end-4  md:row-end-4 md:overflow-none   md:rounded-lg border-neutral-700
                ${isHomeActive ? "row-start-1 md:row-start-2  lg:col-end-4" : "md:row-start-2  lg:col-end-3"}
              `}
            >
              <Outlet />
            </section>

            {isMediumDevice && <Footer />}

            {(!isSmallLaptop && !isHomeActive) && (
              <section
                className={`${isHomeActive ? "lg:hidden" : "hidden"} p-2 
              gap-4 lg:w-full h-full relative col-start-3 col-end-4 row-start-2 row-end-4 lg:flex`}
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
