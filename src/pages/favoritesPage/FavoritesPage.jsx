import { useState } from "react";
import FavoritesCoins from "../../components/favoritesCoins/FavoritesCoins";

const FavoritesPage = () => {
  const [searchQuery] = useState("");
  return (
    <main className="main-container">
      <FavoritesCoins searchQuery={searchQuery} />
    </main>
  );
};

export default FavoritesPage;
