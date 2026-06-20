import "../styles/howitworks.css";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Describe your symptoms",
      desc: "Type how you feel. CuraAI asks smart follow-up questions."
    },
    {
      number: "02",
      title: "Get smart suggestions",
      desc: "We analyze symptoms to find the right specialist."
    },
    {
      number: "03",
      title: "Book the closest free slot",
      desc: "See doctors near you and book instantly."
    }
  ];

  return (
    <section
  id="how-it-works"
  className="how-section"
>
      <h2>How CuraAI works</h2>
      <p>From symptom to specialist in under a minute.</p>

      <div className="steps-grid">
        {steps.map((step) => (
          <div className="step-card" key={step.number}>
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}