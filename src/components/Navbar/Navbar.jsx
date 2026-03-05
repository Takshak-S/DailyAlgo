import { NavLink } from "react-router-dom";
import { FaCode } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <FaCode className="navbar-logo-icon" />
        <span className="navbar-title">DailyAlgo</span>
      </NavLink>
      <ul className="navbar-links-container">
        <li className="navbar-link">
          <NavLink to="/" end>Home</NavLink>
        </li>
        <li className="navbar-link">
          <NavLink to="/problems">Problems</NavLink>
        </li>
        <li className="navbar-link">
          <NavLink to="/practice">Practice</NavLink>
        </li>
        <li className="navbar-link">
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>
    </nav>
  );
}
