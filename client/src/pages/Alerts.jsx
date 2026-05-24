import { useEffect, useState } from "react"
import axios from "axios"

function Alerts() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/soldiers")

        const risky = res.data.filter(
          s =>
            s.risk === "HIGH" ||
            s.risk === "MEDIUM" ||
            s.risk === "PANIC"
        )

        setAlerts(risky)

      } catch (err) {
        console.log("API Error:", err)
      }
    }

    fetchData()

    const interval = setInterval(fetchData, 3000)
    return () => clearInterval(interval)
  }, [])

  // safer counts (calculated once)
  const countRisk = (type) =>
    alerts.filter(s => s.risk === type).length

  return (
    <div>

      {/* 🚨 ALERT CARDS */}
      <div className="alert-grid">

        {alerts.length === 0 ? (
          <p>No active alerts</p>
        ) : (
          alerts.map((s) => (
            <div
              key={s._id || s.id}
              className={`alert-card ${s.risk?.toLowerCase() || ""}`}
            >
              <h3>🪖 {s.id}</h3>
              <p>⚠️ {s.risk}</p>
              <p>🧠 AI Suggestion Active</p>
            </div>
          ))
        )}

      </div>

      {/* 📡 RADAR SECTION (ONLY ONE - FIXED) */}
      <div className="radar-wrapper">
        <h3>📡 Risk Radar Overview</h3>

        <div className="radar-circle">

          <div className="center-dot"></div>

          <div className="ring low-ring">
            <span>LOW</span>
            <b>{countRisk("LOW")}</b>
          </div>

          <div className="ring medium-ring">
            <span>MEDIUM</span>
            <b>{countRisk("MEDIUM")}</b>
          </div>

          <div className="ring high-ring">
            <span>HIGH</span>
            <b>{countRisk("HIGH")}</b>
          </div>

          <div className="ring panic-ring">
            <span>PANIC</span>
            <b>{countRisk("PANIC")}</b>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Alerts