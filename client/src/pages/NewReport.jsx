import NewReportForm from "../components/NewReportForm";
import Logo from "../utils/Logo";

function NewReport() {
  return (
    <div className="markup grid h-full w-[90%] grow grid-cols-6">
      <Logo />
      <NewReportForm />
    </div>
  );
}

export default NewReport;
