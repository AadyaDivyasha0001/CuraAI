import { useEffect, useState } from "react";
import "../styles/chatbotBubble.css";
export default function ChatbotBubble({ openChat }) {

  const [visible, setVisible] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setVisible(false);
    }, 800000);

    return () => clearTimeout(timer);

  }, []);

  if (!visible) return null;

  return (

    <div
      className="chatbot-bubble"
      onClick={openChat}
    >

      <button
        className="bubble-close"
        onClick={(e)=>{
          e.stopPropagation();
          setVisible(false);
        }}
      >
        ×
      </button>

      <p>
        👋 Hi there!
      </p>

      <span>
        Need help finding
        <br />
        a doctor?
      </span>

    </div>

  );

}