import Image from "next/image";

export default function Header() {
  return (
    <>
    <header className="w-full col-start-1 col-end-3 row-start-1 row-end-2 flex justify-between items-center px-3">
      <div className="text-2xl font-bold italic">TaskSavvy</div>
      <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-10 pr-4 py-2 rounded-md bg-neutral-900 text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
      />
      <div className="absolute left-2 top-2.5 h-5 w-5 text-gray-400">/</div>
    </div>
      <div>Notification and Account</div>
    </header>
    </>
  );
}