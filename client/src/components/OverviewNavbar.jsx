import { NavLink } from "react-router-dom";
import Logo from "../utils/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function ReportNavbar({ hideReportButton = false }) {
  return (
    <div className="col-span-2 grid grid-cols-2">
      <div className="relative col-span-2 flex w-full flex-col items-center justify-start gap-16 pt-20">
        <Logo width="w-[50%]" />
        <Navigation hideReportButton={hideReportButton} />
      </div>
    </div>
  );
}

function Navigation({ hideReportButton }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ul className="flex w-[60%] flex-col items-center justify-center gap-10 font-montserrat text-xl 2xl:text-base">
      <NavLink
        className={
          "text-center text-lg text-gray-800 decoration-orange-500 underline-offset-2 drop-shadow-lg duration-150 hover:underline"
        }
        to={"/overview/relatorios"}
      >
        RELATÓRIOS
      </NavLink>
      <NavLink
        className={
          "text-center text-lg text-gray-800 decoration-orange-500 underline-offset-2 drop-shadow-lg duration-150 hover:underline"
        }
        to={"/overview/produtos"}
      >
        PRODUTOS
      </NavLink>

      <NavLink
        className={
          "text-center text-lg text-gray-800 decoration-orange-500 underline-offset-2 drop-shadow-lg duration-150 hover:underline"
        }
        to={"/overview/ingredientes"}
      >
        INGREDIENTES
      </NavLink>
      {!hideReportButton && (
        <NavLink
          className={
            "relative flex flex-col items-center justify-center rounded-full bg-blue-500 p-4 text-gray-50 shadow-2xl drop-shadow-lg duration-150"
          }
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          to={"/novo-relatorio"}
        >
          <p
            className={`${isHovered ? "visible opacity-100" : "collapse opacity-0"} absolute top-[120%] w-[150px] rounded bg-red-500/85 p-2 text-center text-sm text-gray-50 duration-150`}
          >
            Novo relatório semanal
          </p>
          <FontAwesomeIcon icon={faFileCirclePlus} className="size-[30px]" />
        </NavLink>
      )}
    </ul>
  );
}

export default ReportNavbar;
