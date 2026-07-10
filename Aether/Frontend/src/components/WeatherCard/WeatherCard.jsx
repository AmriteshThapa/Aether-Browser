import { useState } from "react";
import "./WeatherCard.css";

export default function WeatherCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="aw-wrap">
      <div
        className={`aw-card${isOpen ? " is-open" : ""}`}
        onClick={() => setIsOpen((v) => !v)}
      >
        {/* Main row - always visible */}
        <div className="aw-main">
          <svg className="aw-glyph" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" fill="#F4B860" opacity="0.15" />
            <circle cx="50" cy="50" r="30" fill="#F4B860" opacity="0.35" />
            <circle cx="50" cy="50" r="20" fill="#F4B860" />
            <path
              d="M50 15 L50 25 M50 75 L50 85 M15 50 L25 50 M75 50 L85 50 M25 25 L32 32 M68 68 L75 75 M25 75 L32 68 M68 32 L75 25"
              stroke="#F4B860"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <div className="aw-main-text">
            <div className="aw-temp">23°C</div>
            <div className="aw-place">Dunmore, Ireland</div>
          </div>

          <svg className="aw-chevron" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Expandable detail section */}
        <div className="aw-expand">
          <div className="aw-expand-inner">
            <div className="aw-divider" />
            <div className="aw-grid">
              <div className="aw-stat">
                <svg className="aw-stat-icon" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C12 2 6 8 6 14C6 17.3137 8.68629 20 12 20C15.3137 20 18 17.3137 18 14C18 8 12 2 12 2Z"
                    stroke="#5B9FE8"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="14" r="2" fill="#5B9FE8" />
                </svg>
                <div className="aw-stat-label">Humidity</div>
                <div className="aw-stat-value">30%</div>
              </div>

              <div className="aw-stat">
                <svg className="aw-stat-icon" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 8H15M7 12H19M5 16H17"
                    stroke="#8B7CF6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 6L20 8L18 10M20 8H15"
                    stroke="#8B7CF6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="aw-stat-label">Wind</div>
                <div className="aw-stat-value">8 km/h</div>
              </div>

              <div className="aw-stat">
                <svg className="aw-stat-icon" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#F4B860" strokeWidth="2" />
                  <path d="M12 3V12L16 16" stroke="#F4B860" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div className="aw-stat-label">Pressure</div>
                <div className="aw-stat-value">1012</div>
              </div>

              <div className="aw-stat">
                <svg className="aw-stat-icon" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 4V10M12 14V20M8 8L14 8M8 16L14 16"
                    stroke="#5BC98A"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="12" r="2" fill="#5BC98A" />
                </svg>
                <div className="aw-stat-label">AQI</div>
                <div className="aw-stat-value">30</div>
              </div>

              <div className="aw-stat">
                <svg className="aw-stat-icon" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3V7M12 17V21M5 12H9M15 12H19M7 7L10 10M14 14L17 17M7 17L10 14M14 10L17 7"
                    stroke="#F4B860"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="12" r="3" fill="#F4B860" opacity="0.5" />
                </svg>
                <div className="aw-stat-label">Real Feel</div>
                <div className="aw-stat-value">21°C</div>
              </div>

              <div className="aw-stat" />
            </div>

            <div className="aw-status">
              <span className="aw-status-dot" />
              Healthy air
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}