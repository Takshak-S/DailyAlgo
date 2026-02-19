import "./WhyPlanner.css";

const WhyPlanner = () => {
  return (
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
  );
};

export default WhyPlanner;
