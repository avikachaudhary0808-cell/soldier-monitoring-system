import { useState } from "react"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Alerts from "./pages/Alerts"
import Command from "./pages/Command"
import Contact from "./pages/Contact"
import Login from "./pages/Login"

import "./style.css"

function App() {

  const [page, setPage] = useState("home")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    setPage("dashboard")
  }

  const Protected = ({ children }) => {
    if (!isLoggedIn) {
      return <Login onLoginSuccess={handleLoginSuccess} />
    }
    return children
  }

  return (
    <div>

      {/* TOP BAR */}
      <div className="topbar">

        <h2 className="logo">🪖 Soldier AI</h2>

        <div className="top-links">

          <button onClick={() => setPage("home")}>Home</button>

          <button onClick={() => setPage("dashboard")}>Dashboard</button>
          <button onClick={() => setPage("alerts")}>Alerts</button>
          <button onClick={() => setPage("command")}>Command</button>
          <button onClick={() => setPage("contact")}>Contact</button>

          {!isLoggedIn ? (
            <button onClick={() => setPage("login")}>Login</button>
          ) : (
            <button onClick={() => setIsLoggedIn(false)}>Logout</button>
          )}

        </div>

      </div>

      <div className="page-container">

        {page === "home" && <Home />}

        {page === "login" && !isLoggedIn && (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}

        {page === "dashboard" && (
          <Protected><Dashboard /></Protected>
        )}

        {page === "alerts" && (
          <Protected><Alerts /></Protected>
        )}

        {page === "command" && (
          <Protected><Command /></Protected>
        )}

        {page === "contact" && (
          <Protected><Contact /></Protected>
        )}

      </div>

    </div>
  )
}

export default App