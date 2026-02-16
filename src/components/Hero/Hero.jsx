import heroImage from "../../assets/hero-image.png";
import "./Hero.css";

export default function Home() {
  return (
    <div className="hero">
      <div className="call-to-action">
        <h1 className="hero-title">
          Plan Your Leetcode Journey. Don't Just Grind.
        </h1>
        <p className="hero-description">
          Turn scattered problem-solving into a structured roadmap based on your
          goals, weakness, and deadlines.
        </p>
        <div className="hero-btn-container">
          <button className="hero-btn btn-1">Practice</button>
          <button className="hero-btn btn-2">View Problems</button>
        </div>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="roadmap" />
      </div>
    </div>
  );
}
