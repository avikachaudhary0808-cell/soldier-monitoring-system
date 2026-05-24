import { useEffect, useState } from "react"
import axios from "axios"

import {
  Radar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer
} from "recharts"

function getAIAction(risk) {

  switch (risk) {

    case "PANIC":
      return {
        action: "🚨 EMERGENCY EXTRACTION",
        priority: "CRITICAL",
        color: "#ff0000"
      }

    case "HIGH":
      return {
        action: "⚠️ RESTRICT MOVEMENT + ALERT HQ",
        priority: "HIGH",
        color: "#ff4d4d"
      }

    case "MEDIUM":
      return {
        action: "🧠 MONITOR + HYDRATION ADVISED",
        priority: "MEDIUM",
        color: "#ffa500"
      }

    default:
      return {
        action: "🟢 CONTINUE MISSION",
        priority: "LOW",
        color: "#00ff88"
      }
  }
}

function Command() {

  const [soldiers, setSoldiers] = useState([])

  // ✅ FETCH FROM BACKEND
  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/soldiers")
        setSoldiers(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 3000)

    return () => clearInterval(interval)

  }, [])

  // RADAR DATA
  const radarData = [
    {
      subject: "Low",
      A: soldiers.filter(s => s.risk === "LOW").length,
      fullMark: 10
    },
    {
      subject: "Medium",
      A: soldiers.filter(s => s.risk === "MEDIUM").length,
      fullMark: 10
    },
    {
      subject: "High",
      A: soldiers.filter(s => s.risk === "HIGH").length,
      fullMark: 10
    },
    {
      subject: "Panic",
      A: soldiers.filter(s => s.risk === "PANIC").length,
      fullMark: 10
    }
  ]

  return (
    <div className="container">

      <h1 className="page-title">🧠 Command Control Center</h1>

      {/* 🪖 SOLDIERS */}
      <div className="alert-grid">

        {soldiers.map((s) => (

          <div
            key={s._id || s.id}
            className={`alert-card ${s.risk?.toLowerCase()}`}
            style={{
              animation: "floatCard 3s ease-in-out infinite"
            }}
          >

            <h3>🪖 {s.id}</h3>
            <p>⚠️ Risk Level: {s.risk}</p>
            <p>📡 Live Monitoring Active</p>

          </div>

        ))}

      </div>

      {/* 🛰 RADAR */}
      <div style={{ width: "100%", height: 420, marginTop: 30 }}>

        <ResponsiveContainer>

          <RadarChart data={radarData}>

            <PolarGrid stroke="#2ee59c" />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />

            <Radar
              name="Risk Level"
              dataKey="A"
              stroke="#2ee59c"
              fill="#2ee59c"
              fillOpacity={0.35}
            />

          </RadarChart>

        </ResponsiveContainer>

      </div>

      {/* 🤖 AI ENGINE */}
      <div className="center-box">

        <h2>🤖 AI Command Decision Engine</h2>

        {soldiers.slice(0, 6).map((s, index) => {

          const ai = getAIAction(s.risk)

          return (
            <div
              key={s._id || s.id}
              style={{
                marginTop: "15px",
                padding: "12px",
                borderRadius: "10px",
                border: `1px solid ${ai.color}`,
                background: "rgba(46,229,156,0.05)",
                animation: `fadeIn 0.4s ease-in ${index * 0.2}s both`
              }}
            >

              <b>🪖 {s.id}</b>

              <p>⚠️ Risk: {s.risk}</p>

              <p>
                🎯 Action:
                <span style={{ color: ai.color, fontWeight: "bold" }}>
                  {" " + ai.action}
                </span>
              </p>

              <p>
                🔥 Priority:
                <span style={{ color: ai.color }}>
                  {" " + ai.priority}
                </span>
              </p>

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default Command