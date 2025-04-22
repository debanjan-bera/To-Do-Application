import { GrNotification } from "react-icons/gr";
import { DateAndTime } from "../../Functions/Date";
import { RiAccountCircleLine } from "react-icons/ri";
import useResponsive from "../../../Hooks/UseResponsive";
import { memo } from "react";

const Header = () => {
    const isTablet = useResponsive(930);
  return (
    <header
      className={` col-span-2 h-16 flex items-center justify-between  px-6 md:py-10
      `}
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
      <div className="md:w-full border border-neutral-700">Serach</div>
      <div
        className={`w-full flex justify-end items-center gap-2 text-xl font-extrabold`}
      >
        <span className="p-2 border  border-zinc-700 rounded-md aspect-square relative transition-all hover:bg-neutral-500/20">
          <GrNotification />
          <span
            className="p-[4px] rounded-full aspect-square absolute top-2 right-2 bg-green-500"
          
          ></span>
        </span>
        <RiAccountCircleLine />
      </div>
    </header>
  );
};

export default memo(Header)