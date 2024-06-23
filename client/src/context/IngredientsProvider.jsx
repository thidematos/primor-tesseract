import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const IngredientsContext = createContext();

const initials = {
  status: "ready",
  ingredients: [],
  precos: [],
  week: {
    start: "",
    end: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        status: "loading",
      };

    case "changeOnWeek":
      return {
        ...state,
        week: {
          start: action.payload.start || state.week.start,
          end: action.payload.end || state.week.end,
        },
      };

    case "changeOnPreco":
      return {
        ...state,
        precos: state.precos.map((el) => {
          if (el.idExterno === action.payload.currentIngredient.idExterno)
            return {
              ...el,
              preco: action.payload.value,
            };

          return el;
        }),
      };

    case "allPricesToLastWeek":
      return {
        ...state,
        precos: state.precos.map((preco) => {
          return {
            ...preco,
            preco: state.ingredients
              .find((insumo) => insumo.idExterno === preco.idExterno)
              .precoSemana.at(-1).preco,
          };
        }),
      };

    case "fetched/ready":
      return {
        ...state,
        status: "ready",
        ingredients: action.payload,
        precos: Array.from({ length: action.payload.length }, (el, ind) => {
          return {
            idExterno: action.payload[ind].idExterno,
            preco: "",
          };
        }),
      };

    default:
      throw new Error("Unknow action");
  }
}

function IngredientsProvider({ children }) {
  const [{ status, ingredients, precos, week }, dispatch] = useReducer(
    reducer,
    initials,
  );

  const [currentInput, setCurrentInput] = useState(0);

  const getIngredients = useCallback(async () => {
    dispatch({ type: "loading" });

    const res = await axios.get("/api/v1/ingredientes");

    dispatch({ type: "fetched/ready", payload: res.data.data.ingredients });
  }, []);

  const ingredientsSorted = ingredients
    .slice()
    .sort((a, b) => a.idExterno - b.idExterno);

  const getPreco = useCallback(
    (currentIngredient) => {
      return precos[
        precos.findIndex((el) => el.idExterno === currentIngredient.idExterno)
      ].preco;
    },
    [precos],
  );

  const numberToPriceString = useCallback((number) => {
    return `R$ ${String(number.toFixed(3)).replace(".", ",")}`;
  }, []);

  const handleChangePreco = useCallback((currentIngredient, value) => {
    dispatch({
      type: "changeOnPreco",
      payload: {
        value,
        currentIngredient,
      },
    });
  }, []);

  return (
    <IngredientsContext.Provider
      value={{
        status,
        ingredients,
        dispatch,
        getIngredients,
        ingredientsSorted,
        precos,
        getPreco,
        handleChangePreco,
        numberToPriceString,
        week,
        currentInput: {
          state: currentInput,
          setter: setCurrentInput,
        },
      }}
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
