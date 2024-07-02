import {
  faCircleQuestion,
  faDog,
  faTriangleExclamation,
  faWheatAwn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "./../utils/Title";
import { useStepper } from "../context/StepperProvider";

function UsoIngredientes() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start gap-10 pt-16">
      <Title fontSize="text-2xl">
        Insira os PDFs referentes ao{" "}
        <span className="text-orange-500">USO DE INGREDIENTES</span>
      </Title>
      <div className="flex w-full flex-row items-center justify-evenly gap-20">
        <Info />
        <InputFile icon={faDog} label={"pets"} indexOnState={0} />
        <InputFile icon={faWheatAwn} label={"insumos"} indexOnState={1} />
        <NextStep />
      </div>
    </div>
  );
}

function Info() {
  return (
    <p className="grid w-48 grid-cols-6 rounded bg-gray-200 p-3 text-center font-noto text-sm tracking-wider text-gray-500">
      <FontAwesomeIcon
        icon={faCircleQuestion}
        className="col-span-1 self-center text-xl text-orange-600"
      />
      <span className="col-span-5">
        Clique na área pontilhada para adicionar o PDF.
      </span>
    </p>
  );
}

function NextStep() {
  const { usoIngredientesFiles, dispatch } = useStepper();

  console.log(usoIngredientesFiles);

  if (usoIngredientesFiles.some((el) => el === null))
    return (
      <p className="grid w-48 grid-cols-6 rounded bg-gray-200 p-3 text-center font-noto text-sm tracking-wider text-gray-500">
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          className="col-span-1 self-center text-xl text-red-600"
        />
        <span className="col-span-5">Adicione os PDFs para continuar!</span>
      </p>
    );

  return (
    <button
      className="relative w-48 rounded border border-gray-300 bg-orange-500 p-3 text-center font-montserrat text-2xl tracking-wider text-gray-50"
      onClick={() => dispatch({ type: "nextStep" })}
    >
      PRÓXIMO
      <div className="absolute right-[-5%] top-[-15%] size-[20px] animate-ping rounded-full bg-sky-400 opacity-75"></div>
    </button>
  );
}

function InputFile({ icon, label, indexOnState }) {
  //indexOnState: 0 | 1
  const { dispatch, usoIngredientesFiles } = useStepper();
  const currentIngredienteFile = usoIngredientesFiles.at(indexOnState);

  return (
    <div
      className={`relative w-fit cursor-pointer rounded-lg border-2 border-dashed border-gray-400 ${currentIngredienteFile ? "bg-green-500/85" : "bg-slate-200"} p-10 shadow-xl`}
    >
      <label
        className="flex cursor-pointer flex-col items-center justify-center gap-6"
        htmlFor={label}
      >
        <FontAwesomeIcon
          icon={icon}
          className={`size-[100px] rounded-full border border-gray-400 p-8 ${currentIngredienteFile ? "bg-gray-100 text-green-600" : "bg-blue-400 text-slate-200"} shadow-2xl`}
        />
        <p
          className={`font-montserrat text-3xl tracking-wider drop-shadow-sm ${currentIngredienteFile ? "text-gray-50" : "text-gray-500"}`}
        >
          {label.at(0).toUpperCase() + label.slice(1)}
        </p>
      </label>
      <input
        id={label}
        type="file"
        className="hidden"
        accept=".pdf"
        multiple={false}
        onChange={(e) =>
          dispatch({
            type: "uploadFile",
            payload: {
              to: "usoIngredientesFiles",
              file: e.target.files[0],
              indexOnState,
            },
          })
        }
      />
      {currentIngredienteFile && (
        <p className="absolute left-0 top-[110%] w-full text-center font-montserrat text-lg text-gray-600">
          PDF:{" "}
          <span className="text-green-600">{currentIngredienteFile.name}</span>
        </p>
      )}
    </div>
  );
}

export default UsoIngredientes;
