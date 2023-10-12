import "./header.css";
import NetworkStatus from "../networkStatus/NetworkStatus";
import VsCurrencySelector from "../vsCurrencySelector/VsCurrencySelector";
import SearchBox from "../searchBox/SearchBox";
import UpdateNotification from "../updateNotification/UpdateNotification";
import NavBar from "../navBar/NavBar";
import { CountdownProvider } from "../../contexts/CountDownContext";
import { useState } from "react";

const Header = ({ searchQuery, setSearchQuery }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  return (
    <header className="header-container">
      <div className="header">
        <div className="left-section">
          <VsCurrencySelector />
        </div>

        <div className="nav-section">
          <NavBar />
        </div>

        <div className="right-section">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className="center-section">
          <NetworkStatus isOnline={isOnline} setIsOnline={setIsOnline} />
          <CountdownProvider>
            <UpdateNotification isOnline={isOnline} />
          </CountdownProvider>
        </div>
      </div>
    </header>
  );
};

export default Header;
