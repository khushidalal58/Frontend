import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useToast } from "../../components/Toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email || !otp || !newPassword) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Password reset failed");
        return;
      }

      toast.success("Password reset successful!");
      navigate("/login");
    } catch (err) {
      toast.error("Server error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rp-page-wrapper">
      <Navbar />
      <div className="rp-root">
        <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

                    .rp-page-wrapper {
                        min-height: 100vh;
                        background: #fdfcff;
                    }

                    .rp-root {
                        height: calc(100vh - 70px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: 'Sora', sans-serif;
                        padding: 20px;
                        background: radial-gradient(circle at top left, rgba(79, 70, 229, 0.05), transparent),
                                    radial-gradient(circle at bottom right, rgba(124, 58, 237, 0.05), transparent);
                    }

                    .rp-card {
                        width: 100%;
                        max-width: 480px;
                        background: #ffffff;
                        border-radius: 40px;
                        border: 1.5px solid #f1f5f9;
                        padding: 50px;
                        box-shadow: 0 40px 100px rgba(30, 27, 75, 0.08);
                        animation: rp-fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                    }

                    @keyframes rp-fadeIn {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .rp-hdr {
                        text-align: center;
                        margin-bottom: 32px;
                    }

                    .rp-hdr h2 {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-size: 32px;
                        font-weight: 800;
                        color: #1e1b4b;
                        letter-spacing: -1px;
                        margin-bottom: 12px;
                    }

                    .rp-hdr p {
                        color: #64748b;
                        font-size: 15px;
                    }

                    .rp-form {
                        display: flex;
                        flex-direction: column;
                        gap: 20px;
                    }

                    .rp-field {
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                    }

                    .rp-label {
                        font-size: 11px;
                        font-weight: 800;
                        color: #1e1b4b;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        padding-left: 4px;
                    }

                    .rp-input {
                        width: 100%;
                        padding: 16px 20px;
                        background: #f8fafc;
                        border: 1.5px solid #f1f5f9;
                        border-radius: 16px;
                        font-family: 'Sora', sans-serif;
                        font-size: 15px;
                        color: #1e293b;
                        outline: none;
                        transition: all 0.3s;
                    }

                    .rp-input:focus {
                        background: #ffffff;
                        border-color: #4f46e5;
                        box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
                    }

                    .rp-input-wrap {
                        position: relative;
                    }

                    .rp-eye-btn {
                        position: absolute;
                        right: 16px;
                        top: 50%;
                        transform: translateY(-50%);
                        background: none;
                        border: none;
                        cursor: pointer;
                        font-size: 18px;
                        padding: 4px;
                    }

                    .rp-btn {
                        width: 100%;
                        padding: 18px;
                        background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                        color: white;
                        border: none;
                        border-radius: 18px;
                        font-size: 16px;
                        font-weight: 800;
                        cursor: pointer;
                        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        box-shadow: 0 15px 35px rgba(79, 70, 229, 0.25);
                        margin-top: 10px;
                    }

                    .rp-btn:hover:not(:disabled) {
                        transform: translateY(-5px);
                        box-shadow: 0 25px 50px rgba(79, 70, 229, 0.35);
                    }

                    .rp-btn:disabled { opacity: 0.7; cursor: not-allowed; }

                    .rp-footer {
                        text-align: center;
                        margin-top: 32px;
                        padding-top: 24px;
                        border-top: 1.5px solid #f1f5f9;
                    }

                    .rp-footer a {
                        color: #64748b;
                        font-size: 14px;
                        font-weight: 600;
                        text-decoration: none;
                        transition: color 0.2s;
                    }

                    .rp-footer a:hover { color: #4f46e5; }
                `}</style>

        <div className="rp-card">
          <header className="rp-hdr">
            <h2>Set New Passcode</h2>
            <p>Enhance your account security with a high-entropy password.</p>
          </header>

          <form className="rp-form" onSubmit={handleReset}>
            <div className="rp-field">
              <label className="rp-label">Email Identity</label>
              <input
                type="email"
                className="rp-input"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="rp-field">
              <label className="rp-label">Access Key (OTP)</label>
              <input
                type="text"
                className="rp-input"
                placeholder="Enter 6-digit key"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <div className="rp-field">
              <label className="rp-label">New Secure Password</label>
              <div className="rp-input-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  className="rp-input"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="rp-eye-btn"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
            </div>

            <button type="submit" className="rp-btn" disabled={loading}>
              {loading ? "RESETTING ACCESS..." : "UPDATE SECURITY KEY"}
            </button>
          </form>

          <footer className="rp-footer">
            <Link to="/login">← Cancel and return to sign in</Link>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
