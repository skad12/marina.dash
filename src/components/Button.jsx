import { useNavigate } from "react-router-dom";
import "../css/components/button.css";
import "../css/components/index.css";
import Loader from "./Loader";

function Button({
  title,
  disabled,
  loading,
  outline,
  className = "",
  link,
  onClick,
  ...props
}) {
  const navigate = useNavigate();
  return (
    <button
      {...props}
      onClick={link ? () => navigate(link) : onClick}
      disabled={disabled || loading}
      className={`btn f700 ${className} ${
        disabled || loading ? "diabled" : ""
      } ${outline ? "outline" : ""}`}
    >
      {loading ? <Loader className={outline ? "primary" : "white"} /> : title}
    </button>
  );
}

export default Button;
