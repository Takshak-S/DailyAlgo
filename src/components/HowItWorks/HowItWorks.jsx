import "./HowItWorks.css";

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <h2 className="how-title">How the Planner Works</h2>

      <div className="steps-container">
        <div className="step-card">
          <span className="step-number">1</span>
          <h3>Choose a Topic & Difficulty</h3>
          <p>
            Browse problems grouped by topic and difficulty to plan your
            practice intentionally.
          </p>
        </div>

        <div className="step-card">
          <span className="step-number">2</span>
          <h3>Practice Selected Problems</h3>
          <p>
            Focus on one set of problems at a time without jumping randomly
            between topics.
          </p>
        </div>

        <div className="step-card">
          <span className="step-number">3</span>
          <h3>Mark Your Progress</h3>
          <p>
            Mark problems as solved or unsolved. Your progress is saved locally
            in the browser.
          </p>
        </div>
      </div>
    </section>
  );
}
