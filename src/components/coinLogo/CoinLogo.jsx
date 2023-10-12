import "./coinLogo.css";

const CoinLogo = ({ src, name }) => {
  return <img className="coin-logo" src={src} alt={name} title={name} />;
};

export default CoinLogo;
