import {
  faCircleQuestion,
  faDog,
  faTriangleExclamation,
  faWheatAwn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "./../utils/Title";
import { useStepper } from "../context/StepperProvider";
import InputFileAutomateReport from "../utils/InputFileAutomateReport";
import NextStep from "../utils/NextStep";
import InfoAutomateReport from "./../utils/InfoAutomateReport";

function UsoIngredientes() {
  const { usoIngredientesFiles } = useStepper();

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start gap-10 pt-16">
      <Title fontSize="text-2xl">
        Insira os PDFs referentes ao{" "}
        <span className="text-orange-500">USO DE INGREDIENTES</span>
      </Title>
      <div className="flex w-full flex-row items-center justify-evenly gap-20">
        <InfoAutomateReport />
        <InputFileAutomateReport
          icon={faDog}
          label={"pets"}
          indexOnState={0}
          filesArr={usoIngredientesFiles}
          stateToUpdate={"usoIngredientesFiles"}
        />
        <InputFileAutomateReport
          icon={faWheatAwn}
          label={"insumos"}
          indexOnState={1}
          filesArr={usoIngredientesFiles}
          stateToUpdate={"usoIngredientesFiles"}
        />
        <NextStep filesArr={usoIngredientesFiles} />
      </div>
    </div>
  );
}

export default UsoIngredientes;
