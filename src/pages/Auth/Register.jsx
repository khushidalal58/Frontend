import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useToast } from "../../components/Toast";
import authBg from "../../assets/auth-premium.png";

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    setName(""); setEmail(""); setPassword(""); setOtp("");
    setOtpSent(false); setOtpVerified(false);
  }, []);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const sendOtp = async () => {
    if (!isValidEmail(email)) { toast.error("Enter a valid email address"); return; }
    setOtpLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "OTP Send Failed"); return; }
      setOtpSent(true);
      toast.success("OTP Sent! Check your email.");
    } catch { toast.error("Server Error — please try again."); }
    finally { setOtpLoading(false); }
  };

  const verifyOtp = async () => {
    if (!otp) { toast.error("Enter the OTP"); return; }
    setOtpLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Invalid OTP"); return; }
      setOtpVerified(true); setOtp("");
      toast.success("Email Verified!");
    } catch { toast.error("Server Error — please try again."); }
    finally { setOtpLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) { toast.error("All fields are required"); return; }
    if (!otpVerified) { toast.error("Please verify your email first"); return; }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || data.message || "Registration failed"); return; }
      toast.success("Registration Successful! Welcome to Eventify 🎉");
      navigate("/login");
    } catch { toast.error("Server error — please try again."); }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-hero-wrapper">
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        .auth-hero-wrapper {
          min-height: 100vh;
          background: linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), url(${authBg});
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          display: flex;
          flex-direction: column;
          font-family: 'Sora', sans-serif;
        }

        .auth-center-zone {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
        }

        .reg-glass-card {
          width: 100%;
          max-width: 500px;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border-radius: 36px;
          padding: 44px;
          box-shadow: 0 50px 120px rgba(0, 0, 0, 0.4);
          animation: regFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes regFadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .reg-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .reg-header h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 34px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -1.2px;
          margin-bottom: 10px;
        }

        .reg-header p {
          color: #64748b;
          font-size: 15px;
        }

        .role-picker {
          display: flex;
          background: #f1f5f9;
          padding: 5px;
          border-radius: 14px;
          gap: 5px;
          margin-bottom: 24px;
        }

        .role-opt {
          flex: 1;
          padding: 11px;
          border-radius: 11px;
          border: none;
          background: transparent;
          font-size: 13px;
          font-weight: 700;
          color: #64748b;
          cursor: pointer;
          transition: all 0.3s;
        }

        .role-opt.active {
          background: #ffffff;
          color: #4f46e5;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .input-stack {
          margin-bottom: 18px;
        }

        .stack-label {
          display: block;
          font-size: 11px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .input-group {
          position: relative;
          display: flex;
          gap: 10px;
        }

        .reg-input-field {
          flex: 1;
          padding: 13px 18px;
          background: #f8fafc;
          border: 2px solid #f1f5f9;
          border-radius: 12px;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          color: #0f172a;
          transition: all 0.3s;
          outline: none;
        }

        .reg-input-field:focus {
          border-color: #4f46e5;
          background: #ffffff;
        }

        .otp-trigger {
          padding: 0 16px;
          background: #0f172a;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
        }

        .otp-trigger:hover { background: #4f46e5; }

        .otp-box {
          background: #f8fafc;
          padding: 20px;
          border-radius: 18px;
          border: 1px solid #f1f5f9;
          margin: 15px 0;
          text-align: center;
        }

        .otp-row {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin: 12px 0;
        }

        .digit-in {
          width: 42px;
          height: 50px;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          color: #4f46e5;
        }

        .digit-in:focus { border-color: #4f46e5; outline: none; }

        .verified-msg {
          background: #f0fdf4;
          color: #16a34a;
          padding: 12px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          border: 1px solid #bbf7d0;
          margin-bottom: 18px;
          text-align: center;
        }

        .reg-submit {
          width: 100%;
          padding: 16px;
          background: #0f172a;
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
        }

        .reg-submit:hover:not(:disabled) {
          background: #4f46e5;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.2);
        }

        .reg-stats-footer {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          justify-content: center;
          gap: 32px;
        }

        .stat-bit {
          text-align: center;
        }

        .stat-bit div:first-child { font-size: 18px; font-weight: 800; color: #0f172a; }
        .stat-bit div:last-child { font-size: 9px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }

        .reg-link-back {
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
          color: #64748b;
        }

        .reg-link-back a { color: #4f46e5; font-weight: 700; text-decoration: none; }
      `}</style>

      <div className="auth-center-zone">
        <div className="reg-glass-card">
          <header className="reg-header">
            <h1>Join Eventify</h1>
            <p>Create your account and start planning legendary events.</p>
          </header>

          <div className="role-picker">
            <button className={`role-opt ${role === 'user' ? 'active' : ''}`} onClick={() => setRole('user')}>
              Client
            </button>
            <button className={`role-opt ${role === 'vendor' ? 'active' : ''}`} onClick={() => setRole('vendor')}>
              Merchant
            </button>
          </div>

          <form onSubmit={handleRegister}>
            <div className="input-stack">
              <label className="stack-label">Full Name</label>
              <input
                className="reg-input-field"
                placeholder="e.g. Alexander Sterling"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-stack">
              <label className="stack-label">Professional Email</label>
              <div className="input-group">
                <input
                  type="email"
                  className="reg-input-field"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setOtpSent(false);
                    setOtpVerified(false);
                  }}
                  required
                />
                {isValidEmail(email) && !otpSent && !otpVerified && (
                  <button type="button" className="otp-trigger" onClick={sendOtp} disabled={otpLoading}>
                    {otpLoading ? "..." : "Send OTP"}
                  </button>
                )}
              </div>
            </div>

            {otpSent && !otpVerified && (
              <div className="otp-box">
                <label className="stack-label">Verification Code</label>
                <div className="otp-row">
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength="1"
                      className="digit-in"
                      value={otp[i] || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!/^\d*$/.test(val)) return;
                        let newOtp = otp.split("");
                        newOtp[i] = val.slice(-1);
                        setOtp(newOtp.join(""));
                        if (val && i < 5) document.getElementById(`otp-${i + 1}`).focus();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !otp[i] && i > 0) document.getElementById(`otp-${i - 1}`).focus();
                      }}
                    />
                  ))}
                </div>
                <button type="button" className="reg-submit" style={{ background: '#4f46e5', padding: '12px' }} onClick={verifyOtp} disabled={otpLoading || otp.length < 6}>
                  {otpLoading ? "Verifying..." : "Verify Identity"}
                </button>
              </div>
            )}

            {otpVerified && (
              <div className="verified-msg">
                ✅ Identity Verified Successfully
              </div>
            )}

            <div className="input-stack">
              <label className="stack-label">Secure Password</label>
              <div className="input-group">
                <input
                  type={showPass ? "text" : "password"}
                  className="reg-input-field"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)' }}>
                  {showPass ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
            </div>

            <button type="submit" className="reg-submit" disabled={loading || !otpVerified}>
              {loading ? "Creating Account..." : "Join Eventify Now"}
            </button>
          </form>

          <div className="reg-stats-footer">
            <div className="stat-bit">
              <div>100%</div>
              <div>Secure</div>
            </div>
            <div className="stat-bit">
              <div>Instant</div>
              <div>Access</div>
            </div>
          </div>

          <footer className="reg-link-back">
            <p>Already a member? <Link to="/login">Sign in here</Link></p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Register;

