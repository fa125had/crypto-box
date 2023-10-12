import "./coin-list.css";
import CoinRow from "../coinRow/CoinRow";
import { useCoins } from "../../contexts/CoinsContext";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useError } from "../../contexts/ErrorContext";

const CoinsList = ({ searchQuery }) => {
  // states for pagination - start page
  const [currentPage, setCurrentPage] = useState(1);
  // states for pagination - coins per page
  const [coinsPerPage] = useState(10);
  // error handler context
  const { errorMessage, setErrorMessage } = useError();
  // coins data context
  const { coinsData, loading, selectedVsCurrency } = useCoins();

  // check for errors
  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(errorMessage);
    }
  }, [errorMessage, setErrorMessage]);

  // Reset currentPage to 1 whenever searchQuery changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  let filteredCoins = coinsData || [];

  // filter coins based on search query
  if (searchQuery && coinsData) {
    filteredCoins = coinsData.filter(
      (coin) =>
        // match with coin's id
        coin.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // match with coin's name
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // match with coin's symbol
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // pagination
  // calculate total pages for all coins
  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

  // last coin's index
  const indexOfLastCoin = currentPage * coinsPerPage;
  // first coin's index
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  // extract coins between first and last index
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  // loading
  if (loading || !coinsData) {
    return <ClipLoader />;
  }

  return (
    <>
      <section className="coin-data-container" id="coins-table">
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
              <th className="header-item change-24h">24h Change</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {currentCoins.map((coin) => {
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
      <div className="pagination-container">
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <div>
          <p className="page-numbers">
            {currentPage} of {totalPages}
          </p>
        </div>
      </div>
    </>
  );
};

export default CoinsList;
