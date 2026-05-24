import { useEffect, useState } from "react"

import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer
} from "recharts"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

function Dashboard() {

  const [soldiers, setSoldiers] = useState([])
  const [positions, setPositions] = useState({})

  useEffect(() => {

    const fetchSoldiers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/soldiers")
        const data = await res.json()

        setSoldiers(data)

        const pos = {}
        data.forEach((s, i) => {
          pos[s.id] = [
            s.lat || 28.61 + i * 0.01,
            s.lng || 77.20 + i * 0.01
          ]
        })

        setPositions(pos)

      } catch (err) {
        console.log("Error fetching soldiers:", err)
      }
    }

    fetchSoldiers()
    const interval = setInterval(fetchSoldiers, 5000)

    return () => clearInterval(interval)

  }, [])

  const data = [
    { name: "LOW", value: soldiers.filter(s => s.risk === "LOW").length },
    { name: "MEDIUM", value: soldiers.filter(s => s.risk === "MEDIUM").length },
    { name: "HIGH", value: soldiers.filter(s => s.risk === "HIGH").length },
    { name: "PANIC", value: soldiers.filter(s => s.risk === "PANIC").length },
  ]

  return (
    <div className="dashboard">

      <div className="dash-header">
        <h1>🪖 Military Command Dashboard</h1>
        <p>Live Battlefield Monitoring System (MongoDB Connected)</p>
      </div>

      <div className="dash-grid">

        {/* MAP */}
        <div className="dash-card map-box">

          <h3>🗺️ Live Tracking Radar</h3>

          <div className="map-wrapper" style={{ height: "320px" }}>

            <MapContainer
              center={[28.61, 77.20]}
              zoom={5}
              style={{ height: "100%", width: "100%", borderRadius: "12px" }}
            >

              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {Object.entries(positions).map(([id, pos]) => (
                <Marker key={id} position={pos}>
                  <Popup>
                    🪖 {id}<br />
                    📡 Active
                  </Popup>
                </Marker>
              ))}

            </MapContainer>

          </div>
        </div>

        {/* CHART */}
        <div className="dash-card chart-box">

          <h3>📊 Risk Overview</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2ee59c" />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* ALERT RADAR */}
      <div className="dash-card alert-section">

        <h3>🚨 Command Alert Radar</h3>

        <div className="alert-grid">

          <div className="radar-box">

            <div className="radar">

              {soldiers.map((s, i) => (
                <div
                  key={s._id || s.id}
                  className={`dot ${s.risk?.toLowerCase()}`}
                  style={{
                    top: `${20 + i * 8}%`,
                    left: `${30 + i * 5}%`
                  }}
                  title={s.id}
                />
              ))}

            </div>

          </div>

          <div className="analytics-box">

            <h4>📊 Live Analytics</h4>

            <p>Total Soldiers: {soldiers.length}</p>
            <p className="low">Low Risk: {soldiers.filter(s => s.risk === "LOW").length}</p>
            <p className="medium">Medium Risk: {soldiers.filter(s => s.risk === "MEDIUM").length}</p>
            <p className="high">High Risk: {soldiers.filter(s => s.risk === "HIGH").length}</p>
            <p className="panic">Panic: {soldiers.filter(s => s.risk === "PANIC").length}</p>

          </div>

        </div>

      </div>

      {/* TABLE */}
      <div className="dash-card table-box">

        <h3>📡 Soldier Data System</h3>

        <div className="table-wrap">

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Risk</th>
                <th>Heart</th>
                <th>SPO2</th>
                <th>Temp</th>
              </tr>
            </thead>

            <tbody>
              {soldiers.map(s => (
                <tr key={s._id || s.id} className={s.risk?.toLowerCase()}>
                  <td>{s.id}</td>
                  <td>{s.risk}</td>
                  <td>{s.heart}</td>
                  <td>{s.spo2}%</td>
                  <td>{s.temp}°C</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}

export default Dashboard