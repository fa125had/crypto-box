import { useNavigate } from "react-router-dom";
import "./button.css";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button className="primary-btn" onClick={() => navigate(-1)}>
      Back
    </button>
  );
};

export default BackButton;
