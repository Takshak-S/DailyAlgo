import { Link } from "react-router-dom";
import { FaSearch, FaFilter, FaCheckCircle, FaSave } from "react-icons/fa";
import heroImage from "../assets/hero-image.png";
import "./Home.css";

const features = [
  {
    icon: <FaSearch />,
    title: "Browse Problems by Topic",
    desc: "View problems grouped by DSA topics to avoid random and unstructured practice.",
  },
  {
    icon: <FaFilter />,
    title: "Filter by Difficulty",
    desc: "Narrow down problems based on Easy, Medium, or Hard to practice at your own pace.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Mark Problems as Solved",
    desc: "Track which problems you have completed and which ones need more practice.",
  },
  {
    icon: <FaSave />,
    title: "Track Progress Locally",
    desc: "Your progress is saved in the browser using local storage — no login required.",
  },
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="call-to-action">
          <h1 className="hero-title">
            Plan Your LeetCode Journey. Don't Just Grind.
          </h1>
          <p className="hero-description">
            Turn scattered problem-solving into a structured roadmap using
            topic-wise organization and clear progress tracking.
          </p>
          <div className="hero-btn-container">
            <Link to="/practice">
              <button className="hero-btn">Practice</button>
            </Link>
            <Link to="/problems">
              <button className="hero-btn btn-2">View Problems</button>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="practice roadmap illustration" />
        </div>
      </section>

      <section className="why-planner">
        <h2 className="why-title">
          Why Most LeetCode Practice Feels Unproductive
        </h2>
        <div className="why-container">
          <div className="why-box problem">
            <h3>The Problem</h3>
            <ul>
              <li>Solving problems randomly</li>
              <li>Jumping between topics</li>
              <li>Forgetting previously solved problems</li>
              <li>No clear sense of progress</li>
            </ul>
          </div>
          <div className="why-box solution">
            <h3>What This Planner Fixes</h3>
            <ul>
              <li>Topic-wise problem organization</li>
              <li>Manual practice planning</li>
              <li>Solved / unsolved tracking</li>
              <li>Clear visual progress</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="how-title">How the Planner Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <span className="step-number">1</span>
            <h3>Choose a Topic &amp; Difficulty</h3>
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

      <section className="features">
        <h2 className="features-title">What You Can Do Inside</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
