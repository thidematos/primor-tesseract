import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStepper } from "../context/StepperProvider";

function NextStep({
  filesArr,
  warning = "Adicione os PDFs para continuar!",
  endStep = false,
}) {
  const { dispatch, generateReport } = useStepper();

  console.log(filesArr);

  if (!filesArr) return null;

  if (filesArr.some((el) => el === null))
    return (
      <p className="grid w-48 grid-cols-6 rounded bg-gray-200 p-3 text-center font-noto text-sm tracking-wider text-gray-500">
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          className="col-span-1 self-center text-xl text-red-600"
        />
        <span className="col-span-5">{warning}</span>
      </p>
    );

  return (
    <button
      className="relative w-48 rounded border border-gray-300 bg-orange-500 p-3 text-center font-montserrat text-2xl tracking-wider text-gray-50"
      onClick={() => {
        if (endStep) generateReport();
        dispatch({ type: "nextStep" });
      }}
    >
      {endStep ? "ANALISAR" : "PRÓXIMO"}
      <div className="absolute right-[-5%] top-[-15%] size-[20px] animate-ping rounded-full bg-sky-400 opacity-75"></div>
    </button>
  );
}

export default NextStep;
