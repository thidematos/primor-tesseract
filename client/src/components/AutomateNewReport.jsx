import { useState } from "react";
import Logo from "../utils/Logo";
import Stepper from "../utils/Stepper";
import { icon } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendarDay,
  faCheck,
  faFileInvoiceDollar,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { useStepper } from "../context/StepperProvider";

function AutomateNewReport() {
  const { currentStep, steps, dispatch } = useStepper();

  return (
    <div className="grid h-full w-full grid-cols-8">
      <div className="col-span-1 flex flex-col items-end justify-start pt-16">
        <Logo width="w-[60%]" />
      </div>
      <div className="col-span-7 grid grid-rows-5">
        <Stepper currentStep={currentStep} steps={steps} grid={"row-span-1"} />
        <div className="row-span-4">{steps[currentStep].component}</div>
      </div>
    </div>
  );
}

export default AutomateNewReport;
