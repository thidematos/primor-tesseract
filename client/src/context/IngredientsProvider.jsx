import axios from "axios";
import { createContext, useCallback, useContext, useReducer } from "react";

const IngredientsContext = createContext();

const initials = {
  status: "ready",
  ingredients: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        status: "loading",
      };

    case "fetched/ready":
      return {
        ...state,
        status: "ready",
        ingredients: action.payload,
      };

    default:
      throw new Error("Unknow action");
  }
}

function IngredientsProvider({ children }) {
  const [{ status, ingredients }, dispatch] = useReducer(reducer, initials);

  const getIngredients = useCallback(async () => {
    dispatch({ type: "loading" });

    const res = await axios.get("/api/v1/ingredientes");

    dispatch({ type: "fetched/ready", payload: res.data.data.ingredients });
  }, []);

  return (
    <IngredientsContext.Provider
      value={{ status, ingredients, dispatch, getIngredients }}
    >
      {children}
    </IngredientsContext.Provider>
  );
}

function useIngredients() {
  const context = useContext(IngredientsContext);

  if (context === undefined) throw new Error("Invalid use of context");

  return context;
}

export { IngredientsProvider, useIngredients };
