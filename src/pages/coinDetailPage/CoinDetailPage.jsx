import "./coin-details.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCoins } from "../../contexts/CoinsContext";
import CoinLogo from "../../components/coinLogo/CoinLogo";
import BackButton from "../../components/backButton/BackButton";
import { useError } from "../../contexts/ErrorContext";
import { ClipLoader } from "react-spinners";

const CoinDetailPage = () => {
  const { coinsData, loading, selectedVsCurrency } = useCoins();
  const { coinID } = useParams();
  const [coin, setCoin] = useState();
  const { errorMessage, setErrorMessage } = useError();

  // check for errors
  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(errorMessage);
    }
  }, [errorMessage, setErrorMessage]);

  // find the coin from stored data in session storage
  useEffect(() => {
    if (Array.isArray(coinsData)) {
      for (const coin of coinsData) {
        if (coin.id === coinID) {
          setCoin(coin);
        }
      }
    }
  }, [coinID, coinsData]);

  // loading
  if (loading || !coin || !coinsData) {
    return <ClipLoader />;
  }

  // Determine the currency symbol
  const getVsCurrencyLogo = () => {
    switch (selectedVsCurrency) {
      case "usd":
        return "$";
      case "eur":
        return "€";
      case "btc":
        return "₿";
      default:
        return "usd";
    }
  };

  return (
    <div className="coin-detail-container">
      <header className="coin-detail-header">
        <h2 className="coin-detail-title">Detail</h2>
        <BackButton className="back-button" />
      </header>
      <section className="coin-info">
        <CoinLogo src={coin.image} className="coin-logo" />
        <div className="coin-basic-info">
          <p>Name: {coin.name}</p>
          <p>Symbol: {coin.symbol}</p>
          <p>
            Current Price: {coin.current_price}{" "}
            <em className="vsCurrency">{getVsCurrencyLogo()}</em>
          </p>
        </div>
      </section>
      <section className="coin-ath">
        <h3 className="section-title">All-Time High</h3>
        <p>
          ATH: {coin.ath} <em className="vsCurrency">{getVsCurrencyLogo()}</em>
        </p>
        <p>ATH changes(%): {coin.ath_change_percentage}</p>
        <p>ATH Date: {new Date(coin.ath_date).toLocaleDateString()}</p>
      </section>
      <section className="coin-atl">
        <h3 className="section-title">All-Time Low</h3>
        <p>
          ATL: {coin.atl} <em className="vsCurrency">{getVsCurrencyLogo()}</em>
        </p>
        <p>ATL changes(%): {coin.atl_change_percentage}</p>
        <p>ATL Date: {new Date(coin.atl_date).toLocaleDateString()}</p>
      </section>
      <section className="coin-market-cap">
        <h3 className="section-title">Market Cap</h3>
        <p>Market Cap: {coin.market_cap}</p>
        <p>Market Cap Rank: {coin.market_cap_rank}</p>
        <p>Market Cap changes 24h: {coin.market_cap_change_24h}</p>
        <p>
          Market Cap changes 24h(%): {coin.market_cap_change_percentage_24h}
        </p>
      </section>
      <section className="coin-supply">
        <h3 className="section-title">Supply</h3>
        <p>Circulating supply: {coin.circulating_supply}</p>
        <p>Fully diluted valuation: {coin.fully_diluted_valuation}</p>
        <p>Max Supply: {coin.max_supply}</p>
        <p>Total supply: {coin.total_supply}</p>
        <p>Total volume: {coin.total_volume}</p>
      </section>
      {coin.roi && (
        <section className="coin-roi">
          <h3 className="section-title">Return on Investment</h3>
          <p>Currency: {coin.roi.currency}</p>
          <p>Percentage: {coin.roi.percentage}</p>
          <p>Times: {coin.roi.times}</p>
        </section>
      )}
      <section className="coin-changes-24h">
        <h3 className="section-title">24h Changes</h3>
        <section>
          {" "}
          <p>
            High 24h: {coin.high_24h}{" "}
            <em className="vsCurrency">{getVsCurrencyLogo()}</em>
          </p>
          <p>
            Low 24h: {coin.low_24h}{" "}
            <em className="vsCurrency">{getVsCurrencyLogo()}</em>
          </p>
        </section>
        <section>
          <p>
            Price changes 24h: {coin.price_change_24h}
            <em className="vsCurrency">{getVsCurrencyLogo()}</em>
          </p>
          <p>Price changes 24h(%): {coin.price_change_percentage_24h}</p>
        </section>
      </section>
      <section className="coin-last-update">
        <h3 className="section-title">Last Update</h3>
        <p>Last Update: {new Date(coin.last_updated).toLocaleDateString()}</p>
      </section>
    </div>
  );
};

export default CoinDetailPage;
