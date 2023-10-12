import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// Pages
import HomePage from "./pages/homePage/HomePage";
import CoinDetailPage from "./pages/coinDetailPage/CoinDetailPage";
import FavoritesPage from "./pages/favoritesPage/FavoritesPage";
// Contexts
import { VsCurrencyProvider } from "./contexts/VsCurrencyContext";
import { CoinsProvider } from "./contexts/CoinsContext";
import { ErrorProvider } from "./contexts/ErrorContext";
// Components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App = () => {
  const [screenSize, setScreenSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [searchQuery, setSearchQuery] = useState("");

  // update the screen size
  const updateScreenSize = () => {
    setScreenSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  // Add event listener on mount, remove on unmount
  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  return (
    <ErrorProvider>
      <VsCurrencyProvider>
        <CoinsProvider>
          <div className="App" style={screenSize}>
            <Router>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <Routes>
                <Route
                  path="/"
                  element={<HomePage searchQuery={searchQuery} />}
                />
                <Route path="/:coinID" element={<CoinDetailPage />} />
                <Route path="/favList" element={<FavoritesPage />} />
              </Routes>
            </Router>
            <Footer />
          </div>
        </CoinsProvider>
      </VsCurrencyProvider>
    </ErrorProvider>
  );
};

export default App;
