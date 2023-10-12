import CoinsList from "../../components/coinsList/CoinsList";

const HomePage = ({ searchQuery }) => {
  return (
    <main className="main-container">
      <CoinsList searchQuery={searchQuery} />
    </main>
  );
};

export default HomePage;
