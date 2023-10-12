import "./coinRow.css";
import CoinLogo from "../coinLogo/CoinLogo";
import CoinName from "../coinName/CoinName";
import CoinSymbol from "../coinSymbol/CoinSymbol";
import CoinRank from "../coinRank/CoinRank";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

const CoinRow = ({ coin, vsCurrency }) => {
  const navigate = useNavigate();
  // list of favorites coins IDs
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [isFavorite, setIsFavorite] = useState(false);

  // check if the coin is in fav list or not
  useEffect(() => {
    setIsFavorite(favorites.includes(coin.id));
  }, [favorites, coin.id]);

  // Toggle favorite status
  const toggleFavorite = (event) => {
    event.stopPropagation();

    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav !== coin.id)
      : [...favorites, coin.id];

    setFavorites(updatedFavorites);
    setIsFavorite(!isFavorite);
  };

  // Navigate to coin detail page
  const handleClick = () => {
    navigate(`/${coin.id}`);
  };

  // Determine the currency symbol
  const getVsCurrencyLogo = () => {
    switch (vsCurrency) {
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

  // Format numbers
  const formatNumbers = (number) => {
    return number && Math.abs(number) < 1
      ? number.toFixed(4)
      : number.toFixed(2);
  };

  // Determine favorite icon source
  const favoriteIconSrc = isFavorite
    ? "/assets/images/favorite-filled.svg"
    : "/assets/images/favorite-regular.svg";

  return (
    <tr className="coin-row" onClick={handleClick}>
      <td
        className="fav-img-wrapper"
        onClick={(event) => toggleFavorite(event)}
      >
        <img className="favorite-icon" src={favoriteIconSrc} alt="favorite" />
      </td>

      <td className="rank-wrapper">
        <CoinRank coinRank={coin.market_cap_rank} />
      </td>

      <td className="logo-wrapper">
        <CoinLogo src={coin.image} name={coin.name} />
      </td>

      <td className="name-wrapper">
        <CoinName name={coin.name} />
        <CoinSymbol coinSymbol={coin.symbol} />
      </td>

      <td className="price-wrapper">
        <p>
          {coin.current_price}
          <em className="vsCurrency">{getVsCurrencyLogo()}</em>
        </p>
      </td>

      <td className="marketCap-wrapper">
        <p>{(coin.market_cap / 1000000).toFixed(2)}m</p>
      </td>

      <td className="highest-24h">
        {coin.high_24h}
        <em className="vsCurrency">{getVsCurrencyLogo()}</em>
      </td>
      <td className="lowest-24h">
        {coin.low_24h}
        <em className="vsCurrency">{getVsCurrencyLogo()}</em>
      </td>

      <td className="profit-loss-24h">
        <div className="percentage">{coin.price_change_percentage_24h}%</div>
        <div className="amount">
          {formatNumbers(coin.price_change_24h)}
          {getVsCurrencyLogo()}
        </div>
      </td>
    </tr>
  );
};

export default CoinRow;
