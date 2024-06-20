import { Outlet, useNavigate } from "react-router-dom";
import OverviewNavbar from "../components/OverviewNavbar";
import { useEffect } from "react";

function Overview() {
  return (
    <div className="grid h-full w-full grid-cols-8">
      <OverviewNavbar />
      <Outlet />
      <div className="markup col-span-2"></div>
    </div>
  );
}

export default Overview;
