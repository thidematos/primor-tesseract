import {
  faCalendarDay,
  faCheck,
  faFileInvoiceDollar,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { createContext, useContext, useReducer } from "react";
import UsoIngredientes from "../components/UsoIngredientes";

const StepperContext = createContext();

const steps = [
  {
    label: "Uso de ingredientes",
    icon: faFileInvoiceDollar,
    component: <UsoIngredientes />,
  },
  { label: "Fichas de mistura", icon: faFilePdf, component: <p>oi 1.5</p> },
  {
    label: "Intervalo",
    icon: faCalendarDay,
    component: <p>oi 2</p>,
  },
  {
    label: "Analisar",
    icon: faCheck,
    component: <p>oi 3</p>,
  },
];

const initials = {
  steps: steps,
  currentStep: 0,
  usoIngredientesFiles: [null, null],
};

function reducer(state, action) {
  switch (action.type) {
    case "nextStep":
      if (state.currentStep === state.steps.length - 1) return state;
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };

    case "uploadFile":
      return {
        ...state,
        [`${action.payload.to}`]: state[action.payload.to].map((el, ind) => {
          if (ind !== action.payload.indexOnState) return el;

          return action.payload.file;
        }),
      };

    default:
      throw new Error("Unknown action");
  }
}

function StepperProvider({ children }) {
  const [{ steps, currentStep, usoIngredientesFiles }, dispatch] = useReducer(
    reducer,
    initials,
  );

  return (
    <StepperContext.Provider
      value={{ steps, currentStep, dispatch, usoIngredientesFiles }}
    >
      {children}
    </StepperContext.Provider>
  );
}

function useStepper() {
  const context = useContext(StepperContext);

  if (context === undefined) throw new Error("Wrong use of Context");

  return context;
}

export { StepperProvider, useStepper };
