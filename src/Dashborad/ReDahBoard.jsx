import { memo } from "react";

const ReDashBoard = () => {
  return (
    <>
      <section className="h-lvh w-svw grid grid-cols-[0.5fr_2fr_0.7fr] grid-rows-[0.3fr_2fr] bg-[#0D1116] ">
        <header className="w-full h-full  col-start-2 col-end-4 row-start-1 row-end-2 border-b">Header</header>
        <aside className="w-full h-full col-start-1 col-end-2 row-start-1 row-end-3 border-r ">A</aside>
        <main className="w-full h-full bg-[#161C23] col-start-2 col-end-3 row-start-2 row-end-3 flex flex-row items-start " >
            <div className="m-2 p-2 w-full bg-[#0D1116] text-2xl text-white border border-zinc-700">1</div>
        </main>
        <aside className="w-full h-full col-start-3 col-end-4 row-start-2 row-end-3 border-l ">C</aside>
      </section>
    </>
  );
};

export default memo(ReDashBoard);


//bg-[#141414] bg-#1B1A1D
//