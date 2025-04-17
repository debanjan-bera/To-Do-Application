import { memo } from "react";
import useResponsive from "../Hooks/UseResponsive";
import Header from "../Components/layout/Header/Header";

const ReDashBoard = () => {
  const isSmallLaptop = useResponsive(1020);
  const isMediumDevice = useResponsive(767);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });

  return (
    <section className="min-h-screen w-full grid grid-cols-1 md:grid-cols-[11rem_2fr_20rem] grid-rows-[auto_1fr] bg-gradient-to-br from-[#1E1F23] to-[#0F1012] text-white font-sans">
      
      {/* Sidebar A */}
      {!isMediumDevice && (
        <aside className="hidden md:flex flex-col gap-4 p-4 col-span-1 row-span-2 border-r border-zinc-700 bg-white/5 backdrop-blur-md shadow-inner">
          <nav className="flex flex-col gap-2 text-sm">
            {["🏠 Home", "✅ Tasks", "📅 Calendar", "⚙️ Settings"].map((item) => (
              <button
                key={item}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-left"
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>
      )}

      {/* Header */}
      <Header />

      {/* Main */}
      <main className="col-span-3 md:col-start-2 col-end-4 lg:col-end-2 p-6 bg-[#15161A]/50 backdrop-blur-xl shadow-2xl rounded-xl flex flex-col gap-6">
        <div className="p-4 bg-white/10 rounded-2xl text-2xl font-semibold shadow-inner">
          🧊 Welcome to your beautifully glassy dashboard!
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["🔔 Notifications", "📈 Insights", "⚡ Quick Access"].map((text) => (
            <div
              key={text}
              className="p-6 bg-white/10 rounded-2xl backdrop-blur-md shadow-md hover:scale-[1.02] transition-all"
            >
              {text}
            </div>
          ))}
        </div>
      </main>

      {/* Sidebar C */}
      {!isSmallLaptop && (
        <aside className="hidden lg:flex flex-col gap-4 p-3 border-l border-zinc-700 bg-white/5 backdrop-blur-md shadow-inner">
          <div className="w-full flex flex-col gap-4 bg-gradient-to-br from-[#111115] to-[#0b0c0d] p-3 rounded-2xl text-sm">
            <div className="w-full p-3 bg-white/10 rounded-md text-center text-base font-medium">
              {today}
            </div>
            <ul className="flex flex-col gap-2 text-center text-black">
              {[1, 2, 3, 4].map((item) => (
                <li
                  key={item}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-md font-bold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </section>
  );
};

export default memo(ReDashBoard);


// import { memo } from "react";

// const ReDashBoard = () => {
//   return (
//     <>
//       <section className="h-lvh w-svw grid grid-cols-[0.5fr_2fr_0.7fr] grid-rows-[0.4fr_3fr] bg-[#1E1F23] text-color">
//         <header className="w-full h-full  col-start-2 col-end-4 row-start-1 row-end-2 border-b border-zinc-700">Header</header>
//         <aside className="w-full h-full col-start-1 col-end-2 row-start-1 row-end-3 border-r border-zinc-700">A</aside>
//         <main className="w-full h-full bg-[#15161A] col-start-2 col-end-4 row-start-2 row-end-3 flex flex-row items-start " >
//             <div className="my-3 mx-8 p-2 w-full bg-[#1D1E22] text-2xl text-white border border-zinc-700">1</div>
//         </main>
//         <aside className="w-full h-full hidden col-start-3 col-end-4 row-start-2 row-end-3 border-l border-zinc-700">C</aside>
//       </section>
//     </>
//   );
// };

// export default memo(ReDashBoard);


//bg-[#141414] bg-#1B1A1D
// bg-[#0D1116] bg-[#161C23]
// bg-[#1E1F23] bg-[#15161A]