import { useState, useMemo } from "react";
import { FaTrophy, FaChartBar, FaTrashAlt, FaMedal, FaStar, FaBolt } from "react-icons/fa";
import useSolvedProblems from "../hooks/useSolvedProblems";
import problemsData from "../../leetcode1.json";
import "./Profile.css";

export default function Profile() {
  const { solved, resetAll } = useSolvedProblems();
  const [showConfirm, setShowConfirm] = useState(false);

  const stats = useMemo(() => {
    const total = problemsData.length;
    const solvedCount = solved.size;
    const easy = { total: 0, solved: 0 };
    const medium = { total: 0, solved: 0 };
    const hard = { total: 0, solved: 0 };
    const topicMap = {};

    problemsData.forEach((p) => {
      const d = p.difficulty;
      if (d === "Easy") { easy.total++; if (solved.has(p.id)) easy.solved++; }
      else if (d === "Medium") { medium.total++; if (solved.has(p.id)) medium.solved++; }
      else if (d === "Hard") { hard.total++; if (solved.has(p.id)) hard.solved++; }

      if (p.topic_tags) {
        p.topic_tags.replace(/'/g, "").split(",").map((t) => t.trim()).filter(Boolean).forEach((tag) => {
          if (!topicMap[tag]) topicMap[tag] = { total: 0, solved: 0 };
          topicMap[tag].total++;
          if (solved.has(p.id)) topicMap[tag].solved++;
        });
      }
    });

    const topicBreakdown = Object.entries(topicMap)
      .map(([name, data]) => ({
        name,
        ...data,
        pct: data.total > 0 ? Math.round((data.solved / data.total) * 100) : 0,
      }))
      .sort((a, b) => b.pct - a.pct || a.name.localeCompare(b.name));

    return { total, solvedCount, easy, medium, hard, topicBreakdown };
  }, [solved]);

  const handleReset = () => {
    resetAll();
    setShowConfirm(false);
  };

  const overallPct = stats.total > 0 ? Math.round((stats.solvedCount / stats.total) * 100) : 0;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1 className="profile-title">Your Profile</h1>
        <p className="profile-subtitle">Overview of your LeetCode practice progress</p>
      </div>

      <div className="overall-card">
        <div className="overall-left">
          <FaTrophy className="overall-icon" />
          <div>
            <div className="overall-value">{stats.solvedCount}</div>
            <div className="overall-label">Problems Solved</div>
          </div>
        </div>
        <div className="overall-ring">
          <svg viewBox="0 0 100 100" className="ring-svg">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(31,36,64,0.5)" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="url(#ringGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${overallPct * 2.64} ${264 - overallPct * 2.64}`}
              strokeDashoffset="66"
              style={{ transition: "stroke-dasharray 0.8s ease" }}
            />
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
          </svg>
          <div className="ring-text">{overallPct}%</div>
        </div>
      </div>

      <div className="difficulty-grid">
        <div className="diff-card diff-easy">
          <FaStar className="diff-icon" />
          <div className="diff-info">
            <div className="diff-value">{stats.easy.solved} <span>/ {stats.easy.total}</span></div>
            <div className="diff-label">Easy</div>
            <div className="diff-bar">
              <div className="diff-bar-fill" style={{ width: `${stats.easy.total > 0 ? (stats.easy.solved / stats.easy.total) * 100 : 0}%` }}></div>
            </div>
          </div>
        </div>
        <div className="diff-card diff-medium">
          <FaMedal className="diff-icon" />
          <div className="diff-info">
            <div className="diff-value">{stats.medium.solved} <span>/ {stats.medium.total}</span></div>
            <div className="diff-label">Medium</div>
            <div className="diff-bar">
              <div className="diff-bar-fill" style={{ width: `${stats.medium.total > 0 ? (stats.medium.solved / stats.medium.total) * 100 : 0}%` }}></div>
            </div>
          </div>
        </div>
        <div className="diff-card diff-hard">
          <FaBolt className="diff-icon" />
          <div className="diff-info">
            <div className="diff-value">{stats.hard.solved} <span>/ {stats.hard.total}</span></div>
            <div className="diff-label">Hard</div>
            <div className="diff-bar">
              <div className="diff-bar-fill" style={{ width: `${stats.hard.total > 0 ? (stats.hard.solved / stats.hard.total) * 100 : 0}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="topic-breakdown">
        <h2 className="section-title">
          <FaChartBar className="section-icon" /> Topic Progress
        </h2>
        <div className="topic-list">
          {stats.topicBreakdown.map((t) => (
            <div key={t.name} className="topic-row">
              <span className="topic-row-name">{t.name}</span>
              <div className="topic-row-bar">
                <div className="topic-row-fill" style={{ width: `${t.pct}%` }}></div>
              </div>
              <span className="topic-row-stats">{t.solved}/{t.total}</span>
              <span className="topic-row-pct">{t.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="reset-section">
        {!showConfirm ? (
          <button className="reset-btn" onClick={() => setShowConfirm(true)}>
            <FaTrashAlt /> Reset All Progress
          </button>
        ) : (
          <div className="reset-confirm">
            <p>Are you sure? This will clear all your solved progress.</p>
            <div className="reset-actions">
              <button className="reset-yes" onClick={handleReset}>Yes, Reset</button>
              <button className="reset-no" onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
