import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";
import { format } from "date-fns";

const ProductContext = createContext();

const initials = {
  products: null,
  status: "ready",
  weeks: null,
  download: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "fetching/loading":
      return {
        ...state,
        status: "loading",
      };

    case "download":
      return {
        ...state,
        download: action.payload,
      };

    case "fetchedWeeks/loaded":
      return {
        ...state,
        status: "ready",
        weeks: action.payload,
      };

    case "fetchedProducts/loaded":
      return {
        ...state,
        status: "ready",
        products: action.payload,
      };

    default:
      throw new Error("Unknow action bros");
  }
}

function ProductsProvider({ children }) {
  const [{ products, status, weeks, download }, dispatch] = useReducer(
    reducer,
    initials,
  );

  const getWeeks = useCallback(async (id) => {
    dispatch({ type: "fetching/loading" });

    const res = await axios.get(`/api/v1/semanas${id ? `/${id}` : ""}`);

    dispatch({ type: "fetchedWeeks/loaded", payload: res.data.data.semana });
  }, []);

  const getAllProducts = useCallback(async () => {
    dispatch({ type: "fetching/loading" });

    const res = await axios.get("/api/v1/produtos");

    dispatch({
      type: "fetchedProducts/loaded",
      payload: res.data.data.produtos,
    });
  }, []);

  const getWeekPdfs = useCallback(async () => {
    if (weeks.length > 0) return;

    dispatch({ type: "download", payload: true });

    const pdfs = Array.from({ length: 2 });

    const promises = pdfs.map(async (_, ind) => {
      const res = await axios.get(
        `/api/v1/semanas/weekPdfs/${weeks._id}?pdf=${ind + 1}`,
        {
          responseType: "arraybuffer",
        },
      );

      const blob = new Blob([res.data], { type: "application/pdf" });

      return window.URL.createObjectURL(blob);
    });

    const blobs = await Promise.all(promises);

    blobs.forEach((blob, ind) => {
      const a = document.createElement("a");
      a.href = blob;
      a.download = `${format(weeks.intervalo.inicio, "dd'-'MM'-'yyyy")}-${ind + 1}.pdf`;
      a.click();
      window.URL.revokeObjectURL(blob);
    });

    dispatch({ type: "download", payload: false });

    console.log(blobs);
  }, [weeks]);

  const sortedProducts = products
    ?.slice()
    .sort((a, b) => a.idExterno - b.idExterno);

  return (
    <ProductContext.Provider
      value={{
        products,
        sortedProducts,
        status,
        weeks,
        dispatch,
        getWeeks,
        getAllProducts,
        getWeekPdfs,
        download,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

function useProducts() {
  const context = useContext(ProductContext);

  if (context === undefined) throw new Error("Invalid use of context");

  return context;
}

export { ProductsProvider, useProducts };
