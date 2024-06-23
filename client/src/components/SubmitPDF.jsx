import { useState } from "react";
import Logo from "../utils/Logo";
import { useExtract } from "../context/ExtractProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";

function SubmitPDF() {
  const [uploadedPDF, setUploadedPDF] = useState(null);

  return (
    <div className="relative col-span-1 flex flex-col items-center justify-center 2xl:gap-6">
      <Logo width="w-[60%]" position="3xl:absolute 3xl:top-[5%] 2xl:block" />
      <div className="flex w-full flex-col items-center justify-center gap-10 2xl:gap-6">
        <PDFUploader
          uploadedPDF={uploadedPDF}
          setUploadedPDF={setUploadedPDF}
        />
        <Instructions />

        <Submit uploadedPDF={uploadedPDF} />
      </div>
    </div>
  );
}

function PDFUploader({ uploadedPDF, setUploadedPDF }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <label
        className="w-[80%] cursor-pointer rounded border border-dashed border-blue-400 bg-gray-300 p-3 text-center font-noto text-gray-700 shadow-lg"
        htmlFor="input-file"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {uploadedPDF && !isHovered
          ? uploadedPDF?.at(0).name.split(".").at(0)
          : "Selecionar PDF"}
      </label>
      <input
        type="file"
        id="input-file"
        onChange={(e) => {
          setUploadedPDF([e.target.files[0], e.target.files[1]]);
        }}
        multiple={true}
        accept=".pdf"
        className="hidden"
      />
    </>
  );
}

function Submit({ uploadedPDF }) {
  const { extractPDFData } = useExtract();

  return (
    <button
      className={`w-[60%] cursor-pointer rounded border border-gray-200 p-3 text-center font-noto shadow-lg 2xl:w-[80%] ${uploadedPDF ? "bg-blue-500 text-gray-50" : "cursor-not-allowed bg-gray-300 text-gray-800"}`}
      disabled={!uploadedPDF}
      onClick={() => extractPDFData(...uploadedPDF)}
    >
      {!uploadedPDF ? "Selecione um PDF" : "ANALISAR"}
    </button>
  );
}

function Instructions() {
  return (
    <ol className="flex w-[80%] list-inside list-decimal flex-col items-start justify-center gap-3 font-montserrat text-gray-800 2xl:w-[90%] 2xl:text-sm">
      <li className="drop-shadow-sm">
        <span className="text-red-600">Defina os preços</span> dos insumos.
      </li>

      <li className="drop-shadow-sm">
        Selecione o intervalo de tempo válido desse relatório
      </li>
      <li className="drop-shadow-sm">
        Faça o <span className="text-red-600">upload do PDF</span> com o
        relatório semanal
      </li>
      <li className="drop-shadow-sm">
        Se precisar alterar o PDF, clique no botão novamente
      </li>
      <li className="drop-shadow-sm">
        Clique em <span className="text-red-600">analisar</span> para gerar a
        planilha de preços por produto
      </li>
    </ol>
  );
}

export default SubmitPDF;
