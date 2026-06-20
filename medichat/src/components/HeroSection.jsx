import "../styles/hero.css";

export default function HeroSection({
  openChat,
  navigate,
}) {
  return (
    <section className="hero">

      <div className="hero-left">

        <div className="badge">
          ✨ AI-powered symptom triage
        </div>

        <h1>
          Tell us what hurts.
          <br />
          <span>
            We'll find the right doctor.
          </span>
        </h1>

        <p>
          CuraAI listens to your symptoms,
          asks the right follow-ups,
          and instantly recommends specialists.
        </p>

        <div className="hero-buttons">

          <button
            className="primary-btn"
            onClick={openChat}
          >
            Start symptom check
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/find-doctor")}
          >
            Browse doctors
          </button>

        </div>

      </div>

    </section>
  );
}