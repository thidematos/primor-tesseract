import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStepper } from "../context/StepperProvider";

function Stepper({ grid }) {
  const { steps, currentStep } = useStepper();

  return (
    <div className={`${grid} flex flex-row items-center justify-center`}>
      {steps.map((step, ind, arr) => {
        const isCompleted = currentStep > ind;
        const isCurrent = currentStep === ind;

        return (
          <div
            key={step.label}
            className="flex flex-row items-center justify-start"
          >
            <div className="relative mx-4 flex flex-col items-center justify-center">
              <FontAwesomeIcon
                icon={step.icon}
                className={`size-[30px] rounded-full border border-gray-400 p-3 shadow-xl ${isCompleted ? "bg-green-600 text-gray-50" : isCurrent ? "bg-blue-500 text-gray-50" : "bg-gray-300 text-gray-500"}`}
              />
              <p className="absolute left-[-5] top-[110%] w-[100px] text-center font-montserrat">
                {step.label}
              </p>
            </div>
            {arr.length - 1 !== ind && (
              <div
                className={`h-[2px] w-[200px] ${isCompleted ? "bg-green-500" : "bg-gray-400"} origin-left bg-blue-500 duration-200`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;
