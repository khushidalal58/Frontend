import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useToast } from "../../components/Toast";
import authBg from "../../assets/auth-premium.png";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter credentials");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || data.error || "Login failed");
        return;
      }

      const user = data.user;

      if (user.role !== role) {
        toast.error(`Access Denied — You are registered as "${user.role}" but trying to login as "${role}"`);
        return;
      }

      if (user.role === "admin") localStorage.setItem("user_admin", JSON.stringify(user));
      else if (user.role === "vendor") localStorage.setItem("user_vendor", JSON.stringify(user));
      else localStorage.setItem("user_client", JSON.stringify(user));

      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login Successful! Welcome back.");

      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "vendor") navigate("/vendor/dashboard");
      else navigate("/users/dashboard");

    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-hero-wrapper">
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        .auth-hero-wrapper {
          min-height: 100vh;
          background: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url(${authBg});
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          display: flex;
          flex-direction: column;
          font-family: 'Sora', sans-serif;
        }

        .auth-centered-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        .auth-glass-card {
          width: 100%;
          max-width: 480px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 32px;
          padding: 50px;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.3);
          animation: cardSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes cardSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .auth-title-area {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-title-area h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -1px;
          margin-bottom: 8px;
        }

        .auth-title-area p {
          color: #64748b;
          font-size: 15px;
        }

        .role-switch {
          display: flex;
          background: #f1f5f9;
          padding: 5px;
          border-radius: 14px;
          gap: 5px;
          margin-bottom: 28px;
        }

        .role-option {
          flex: 1;
          padding: 10px;
          border-radius: 10px;
          border: none;
          background: transparent;
          font-size: 13px;
          font-weight: 700;
          color: #64748b;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .role-option.active {
          background: #ffffff;
          color: #4f46e5;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .form-input-box {
          margin-bottom: 20px;
        }

        .input-hint {
          display: block;
          font-size: 11px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .input-field-wrap {
          position: relative;
        }

        .custom-auth-input {
          width: 100%;
          padding: 14px 18px;
          background: #f8fafc;
          border: 2px solid #f1f5f9;
          border-radius: 12px;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          color: #0f172a;
          transition: all 0.3s;
          outline: none;
        }

        .custom-auth-input:focus {
          border-color: #4f46e5;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
        }

        .eye-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          padding: 5px;
        }

        .auth-main-btn {
          width: 100%;
          padding: 16px;
          background: #0f172a;
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .auth-main-btn:hover:not(:disabled) {
          background: #4f46e5;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.2);
        }

        .login-info-bar {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-around;
          text-align: center;
        }

        .info-stat-unit {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stat-num {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
        }

        .stat-txt {
          font-size: 10px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .auth-bottom-link {
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
          color: #64748b;
        }

        .auth-bottom-link a {
          color: #4f46e5;
          font-weight: 700;
          text-decoration: none;
        }

        .auth-bottom-link a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="auth-centered-container">
        <div className="auth-glass-card">
          <header className="auth-title-area">
            <h1>Welcome Back</h1>
            <p>Access your professional event dashboard.</p>
          </header>

          <div className="role-switch">
            {[
              { id: "user", label: "Client", icon: "👤" },
              { id: "vendor", label: "Merchant", icon: "🏪" },
              { id: "admin", label: "Director", icon: "🛡️" }
            ].map((r) => (
              <button
                key={r.id}
                className={`role-option ${role === r.id ? "active" : ""}`}
                onClick={() => setRole(r.id)}
              >
                <span>{r.icon}</span>
                <span>{r.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-input-box">
              <label className="input-hint">Email Address</label>
              <div className="input-field-wrap">
                <input
                  type="email"
                  className="custom-auth-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-input-box">
              <label className="input-hint">Password</label>
              <div className="input-field-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  className="custom-auth-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="eye-toggle"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-main-btn" disabled={loading}>
              {loading ? "Authenticating..." : "Sign In to Eventify"}
              {!loading && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
                </svg>
              )}
            </button>
          </form>

          <div className="login-info-bar">
            <div className="info-stat-unit">
              <span className="stat-num">99%</span>
              <span className="stat-txt">Success</span>
            </div>
            <div className="info-stat-unit">
              <span className="stat-num">24/7</span>
              <span className="stat-txt">Support</span>
            </div>
          </div>

          <footer className="auth-bottom-link">
            <p>New here? <Link to="/register">Create an account</Link></p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;

