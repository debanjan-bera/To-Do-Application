import { GrNotification } from "react-icons/gr";
import { DateAndTime } from "../../Functions/Date";
import useIsMobile from "../../Functions/UseIsMobile";
import { RiAccountCircleLine } from "react-icons/ri";

export const Header = () => {
    const isMobile = useIsMobile(670);
    const isTablet = useIsMobile(930);
  return (
    <header
      className={`w-full px-4 border-b-[0.02rem]  border-neutral-700 ${
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
          "TaskSavvy"
        )}
      </div>

      <div
        className={`flex justify-end items-center gap-2 ${
          isMobile ? "text-2xl" : "text-3xl"
        } font-extrabold`}
      >
        <span className="p-2 border border-zinc-600 rounded-full aspect-square relative transition-all hover:bg-neutral-500/20">
          <GrNotification />
          <span
            className={`${
              isMobile ? "p-[5px]" : "p-[6px]"
            } rounded-full aspect-square absolute top-2 right-2 bg-red-500`}
          ></span>
        </span>
        <RiAccountCircleLine />
      </div>
    </header>
  );
};
