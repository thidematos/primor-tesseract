import { Outlet, useNavigate } from "react-router-dom";
import OverviewNavbar from "../components/OverviewNavbar";
import { useEffect } from "react";
import WeeklyReportNavigation from "../components/WeeklyReportNavigation";

function Overview() {
  return (
    <div className="grid h-full w-full grid-cols-10">
      <OverviewNavbar />
      <Outlet />
      <WeeklyReportNavigation />
    </div>
  );
}

export default Overview;
