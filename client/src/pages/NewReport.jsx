import NewReportForm from "../components/NewReportForm";
import SubmitPDF from "../components/SubmitPDF";
import { useExtract } from "../context/ExtractProvider";
import { useIngredients } from "../context/IngredientsProvider";

function NewReport() {
  return (
    <div className="grid h-full w-[90%] grow grid-cols-6">
      <SubmitPDF />
      <NewReportForm />
    </div>
  );
}

export default NewReport;
