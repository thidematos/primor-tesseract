import { NavLink } from "react-router-dom";
import Logo from "../utils/Logo";

function ReportNavbar() {
  return (
    <div className="col-span-2 grid grid-cols-2">
      <div className="relative col-span-2 flex w-full flex-col items-center justify-start gap-16 pt-20">
        <Logo width="w-[50%]" />
        <Navigation />
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <ul className="flex w-full flex-col items-center justify-center gap-10 font-montserrat text-xl">
      <NavLink
        className={
          "w-[60%] rounded border border-orange-500 p-4 text-center shadow drop-shadow-lg"
        }
        to={"/overview/relatorios"}
      >
        RELATÓRIOS
      </NavLink>
      <NavLink
        className={
          "w-[60%] rounded border border-orange-500 p-4 text-center shadow drop-shadow-lg"
        }
        to={"/overview/produtos"}
      >
        PRODUTOS
      </NavLink>

      <NavLink
        className={
          "w-[60%] rounded border border-orange-500 p-4 text-center shadow drop-shadow-lg"
        }
        to={"/overview/ingredientes"}
      >
        INGREDIENTES
      </NavLink>
      <NavLink
        className={
          "w-[60%] rounded border border-orange-500 p-4 text-center shadow drop-shadow-lg"
        }
        to={"/novo-relatorio"}
      >
        NOVO RELATÓRIO
      </NavLink>
    </ul>
  );
}

export default ReportNavbar;
