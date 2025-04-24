import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RxDashboard } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";
import { FaListCheck } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { HiBars3CenterLeft } from "react-icons/hi2";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const menuItems = [
    { name: "Dashboard", icon: <RxDashboard />, to: "/" },
    {
      name: "Tasks",
      icon: <FaListCheck />,
      children: [
        { name: "Personal", to: "/tasks/personal" },
        { name: "Office", to: "/tasks/office" },
        { name: "College", to: "/tasks/college" },
        { name: "Completed", to: "/completedTask" },
      ],
      to: "/tasks",
    },
    { name: "Calendar", icon: <LuCalendarDays />, to: "/calendar" },
    { name: "Settings", icon: <FiSettings />, to: "/settings" },
  ];

  return (
    <motion.aside
      animate={{ width: isOpen ? "100%" : "100%" }}
      className="hidden lg:row-span-3 h-full bg-[#0e0e0e] text-gray-300 md:flex flex-col items-start shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between p-4">
        {isOpen && (
          <h1 className="text-2xl font-bold tracking-widest text-white">
            TaskSavvy
          </h1>
        )}
      </div>

      <div className="mx-2 w-auto rounded-md hover:bg-white/10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl p-1 font-extrabold text-white transition"
        >
          <HiBars3CenterLeft />
        </button>
      </div>

      <nav className="flex flex-col w-full gap-2 mt-4">
        {menuItems.map((item, index) => {
          const { name, icon, to, children } = item;
          const isDropdownOpen = openDropdown === index;

          if (!children) {
            return (
              <NavLink
                key={index}
                to={to}
                className={({ isActive }) =>
                  `group flex items-center text-xl gap-3 p-3 mx-2 rounded-md cursor-pointer transition ${
                    !isOpen ? "justify-center" : ""
                  } ${
                    isActive
                      ? "bg-[#6569f4]/60 text-white"
                      : "hover:bg-[#6569f4]/20"
                  }`
                }
              >
                <span className="text-md font-extrabold">{icon}</span>
                {isOpen && <span className="text-md font-medium">{name}</span>}
                {!isOpen && (
                  <span className="absolute left-16 bg-zinc-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-all z-50">
                    {name}
                  </span>
                )}
              </NavLink>
            );
          }

          return (
            <div key={index} className="relative">
              <motion.div whileHover={{ scale: 1.05 }}>
                <div
                  onClick={() => toggleDropdown(index)}
                  className={`group flex items-center justify-center gap-3 p-3 mx-2 rounded-md cursor-pointer transition ${
                    isOpen ? "" : "justify-center"
                  } ${
                    isDropdownOpen
                      ? "bg-[#6569f4]/60 text-white"
                      : "hover:bg-[#6569f4]/20"
                  }`}
                >
                  <span>{icon}</span>
                  {isOpen && (
                    <span className="w-full text-md font-medium flex items-center justify-between">
                      {name}
                      <IoIosArrowDown
                        className={`transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  )}
                  {!isOpen && (
                    <span className="absolute left-16 bg-zinc-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-all z-50">
                      {name}
                    </span>
                  )}
                </div>
              </motion.div>

              <AnimatePresence>
                {isOpen && isDropdownOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mx-4 mt-1 overflow-hidden flex flex-col gap-1 text-sm text-gray-200"
                  >
                    {children.map((child, i) => (
                      <NavLink
                        key={i}
                        to={child.to}
                        className={({ isActive }) =>
                          `px-4 py-2 rounded hover:bg-[#6569f4]/40 transition ${
                            isActive ? "bg-[#6569f4]/40 text-white" : ""
                          }`
                        }
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
