import axios from "axios";
import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useIngredients } from "./IngredientsProvider";

const ExtractContext = createContext();

const initials = {
  //ready | loading
  status: "ready",
  pdfContent: null,
  pdfTotalPages: null,
  pdfFile: null,
  pdfTempUrl: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "uploaded/loading":
      state.pdfTempUrl.length > 0 &&
        state.pdfTempUrl.forEach((url) => window.URL.revokeObjectURL(url));
      return {
        ...state,
        status: "loading",
        pdfFile: action.payload,
        pdfTempUrl: action.payload.map((file) =>
          window.URL.createObjectURL(file),
        ),
      };

    case "extractedPDF/loaded":
      return {
        ...state,
        status: "ready",
        pdfTotalPages: [
          action.payload.at(0).length,
          action.payload.at(1).length,
        ],
        pdfContent: action.payload,
      };

    default:
      throw new Error("Unknow action");
  }
}

function ExtractProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initials);

  const { precos, week } = useIngredients();

  async function extractPDFData(...file) {
    dispatch({ type: "uploaded/loading", payload: file });
    console.log(file);

    const form = new FormData();

    file.forEach((file) => {
      form.append("pdf", file);
    });

    form.append("week", JSON.stringify(week));
    form.append("precos", JSON.stringify(precos));

    const res = await axios.post("api/v1/extract/extractPDF", form);

    console.log(res.data.data.pdfData);
    console.log(res.data.data.prices);

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
