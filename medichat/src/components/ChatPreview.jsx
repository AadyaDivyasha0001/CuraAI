import "../styles/chatpreview.css";

export default function ChatPreview() {
  return (
    <div className="chat-card">

      <div className="message user">
        I've had a sharp headache for 2 days
      </div>

      <div className="message bot">
        Is the pain on one side or all over?
      </div>

      <div className="message user">
        One side and bright light hurts.
      </div>

      <div className="message bot">
        These symptoms align with migraine.
      </div>

    </div>
  );
}