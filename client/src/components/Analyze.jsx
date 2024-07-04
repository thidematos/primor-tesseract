import { useEffect } from "react";
import { useStepper } from "../context/StepperProvider";
import Loader from "./../utils/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Analyze() {
  const { success } = useStepper();

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <Loader />
      <p
        className={`${success ? "visible opacity-100" : "collapse opacity-0"} absolute bottom-10 flex flex-row items-center justify-center gap-4 rounded-lg bg-orange-500/85 p-4 text-lg text-gray-50 shadow-2xl duration-150`}
      >
        <FontAwesomeIcon icon={faCheck} className="text-2xl" />{" "}
        <span>Relatório generado com sucesso!</span>
      </p>
    </div>
  );
}

export default Analyze;
