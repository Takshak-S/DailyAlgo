import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>LeetCode Practice Planner</h3>
          <p>
            A frontend-only tool for structured and intentional DSA practice.
          </p>
        </div>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/problems">Problems</a>
          <a href="/practice">Practice</a>
        </div>

        <div className="footer-socials">
          <a
            href="https://github.com/web-programming"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a
            href="https://linkedin.com/in/web-programming"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://twitter.com/web-programming"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} LeetCode Practice Planner</p>
      </div>
    </footer>
  );
}
