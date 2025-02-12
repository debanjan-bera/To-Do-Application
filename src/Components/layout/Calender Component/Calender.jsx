// import { NavLink } from "react-router-dom";

export const CalenderComponent = () => {
  return (
    <>
      <aside className="calender bg-[#1E1F24] row-start-2 row-end-5 col-start-3 text-white text-base flex flex-col  items-center">
        <section className="bg-black/10  fill-transparent w-[3.3rem]">
          <label className="hamburger cursor-pointer ">
            <input type="checkbox" className="hidden" />
            <svg viewBox="0 0 32 32" className="h-[3em]">
              <path
                className="line line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              ></path>
              <path className="line" d="M7 16 27 16"></path>
            </svg>
          </label>
        </section>
        {/* <section className="w-[92%] bg-white grid  text-black p-2">
          <div className="grid grid-cols-7 gap-1 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="font-semibold text-gray-700">
                {day}
              </div>
            ))}
        <div className="text-base bg-blue-500 font-semibold text-white p-2 rounded-full">1</div>
        <div className="p-2">12</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
          </div>

        </section> */}


      </aside>
    </>
  );
};
