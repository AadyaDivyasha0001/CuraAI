import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import toast from "react-hot-toast";
export default function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

     localStorage.setItem(
  "token",
  res.data.token
);

localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);
toast.success(
  "Login Successful"
);

window.location.href = "/welcome";


    } catch (error) {
  console.log(error.response?.data);
toast.error(
  error.response?.data?.message ||
  "Login Failed"
);
}
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>CuraAI</h1>

        <h2>Welcome Back</h2>

        <p>
          Sign in to continue
        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={login}
        >
          Sign In
        </button>
        <p>
          New User?
          <Link to="/register">
          Register Now
           </Link>
                 </p>

        

      </div>

    </div>
  );
}