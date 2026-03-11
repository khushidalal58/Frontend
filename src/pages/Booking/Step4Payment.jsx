import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../../components/Toast";
import step4Img from "../../assets/step4.jpg";

const Step4Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [method, setMethod] = useState("");

  if (!state) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", padding: "40px" }}>
        <h2 style={{ color: "#1e1b4b", fontSize: "24px" }}>No active session found ❌</h2>
        <button
          onClick={() => navigate("/events")}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer"
          }}
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  const handleConfirm = () => {
    if (!method) {
      toast.warning("Please select a payment method to continue");
      return;
    }
    // Simulate a brief processing delay for premium feel
    toast.success("Redirecting to secure gateway...");
    setTimeout(() => {
      navigate("/booking/confirmation", {
        state: { ...state, paymentMethod: method },
      });
    }, 1500);
  };

  return (
    <div className="s4-container">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Sora:wght@300;400;600;700;800&display=swap');

                .s4-container {
                    min-height: 100vh;
                    background: linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)),
                                url(${step4Img});
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Sora', sans-serif;
                    padding: 60px 20px;
                }

                .s4-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    border-radius: 40px;
                    padding: 48px;
                    width: 100%;
                    max-width: 700px;
                    box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.5);
                    position: relative;
                }

                .s4-back-btn {
                    position: absolute;
                    top: 40px;
                    left: 40px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    color: #1e293b;
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.4s;
                    z-index: 10;
                }

                .s4-back-btn:hover { background: #1e293b; color: white; transform: rotate(-10deg) scale(1.1); }

                .s4-header {
                    text-align: center;
                    margin-bottom: 40px;
                }

                .s4-progress {
                    display: flex;
                    gap: 8px;
                    justify-content: center;
                    margin-bottom: 24px;
                }

                .progress-dot {
                    width: 32px;
                    height: 6px;
                    border-radius: 10px;
                    background: #e2e8f0;
                }

                .progress-dot.filled { background: #10b981; }
                .progress-dot.current { width: 64px; background: #4f46e5; }

                .s4-badge {
                    display: inline-flex;
                    padding: 8px 18px;
                    background: #fff1f2;
                    color: #e11d48;
                    border-radius: 100px;
                    font-size: 11px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin-bottom: 20px;
                }

                .s4-title {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 34px;
                    font-weight: 800;
                    color: #0f172a;
                    letter-spacing: -1.5px;
                }

                .s4-subtitle {
                    color: #64748b;
                    font-size: 15px;
                    margin-top: 8px;
                }

                .order-summary-box {
                    background: #f8fafc;
                    border: 1px solid #f1f5f9;
                    border-radius: 28px;
                    padding: 24px 32px;
                    margin: 32px 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .summary-label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
                .summary-val { font-size: 32px; font-weight: 800; color: #0f172a; font-family: 'Plus Jakarta Sans', sans-serif; }

                .payment-method-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin-bottom: 40px;
                }

                .method-card {
                    background: white;
                    border: 2.5px solid #f1f5f9;
                    border-radius: 24px;
                    padding: 24px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    position: relative;
                }

                .method-card:hover { transform: translateY(-4px) scale(1.01); border-color: #e2e8f0; }
                .method-card.active { border-color: #4f46e5; background: #f5f3ff; }

                .method-icon {
                    width: 54px;
                    height: 54px;
                    background: #f8fafc;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 26px;
                    transition: all 0.4s;
                }

                .active .method-icon { background: #4f46e5; color: white; transform: rotate(10deg); }

                .method-info h4 { font-size: 17px; font-weight: 800; color: #0f172a; margin-bottom: 2px; }
                .method-info p { font-size: 13px; color: #64748b; margin: 0; }

                .pay-action-btn {
                    width: 100%;
                    height: 70px;
                    background: #0f172a;
                    color: white;
                    border: none;
                    border-radius: 20px;
                    font-family: inherit;
                    font-size: 18px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.4s;
                    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                }

                .pay-action-btn:hover:not(:disabled) {
                    background: #4f46e5;
                    transform: translateY(-5px);
                    box-shadow: 0 25px 50px rgba(79, 70, 229, 0.3);
                }

                .pay-action-btn:disabled { background: #e2e8f0; color: #94a3b8; cursor: not-allowed; box-shadow: none; }

                .secure-footer {
                    margin-top: 32px;
                    padding-top: 24px;
                    border-top: 1px solid #f1f5f9;
                    display: flex;
                    justify-content: center;
                    gap: 32px;
                    opacity: 0.6;
                }

                .secure-item { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; color: #64748b; }

                @media (max-width: 600px) {
                    .s4-card { padding: 40px 24px; }
                    .s4-title { font-size: 26px; }
                    .order-summary-box { flex-direction: column; text-align: center; gap: 16px; }
                }

                .selection-check {
                    width: 28px;
                    height: 28px;
                    border: 2px solid #e2e8f0;
                    border-radius: 50%;
                    margin-left: auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                }

                .active .selection-check {
                    background: #10b981;
                    border-color: #10b981;
                    color: white;
                    transform: scale(1.1);
                }
            `}</style>

      <div className="s4-card">
        <button className="s4-back-btn" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </button>

        <div className="s4-header">
          <div className="s4-progress">
            <div className="progress-dot filled"></div>
            <div className="progress-dot filled"></div>
            <div className="progress-dot filled"></div>
            <div className="progress-dot current"></div>
          </div>
          <div className="s4-badge">Step 4 • Safe & Secure</div>
          <h1 className="s4-title">Final Checkout</h1>
          <p className="s4-subtitle">Select your payment method to confirm reservation.</p>
        </div>

        <div className="order-summary-box">
          <div>
            <div className="summary-label">FOR EXPERIENCE</div>
            <div style={{ fontWeight: 800, color: '#0f172a' }}>{state.eventTitle}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="summary-label">GRAND TOTAL</div>
            <div className="summary-val">₹{state.totalAmount?.toLocaleString()}</div>
          </div>
        </div>

        <div className="payment-method-list">
          <div
            className={`method-card ${method === "online" ? "active" : ""}`}
            onClick={() => setMethod("online")}
          >
            <div className="method-icon">💳</div>
            <div className="method-info">
              <h4>Digital Payment</h4>
              <p>UPI, Cards, or Net Banking</p>
            </div>
            <div className="selection-check">{method === "online" ? "✓" : ""}</div>
          </div>

          <div
            className={`method-card ${method === "cash" ? "active" : ""}`}
            onClick={() => setMethod("cash")}
          >
            <div className="method-icon">🏦</div>
            <div className="method-info">
              <h4>Offline / Bank Transfer</h4>
              <p>Pay manually via Bank/ATM</p>
            </div>
            <div className="selection-check">{method === "cash" ? "✓" : ""}</div>
          </div>
        </div>

        <button
          className="pay-action-btn"
          onClick={handleConfirm}
          disabled={!method}
        >
          {method === "online" ? "Initialize Secure Pay" : "Request Offline Slot"} ➔
        </button>

        <div className="secure-footer">
          <div className="secure-item">🛡️ SSL SECURED</div>
          <div className="secure-item">🔒 BANK LEVEL ENC</div>
        </div>
      </div>
    </div>
  );
};

export default Step4Payment;
