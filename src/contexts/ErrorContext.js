import React, { createContext, useContext } from "react";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import { useState } from "react";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClose = () => {
    setErrorMessage(false);
  };

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      {children}
      {errorMessage && (
        <ErrorMessage message={errorMessage} onClose={handleClose} />
      )}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error("Out of the context");
  }

  return context;
};
