import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./AppMenuPanel.css";

// Adapt these to whatever Aether actually supports.
// Icons are minimal inline SVGs so no extra icon library is needed.
const MENU_ITEMS = [
  {
    section: "main",
    items: [
      { id: "new-tab", label: "New tab", shortcut: "Ctrl+T", icon: <path d="M12 5v14M5 12h14" /> },
      { id: "new-window", label: "New window", shortcut: "Ctrl+N", icon: <path d="M3 6h18M3 6v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6M3 6l2-3h14l2 3" /> },
      { id: "new-private", label: "New private window", shortcut: "Ctrl+Shift+P", icon: <><circle cx="12" cy="12" r="9" /><path d="M9 9c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3" /><path d="M12 16h.01" /></> },
    ],
  },
  {
    section: "library",
    items: [
      { id: "bookmarks", label: "Bookmarks", chevron: true, icon: <path d="M6 3h12v18l-6-4-6 4z" /> },
      { id: "history", label: "History", chevron: true, icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></> },
      { id: "downloads", label: "Downloads", shortcut: "Ctrl+J", icon: <path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" /> },
    ],
  },
  {
    section: "tools",
    items: [
      { id: "print", label: "Print", shortcut: "Ctrl+P", icon: <><path d="M6 9V3h12v6" /><path d="M6 18H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2" /><path d="M6 14h12v7H6z" /></> },
      { id: "find", label: "Find in page", shortcut: "Ctrl+F", icon: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></> },
      { id: "more-tools", label: "More tools", chevron: true, icon: <><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></> },
    ],
  },
];

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export default function AppMenuPanel({ onClose, userEmail = "aether@gmail.com" }) {
  const panelRef = useRef(null);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, scale: 0.92, y: -8 },
      { opacity: 1, scale: 1, y: 0, duration: 0.28, ease: "power3.out" }
    );

    const handleOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const initials = userEmail.slice(0, 2).toUpperCase();

  return (
    <div ref={panelRef} className="app-menu-panel" role="menu">
      <div className="app-menu-account" role="menuitem" tabIndex={0}>
        <div className="app-menu-avatar">{initials}</div>
        <span className="app-menu-account-email">{userEmail}</span>
      </div>

      <div className="app-menu-divider" />

      {MENU_ITEMS.map((group, gi) => (
        <div key={group.section}>
          {group.items.map((item) => (
            <button key={item.id} className="app-menu-item" role="menuitem">
              <span className="app-menu-item-left">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {item.icon}
                </svg>
                {item.label}
              </span>
              {item.shortcut && <span className="app-menu-shortcut">{item.shortcut}</span>}
              {item.chevron && <ChevronIcon />}
            </button>
          ))}
          {gi < MENU_ITEMS.length - 1 && <div className="app-menu-divider" />}
        </div>
      ))}

      <div className="app-menu-divider" />

      <div className="app-menu-zoom">
        <span className="app-menu-zoom-label">Zoom</span>
        <div className="app-menu-zoom-controls">
          <button className="app-menu-zoom-btn" onClick={() => setZoom((z) => Math.max(50, z - 10))}>–</button>
          <span className="app-menu-zoom-value">{zoom}%</span>
          <button className="app-menu-zoom-btn" onClick={() => setZoom((z) => Math.min(200, z + 10))}>+</button>
        </div>
      </div>

      <div className="app-menu-divider" />

      <button className="app-menu-item" role="menuitem">
        <span className="app-menu-item-left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          Settings
        </span>
      </button>

      <button className="app-menu-item">
        <span className="app-menu-item-left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5M12 17h.01" />
          </svg>
          Help
        </span>
      </button>

      <div className="app-menu-divider" />

      <button className="app-menu-item app-menu-exit">
        <span className="app-menu-item-left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Exit
        </span>
        <span className="app-menu-shortcut">Ctrl+Shift+Q</span>
      </button>
    </div>
  );
}