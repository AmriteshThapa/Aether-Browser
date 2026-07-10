import "./WeatherCard.css";

export default function WeatherCard() {
  return (
    <div className="ww-wrap">
      <div className="ww-cardm">
        <div className="ww-card">
          {/* Weather Icon */}
          <svg className="ww-weather" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" fill="#FFB347" opacity="0.2"/>
            <circle cx="50" cy="50" r="30" fill="#FFB347" opacity="0.4"/>
            <circle cx="50" cy="50" r="20" fill="#FFB347"/>
            <path d="M50 15 L50 25 M50 75 L50 85 M15 50 L25 50 M75 50 L85 50 M25 25 L32 32 M68 68 L75 75 M25 75 L32 68 M68 32 L75 25" stroke="#FFB347" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          
          <div className="ww-main">23°C</div>
          <div className="ww-mainsub">Dunmore, Ireland</div>
        </div>

        {/* Upper Section - Appears above on hover */}
        <div className="ww-upper-section">
          <div className="ww-humidity">
            <svg className="ww-icon" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C12 2 6 8 6 14C6 17.3137 8.68629 20 12 20C15.3137 20 18 17.3137 18 14C18 8 12 2 12 2Z" stroke="#4A90D9" strokeWidth="2"/>
              <path d="M12 16C13.1046 16 14 15.1046 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 15.1046 10.8954 16 12 16Z" fill="#4A90D9"/>
            </svg>
            <div className="ww-label">Humidity</div>
            <div className="ww-value">30%</div>
          </div>
          
          <div className="ww-air">
            <svg className="ww-icon" viewBox="0 0 24 24" fill="none">
              <path d="M3 8H15M7 12H19M5 16H17" stroke="#4A90D9" strokeWidth="2" strokeLinecap="round"/>
              <path d="M18 6L20 8L18 10M20 8H15" stroke="#4A90D9" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="ww-label">Wind</div>
            <div className="ww-value">8 Km/h</div>
          </div>
        </div>

        <div className="ww-card2">
          {/* Lower Section - Appears below on hover */}
          <div className="ww-lower">
            <div className="ww-aqi">
              <svg className="ww-icon-small" viewBox="0 0 24 24" fill="none">
                <path d="M12 4V10M12 14V20M8 8L14 8M8 16L14 16" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="2" fill="#4CAF50"/>
              </svg>
              <div className="ww-label">AQI</div>
              <div className="ww-value">30</div>
            </div>

            <div className="ww-realfeel">
              <svg className="ww-icon-small" viewBox="0 0 24 24" fill="none">
                <path d="M12 3V7M12 17V21M5 12H9M15 12H19M7 7L10 10M14 14L17 17M7 17L10 14M14 10L17 7" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="3" fill="#FF6B35" opacity="0.5"/>
              </svg>
              <div className="ww-label">Real Feel</div>
              <div className="ww-value">21°C</div>
            </div>

            <div className="ww-pressure">
              <svg className="ww-icon-small" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#7B61FF" strokeWidth="2"/>
                <path d="M12 3V12L16 16" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="1.5" fill="#7B61FF"/>
              </svg>
              <div className="ww-label">Pressure</div>
              <div className="ww-value">1012</div>
            </div>
          </div>
        </div>

        <div className="ww-card3">🌿 Healthy</div>
      </div>
    </div>
  );
}