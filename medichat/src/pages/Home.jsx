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
      <Navbar
        openChat={openChat}
      />

      <HeroSection
        openChat={openChat}
        navigate={navigate}
      />

      <HowItWorks />

      <TopRatedDoctors />

      <CTASection
        openChat={openChat}
      />

      <Footer />

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