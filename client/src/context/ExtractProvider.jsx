import axios from "axios";
import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";

const ExtractContext = createContext();

const initials = {
  //ready | loading
  status: "ready",
  pdfContent: null,
  pdfTotalPages: null,
  pdfFile: null,
  pdfTempUrl: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "uploaded/loading":
      state.pdfTempUrl && window.URL.revokeObjectURL(state.pdfTempUrl);
      return {
        ...state,
        status: "loading",
        pdfFile: action.payload,
        pdfTempUrl: window.URL.createObjectURL(action.payload),
      };

    case "extractedPDF/loaded":
      return {
        ...state,
        status: "ready",
        pdfTotalPages: action.payload.length,
        pdfContent: action.payload,
      };

    default:
      throw new Error("Unknow action");
  }
}

function ExtractProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initials);

  async function extractPDFData(file, start, end) {
    dispatch({ type: "uploaded/loading", payload: file });
    console.log(file);

    const form = new FormData();
    form.append("pdf", file);
    form.append("inicio", start);
    form.append("fim", end);

    const res = await axios.post("api/v1/extract/extractPDF", form);

    console.log(res.data.data.pdfData);

    dispatch({ type: "extractedPDF/loaded", payload: res.data.data.pdfData });
  }

  return (
    <ExtractContext.Provider
      value={{
        status: state.status,
        pdfContent: state.pdfContent,
        pdfTotalPages: state.pdfTotalPages,
        pdfFile: state.pdfFile,
        pdfTempUrl: state.pdfTempUrl,
        dispatch,
        extractPDFData,
      }}
    >
      {children}
    </ExtractContext.Provider>
  );
}

function useExtract() {
  const context = useContext(ExtractContext);

  if (context === undefined) throw new Error("Invalid context");

  return context;
}

export { ExtractProvider, useExtract };
