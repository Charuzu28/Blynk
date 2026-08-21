import { Outlet } from "react-router-dom";

import BottomNav from "./BottomNav";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Outlet />

      <BottomNav />
    </div>
  );
};

export default AppLayout;