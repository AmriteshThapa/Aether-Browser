import { useState } from "react";
import "./Navbar.css";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: <path d="M3 11.5 12 4l9 7.5M5 10v10h5v-6h4v6h5V10" /> },
  { id: "explore", label: "Explore", icon: <><circle cx="12" cy="12" r="9" /><path d="m15 9-2 6-6 2 2-6z" /></> },
  { id: "activity", label: "Activity", icon: <path d="M3 12h4l2-8 4 16 2-8h6" /> },
  { id: "profile", label: "Profile", icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6" /></> },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [aiPulse, setAiPulse] = useState(false);
  const [query, setQuery] = useState("");

  const handleAiClick = () => {
    setAiPulse(true);
    setTimeout(() => setAiPulse(false), 600);
  };

  return (
    <nav className="navbar">
      <div className="navbar-glass">
        <div className="navbar-brand">
          <span className="brand-dot" />
          <span className="brand-text">Lightfall</span>
        </div>

        <ul className="navbar-items">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-btn ${active === item.id ? "active" : ""}`}
                onClick={() => setActive(item.id)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {item.icon}
                </svg>
                <span>{item.label}</span>
                {active === item.id && <span className="nav-indicator" />}
              </button>
            </li>
          ))}
        </ul>

        <div className="navbar-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button
          className={`ai-btn ${aiPulse ? "pulse" : ""}`}
          onClick={handleAiClick}
          aria-label="Ask AI"
        >
          <span className="ai-btn-glow" />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
            <circle cx="12" cy="12" r="3.2" />
          </svg>
          <span className="ai-label">Ask AI</span>
        </button>
      </div>
    </nav>
  );
}