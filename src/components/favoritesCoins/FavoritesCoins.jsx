import { useLocalStorage } from "@uidotdev/usehooks";
import { useCoins } from "../../contexts/CoinsContext";
import CoinRow from "../coinRow/CoinRow";
import { useError } from "../../contexts/ErrorContext";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

const FavoritesCoins = ({ searchQuery, setSearchQuery }) => {
  // retrieve all coins data from session storage
  const { coinsData, loading, selectedVsCurrency } = useCoins();
  // error handler context
  const { errorMessage, setErrorMessage } = useError();
  // load fav coins Ids from local storage
  const [favorites] = useLocalStorage("favorites");

  // check for errors
  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(errorMessage);
    }
  }, [errorMessage, setErrorMessage]);

  // search trough fav coins
  let filteredCoins = [];

  if (coinsData && favorites) {
    filteredCoins = coinsData.filter((coin) => favorites.includes(coin.id));

    if (searchQuery) {
      filteredCoins = filteredCoins.filter(
        (coin) =>
          // match with coin's id
          coin.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          // match with coin's name
          coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          // match with coin's symbol
          coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }

  // loading
  if (loading || !coinsData) {
    return <ClipLoader />;
  }

  if (favorites.length === 0) {
    return <h3 style={{marginBlockEnd: '100%'}}>No favorites added yet!</h3>;
  }

  return (
    <section
      className="coin-data-container coin-fav-container"
      id="coins-table"
    >
      <table className="coins-table">
        <thead className="table-head">
          <tr className="table-header-row">
            <th className="header-item">Fav</th>
            <th className="header-item">Logo</th>
            <th className="header-item">Rank</th>
            <th className="header-item">Name</th>
            <th className="header-item">Price</th>
            <th className="header-item">Market Cap</th>
            <th className="header-item">Highest Price(24h)</th>
            <th className="header-item">Lowest Price(24h)</th>
            <th className="header-item change-24h">24h Changes</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {filteredCoins.map((coin) => {
            return (
              <CoinRow
                key={coin.id}
                coin={coin}
                vsCurrency={selectedVsCurrency}
              />
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default FavoritesCoins;
