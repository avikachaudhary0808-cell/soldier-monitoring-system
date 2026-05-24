import { useState } from "react";

export default function Auth({ setUser }) {
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = () => {
    if (!name.trim()) return;

    localStorage.setItem("user", name);
    setUser(name);
  };

  return (
    <div className="auth-overlay">

      <div className="auth-box">

        <h2>{isLogin ? "🔐 Login" : "📝 Signup"}</h2>

        <input
          placeholder="Enter Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleAuth}>
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          style={{ cursor: "pointer", marginTop: "10px" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Create new account"
            : "Already have account? Login"}
        </p>

      </div>

    </div>
  );
}