import { FaCheck } from "react-icons/fa";
import "./SolveButton.css";

export default function SolveButton({ isSolved, onToggle, size = "md" }) {
  return (
    <button
      className={`solve-toggle ${size === "sm" ? "solve-toggle-sm" : ""} ${isSolved ? "solved" : ""}`}
      onClick={onToggle}
      title={isSolved ? "Mark unsolved" : "Mark solved"}
    >
      <FaCheck />
    </button>
  );
}
