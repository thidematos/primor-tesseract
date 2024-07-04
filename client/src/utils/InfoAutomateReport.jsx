import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InfoAutomateReport() {
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
export default InfoAutomateReport;
