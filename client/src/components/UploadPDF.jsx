import { useState } from "react";
import { useExtract } from "../context/ExtractProvider";

function UploadPDF() {
  const { status, extractPDFData } = useExtract();

  const [uploadedPDF, setUploadedPDF] = useState(null);

  return (
    <div className="markup flex flex-col items-center justify-center gap-5">
      <input
        type="file"
        onChange={(e) => {
          console.log(e.target.files[0]);
          setUploadedPDF(e.target.files[0]);
        }}
        multiple={false}
      />
      {uploadedPDF && (
        <button onClick={() => extractPDFData(uploadedPDF)}>Enviar PDF</button>
      )}

      <div className="w-full flex-row items-center justify-center gap-10 border-b border-b-gray-400 pb-6"></div>
    </div>
  );
}

export default UploadPDF;
