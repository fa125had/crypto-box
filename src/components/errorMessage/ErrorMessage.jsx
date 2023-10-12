import "./error-message.css";

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="error-message-container">
      <p className="error-message">{message}</p>
      <button className="close-btn" onClick={onClose}>
        close
      </button>
    </div>
  );
};

export default ErrorMessage;
