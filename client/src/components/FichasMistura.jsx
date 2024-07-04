import { faDog, faWheatAwn } from "@fortawesome/free-solid-svg-icons";
import InputFileAutomateReport from "../utils/InputFileAutomateReport";
import Title from "../utils/Title";
import NextStep from "../utils/NextStep";
import { useStepper } from "../context/StepperProvider";
import InfoAutomateReport from "../utils/InfoAutomateReport";

function FichasMistura() {
  const { fichasMisturaFiles } = useStepper();

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start gap-10 pt-16">
      <Title>
        Insira os PDFs referentes às{" "}
        <span className="text-2xl text-orange-500">FICHAS DE MISTURA</span>
      </Title>
      <div className="flex w-full flex-row items-center justify-evenly gap-20">
        <InfoAutomateReport />
        <InputFileAutomateReport
          icon={faDog}
          label={"pets"}
          indexOnState={0}
          filesArr={fichasMisturaFiles}
          stateToUpdate={"fichasMisturaFiles"}
        />
        <InputFileAutomateReport
          icon={faWheatAwn}
          label={"insumos"}
          indexOnState={1}
          filesArr={fichasMisturaFiles}
          stateToUpdate={"fichasMisturaFiles"}
        />
        <NextStep filesArr={fichasMisturaFiles} />
      </div>
    </div>
  );
}

export default FichasMistura;
