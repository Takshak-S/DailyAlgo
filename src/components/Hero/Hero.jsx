import heroImage from "../../assets/hero-image.png";
import "./Hero.css";

export default function Home() {
  return (
    <section className="hero">
      <div className="call-to-action">
        <h1 className="hero-title">
          Plan Your LeetCode Journey. Don’t Just Grind.
        </h1>

        <p className="hero-description">
          Turn scattered problem-solving into a structured roadmap using
          topic-wise organization and clear progress tracking.
        </p>

        <div className="hero-btn-container">
          <button className="hero-btn">Practice</button>
          <button className="hero-btn btn-2">View Problems</button>
        </div>
      </div>

      <div className="hero-image">
        <img src={heroImage} alt="practice roadmap illustration" />
      </div>
    </section>
  );
}
