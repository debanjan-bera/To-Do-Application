// import { NavLink } from "react-router-dom";
// // import PropTypes from "prop-types";
// import "./SideBar.css";
// import { memo } from "react";
//  const SideBar = () => {
//   return (
//     <>
//       <aside
//         className={`hidden md:grid grid-cols-1 grid-rows-[auto_1fr] justify-center gap-4 py-4  row-span-3 backdrop-blur-md shadow-inner`}
//       >
//         <div className="">
//           {" "}
//           <p className="text-3xl italic font-bold">Taskly</p>
//         </div>
//         <div className="w-full border border-neutral-800">
//           {" "}
//           <NavLink to="/" className={`w-full bg-blue-400`}>
//             <h1 className="">Home</h1>
//           </NavLink>
//           <NavLink to="/todo">
//             <h1>Todo Tasks</h1>
//           </NavLink>
//           <NavLink to="/completedTask">
//             <h1>Completed Task</h1>
//           </NavLink>
//         </div>
//       </aside>
//     </>
//   );
// };


// export default memo(SideBar)
// import { Home, Calendar, Settings, ListChecks } from "lucide-react";

import { motion } from "framer-motion";
import { GrHomeRounded } from "react-icons/gr";

const Sidebar = ({isOpen,setIsOpen}) => {


  const menuItems = [
    { name: "Home", icon: <GrHomeRounded /> },
    { name: "Tasks", icon: ''},
    { name: "Calendar", icon: ''},
    { name: "Settings", icon: ''},
  ];

  return (
    <motion.aside
      animate={{ width: isOpen ? '100%' : '100%' }}
      className="hidden lg:row-span-3  h-full bg-[#0e0e0e] text-gray-300 md:flex flex-col shadow-lg transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {isOpen && (
          <h1 className="text-2xl font-bold tracking-widest text-white">TaskSavvy</h1>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-white transition"
        >
          {isOpen ? "←" : "→"}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-2 mt-4">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="group flex items-center gap-3 p-3 mx-2 rounded-md cursor-pointer hover:bg-[#6569f4]/20 transition"
          >
            {/* Icon */}
            <span>{item.icon}</span>

            {/* Text (Hide in collapse mode) */}
            {isOpen && (
              <span className="text-md font-medium">{item.name}</span>
            )}

            {/* Tooltip */}
            {!isOpen && (
              <span className="absolute left-16 bg-zinc-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-all z-50">
                {item.name}
              </span>
            )}
          </motion.div>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
