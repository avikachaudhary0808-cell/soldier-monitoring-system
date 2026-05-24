import { useState } from "react"

function Login({ onLoginSuccess }) {

  const [mode, setMode] = useState("login")

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>🪖 Secure Command Access</h2>
        <p className="sub-text">Military authentication system</p>

        {/* USERNAME LOGIN */}
        {mode === "login" && (
          <>
            <input placeholder="Username" />
            <input type="password" placeholder="Password" />

            <button className="btn" onClick={onLoginSuccess}>
              Login
            </button>
          </>
        )}

        {/* REGISTER */}
        {mode === "register" && (
          <>
            <input placeholder="New Username" />
            <input placeholder="Create Password" />

            <button className="btn" onClick={onLoginSuccess}>
              Register & Login
            </button>
          </>
        )}

        {/* SOCIAL LOGIN */}
        <div className="social-login">

          <button className="google">
            🔵 Login with Google
          </button>

          <button className="apple">
             Login with Apple
          </button>

        </div>

        {/* LINKS */}
        <div className="login-links">

          <span onClick={() => setMode("login")}>Login</span>
          <span onClick={() => setMode("register")}>Register</span>

        </div>

        <p className="note">Forgot password? Contact admin system</p>

      </div>

    </div>
  )
}

export default Login