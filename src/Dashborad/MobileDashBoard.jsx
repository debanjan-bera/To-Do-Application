import { Outlet } from "react-router-dom";

const MobileComponent = () => (
    <p className="w-lvw h-lvh bg-pink-400 text-4xl text-white flex items-center justify-center">
        <div>hello</div>
      <Outlet />
    </p>
  );
  
  export default MobileComponent;
  