import axios from "axios";
import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useIngredients } from "./IngredientsProvider";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  //const { precos, week } = useIngredients();

  const { week } = useIngredients();
  const precos = [
    {
      idExterno: 31,
      preco: "0.745",
    },
    {
      idExterno: 1,
      preco: "1.000",
    },
    {
      idExterno: 45,
      preco: "1.020",
    },
    {
      idExterno: 115,
      preco: "2.600",
    },
    {
      idExterno: 4,
      preco: "1.070",
    },
    {
      idExterno: 16,
      preco: "0.810",
    },
    {
      idExterno: 124,
      preco: "0.400",
    },
    {
      idExterno: 149,
      preco: "0.332",
    },
    {
      idExterno: 104,
      preco: "1.750",
    },
    {
      idExterno: 61,
      preco: "1.015",
    },
    {
      idExterno: 313,
      preco: "40",
    },
    {
      idExterno: 316,
      preco: "58",
    },
    {
      idExterno: 119,
      preco: "5.000",
    },
    {
      idExterno: 13,
      preco: "2.225",
    },
    {
      idExterno: 317,
      preco: "100",
    },
    {
      idExterno: 312,
      preco: "36.610",
    },
    {
      idExterno: 192,
      preco: "1.780",
    },
    {
      idExterno: 402,
      preco: "28.872",
    },
    {
      idExterno: 394,
      preco: "17.970",
    },
    {
      idExterno: 403,
      preco: "83.012",
    },
    {
      idExterno: 171,
      preco: "4.850",
    },
    {
      idExterno: 114,
      preco: "5.000",
    },
    {
      idExterno: 314,
      preco: "55",
    },
    {
      idExterno: 141,
      preco: "0.630",
    },
    {
      idExterno: 288,
      preco: "9.5",
    },
    {
      idExterno: 64,
      preco: "2.110",
    },
    {
      idExterno: 401,
      preco: "50.371",
    },
    {
      idExterno: 102,
      preco: "1.350",
    },
    {
      idExterno: 400,
      preco: "82.083",
    },
    {
      idExterno: 49,
      preco: "7.592",
    },
    {
      idExterno: 112,
      preco: "4.150",
    },
    {
      idExterno: 393,
      preco: "27.590",
    },
    {
      idExterno: 391,
      preco: "14.650",
    },
    {
      idExterno: 179,
      preco: "6.680",
    },
    {
      idExterno: 410,
      preco: "40.652",
    },
    {
      idExterno: 162,
      preco: "14.650",
    },
    {
      idExterno: 298,
      preco: "13",
    },
    {
      idExterno: 158,
      preco: "29.000",
    },
    {
      idExterno: 173,
      preco: "9.170",
    },
    {
      idExterno: 172,
      preco: "6.220",
    },
    {
      idExterno: 161,
      preco: "14.700",
    },
    {
      idExterno: 390,
      preco: "200",
    },
    {
      idExterno: 395,
      preco: "21.026",
    },
    {
      idExterno: 315,
      preco: "40",
    },
    {
      idExterno: 392,
      preco: "20.250",
    },
    {
      idExterno: 261,
      preco: "6.400",
    },
    {
      idExterno: 262,
      preco: "9.100",
    },
    {
      idExterno: 276,
      preco: "8",
    },
    {
      idExterno: 257,
      preco: "5.300",
    },
    {
      idExterno: 190,
      preco: "1.050",
    },
    {
      idExterno: 275,
      preco: "9.750",
    },
    {
      idExterno: 279,
      preco: "4.2",
    },
    {
      idExterno: 287,
      preco: "0",
    },
    {
      idExterno: 289,
      preco: "4.4",
    },
    {
      idExterno: 277,
      preco: "0",
    },
    {
      idExterno: 43,
      preco: "1.215",
    },
    {
      idExterno: 2290,
      preco: "0",
    },
    {
      idExterno: 19,
      preco: "1.140",
    },
    {
      idExterno: 2291,
      preco: "0",
    },
    {
      idExterno: 131,
      preco: "2.100",
    },
    {
      idExterno: 2283,
      preco: "0",
    },
  ];

  const precosSecondReportTeste = [
    {
      idExterno: 31,
      preco: "0.752",
    },
    {
      idExterno: 102,
      preco: 1.35,
    },
    {
      idExterno: 1,
      preco: 1,
    },
    {
      idExterno: 124,
      preco: 0.4,
    },
    {
      idExterno: 115,
      preco: "2.6",
    },
    {
      idExterno: 257,
      preco: 5.3,
    },
    {
      idExterno: 141,
      preco: "0.63",
    },
    {
      idExterno: 395,
      preco: 21.026,
    },
    {
      idExterno: 4,
      preco: 1.07,
    },
    {
      idExterno: 61,
      preco: 1.015,
    },
    {
      idExterno: 261,
      preco: 6.4,
    },
    {
      idExterno: 13,
      preco: "2.265",
    },
    {
      idExterno: 45,
      preco: 1.02,
    },
    {
      idExterno: 262,
      preco: "9",
    },
    {
      idExterno: 16,
      preco: 0.81,
    },
    {
      idExterno: 276,
      preco: 8,
    },
    {
      idExterno: 190,
      preco: 1.05,
    },
    {
      idExterno: 104,
      preco: 1.75,
    },
    {
      idExterno: 275,
      preco: 9.75,
    },
    {
      idExterno: 161,
      preco: 14.7,
    },
    {
      idExterno: 162,
      preco: 14.65,
    },
    {
      idExterno: 279,
      preco: 4.2,
    },
    {
      idExterno: 287,
      preco: "0",
    },
    {
      idExterno: 114,
      preco: 5,
    },
    {
      idExterno: 192,
      preco: 1.78,
    },
    {
      idExterno: 149,
      preco: 0.332,
    },
    {
      idExterno: 289,
      preco: 4.4,
    },
    {
      idExterno: 277,
      preco: "0",
    },
    {
      idExterno: 43,
      preco: 1.215,
    },
    {
      idExterno: 288,
      preco: 9.5,
    },
    {
      idExterno: 19,
      preco: 1.14,
    },
    {
      idExterno: 2290,
      preco: "0",
    },
    {
      idExterno: 2291,
      preco: "0",
    },
    {
      idExterno: 313,
      preco: 40,
    },
    {
      idExterno: 316,
      preco: 58,
    },
    {
      idExterno: 119,
      preco: 5,
    },
    {
      idExterno: 317,
      preco: 100,
    },
    {
      idExterno: 394,
      preco: 17.97,
    },
    {
      idExterno: 402,
      preco: "28",
    },
    {
      idExterno: 403,
      preco: 83.012,
    },
    {
      idExterno: 171,
      preco: 4.85,
    },
    {
      idExterno: 315,
      preco: 40,
    },
    {
      idExterno: 314,
      preco: 55,
    },
    {
      idExterno: 392,
      preco: 20.25,
    },
    {
      idExterno: 401,
      preco: 50.371,
    },
    {
      idExterno: 64,
      preco: 2.11,
    },
    {
      idExterno: 112,
      preco: 4.15,
    },
    {
      idExterno: 391,
      preco: 14.65,
    },
    {
      idExterno: 393,
      preco: 27.59,
    },
    {
      idExterno: 2283,
      preco: "0",
    },
    {
      idExterno: 131,
      preco: 2.1,
    },
    {
      idExterno: 172,
      preco: 6.22,
    },
    {
      idExterno: 158,
      preco: 29,
    },
    {
      idExterno: 173,
      preco: 9.17,
    },
    {
      idExterno: 179,
      preco: 6.68,
    },
    {
      idExterno: 298,
      preco: 13,
    },
    {
      idExterno: 410,
      preco: 40.652,
    },
    {
      idExterno: 390,
      preco: 200,
    },
    {
      idExterno: 49,
      preco: 7.592,
    },
    {
      idExterno: 400,
      preco: 82.083,
    },
    {
      idExterno: 312,
      preco: 36.61,
    },
  ];

  async function extractPDFData(...file) {
    dispatch({ type: "uploaded/loading", payload: file });

    const form = new FormData();

    file.forEach((file) => {
      form.append("pdf", file);
    });

    form.append("week", JSON.stringify(week));
    form.append("precos", JSON.stringify(precosSecondReportTeste));

    const res = await axios.post("api/v1/extract/extractPDF", form);

    dispatch({ type: "extractedPDF/loaded", payload: res.data.data.pdfData });

    navigate("/overview/relatorios");
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
