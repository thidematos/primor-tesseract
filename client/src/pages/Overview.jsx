import { Outlet, useNavigate } from "react-router-dom";
import OverviewNavbar from "../components/OverviewNavbar";
import { useEffect } from "react";
import OverviewNavigation from "../components/OverviewNavigation";

function Overview() {
  return (
    <div className="grid h-full w-full grid-cols-10">
      <OverviewNavbar />
      <Outlet />
      <OverviewNavigation />
    </div>
  );
}

export default Overview;
