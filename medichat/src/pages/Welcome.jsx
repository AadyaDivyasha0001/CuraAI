import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
import "../styles/welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="welcome-page">

      <div className="welcome-card">

        <div className="welcome-icon">
          <FaHeartbeat />
        </div>

        <h1>
          Welcome, {user?.name || "User"} 👋
        </h1>

        <h2>CuraAI</h2>

        <p>
          Your AI-powered healthcare companion.
          Connecting you with trusted doctors,
          smarter diagnosis assistance and
          seamless appointment booking.
        </p>

        <div className="loader"></div>

        <span>
          Redirecting to homepage...
        </span>

      </div>

    </div>
  );
}