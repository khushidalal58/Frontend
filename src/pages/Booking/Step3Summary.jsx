import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import step3Img from "../../assets/step3.jpg";

const Step3Summary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", padding: "40px" }}>
        <h2 style={{ color: "#1e1b4b", fontSize: "24px" }}>No booking session found ❌</h2>
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

  const handleNext = () => {
    navigate("/booking/payment", {
      state: { ...state },
    });
  };

  return (
    <div className="s3-container">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Sora:wght@300;400;600;700;800&display=swap');

                .s3-container {
                    min-height: 100vh;
                    background: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)),
                                url(${step3Img});
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Sora', sans-serif;
                    padding: 60px 20px;
                }

                .s3-card {
                    background: rgba(255, 255, 255, 0.96);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    border-radius: 40px;
                    padding: 48px;
                    width: 100%;
                    max-width: 900px;
                    box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.4);
                    position: relative;
                }

                .s3-header {
                    text-align: center;
                    margin-bottom: 40px;
                }

                .s3-progress {
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

                .s3-badge {
                    display: inline-flex;
                    padding: 8px 18px;
                    background: #f0fdf4;
                    color: #16a34a;
                    border-radius: 100px;
                    font-size: 11px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin-bottom: 20px;
                }

                .s3-back-btn {
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

                .s3-back-btn:hover { background: #1e293b; color: white; transform: rotate(-10deg) scale(1.1); }

                .s3-title {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 36px;
                    font-weight: 800;
                    color: #0f172a;
                    letter-spacing: -1.5px;
                }

                .s3-summary-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 32px;
                    margin-top: 40px;
                }

                .summary-group-title {
                    font-size: 12px;
                    font-weight: 800;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 24px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .summary-group-title::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }

                .event-card-item {
                    background: #f8fafc;
                    border: 1px solid #f1f5f9;
                    border-radius: 24px;
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 16px;
                }

                .item-icon {
                    width: 48px;
                    height: 48px;
                    background: white;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 22px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                }

                .item-label { font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; }
                .item-val { font-size: 15px; font-weight: 800; color: #0f172a; }

                .services-list-container {
                    background: white;
                    border: 1px solid #f1f5f9;
                    border-radius: 24px;
                    padding: 8px;
                }

                .service-summary-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 16px;
                    border-bottom: 1px solid #f8fafc;
                }

                .service-summary-row:last-child { border: none; }

                .price-overview-card {
                    background: #0f172a;
                    color: white;
                    border-radius: 36px;
                    padding: 40px;
                    position: sticky;
                    top: 20px;
                    overflow: hidden;
                }

                .price-overview-card::before {
                    content: '✓';
                    position: absolute;
                    font-size: 200px;
                    right: -40px;
                    bottom: -40px;
                    opacity: 0.05;
                    font-weight: 800;
                }

                .price-line {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 16px;
                    font-size: 14px;
                    color: #94a3b8;
                }

                .grand-total-row {
                    margin-top: 32px;
                    padding-top: 32px;
                    border-top: 1px dashed rgba(255,255,255,0.2);
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }

                .grand-total-val {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 38px;
                    font-weight: 800;
                    color: #4f46e5;
                }

                .s3-pay-btn {
                    width: 100%;
                    height: 68px;
                    background: white;
                    color: #0f172a;
                    border: none;
                    border-radius: 20px;
                    font-family: inherit;
                    font-size: 17px;
                    font-weight: 800;
                    cursor: pointer;
                    margin-top: 32px;
                    transition: all 0.4s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                }

                .s3-pay-btn:hover {
                    transform: scale(1.03);
                    background: #f1f5f9;
                }

                @media (max-width: 800px) {
                    .s3-summary-grid { grid-template-columns: 1fr; }
                    .s3-card { padding: 40px 24px; }
                    .s3-title { font-size: 28px; }
                }
            `}</style>

      <div className="s3-card">
        <button className="s3-back-btn" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </button>

        <div className="s3-header">
          <div className="s3-progress">
            <div className="progress-dot filled"></div>
            <div className="progress-dot filled"></div>
            <div className="progress-dot current"></div>
            <div className="progress-dot"></div>
          </div>
          <div className="s3-badge">Step 3 • Review Your Plan</div>
          <h1 className="s3-title">Booking Confirmation</h1>
        </div>

        <div className="s3-summary-grid">
          <div className="summary-left-pane">
            <div className="summary-group-title">Event Logistics</div>
            <div className="event-card-item">
              <div className="item-icon">🌟</div>
              <div>
                <div className="item-label">Event</div>
                <div className="item-val">{state.eventTitle}</div>
              </div>
            </div>
            <div className="event-card-item">
              <div className="item-icon">📅</div>
              <div>
                <div className="item-label">Reserved Date</div>
                <div className="item-val">{new Date(state.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              </div>
            </div>
            <div className="event-card-item">
              <div className="item-icon">⏱️</div>
              <div>
                <div className="item-label">Time & Duration</div>
                <div className="item-val">{state.startTime} • {state.hours} Hours</div>
              </div>
            </div>

            <div className="summary-group-title" style={{ marginTop: '40px' }}>Selected Services</div>
            <div className="services-list-container">
              {state.selectedServices?.length > 0 ? (
                state.selectedServices.map(s => (
                  <div key={s._id} className="service-summary-row">
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{s.title}</div>
                      {s.menuItems && <div style={{ fontSize: '11px', color: '#64748b' }}>Includes {s.menuItems.length} dishes</div>}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#4f46e5' }}>₹{Number(s.price).toLocaleString()}</div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>No additional services selected</div>
              )}
            </div>
          </div>

          <div className="summary-right-pane">
            <div className="price-overview-card">
              <div className="summary-group-title" style={{ color: 'rgba(255,255,255,0.3)', borderColor: 'rgba(255,255,255,0.1)' }}>Payment Details</div>

              <div className="price-line">
                <span>Base Event Rate</span>
                <span style={{ color: 'white', fontWeight: 700 }}>₹{state.baseAmount?.toLocaleString()}</span>
              </div>

              {state.servicesAmount > 0 && (
                <div className="price-line">
                  <span>Service Add-ons</span>
                  <span style={{ color: 'white', fontWeight: 700 }}>₹{state.servicesAmount?.toLocaleString()}</span>
                </div>
              )}

              <div className="grand-total-row">
                <div style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase' }}>Amount Payable</div>
                <div className="grand-total-val">₹{state.totalAmount?.toLocaleString()}</div>
              </div>

              <button className="s3-pay-btn" onClick={handleNext}>
                Secure Payment <span style={{ fontSize: '20px' }}>→</span>
              </button>

              <div style={{ textAlign: 'center', marginTop: '24px', opacity: 0.5, fontSize: '10px' }}>
                Protected by 256-bit SSL encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3Summary;
