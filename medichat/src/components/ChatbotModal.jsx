import { FaRobot, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/chatbotModal.css";
import axios from "axios";

const user = JSON.parse(
  localStorage.getItem("user")
);

export default function ChatbotModal({
  isOpen,
  onClose,
}) {
  const navigate = useNavigate();
  

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello 👋 I'm CuraAI. Tell me your symptoms.",
    },
  ]);
  useEffect(() => {

  if (!user) return;

  axios
    .get(
      `http://localhost:5000/api/chat-history/${user._id}`
    )
    .then((res) => {

      if (
        res.data &&
        res.data.messages &&
        res.data.messages.length > 0
      ) {

        setMessages(
          res.data.messages
        );

      }

    })
    .catch((err) => {
      console.log(err);
    });

}, []);

  const [input, setInput] = useState("");
   const [waitingForCity, setWaitingForCity] =
  useState(false);

const [specialization, setSpecialization] =
  useState("");
  const sendMessage = async () => {
    if (!user) {
      return null;
    }

    if (!input.trim()) return;
    if (waitingForCity) {

  const doctorsRes =
    await axios.post(
      "http://localhost:5000/api/doctors/by-city",
      {
        city: input,
        specialization,
      }
    );
    const doctors =
  doctorsRes.data.doctors || [];
  console.log(
  "Doctors returned:",
  doctors
);

const fallback =
  doctorsRes.data.fallback;
   setMessages((prev) => [

  ...prev,

  {
    sender: "user",
    text: input,
  },

  ...(fallback
    ? [{
        sender: "bot",
       text:
doctorsRes.data.fallbackMessage
      }]
    : []),

  ...doctors.map(
    (doctor) => ({
      sender: "doctor",
      doctor,
      text: `👨‍⚕️ ${doctor.name}
${doctor.speciality}
⭐ ${doctor.rating}
📍 ${doctor.location}`,
    })
  ),

]);

  

  setWaitingForCity(false);

  setInput("");

  return;
}

    const userMessage = input;
    const commonSymptoms = [
  "fever",
  "headache",
  "cough",
  "cold",
  "chest pain",
  "breathlessness",
  "vomiting",
  "nausea",
  "stomach pain",
  "skin itching",
  "rash",
  "dizziness",
  "fatigue",
  "back pain",
  "joint pain",
  "sore throat",
  "diarrhea",
  "migraine",
  "redness",
  "allergy",
  "infection",
  "pain",
  "skin irritation",
  "throat pain"
];

const isSymptom =
  commonSymptoms.some(symptom =>
    userMessage
      .toLowerCase()
      .includes(symptom)
  );

if (
  !isSymptom &&
  !waitingForCity
) {

  const newMessages = [
    ...messages,

    {
      sender: "user",
      text: userMessage,
    },

    {
      sender: "bot",
      text:
        "👨‍⚕️ I am CuraAI, a medical assistant. Please describe your symptoms (for example: fever, headache, chest pain, skin rash) and I will recommend the appropriate specialist."
    }
  ];

  setMessages(newMessages);

  await axios.post(
    "http://localhost:5000/api/chat-history",
    {
      userId: user._id,
      messages: newMessages,
    }
  );

  setInput("");

  return;
}

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setInput("");

    try {
          const res = await axios.post(
"http://localhost:5000/api/chatbot",
{
symptom:userMessage,


}
);
if (!waitingForCity) {

  setSpecialization(
    res.data.specialization
  );

  setWaitingForCity(true);

  setMessages((prev) => [
    ...prev,

    {
      sender: "bot",
      text:
        res.data.response +
        "\n\n📍 Which city are you from?"
    },
  ]);

  return;
}
        const newMessages = [
  ...messages,

  {
    sender: "user",
    text: userMessage,
  },

  {
    sender: "bot",
    text: res.data.response,
  },

  ...(res.data.doctors || []).map(
    (doctor) => ({
      sender: "doctor",
      doctor,
      text: `👨‍⚕️ ${doctor.name}
${doctor.speciality}
⭐ ${doctor.rating}
📍 ${doctor.location}`,
    })
  ),
];

setMessages(newMessages);

await axios.post(
  "http://localhost:5000/api/chat-history",
  {
    userId: user._id,
    messages: newMessages,
  }
);
   } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Unable to analyze symptoms.",
        },
      ]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-modal">
      <div className="chat-header">
        <div>
          <FaRobot />
          <span>CuraAI Assistant</span>
        </div>

        <button onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.sender === "user"
                ? "user-msg"
                : msg.sender === "doctor"
                ? "doctor-msg"
                : "bot-msg"
            }
            onClick={() => {
              if (
                msg.sender === "doctor" &&
                msg.doctor?._id
              ) {
                navigate(
                  `/doctor/${msg.doctor._id}`
                );
              }
            }}
            style={{
              cursor:
                msg.sender === "doctor"
                  ? "pointer"
                  : "default",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input
          value={input}
          placeholder="Describe your symptoms..."
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            sendMessage()
          }
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}