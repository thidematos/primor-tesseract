import axios from "axios";
import { id } from "date-fns/locale";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

const IngredientsContext = createContext();

const initials = {
  status: "ready",
  ingredients: [],
  precos: [],
  week: {
    start: "",
    end: "",
  },
  currentIngredient: null,
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

    case "fetchedSingleIngredient/ready":
      return {
        ...state,
        status: "ready",
        currentIngredient: action.payload,
      };

    default:
      throw new Error("Unknow action");
  }
}

function IngredientsProvider({ children }) {
  const [{ status, ingredients, precos, week, currentIngredient }, dispatch] =
    useReducer(reducer, initials);

  const [currentInput, setCurrentInput] = useState(0);

  const navigate = useNavigate();

  const getIngredients = useCallback(async () => {
    dispatch({ type: "loading" });

    const res = await axios.get("/api/v1/ingredientes");

    dispatch({ type: "fetched/ready", payload: res.data.data.ingredients });
  }, []);

  const getSingleIngredient = useCallback(async (idExterno) => {
    dispatch({ type: "loading" });
    const res = await axios.get(`/api/v1/ingredientes/${idExterno}`);

    dispatch({
      type: "fetchedSingleIngredient/ready",
      payload: res.data.data.ingredient,
    });
  }, []);

  const updateSingleIngredient = useCallback(
    async (idExterno, semanaId, newPrice) => {
      dispatch({ type: "loading" });

      const res = await axios.patch(`/api/v1/ingredientes/${idExterno}`, {
        semanaId,
        newPrice,
      });

      dispatch({
        type: "fetchedSingleIngredient/ready",
        payload: res.data.data.ingredient,
      });

      navigate(`/overview/ingredientes/${idExterno}`);
    },
    [navigate],
  );

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
        getSingleIngredient,
        ingredientsSorted,
        currentIngredient,
        precos,
        getPreco,
        handleChangePreco,
        numberToPriceString,
        updateSingleIngredient,
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
