import axios from "axios";
import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";

const GeminiContext = createContext();

const initials = {
  //ready | loading
  status: "ready",
  pdf: {
    totalPages: 0,
    file: null,
    pages: [],
  },
  output: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "getTotalPages/loading":
      return {
        ...state,
        pdf: {
          file: action.payload.file,
          totalPages: action.payload.totalPages,
          pages: Array.from({ length: action.payload.totalPages }),
        },
      };

    case "teste": {
      return {
        ...state,
        output: action.payload,
      };
    }

    default:
      throw new Error("Unknow action");
  }
}

function GeminiProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initials);

  async function extractedPDFData(file) {
    const form = new FormData();
    form.append("pdf", file);

    const res = await axios.post(
      "api/v1/gemini/extractPDF?currentPage=0",
      form,
    );

    dispatch({ type: "teste", payload: res.data.data.produto });
  }

  return (
    <GeminiContext.Provider
      value={{
        status: state.status,
        pdf: state.pdf,
        dispatch,
        extractedPDFData,
        output: state.output,
      }}
    >
      {children}
    </GeminiContext.Provider>
  );
}

function useGemini() {
  const context = useContext(GeminiContext);

  if (context === undefined) throw new Error("Invalid context");

  return context;
}

export { GeminiProvider, useGemini };
