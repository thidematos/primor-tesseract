import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStepper } from "../context/StepperProvider";

function InputFileAutomateReport({
  icon,
  label,
  indexOnState,
  filesArr,
  stateToUpdate,
}) {
  //indexOnState: 0 | 1
  const { dispatch } = useStepper();
  const currentFile = filesArr.at(indexOnState);

  return (
    <div
      className={`relative w-fit cursor-pointer rounded-lg border-2 border-dashed border-gray-400 ${currentFile ? "bg-green-500/85" : "bg-slate-200"} p-10 shadow-xl`}
    >
      <label
        className="flex cursor-pointer flex-col items-center justify-center gap-6"
        htmlFor={label}
      >
        <FontAwesomeIcon
          icon={icon}
          className={`size-[100px] rounded-full border border-gray-400 p-8 ${currentFile ? "bg-gray-100 text-green-600" : "bg-blue-400 text-slate-200"} shadow-2xl`}
        />
        <p
          className={`font-montserrat text-3xl tracking-wider drop-shadow-sm ${currentFile ? "text-gray-50" : "text-gray-500"}`}
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
              to: stateToUpdate,
              file: e.target.files[0],
              indexOnState,
            },
          })
        }
      />
      {currentFile && (
        <p className="absolute left-0 top-[110%] w-full text-center font-montserrat text-lg text-gray-600">
          PDF: <span className="text-green-600">{currentFile.name}</span>
        </p>
      )}
    </div>
  );
}

export default InputFileAutomateReport;
