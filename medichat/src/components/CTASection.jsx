import "../styles/cta.css";

export default function CTASection({ openChat }) {
  return (
    <section className="cta-section">

      <h2>
        Not sure which doctor you need?
      </h2>

      <p>
        Start a free symptom check with CuraAI.
      </p>

        <button onClick={openChat}>
  Open MediChat
</button>
    </section>
  );
}