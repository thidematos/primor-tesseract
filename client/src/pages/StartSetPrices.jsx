import { useState } from "react";
import Title from "../utils/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faListCheck,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import ReportNavbar from "../components/OverviewNavbar";
import { Link } from "react-router-dom";

function StartSetPrices() {
  const [showDescription, setShowDescription] = useState("");

  return (
    <div className="grid h-full w-full grid-cols-10">
      <ReportNavbar hideReportButton={true} />
      <ChooseWayToInputPrices setShowDescription={setShowDescription} />
      <Description showDescription={showDescription} />
    </div>
  );
}

function Description({ showDescription }) {
  const description = {
    automatico:
      "Entrada automática dos preços para gerar um novo relatório semanal. Insira os usos de ingredientes, as respectivas fichas de mistura e determine o intervalo de vigência do relatório.",
    manual:
      "Entrada manual dos preços para gerar um novo relatório semanal. Determine o intervalo de vigência do relatório, insira as fichas de  mistura e atualize o preço para cada um dos ingredientes listados.",
  };

  return (
    <div className="col-span-2 flex flex-col items-center justify-center">
      <div
        className={`relative w-[80%] rounded-lg border border-gray-300 p-6 shadow ${showDescription ? "visible opacity-100" : "collapse opacity-0"}`}
      >
        <FontAwesomeIcon
          icon={faCircleInfo}
          className="absolute left-[-15%] top-6 text-2xl text-orange-500 drop-shadow-sm"
        />
        <p className={`font-montserrat text-sm text-gray-600 drop-shadow-sm`}>
          {description[showDescription]}
        </p>
      </div>
    </div>
  );
}

function ChooseWayToInputPrices({ setShowDescription }) {
  return (
    <div className="col-span-6 flex flex-col items-center justify-center gap-16">
      <Title fontSize="text-2xl">Como deseja criar um novo relatório?</Title>
      <div className="flex w-full flex-row justify-evenly">
        <ChooseButton
          icon={faPenToSquare}
          label={"Manual"}
          to={"/novo-relatorio/manual"}
          onHover={() => setShowDescription("manual")}
          reset={() => setShowDescription("")}
        />
        <ChooseButton
          to={"/novo-relatorio/automatico"}
          icon={faListCheck}
          label={"Automático"}
          onHover={() => setShowDescription("automatico")}
          reset={() => setShowDescription("")}
        />
      </div>
    </div>
  );
}

function ChooseButton({ icon, to, label, onHover, reset }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      className="shadow-fa-xl flex cursor-pointer flex-col items-center justify-center gap-8 rounded-lg border border-orange-200 bg-gray-200 p-16"
      onMouseEnter={() => {
        setIsHovered(true);
        onHover();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        reset();
      }}
    >
      <button
        className={`size-[150px] rounded-full border border-gray-400 shadow-xl ${isHovered ? "bg-orange-500" : "bg-blue-500"} duration-150`}
      >
        <FontAwesomeIcon
          icon={icon}
          className={`text-6xl text-gray-100 drop-shadow-xl ${isHovered ? "scale-110" : ""} duration-150`}
        />
      </button>
      <p
        className={`font-montserrat text-xl text-gray-800 drop-shadow ${isHovered ? "underline underline-offset-4" : ""} decoration-orange-500 duration-150`}
      >
        {label}
      </p>
    </Link>
  );
}

export default StartSetPrices;
