import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import TopRatedDoctors from "../components/TopRatedDoctors";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import ChatbotWidget from "../components/ChatbotWidget";
import ChatbotModal from "../components/ChatbotModal";
import ChatbotBubble from "../components/ChatbotBubble";
export default function Home() {

  const [chatOpen, setChatOpen] = useState(false);

  const navigate = useNavigate();

  const openChat = () => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {

     toast.error(
  "Please Login or Register to use CuraAI Assistant"
);

      navigate("/login");

      return;
    }

    setChatOpen(true);
  };

  return (
    <>
  <Navbar openChat={openChat} />

  <section className="section">
    <HeroSection
      openChat={openChat}
      navigate={navigate}
    />
  </section>

  <section className="section">
    <HowItWorks />
  </section>

  <section className="section">
    <TopRatedDoctors />
  </section>

  <section className="section">
    <CTASection
      openChat={openChat}
    />
  </section>

  <Footer />
   
   <ChatbotBubble
    openChat={openChat}
/>
  <ChatbotWidget
    openChat={openChat}
  />

  <ChatbotModal
    isOpen={chatOpen}
    onClose={() => setChatOpen(false)}
  />
</>
  );
}