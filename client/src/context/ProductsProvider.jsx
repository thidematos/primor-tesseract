import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";

const ProductContext = createContext();

const initials = {
  products: null,
  status: "ready",
  weeks: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "fetching/loading":
      return {
        ...state,
        status: "loading",
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
  const [{ products, status, weeks }, dispatch] = useReducer(reducer, initials);

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

  const getWeekPdfs = useCallback(async (id) => {
    //dispatch({ type: "fetching/loading" });

    const res = await axios.get(`/api/v1/semanas/weekPdfs/${id}`);

    const blob = new Blob([res.data.data.buffer], { type: "application/pdf" });

    console.log(blob);

    console.log(window.URL.createObjectURL(blob));
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        status,
        weeks,
        dispatch,
        getWeeks,
        getAllProducts,
        getWeekPdfs,
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
