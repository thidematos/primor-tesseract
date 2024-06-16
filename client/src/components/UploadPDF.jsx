import { useState } from "react";
import { useGemini } from "../context/GeminiProvider";

function UploadPDF() {
  const { dispatch, pdf, extractedPDFData, output } = useGemini();
  const [uploadedPDF, setUploadedPDF] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <input
        type="file"
        onChange={(e) => {
          console.log(e.target.files[0]);
          setUploadedPDF(e.target.files[0]);
        }}
        multiple={false}
      />
      {uploadedPDF && (
        <button onClick={() => extractedPDFData(uploadedPDF)}>
          Enviar PDF
        </button>
      )}

      {pdf.totalPages}

      <div className="w-full flex-row items-center justify-center gap-10 border-b border-b-gray-400 pb-6">
        {<p>ID: {output.id}</p>}
        {<p>NOME: {output.nome}</p>}
      </div>
    </div>
  );
}

export default UploadPDF;
