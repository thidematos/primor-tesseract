import { useState } from "react";
import { useExtract } from "../context/ExtractProvider";
import Logo from "../utils/Logo";
import { pdfjs, Document, Page } from "react-pdf";
import { useCurrentPage } from "../hooks/useCurrentPage";
import InteractionButton from "../utils/InteractionButton";

function Sidebar() {
  return (
    <div className="relative flex grow flex-col items-center justify-center overflow-x-hidden">
      <Logo width="w-[50%]" />
      <PDFInfo />
      <PDFViewer />
    </div>
  );
}

function PDFInfo() {
  const { pdfFile } = useExtract();

  return (
    <div className="my-6 flex flex-row items-center justify-center gap-6">
      <h1 className="font-montserrat text-xl text-gray-800 drop-shadow-sm">
        {pdfFile?.name.split(".").at(0)}
      </h1>
    </div>
  );
}

function PDFViewer() {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const { currentPage } = useCurrentPage();
  const { pdfTempUrl } = useExtract();

  const [zoom, setZoom] = useState(2.5);

  return (
    <>
      <div className="pdfViewer h-[500px] w-full overflow-scroll rounded-lg border border-gray-300 shadow-lg">
        <Document file={pdfTempUrl}>
          <Page
            pageNumber={currentPage}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            canvasBackground="rgb(244,244,245)"
            scale={zoom}
            height={300}
            className={"h-[300px] w-full"}
          />
        </Document>
      </div>
      <Options setZoom={setZoom} />
    </>
  );
}

function Options({ setZoom }) {
  const { pdfTempUrl, pdfFile } = useExtract();
  const { currentPage, setCurrentPage, isLimit, isMinimum } = useCurrentPage();

  return (
    <div className="my-5 flex w-full flex-row items-center justify-around bg-zinc-100">
      <InteractionButton
        action={() => setCurrentPage(currentPage - 1)}
        disabled={isMinimum}
        className={`w-[5%] rotate-180 ${isMinimum ? "opacity-0" : ""}`}
      >
        <img src="/nav-arrow.png" className="drop-shadow-lg" />
      </InteractionButton>

      <InteractionButton
        action={() => setZoom((state) => state + 0.1)}
        className="w-[15%] rounded-full bg-gray-300 p-3"
      >
        <img src="/zoom-in.png" />
      </InteractionButton>
      <InteractionButton className="w-[13%]">
        <a href={pdfTempUrl} download={pdfFile?.name}>
          <img src="/download-icon.png" />
        </a>
      </InteractionButton>
      <InteractionButton
        action={() => setZoom((state) => state - 0.1)}
        className="w-[15%] rounded-full bg-gray-300 p-3"
      >
        <img src="/zoom-out.png" />
      </InteractionButton>

      <InteractionButton
        action={() => setCurrentPage(currentPage + 1)}
        disabled={isLimit}
        className={`w-[5%] ${isLimit ? "opacity-0" : ""}`}
      >
        <img src="/nav-arrow.png" className="drop-shadow-lg" />
      </InteractionButton>
    </div>
  );
}

export default Sidebar;
