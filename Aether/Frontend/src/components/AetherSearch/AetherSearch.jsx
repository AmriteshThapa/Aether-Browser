import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AetherSearch.css";

const STORAGE_KEY = "aether-recent-searches";
const MAX_RECENT = 6;

function loadRecent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRecent(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore storage errors (private mode, quota, etc.)
  }
}

export default function AetherSearch() {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setRecent(loadRecent());
  }, []);

  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const commitSearch = (term) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const next = [trimmed, ...recent.filter((r) => r.toLowerCase() !== trimmed.toLowerCase())].slice(
      0,
      MAX_RECENT
    );
    setRecent(next);
    saveRecent(next);
    setOpen(false);
    navigate(`/explore?q=${encodeURIComponent(trimmed)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    commitSearch(query);
  };

  const handleRecentClick = (term) => {
    setQuery(term);
    commitSearch(term);
  };

  const removeRecent = (e, term) => {
    e.stopPropagation();
    const next = recent.filter((r) => r !== term);
    setRecent(next);
    saveRecent(next);
  };

  const filtered = query.trim()
    ? recent.filter((r) => r.toLowerCase().includes(query.trim().toLowerCase()))
    : recent;

  return (
    <div className="aether-search" ref={wrapperRef}>
      <form onSubmit={handleSubmit}>
        <div className="aether-search-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="text"
            placeholder="Search Aether"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
          />
        </div>
      </form>

      {open && filtered.length > 0 && (
        <div className="aether-search-dropdown" role="listbox">
          <div className="aether-search-dropdown-label">Recent</div>
          {filtered.map((term) => (
            <div
              key={term}
              className="aether-search-dropdown-item"
              role="option"
              tabIndex={0}
              onClick={() => handleRecentClick(term)}
            >
              <span className="aether-search-item-left">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
                {term}
              </span>
              <button
                type="button"
                className="aether-search-item-remove"
                onClick={(e) => removeRecent(e, term)}
                aria-label={`Remove ${term} from recent searches`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}