import PDFView from "../components/PDFView";
import Sidebar from "../components/Sidebar";
import Logo from "../utils/Logo";

function RenderPDF() {
  return (
    <div className="grid h-full w-[90%] grow grid-cols-5 grid-rows-1">
      <Sidebar />
      <PDFView />
      <div className="w-full border border-red-500"></div>
    </div>
  );
}

export default RenderPDF;
