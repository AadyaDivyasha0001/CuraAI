import { FaRobot } from "react-icons/fa";
import "../styles/chatbot.css";

export default function ChatbotWidget({ openChat }) {
  return (
    <div
      className="robot-button"
      onClick={openChat}
    >
      <FaRobot />
    </div>
  );
}