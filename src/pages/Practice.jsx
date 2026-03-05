import { useState, useMemo, useEffect, useCallback } from "react";
import { FaCheck, FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaTrophy, FaBookOpen, FaFire } from "react-icons/fa";
import problemsData from "../../leetcode1.json";
import "./Practice.css";

function getSolvedSet() {
  try {
    const data = localStorage.getItem("solvedProblems");
    return data ? new Set(JSON.parse(data)) : new Set();
  } catch {
    return new Set();
  }
}

function saveSolvedSet(solvedSet) {
  localStorage.setItem("solvedProblems", JSON.stringify([...solvedSet]));
}

export default function Practice() {
  const [solved, setSolved] = useState(getSolvedSet);
  const [expandedTopic, setExpandedTopic] = useState(null);

  useEffect(() => {
    saveSolvedSet(solved);
  }, [solved]);

  const toggleSolved = useCallback((id) => {
    setSolved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Group problems by topic
  const topicGroups = useMemo(() => {
    const groups = {};
    problemsData.forEach((p) => {
      if (!p.topic_tags) return;
      const tags = p.topic_tags.replace(/'/g, "").split(",").map((t) => t.trim()).filter(Boolean);
      tags.forEach((tag) => {
        if (!groups[tag]) groups[tag] = [];
        groups[tag].push(p);
      });
    });
    return Object.entries(groups)
      .map(([name, problems]) => ({
        name,
        problems,
        total: problems.length,
        solved: problems.filter((p) => solved.has(p.id)).length,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [solved]);

  const totalSolved = solved.size;
  const totalProblems = problemsData.length;
  const easySolved = problemsData.filter((p) => p.difficulty === "Easy" && solved.has(p.id)).length;
  const mediumSolved = problemsData.filter((p) => p.difficulty === "Medium" && solved.has(p.id)).length;
  const hardSolved = problemsData.filter((p) => p.difficulty === "Hard" && solved.has(p.id)).length;
  const easyTotal = problemsData.filter((p) => p.difficulty === "Easy").length;
  const mediumTotal = problemsData.filter((p) => p.difficulty === "Medium").length;
  const hardTotal = problemsData.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="practice-page">
      <h1 className="practice-title">Practice Dashboard</h1>
      <p className="practice-subtitle">Track your progress across topics and difficulties</p>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card stat-total">
          <FaTrophy className="stat-icon" />
          <div>
            <div className="stat-value">{totalSolved}</div>
            <div className="stat-label">Total Solved</div>
          </div>
          <div className="stat-progress-ring">
            <span>{totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0}%</span>
          </div>
        </div>
        <div className="stat-card stat-easy">
          <FaBookOpen className="stat-icon" />
          <div>
            <div className="stat-value">{easySolved}<span className="stat-total-num"> / {easyTotal}</span></div>
            <div className="stat-label">Easy</div>
          </div>
          <div className="stat-bar">
            <div className="stat-bar-fill easy" style={{ width: `${easyTotal > 0 ? (easySolved / easyTotal) * 100 : 0}%` }}></div>
          </div>
        </div>
        <div className="stat-card stat-medium">
          <FaFire className="stat-icon" />
          <div>
            <div className="stat-value">{mediumSolved}<span className="stat-total-num"> / {mediumTotal}</span></div>
            <div className="stat-label">Medium</div>
          </div>
          <div className="stat-bar">
            <div className="stat-bar-fill medium" style={{ width: `${mediumTotal > 0 ? (mediumSolved / mediumTotal) * 100 : 0}%` }}></div>
          </div>
        </div>
        <div className="stat-card stat-hard">
          <FaFire className="stat-icon" />
          <div>
            <div className="stat-value">{hardSolved}<span className="stat-total-num"> / {hardTotal}</span></div>
            <div className="stat-label">Hard</div>
          </div>
          <div className="stat-bar">
            <div className="stat-bar-fill hard" style={{ width: `${hardTotal > 0 ? (hardSolved / hardTotal) * 100 : 0}%` }}></div>
          </div>
        </div>
      </div>

      {/* Topic Cards */}
      <h2 className="topics-heading">Topics</h2>
      <div className="topic-cards">
        {topicGroups.map((group) => {
          const pct = group.total > 0 ? Math.round((group.solved / group.total) * 100) : 0;
          const isExpanded = expandedTopic === group.name;
          return (
            <div key={group.name} className={`topic-card ${isExpanded ? "expanded" : ""}`}>
              <div
                className="topic-card-header"
                onClick={() => setExpandedTopic(isExpanded ? null : group.name)}
              >
                <div className="topic-info">
                  <h3 className="topic-name">{group.name}</h3>
                  <span className="topic-count">{group.solved} / {group.total} solved</span>
                </div>
                <div className="topic-right">
                  <div className="topic-progress-bar">
                    <div
                      className="topic-progress-fill"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                  <span className="topic-pct">{pct}%</span>
                  {isExpanded ? <FaChevronUp className="topic-chevron" /> : <FaChevronDown className="topic-chevron" />}
                </div>
              </div>
              {isExpanded && (
                <div className="topic-problems">
                  {group.problems.map((p) => {
                    const isSolved = solved.has(p.id);
                    return (
                      <div key={p.id} className={`topic-problem-row ${isSolved ? "solved" : ""}`}>
                        <button
                          className={`solve-btn-sm ${isSolved ? "solved" : ""}`}
                          onClick={() => toggleSolved(p.id)}
                        >
                          <FaCheck />
                        </button>
                        <span className="tp-title">{p.title}</span>
                        <span className={`tp-badge tp-${p.difficulty?.toLowerCase()}`}>{p.difficulty}</span>
                        {p.problem_URL && (
                          <a href={p.problem_URL} target="_blank" rel="noopener noreferrer" className="tp-link">
                            <FaExternalLinkAlt />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
