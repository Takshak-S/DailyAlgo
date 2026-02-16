import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title">LeetCode Practice Planner</div>
      <ul className="navbar-links-container">
        <li className="navbar-link">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-link">
          <Link to="/problems">Problems</Link>
        </li>
        <li className="navbar-link">
          <Link to="/practice">Practice</Link>
        </li>
        <li className="navbar-link">
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
