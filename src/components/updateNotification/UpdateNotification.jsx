import "./update-notification.css";
import { useCountdown } from "../../contexts/CountDownContext";

const UpdateNotification = ({ isOnline }) => {
  const { countdown } = useCountdown();

  return (
    <div className="countdown-container">
      {countdown <= 1 && <p className="update-done">Updated!</p>}
      {isOnline && countdown > 1 && (
        <p title="Next Update" className="countdown">
          {countdown}
        </p>
      )}
      {!isOnline && <p className="net-down">You are Offline!</p>}
    </div>
  );
};

export default UpdateNotification;
