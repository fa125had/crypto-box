import CoinsList from "../../components/coinsList/CoinsList";

const HomePage = ({ searchQuery }) => {
  return (
    <main className="main-container">
      <header className="main-header">
        <h1 className="main-title">First 200 Cryptos!</h1>
      </header>
      <CoinsList searchQuery={searchQuery} />
    </main>
  );
};

export default HomePage;
