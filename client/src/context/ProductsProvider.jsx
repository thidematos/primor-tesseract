import axios from "axios";
import { createContext, useCallback, useContext, useReducer } from "react";

const ProductContext = createContext();

const initials = {
  products: null,
  status: "ready",
};

function reducer(state, action) {
  switch (action.type) {
    case "fetching/loading":
      return {
        ...state,
        status: "loading",
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
  const [{ products, status }, dispatch] = useReducer(reducer, initials);

  const getAllProducts = useCallback(async () => {
    dispatch({ type: "fetching/loading" });

    const res = await axios.get("/api/v1/produtos");

    dispatch({
      type: "fetchedProducts/loaded",
      payload: res.data.data.produtos,
    });
  }, []);

  const sortedProducts = products
    ?.slice()
    .sort((a, b) => a.idExterno - b.idExterno);

  const createSegment = useCallback((type, lastWeekArray, actualWeekArray) => {
    const usedId = [];
    return (
      lastWeekArray?.[type]
        .map((el) => {
          usedId.push(el.insumo);
          return el;
        })
        .concat(
          ...actualWeekArray[type].filter((el) => !usedId.includes(el.insumo)),
        ) || actualWeekArray[type]
    );
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        sortedProducts,
        status,
        dispatch,
        getAllProducts,
        createSegment,
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
