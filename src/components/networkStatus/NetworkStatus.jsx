import { useEffect } from "react";
import "./network-status.css";

const NetworkStatus = ({ isOnline, setIsOnline }) => {
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isOnline, setIsOnline]);

  return (
    <div className="network-status-container">
      <img
        className="network-status"
        src={
          isOnline
            ? "/assets/images/connected.svg"
            : "/assets/images/disconnected.svg"
        }
        alt="network status"
        title={`Network status ${
          isOnline ? "You are Online" : "Your are offline!"
        }`}
      />
    </div>
  );
};

export default NetworkStatus;
