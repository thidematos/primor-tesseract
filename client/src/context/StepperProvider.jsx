import {
  faCalendarDay,
  faCheck,
  faFileInvoiceDollar,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { createContext, useCallback, useContext, useReducer } from "react";
import UsoIngredientes from "../components/UsoIngredientes";
import FichasMistura from "../components/FichasMistura";
import Intervalo from "../components/Intervalo";
import Analyze from "../components/Analyze";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StepperContext = createContext();

const steps = [
  {
    label: "Uso de ingredientes",
    icon: faFileInvoiceDollar,
    component: <UsoIngredientes />,
  },
  { label: "Fichas de mistura", icon: faFilePdf, component: <FichasMistura /> },
  {
    label: "Intervalo",
    icon: faCalendarDay,
    component: <Intervalo />,
  },
  {
    label: "Analisar",
    icon: faCheck,
    component: <Analyze />,
  },
];

const initials = {
  steps: steps,
  currentStep: 0,
  usoIngredientesFiles: [null, null],
  fichasMisturaFiles: [null, null],
  intervalo: {
    start: null,
    end: null,
  },
  success: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "nextStep":
      if (state.currentStep === state.steps.length - 1) return state;
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };

    case "changeOnDate":
      return {
        ...state,
        intervalo: {
          ...state.intervalo,
          [`${action.payload.relativeTime}`]: action.payload.date,
        },
      };

    case "success":
      return {
        ...state,
        success: true,
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
  const [
    { steps, currentStep, usoIngredientesFiles, fichasMisturaFiles, intervalo },
    dispatch,
  ] = useReducer(reducer, initials);

  const navigate = useNavigate();

  const generateReport = useCallback(async () => {
    const form = new FormData();

    usoIngredientesFiles.forEach((file) => form.append("price", file));
    fichasMisturaFiles.forEach((file) => form.append("pdf", file));

    form.append("week", JSON.stringify(intervalo));

    await axios.post("/api/v1/extract/extractPDF?useAutomate=1", form);

    dispatch({ type: "success" });

    setTimeout(() => {
      navigate("/overview/relatorios");
    }, 2000);
  }, [fichasMisturaFiles, intervalo, usoIngredientesFiles, navigate]);

  return (
    <StepperContext.Provider
      value={{
        steps,
        currentStep,
        dispatch,
        usoIngredientesFiles,
        fichasMisturaFiles,
        intervalo,
        generateReport,
      }}
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
