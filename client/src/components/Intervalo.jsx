import { faDog, faWheatAwn } from "@fortawesome/free-solid-svg-icons";
import InputFileAutomateReport from "../utils/InputFileAutomateReport";
import Title from "../utils/Title";
import NextStep from "../utils/NextStep";
import { useStepper } from "../context/StepperProvider";
import InfoAutomateReport from "../utils/InfoAutomateReport";

function Intervalo() {
  const { intervalo } = useStepper();

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start gap-10 pt-16">
      <Title>
        Insira o intervalo de
        <span className="text-2xl text-orange-500"> VIGÊNCIA DO RELATÓRIO</span>
      </Title>
      <div className="flex w-full flex-col items-center justify-center gap-12">
        <DatePicker relativeTime={"start"} />
        <DatePicker relativeTime={"end"} />
        <NextStep
          filesArr={Object.values(intervalo)}
          warning="Defina o intervalo para continuar!"
          endStep={true}
        />
      </div>
    </div>
  );
}

function DatePicker({ relativeTime }) {
  const { intervalo, dispatch } = useStepper();
  const relativeTimeString = relativeTime === "end" ? "Fim" : "Início";
  console.log(intervalo);

  function dateParser(dateString) {
    const [year, month, day] = dateString.split("-");

    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  return (
    <div className="flex flex-col items-start justify-center gap-3">
      <h2 className="font-montserrat text-xl text-red-600 drop-shadow-sm">
        {relativeTimeString}:
      </h2>
      <input
        type="date"
        onChange={(e) => {
          console.log(e.target.value);
          dispatch({
            type: "changeOnDate",
            payload: {
              relativeTime: relativeTime,
              date: dateParser(e.target.value),
            },
          });
        }}
        className={`${intervalo[relativeTime] ? "border-green-600 text-green-600" : "border-gray-300 text-gray-600"} rounded border p-2 font-noto text-lg tracking-wide shadow-xl outline-none`}
      />
    </div>
  );
}

export default Intervalo;
