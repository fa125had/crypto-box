import { useState, useEffect } from "react";
import { useError } from "../contexts/ErrorContext";

export const useCoinGeckoAPI = (vsCurrency, countdown, refreshRate = 120) => {
  const [coinsData, setCoinsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setErrorMessage } = useError();

  // Request config
  const numberOfCoins = 200;
  const pageNumber = 1;
  const baseUrl = "https://api.coingecko.com/api/v3";

  useEffect(() => {
    const fetchData = async () => {
      // CoinGecko API, Coins Market data resource
      const endpoint = `${baseUrl}/coins/markets?vs_currency=${vsCurrency}&order=market_cap_desc&per_page=${numberOfCoins}&page=${pageNumber}&sparkline=false&locale=en`;

      try {
        setLoading(true);
        // Check if already data exist in sessionStorage or not
        const storedData = sessionStorage.getItem(`coinsData-${vsCurrency}`);

        // load data from storage
        if (storedData) {
          setCoinsData(JSON.parse(storedData));
          setLoading(false);
        }

        // check if refresh rate is reached or coin data is not available in session storage
        if (countdown === 0 || !storedData) {
          const currentTime = Date.now();

          // Fetch Coins Data from API
          const response = await fetch(endpoint);

          // Check server response
          if (response.status === 429) {
            throw new Error(
              "You've hit the rate limit. Please wait a few minutes."
            );
          } else if (!response.ok) {
            throw new Error("Something went wrong. Please try again later.");
          }

          const coinsData = await response.json();

          // Save the last fetch time for each pair coin.
          sessionStorage.setItem(`lastFetchTime-${vsCurrency}`, currentTime);

          // Save fresh data to session storage.
          sessionStorage.setItem(
            `coinsData-${vsCurrency}`,
            JSON.stringify(coinsData)
          );
          // update Data state
          setCoinsData(coinsData);
          setLoading(false);
          console.log(`Data loaded from API`);
        }
      } catch (error) {
        setErrorMessage(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [countdown, setErrorMessage, vsCurrency]);

  return { coinsData, loading };
};
