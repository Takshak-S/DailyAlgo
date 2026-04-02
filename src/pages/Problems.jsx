import { useState, useMemo, useEffect } from "react";
import { FaSearch, FaExternalLinkAlt, FaSortUp, FaSortDown, FaSort, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useSolvedProblems from "../hooks/useSolvedProblems";
import DifficultyBadge from "../components/DifficultyBadge";
import SolveButton from "../components/SolveButton";
import problemsData from "../../leetcode1.json";
import "./Problems.css";

const ITEMS_PER_PAGE = 50;

const allTopics = (() => {
  const topicSet = new Set();
  problemsData.forEach((p) => {
    if (p.topic_tags) {
      p.topic_tags
        .replace(/'/g, "")
        .split(",")
        .forEach((t) => {
          const trimmed = t.trim();
          if (trimmed) topicSet.add(trimmed);
        });
    }
  });
  return [...topicSet].sort();
})();

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export default function Problems() {
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const { solved, toggleSolved } = useSolvedProblems();

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredData = useMemo(() => {
    let result = problemsData;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (selectedDifficulty) {
      result = result.filter((p) => p.difficulty === selectedDifficulty);
    }

    if (selectedTopic) {
      result = result.filter((p) => {
        if (!p.topic_tags) return false;
        const tags = p.topic_tags.replace(/'/g, "").split(",").map((t) => t.trim());
        return tags.includes(selectedTopic);
      });
    }

    result = [...result].sort((a, b) => {
      const dir = sortConfig.direction === "asc" ? 1 : -1;
      const key = sortConfig.key;
      if (key === "title") return dir * a.title.localeCompare(b.title);
      if (key === "difficulty") {
        const order = { Easy: 1, Medium: 2, Hard: 3 };
        return dir * ((order[a.difficulty] || 0) - (order[b.difficulty] || 0));
      }
      if (key === "acceptance") return dir * ((a.acceptance || 0) - (b.acceptance || 0));
      return dir * (a.id - b.id);
    });

    return result;
  }, [search, selectedDifficulty, selectedTopic, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedDifficulty, selectedTopic]);

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <FaSort className="sort-icon" />;
    return sortConfig.direction === "asc" ? (
      <FaSortUp className="sort-icon active" />
    ) : (
      <FaSortDown className="sort-icon active" />
    );
  };

  return (
    <div className="problems-page">
      <div className="problems-header">
        <h1 className="problems-title">Problems</h1>
        <p className="problems-subtitle">
          {filteredData.length} problems found • {solved.size} / {problemsData.length} solved
        </p>
      </div>

      <div className="filters-bar">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <div className="difficulty-chips">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                className={`chip chip-${d.toLowerCase()} ${selectedDifficulty === d ? "active" : ""}`}
                onClick={() => setSelectedDifficulty(selectedDifficulty === d ? "" : d)}
              >
                {d}
              </button>
            ))}
          </div>

          <select
            className="topic-select"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            <option value="">All Topics</option>
            {allTopics.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="problems-table">
          <thead>
            <tr>
              <th className="th-status">Status</th>
              <th className="th-id sortable" onClick={() => handleSort("id")}>
                # <SortIcon column="id" />
              </th>
              <th className="th-title sortable" onClick={() => handleSort("title")}>
                Title <SortIcon column="title" />
              </th>
              <th className="th-difficulty sortable" onClick={() => handleSort("difficulty")}>
                Difficulty <SortIcon column="difficulty" />
              </th>
              <th className="th-acceptance sortable" onClick={() => handleSort("acceptance")}>
                Acceptance <SortIcon column="acceptance" />
              </th>
              <th className="th-topic">Topics</th>
              <th className="th-link">Link</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((problem) => {
              const isSolved = solved.has(problem.id);
              const tags = problem.topic_tags
                ? problem.topic_tags.replace(/'/g, "").split(",").map((t) => t.trim()).filter(Boolean)
                : [];
              return (
                <tr key={problem.id} className={isSolved ? "row-solved" : ""}>
                  <td className="td-status">
                    <SolveButton isSolved={isSolved} onToggle={() => toggleSolved(problem.id)} />
                  </td>
                  <td className="td-id">{problem.id}</td>
                  <td className="td-title">{problem.title.split(".")[1]}</td>
                  <td className="td-difficulty">
                    <DifficultyBadge difficulty={problem.difficulty} />
                  </td>
                  <td className="td-acceptance">
                    {problem.acceptance != null ? `${problem.acceptance}%` : "—"}
                  </td>
                  <td className="td-topic">
                    <div className="topic-tags">
                      {tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="topic-tag"
                          onClick={() => setSelectedTopic(tag)}
                          title={`Filter by ${tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                      {tags.length > 3 && (
                        <span className="topic-tag more">+{tags.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="td-link">
                    {problem.problem_URL && (
                      <a href={problem.problem_URL} target="_blank" rel="noopener noreferrer" className="link-btn" title="Open on LeetCode">
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button className="page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
            <FaChevronLeft />
          </button>
          <div className="page-numbers">
            {(() => {
              const pages = [];
              const maxVisible = 7;
              let start = Math.max(1, currentPage - 3);
              let end = Math.min(totalPages, start + maxVisible - 1);
              if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);
              if (start > 1) {
                pages.push(<button key={1} className="page-num" onClick={() => setCurrentPage(1)}>1</button>);
                if (start > 2) pages.push(<span key="dots1" className="page-dots">…</span>);
              }
              for (let i = start; i <= end; i++) {
                pages.push(
                  <button key={i} className={`page-num ${currentPage === i ? "active" : ""}`} onClick={() => setCurrentPage(i)}>{i}</button>
                );
              }
              if (end < totalPages) {
                if (end < totalPages - 1) pages.push(<span key="dots2" className="page-dots">…</span>);
                pages.push(<button key={totalPages} className="page-num" onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>);
              }
              return pages;
            })()}
          </div>
          <button className="page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}