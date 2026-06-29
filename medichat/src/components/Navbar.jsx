import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "../styles/navbar.css";

export default function Navbar({ openChat }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const navigate = useNavigate();

  const [showMenu, setShowMenu] =
    useState(false);

  const menuRef = useRef(null);

  useEffect(() => {

    function handleClickOutside(e) {

      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  return (

    <nav className="navbar">

      <div className="logo">

        <div className="logo-circle">
          ⚕
        </div>

        <h2>
          Cura<span>AI</span>
        </h2>

      </div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/find-doctor">
          Find a doctor
        </Link>

        <span
          className="nav-link-btn"
          onClick={openChat}
        >
          AI Symptom Check
        </span>

        <Link to="/appointments">
          Appointments
        </Link>

      </div>

      <div className="auth-section">

        {user ? (

          <>

            <div
              className="user-profile"
              ref={menuRef}
            >

              <div
                className="profile-trigger"
                onClick={() =>
                  setShowMenu(!showMenu)
                }
              >

                <div className="user-avatar">
                  {user?.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <span>
                  {user.name}
                </span>

                <span className="dropdown-arrow">
                  ▼
                </span>

              </div>

              {showMenu && (

                <div className="profile-dropdown">

                  <div
                    className="dropdown-item"
                    onClick={() => {

                      navigate("/profile");

                      setShowMenu(false);

                    }}
                  >
                    👤 My Profile
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => {

                      navigate("/appointments");

                      setShowMenu(false);

                    }}
                  >
                    📅 My Appointments
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => {

                      navigate("/reports");

                      setShowMenu(false);

                    }}
                  >
                    📄 Medical Reports
                  </div>

                </div>

              )}

            </div>

            <button
              className="logout-btn"
              onClick={() => {

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                window.location.href = "/";

              }}
            >
              Logout
            </button>

          </>

        ) : (

          <Link
            to="/login"
            className="login-btn"
          >
            Login
          </Link>

        )}

        <button
          className="start-btn"
          onClick={() => {

            if (!user) {

              window.location.href =
                "/register";

              return;

            }

            const section =
              document.getElementById(
                "how-it-works"
              );

            if (section) {

              section.scrollIntoView({
                behavior: "smooth",
              });

            }

          }}
        >
          Get Started
        </button>

      </div>

    </nav>

  );

}