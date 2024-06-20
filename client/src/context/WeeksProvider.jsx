import { createContext, useContext, useReducer, useState } from "react";

const WeeksContext = createContext();

const initials = {
  weeks: null,
  status: "",
};

function reducer(state, action) {
  switch (action.type) {
    default:
      throw new Error("Unknow action bros");
  }
}

function WeeksProvider({ children }) {
  const [{ weeks, status }, dispatch] = useReducer(reducer, initials);

  function getWeeks() {}

  return (
    <WeeksContext.Provider value={{ weeks, status, dispatch }}>
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
