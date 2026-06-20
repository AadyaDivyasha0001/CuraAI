import { Routes, Route } from "react-router-dom";
import DoctorProfile from "./pages/DoctorProfile";
import Home from "./pages/Home";
import FindDoctor from "./pages/FindDoctor";
import Login from "./pages/Login";
import SymptomChecker from "./pages/SymptomChecker";
import Appointments from "./pages/Appointments";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Chatbot from "./pages/Chatbot";
<Route path="/symptom-checker" element={<SymptomChecker />} />

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/find-doctor"
        element={<FindDoctor />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/symptom-check"
        element={<SymptomChecker />}
      />
    
  

      
<Route
  path="/doctor/:id"
  element={<DoctorProfile />}
/>
<Route
  path="/appointments"
  element={<Appointments />}

/>
<Route
  path="/register"
  element={<Register />}
/>

<Route
  path="/login"
  element={<Login />}
/>
<Route
  path="/welcome"
  element={<Welcome />}
/>
<Route
  path="/chatbot"
  element={<Chatbot />}
/>

  </Routes>
);
}
export default App;