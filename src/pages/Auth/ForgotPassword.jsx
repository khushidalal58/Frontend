import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useToast } from "../../components/Toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Email required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to send OTP");
        return;
      }
      toast.success("OTP sent to your email!");
      navigate("/reset-password");
    } catch (err) {
      toast.error("Server error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-page-wrapper">
      <Navbar />
      <div className="fp-root">
        <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

                    .fp-page-wrapper {
                        min-height: 100vh;
                        background: #fdfcff;
                    }

                    .fp-root {
                        height: calc(100vh - 70px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: 'Sora', sans-serif;
                        padding: 20px;
                        background: radial-gradient(circle at top right, rgba(79, 70, 229, 0.05), transparent),
                                    radial-gradient(circle at bottom left, rgba(124, 58, 237, 0.05), transparent);
                    }

                    .fp-card {
                        width: 100%;
                        max-width: 440px;
                        background: #ffffff;
                        border-radius: 36px;
                        border: 1.5px solid #f1f5f9;
                        padding: 44px;
                        box-shadow: 0 40px 100px rgba(30, 27, 75, 0.06);
                        text-align: center;
                        animation: fp-fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                    }

                    @keyframes fp-fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .fp-icon {
                        width: 64px;
                        height: 64px;
                        background: #f5f3ff;
                        color: #4f46e5;
                        border-radius: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 28px;
                        margin: 0 auto 24px;
                    }

                    .fp-card h2 {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-size: 28px;
                        font-weight: 800;
                        color: #1e1b4b;
                        margin-bottom: 12px;
                        letter-spacing: -0.5px;
                    }

                    .fp-card p {
                        font-size: 14px;
                        color: #64748b;
                        margin-bottom: 32px;
                        line-height: 1.6;
                    }

                    .fp-field {
                        text-align: left;
                        margin-bottom: 24px;
                    }

                    .fp-label {
                        font-size: 11px;
                        font-weight: 800;
                        color: #1e1b4b;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        margin-bottom: 8px;
                        display: block;
                        padding-left: 4px;
                    }

                    .fp-input {
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

                    .fp-input:focus {
                        background: #ffffff;
                        border-color: #4f46e5;
                        box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
                    }

                    .fp-btn {
                        width: 100%;
                        padding: 16px;
                        background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                        color: white;
                        border: none;
                        border-radius: 16px;
                        font-size: 15px;
                        font-weight: 800;
                        cursor: pointer;
                        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        box-shadow: 0 10px 25px rgba(79, 70, 229, 0.2);
                        margin-bottom: 24px;
                    }

                    .fp-btn:hover:not(:disabled) {
                        transform: translateY(-3px);
                        box-shadow: 0 15px 35px rgba(79, 70, 229, 0.3);
                    }

                    .fp-btn:disabled { opacity: 0.7; cursor: not-allowed; }

                    .fp-back {
                        font-size: 14px;
                        color: #64748b;
                        text-decoration: none;
                        font-weight: 600;
                        transition: color 0.2s;
                    }

                    .fp-back:hover {
                        color: #4f46e5;
                    }
                `}</style>

        <div className="fp-card">
          <div className="fp-icon">🔑</div>
          <h2>Forgot Password?</h2>
          <p>No worries, it happens. Enter your professional email and we'll send you a secure access key.</p>

          <div className="fp-field">
            <label className="fp-label">Account Email</label>
            <input
              type="email"
              className="fp-input"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="fp-btn" onClick={handleSendOtp} disabled={loading}>
            {loading ? "SENDING..." : "SEND ACCESS KEY"}
          </button>

          <Link to="/login" className="fp-back">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
