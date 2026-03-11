import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Step5Confirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing");
  const [bookingId, setBookingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!state) {
      navigate("/users/dashboard/my-events");
      return;
    }

    const confirmBooking = async () => {
      try {
        const servicesList = state.selectedServices?.map(s => s._id) || [];

        const res = await fetch("http://localhost:5001/api/bookings/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            eventId: state.eventId,
            eventName: state.eventTitle,
            eventDate: state.date,
            location: state.location,
            guests: state.guests,
            hours: state.hours,
            startTime: state.startTime, // 🔥 Added
            contactEmail: state.contactEmail,
            baseAmount: state.baseAmount,
            servicesAmount: state.servicesAmount,
            totalAmount: state.totalAmount,
            paymentMethod: state.paymentMethod,
            image: state.image, // 🔥 PASS IMAGE TO BACKEND
            services: servicesList
          }),
        });

        const data = await res.json();
        if (res.ok) {
          const newBookingId = data.booking._id;
          setBookingId(newBookingId);

          if (state.paymentMethod === "online") {
            await fetch("http://localhost:5001/api/payments/pay", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                bookingId: newBookingId,
                amount: state.totalAmount,
                method: "online"
              })
            });
          }
          setStatus("success");
        } else {
          setStatus("failed");
          setErrorMsg(data.message || "We couldn't finalize your booking.");
        }
      } catch (error) {
        console.error("Booking Finalization Error:", error);
        setStatus("failed");
        setErrorMsg("Network error. Your session might have expired due to inactivity.");
      }
    };

    confirmBooking();
  }, [state, navigate]);

  return (
    <div className="s5-container">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Sora:wght@300;400;600;700;800&display=swap');

                .s5-container {
                    min-height: 100vh;
                    background: #f8fafc;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Sora', sans-serif;
                    padding: 60px 20px;
                    background: radial-gradient(circle at top right, #eef2ff, transparent),
                                radial-gradient(circle at bottom left, #f0fdf4, transparent);
                }

                .s5-card {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 40px;
                    padding: 64px 48px;
                    width: 100%;
                    max-width: 580px;
                    box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.08);
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }

                .status-visual {
                    margin-bottom: 40px;
                    position: relative;
                    display: inline-block;
                }

                .status-circle {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 48px;
                    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .status-circle.processing { 
                    background: #f1f5f9; 
                    animation: s5-spin 2s linear infinite; 
                }
                .status-circle.success { background: #f0fdf4; color: #16a34a; }
                .status-circle.failed { background: #fef2f2; color: #ef4444; }

                @keyframes s5-spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .s5-title {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 38px;
                    font-weight: 800;
                    color: #1e1b4b;
                    letter-spacing: -1.5px;
                    margin-bottom: 12px;
                }

                .s5-subtitle {
                    color: #64748b;
                    font-size: 16px;
                    line-height: 1.6;
                    max-width: 400px;
                    margin: 0 auto 48px;
                }

                .booking-receipt {
                    background: #f8fafc;
                    border: 1.5px solid #f1f5f9;
                    border-radius: 24px;
                    padding: 32px;
                    margin-bottom: 48px;
                    text-align: left;
                }

                .receipt-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 12px 0;
                    border-bottom: 1px dashed #e2e8f0;
                }

                .receipt-item:last-child { border: none; }
                .receipt-label { font-size: 12px; color: #94a3b8; font-weight: 700; text-transform: uppercase; }
                .receipt-value { font-size: 15px; color: #1e1b4b; font-weight: 800; }

                .confirmation-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .btn-finish {
                    height: 64px;
                    background: #1e1b4b;
                    color: white;
                    border: none;
                    border-radius: 20px;
                    font-family: inherit;
                    font-size: 16px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                }

                .btn-finish:hover {
                    background: #4f46e5;
                    transform: translateY(-4px);
                    box-shadow: 0 20px 40px rgba(79, 70, 229, 0.2);
                }

                .btn-outline {
                    height: 64px;
                    background: transparent;
                    color: #64748b;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 20px;
                    font-family: inherit;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .btn-outline:hover {
                    background: #f8fafc;
                    color: #1e1b4b;
                    border-color: #cbd5e1;
                }
            `}</style>

      <div className="s5-card">
        {status === "processing" && (
          <>
            <div className="status-visual">
              <div className="status-circle processing">🌀</div>
            </div>
            <h1 className="s5-title">Securing Spot...</h1>
            <p className="s5-subtitle">We are finalizing your reservation at the high-speed gateway. Please wait.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="status-visual">
              <div className="status-circle success">✓</div>
            </div>
            <h1 className="s5-title">Booking Received</h1>
            <p className="s5-subtitle">Excellent! Your reservation for <b>{state.eventTitle}</b> has been received and is currently <b>pending verification</b> by our admin team. We've sent a summary to your email.</p>

            <div className="booking-receipt">
              <div className="receipt-item">
                <div className="receipt-label">Booking ID</div>
                <div className="receipt-value">#{bookingId?.slice(-8).toUpperCase()}</div>
              </div>
              <div className="receipt-item">
                <div className="receipt-label">Requested Date</div>
                <div className="receipt-value">{state.date}</div>
              </div>
              <div className="receipt-item">
                <span className="receipt-label">Final Amount</span>
                <span className="receipt-value">₹{state.totalAmount.toLocaleString()}</span>
              </div>
              <div className="receipt-item">
                <span className="receipt-label">Payment Mode</span>
                <span className="receipt-value">{state.paymentMethod === 'cash' ? 'Pay at Event' : 'Bank Verified'}</span>
              </div>
            </div>

            <div className="confirmation-actions">
              <button className="btn-finish" onClick={() => navigate("/users/dashboard/my-bookings")}>
                Go to My Bookings ➔
              </button>
              <button className="btn-outline" onClick={() => navigate("/users/dashboard/my-events")}>
                Plan Another Event
              </button>
            </div>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="status-visual">
              <div className="status-circle failed">×</div>
            </div>
            <h1 className="s5-title">Booking Failed</h1>
            <p className="s5-subtitle">{errorMsg}</p>

            <div className="confirmation-actions">
              <button
                className="btn-finish"
                style={{ background: '#ef4444' }}
                onClick={() => navigate(-1)}
              >
                Return & Try Again
              </button>
              <button className="btn-outline" onClick={() => navigate("/users/dashboard/my-events")}>
                Cancel Process
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Step5Confirmation;
