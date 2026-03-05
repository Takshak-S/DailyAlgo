import { FaSearch, FaFilter, FaCheckCircle, FaSave } from "react-icons/fa";
import "./Features.css";

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

export default function Features() {
  return (
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
  );
}
