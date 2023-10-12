import { createContext, useContext, useState, useEffect } from "react";
import { useCoinGeckoAPI } from "../hooks/useCoinGeckoAPI.js";
import { useVsCurrency } from "./VsCurrencyContext.js";

export const CountdownContext = createContext();

export const CountdownProvider = ({ children }) => {
  // fetch from api refresh rate (second)
  const refreshRate = 120;

  const [countdown, setCountdown] = useState(120);

  // vsCurrency context
  const { selectedVsCurrency } = useVsCurrency();

  // uesApi custom hook
  useCoinGeckoAPI(selectedVsCurrency, countdown);

  // countdown handler
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      } else {
        setCountdown(refreshRate);
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown, refreshRate]);

  return (
    <CountdownContext.Provider value={{ countdown, setCountdown }}>
      {children}
    </CountdownContext.Provider>
  );
};

export const useCountdown = () => {
  const context = useContext(CountdownContext);
  if (!context) {
    throw new Error("useCountdown must be used within a CountdownProvider");
  }
  return context;
};
