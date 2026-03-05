import "./DifficultyBadge.css";

export default function DifficultyBadge({ difficulty }) {
  return (
    <span className={`diff-badge diff-badge-${difficulty?.toLowerCase()}`}>
      {difficulty}
    </span>
  );
}
