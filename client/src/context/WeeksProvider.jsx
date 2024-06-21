import axios from "axios";
import { format } from "date-fns";
import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";

const WeeksContext = createContext();

const initials = {
  weeks: null,
  currentWeek: null,
  status: "",
  download: false,
  lastWeek: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "fetching/loading":
      return {
        ...state,
        status: "loading",
      };

    case "fetchedAllWeeks/loaded":
      return {
        ...state,
        status: "ready",
        weeks: action.payload,
      };

    case "fetchedCurrentWeek/loaded":
      return {
        ...state,
        status: "ready",
        currentWeek: action.payload,
      };

    case "fetchedLastWeek/loaded":
      return {
        ...state,
        status: "ready",
        lastWeek: action.payload,
      };

    case "download":
      return {
        ...state,
        download: action.payload,
      };

    default:
      throw new Error("Unknow action bros");
  }
}

function WeeksProvider({ children }) {
  const [{ weeks, status, currentWeek, download, lastWeek }, dispatch] =
    useReducer(reducer, initials);

  const getAllWeeks = useCallback(async () => {
    dispatch({ type: "fetching/loading" });

    const res = await axios.get(`/api/v1/semanas`);

    dispatch({ type: "fetchedAllWeeks/loaded", payload: res.data.data.semana });
  }, []);

  const getWeek = useCallback(async (id, lastWeek = false) => {
    dispatch({ type: "fetching/loading" });

    const res = await axios.get(`/api/v1/semanas/${id}`);

    if (lastWeek) {
      return dispatch({
        type: "fetchedLastWeek/loaded",
        payload: res.data.data.semana,
      });
    }

    dispatch({
      type: "fetchedCurrentWeek/loaded",
      payload: res.data.data.semana,
    });
  }, []);

  const getWeekPdfs = useCallback(async () => {
    dispatch({ type: "download", payload: true });

    const pdfs = Array.from({ length: 2 });

    const promises = pdfs.map(async (_, ind) => {
      const res = await axios.get(
        `/api/v1/semanas/weekPdfs/${currentWeek._id}?pdf=${ind + 1}`,
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
      a.download = `${format(currentWeek.intervalo.inicio, "dd'-'MM'-'yyyy")}-${ind + 1}.pdf`;
      a.click();
      window.URL.revokeObjectURL(blob);
    });

    dispatch({ type: "download", payload: false });
  }, [currentWeek]);

  return (
    <WeeksContext.Provider
      value={{
        weeks,
        status,
        currentWeek,
        lastWeek,
        download,
        dispatch,
        getWeekPdfs,
        getWeek,
        getAllWeeks,
      }}
    >
      {children}
    </WeeksContext.Provider>
  );
}

function useWeeks() {
  const context = useContext(WeeksContext);

  if (context === undefined) throw new Error("Invalid use of context");

  return context;
}

export { WeeksProvider, useWeeks };
