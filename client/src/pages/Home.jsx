export default function Home() {
  return (
    <div className="home-container">

      {/* HERO */}
      <div className="hero">
        <h1>🛰 Soldier Health & Risk Monitoring System</h1>
        <p>
          Real-time military grade dashboard for monitoring soldier health,
          location tracking and risk analysis using AI based insights.
        </p>
      </div>

      {/* INFO BOXES */}
      <div className="home-grid">

        <div className="home-card">
          <h3>🧠 AI Monitoring</h3>
          <p>
            System continuously analyzes oxygen, heart rate and temperature
            to detect risk levels automatically.
          </p>
        </div>

        <div className="home-card">
          <h3>🗺 Live Tracking</h3>
          <p>
            Soldiers are tracked in real-time using GPS based map integration
            for mission safety.
          </p>
        </div>

        <div className="home-card">
          <h3>🚨 Smart Alerts</h3>
          <p>
            High-risk soldiers trigger instant alerts to command center
            for emergency response.
          </p>
        </div>

        <div className="home-card">
          <h3>📡 Command Control</h3>
          <p>
            Centralized control system to send commands like evacuation,
            backup and medical support.
          </p>
        </div>

      </div>

      {/* ABOUT SECTION */}
      <div className="center-box">
        <h2>About System</h2>
        <p>
          This platform is designed to simulate a real-time defense monitoring
          system with AI-based decision support and soldier health tracking.
        </p>
      </div>

      {/* SOCIAL */}
      <div className="center-box">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <span>📘 Facebook</span>
          <span>🐦 Twitter</span>
          <span>📸 Instagram</span>
          <span>▶ YouTube</span>
        </div>
      </div>

    </div>
  );
}