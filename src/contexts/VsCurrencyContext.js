import { createContext, useContext, useState } from "react";

const VsCurrencyContext = createContext();

export const VsCurrencyProvider = ({ children }) => {
  const [selectedVsCurrency, setSelectedVsCurrency] = useState("usd");

  return (
    <VsCurrencyContext.Provider
      value={{ selectedVsCurrency, setSelectedVsCurrency }}
    >
      {children}
    </VsCurrencyContext.Provider>
  );
};

export const useVsCurrency = () => {
  const context = useContext(VsCurrencyContext);
  if (!context) throw new Error("Out of the context");

  return context;
};
