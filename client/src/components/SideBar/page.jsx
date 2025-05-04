"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathName = usePathname();
  console.log(pathName);
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Todo", href: "/todos/tasks" },
    { name: "Settings", href: "/settings" },

  ];
  return (
    <>
      <nav className="w-full h-full col-start-1 col-end-2 row-start-2 row-end-3 ">
      <ul className="w-full flex flex-col px-3 gap-2">
      {links.map(({ name, href }) => {
        const isActive = pathName === href;

        return (
          <li key={href}>
            <Link
              href={href}
              className={`block w-full p-2 rounded ${
                isActive ? "bg-blue-600 text-white" : "bg-blue-900 text-gray-200"
              }`}
            >
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
      </nav>
    </>
  );
}
