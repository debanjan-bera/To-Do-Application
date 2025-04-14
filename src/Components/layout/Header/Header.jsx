import { GrNotification } from "react-icons/gr";
import { DateAndTime } from "../../Functions/Date";
import { RiAccountCircleLine } from "react-icons/ri";
import useResponsive from "../../../Hooks/UseResponsive";
import { memo } from "react";

const Header = () => {
    const isMobile = useResponsive(670);
    const isTablet = useResponsive(930);
  return (
    <header
      className={`w-full ${isMobile&&'bg-[#111111] border-0 border-neutral-600/30'} px-3 border-b-[0.02rem]  border-neutral-700 ${
        isMobile
          ? "col-start-1 col-end-2"
          : "col-start-2 col-end-4 row-start-1 row-end-2"
      }  text-2xl font-medium text-white flex justify-center flex-row`}
    >
      <div className="w-full flex flex-col justify-center">
        {!isTablet ? (
          <>
            <DateAndTime />
            <p className="text-base text-zinc-400">
              {"Let's see what we've got to do today."}
            </p>
          </>
        ) : (
          "Hello Debanajan"
        )}
      </div>

      <div
        className={`flex justify-end items-center gap-2 text-2xl font-extrabold`}
      >
        <span className="p-2 border border-zinc-600 rounded-full aspect-square relative transition-all hover:bg-neutral-500/20">
          <GrNotification />
          <span
            className="p-[4px] rounded-full aspect-square absolute top-2 right-2 bg-green-600"
          
          ></span>
        </span>
        <RiAccountCircleLine />
      </div>
    </header>
  );
};

export default memo(Header)