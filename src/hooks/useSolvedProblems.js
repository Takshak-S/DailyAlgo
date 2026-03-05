import { useState, useEffect, useCallback } from "react";

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

export default function useSolvedProblems() {
  const [solved, setSolved] = useState(getSolvedSet);

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

  const resetAll = useCallback(() => {
    localStorage.removeItem("solvedProblems");
    setSolved(new Set());
  }, []);

  return { solved, toggleSolved, resetAll };
}
