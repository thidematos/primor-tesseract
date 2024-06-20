import NewReportForm from "../components/NewReportForm";
import SubmitPDF from "../components/SubmitPDF";

function NewReport() {
  return (
    <div className="grid h-full w-[90%] grow grid-cols-6">
      <SubmitPDF />
      <NewReportForm />
    </div>
  );
}

export default NewReport;
