import Header from "@/components/header/head";
import SideBar from "@/components/SideBar/page";

export default function layout({ children }) {
  return (
    <section className="h-full w-full grid grid-cols-[0.5fr_3fr] grid-rows-[0.4fr_5fr]">
      <Header />
      <SideBar/>
      <section className="h-full col-start-2 col-end-3 row-start-2 row-end-3 bg-white/5 text-white">{children}</section>
    </section>
  );
}
