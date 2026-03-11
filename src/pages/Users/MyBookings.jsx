import React, { useEffect, useState } from "react";
import { useToast, useConfirm } from "../../components/Toast";

const MyBookings = () => {
  const toast = useToast();
  const confirm = useConfirm();
  const [bookedEvents, setBookedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackModal, setFeedbackModal] = useState(null);
  const [feedbackData, setFeedbackData] = useState({ message: "", rating: 5 });
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState(new Set());
  const [cancelModal, setCancelModal] = useState(null);
  const [cancelData, setCancelData] = useState({ reason: "" });

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/bookings/my", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) setBookedEvents(data);
    } catch (error) {
      console.error("Booking fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyFeedbacks = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/feedback/my", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        const ids = new Set(data.map((fb) => fb.bookingId?._id || fb.bookingId).filter(Boolean));
        setSubmittedFeedbacks(ids);
      }
    } catch (err) {
      console.error("Feedback check error:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchMyFeedbacks();
  }, []);

  const cancelBooking = (event) => {
    const eventDate = new Date(event.eventDate);
    const now = new Date();

    if (eventDate < now) {
      toast.error("Cannot cancel a past event.");
      return;
    }

    setCancelModal(event);
    setCancelData({ reason: "" });
  };

  const submitCancellation = async () => {
    if (!cancelData.reason.trim()) {
      toast.error("Please provide a reason for cancellation");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/cancellations/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          bookingId: cancelModal._id,
          reason: cancelData.reason,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Cancellation request submitted successfully");
        setCancelModal(null);
        fetchBookings();
      } else {
        toast.error(data.message || "Failed to submit request");
      }
    } catch (err) {
      toast.error("Server error — please try again.");
    }
  };

  const calculateRefund = (eventDate) => {
    const date = new Date(eventDate);
    const now = new Date();
    const diffInMs = date - now;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours >= 48) return { percent: 80, text: "80% refund applicable (> 48h notice)" };
    if (diffInHours > 0 && date.toDateString() !== now.toDateString()) return { percent: 50, text: "50% refund applicable (< 48h notice)" };
    return { percent: 0, text: "Non-refundable (Same-day cancellation)" };
  };

  const submitFeedback = async () => {
    if (!feedbackData.message.trim()) {
      toast.error("Please write your feedback message");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          bookingId: feedbackModal._id,
          eventId: feedbackModal.event,
          eventName: feedbackModal.eventName,
          message: feedbackData.message,
          rating: feedbackData.rating,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Thank you for your feedback! 🎉");
        setFeedbackModal(null);
        setFeedbackData({ message: "", rating: 5 });
        setSubmittedFeedbacks((prev) => new Set([...prev, feedbackModal._id]));
      } else {
        toast.error(data.message || "Failed to submit feedback");
      }
    } catch (err) {
      toast.error("Server error — please try again.");
    }
  };

  const renderInteractiveStars = (rating, onRate) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        onClick={() => onRate(i + 1)}
        style={{
          color: i < rating ? "#f59e0b" : "#e2e8f0",
          fontSize: "32px",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.2)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        ★
      </span>
    ));
  };

  const getStatusBadge = (status) => {
    const map = {
      pending: { bg: "#fef3c7", color: "#92400e", label: "Pending" },
      confirmed: { bg: "#d1fae5", color: "#065f46", label: "Confirmed" },
      completed: { bg: "#dbeafe", color: "#1e40af", label: "Completed" },
      cancelled: { bg: "#fee2e2", color: "#991b1b", label: "Cancelled" },
      rejected: { bg: "#fce7f3", color: "#9d174d", label: "Rejected" },
      cancellation_requested: { bg: "#fed7aa", color: "#9a3412", label: "Cancellation Requested" },
    };
    const s = map[status] || map.pending;
    return (
      <span
        style={{
          display: "inline-block",
          padding: "4px 12px",
          borderRadius: "20px",
          fontSize: "11px",
          fontWeight: 700,
          background: s.bg,
          color: s.color,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {s.label}
      </span>
    );
  };

  return (
    <div className="bookings-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Sora:wght@400;600;700&display=swap');

        .bookings-root {
          font-family: 'Sora', sans-serif;
          animation: bk-fadeIn 0.6s ease;
        }

        @keyframes bk-fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .bk-hdr {
          margin-bottom: 40px;
        }

        .bk-hdr h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #1e1b4b;
          letter-spacing: -1px;
          margin: 0;
        }

        .bk-hdr p {
          color: #64748b;
          font-size: 15px;
          margin-top: 6px;
        }

        /* ── TABLE / LIST CONTAINER ── */
        .bk-table-container {
          background: #ffffff;
          border-radius: 32px;
          border: 1.5px solid #f1f5f9;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(30, 27, 75, 0.04);
        }

        .bk-list {
          display: flex;
          flex-direction: column;
        }

        .bk-row {
          display: grid;
          grid-template-columns: 100px 2fr 1.5fr 1fr 180px;
          align-items: center;
          padding: 24px 32px;
          border-bottom: 1.5px solid #f8fafc;
          transition: all 0.3s;
        }

        .bk-row:last-child { border-bottom: none; }
        .bk-row:hover:not(.header) {
          background: #fdfcff;
          transform: scale(1.002);
        }

        .bk-row.header {
          background: #f8fafc;
          padding: 18px 32px;
        }

        .bk-th {
          font-size: 11px;
          font-weight: 800;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .bk-img-box {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          overflow: hidden;
          background: #f1f5f9;
          border: 1.5px solid #f1f5f9;
        }

        .bk-img { width: 100%; height: 100%; object-fit: cover; }

        .bk-info h4 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #1e1b4b;
          margin-bottom: 4px;
        }

        .bk-info span {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 600;
        }

        .bk-dt-box {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .bk-date {
          font-size: 14.5px;
          font-weight: 700;
          color: #334155;
        }

        .bk-loc {
          font-size: 12px;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .bk-price {
          font-size: 18px;
          font-weight: 800;
          color: #4f46e5;
        }

        .bk-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .bk-cancel-btn {
          height: 42px;
          padding: 0 18px;
          background: #fff;
          border: 1.5px solid #fee2e2;
          color: #ef4444;
          border-radius: 14px;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Sora', sans-serif;
        }

        .bk-cancel-btn:hover {
          background: #ef4444;
          color: #fff;
          border-color: #ef4444;
          box-shadow: 0 8px 16px rgba(239, 68, 68, 0.2);
        }

        .bk-feedback-btn {
          height: 42px;
          padding: 0 18px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Sora', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .bk-feedback-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(124, 58, 237, 0.30);
        }

        .bk-feedback-btn:disabled {
          background: #e2e8f0;
          color: #94a3b8;
          cursor: default;
          transform: none;
          box-shadow: none;
        }

        .bk-done-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          height: 42px;
          padding: 0 16px;
          background: #f0fdf4;
          color: #16a34a;
          border-radius: 14px;
          font-size: 12px;
          font-weight: 700;
          border: 1.5px solid #bbf7d0;
        }

        /* ── MODAL ── */
        .bk-modal-bg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(30, 27, 75, 0.55);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: bk-modalBgIn 0.3s ease;
        }

        @keyframes bk-modalBgIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .bk-modal {
          background: #ffffff;
          border-radius: 36px;
          padding: 48px 44px;
          width: 100%;
          max-width: 520px;
          box-shadow: 0 50px 120px rgba(30, 27, 75, 0.18);
          animation: bk-modalSlide 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        .bk-modal::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #7c3aed, #ec4899, #f59e0b);
        }

        @keyframes bk-modalSlide {
          from { transform: translateY(40px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .bk-modal-icon {
          font-size: 48px;
          text-align: center;
          margin-bottom: 12px;
        }

        .bk-modal h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #1e1b4b;
          text-align: center;
          margin: 0 0 4px 0;
        }

        .bk-modal-sub {
          font-size: 14px;
          color: #64748b;
          text-align: center;
          margin-bottom: 32px;
        }

        .bk-modal-event {
          display: inline-block;
          background: #f5f3ff;
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          color: #7c3aed;
          margin-bottom: 24px;
          text-align: center;
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #ede9fe;
        }

        .bk-stars-section {
          text-align: center;
          margin-bottom: 24px;
        }

        .bk-stars-label {
          font-size: 12px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }

        .bk-stars-row {
          display: flex;
          gap: 8px;
          justify-content: center;
        }

        .bk-textarea {
          width: 100%;
          padding: 16px 20px;
          border: 1.5px solid #e2e8f0;
          border-radius: 18px;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          color: #1e1b4b;
          resize: vertical;
          min-height: 110px;
          outline: none;
          transition: all 0.3s;
          box-sizing: border-box;
          margin-bottom: 28px;
        }

        .bk-textarea:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.08);
        }

        .bk-textarea::placeholder {
          color: #cbd5e1;
        }

        .bk-modal-btns {
          display: flex;
          gap: 14px;
        }

        .bk-submit-fb {
          flex: 1;
          height: 56px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: white;
          border: none;
          border-radius: 18px;
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .bk-submit-fb:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 32px rgba(124, 58, 237, 0.30);
        }

        .bk-cancel-fb {
          flex: 1;
          height: 56px;
          background: #f8fafc;
          color: #64748b;
          border: 1.5px solid #e2e8f0;
          border-radius: 18px;
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }

        .bk-cancel-fb:hover {
          background: #f1f5f9;
          color: #1e1b4b;
        }

        /* ── EMPTY & LOADING ── */
        .bk-loading { text-align: center; padding: 60px; color: #94a3b8; font-weight: 600; }
        
        .bk-empty {
          text-align: center;
          padding: 100px 40px;
          background: white;
          border-radius: 40px;
          border: 2px dashed #e2e8f0;
        }

        .bk-empty-icon { font-size: 54px; margin-bottom: 20px; opacity: 0.3; }
        .bk-empty h3 { color: #1e1b4b; font-size: 24px; font-weight: 800; margin-bottom: 10px; }
        .bk-empty p { color: #64748b; font-size: 16px; }

        @media (max-width: 900px) {
          .bk-row { grid-template-columns: 80px 1fr 1fr; gap: 15px; }
          .bk-row.header, .bk-loc, .bk-price { display: none; }
        }
      `}</style>

      <header className="bk-hdr">
        <h2>My Reservations</h2>
        <p>Keep track of your exclusive bookings and upcoming experiences.</p>
      </header>

      {loading ? (
        <div className="bk-loading">Syncing your schedule...</div>
      ) : bookedEvents.length > 0 ? (
        <div className="bk-table-container">
          <div className="bk-list">
            <div className="bk-row header">
              <span className="bk-th">Event</span>
              <span className="bk-th">Masterpiece</span>
              <span className="bk-th">Date & Venue</span>
              <span className="bk-th">Investment</span>
              <span className="bk-th" style={{ textAlign: 'center' }}>Actions</span>
            </div>

            {bookedEvents.map((event) => (
              <div key={event._id} className="bk-row">
                <div className="bk-img-box">
                  <img
                    className="bk-img"
                    src={event.image && !event.image.startsWith('http') ? `http://localhost:5001${event.image}` : (event.image || "https://images.unsplash.com/photo-1521336575822-6da63fb45455")}
                    alt={event.title}
                  />
                </div>

                <div className="bk-info">
                  <h4>{event.eventName}</h4>
                  <span>REF: #{event._id.slice(-6).toUpperCase()}</span>
                  <div style={{ marginTop: 6 }}>{getStatusBadge(event.status)}</div>
                </div>

                <div className="bk-dt-box">
                  <span className="bk-date">{new Date(event.eventDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span className="bk-loc">📍 {event.location}</span>
                </div>

                <div className="bk-price">₹{event.totalAmount.toLocaleString()}</div>

                <div className="bk-actions">
                  {event.status === "completed" ? (
                    submittedFeedbacks.has(event._id) ? (
                      <span className="bk-done-badge">✅ Feedback Given</span>
                    ) : (
                      <button
                        className="bk-feedback-btn"
                        onClick={() => {
                          setFeedbackModal(event);
                          setFeedbackData({ message: "", rating: 5 });
                        }}
                      >
                        ⭐ Give Feedback
                      </button>
                    )
                  ) : event.status === "confirmed" ? (
                    <button
                      className="bk-cancel-btn"
                      onClick={() => cancelBooking(event)}
                    >
                      Cancel Booking
                    </button>
                  ) : event.status === "pending" ? (
                    <button
                      className="bk-cancel-btn"
                      style={{ color: "#64748b", borderColor: "#e2e8f0" }}
                      onClick={async () => {
                        const ok = await confirm("Cancel this pending reservation?");
                        if (ok) {
                          const res = await fetch(`http://localhost:5001/api/bookings/cancel/${event._id}`, { method: "DELETE", credentials: "include" });
                          if (res.ok) { toast.success("Reservation removed"); fetchBookings(); }
                        }
                      }}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bk-empty">
          <div className="bk-empty-icon">🎟️</div>
          <h3>Your calendar is open</h3>
          <p>You haven't secured any reservations yet. Start your journey today.</p>
        </div>
      )}

      {/* ── FEEDBACK MODAL ── */}
      {feedbackModal && (
        <div className="bk-modal-bg" onClick={() => setFeedbackModal(null)}>
          <div className="bk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bk-modal-icon">💬</div>
            <h3>Share Your Experience</h3>
            <p className="bk-modal-sub">
              Your feedback helps us improve our services
            </p>

            <div className="bk-modal-event">
              🎉 {feedbackModal.eventName}
            </div>

            <div className="bk-stars-section">
              <div className="bk-stars-label">How would you rate?</div>
              <div className="bk-stars-row">
                {renderInteractiveStars(feedbackData.rating, (r) =>
                  setFeedbackData({ ...feedbackData, rating: r })
                )}
              </div>
            </div>

            <textarea
              className="bk-textarea"
              placeholder="Tell us about your experience... What did you love? Any suggestions?"
              value={feedbackData.message}
              onChange={(e) =>
                setFeedbackData({ ...feedbackData, message: e.target.value })
              }
            />

            <div className="bk-modal-btns">
              <button className="bk-submit-fb" onClick={submitFeedback}>
                ✨ Submit Feedback
              </button>
              <button
                className="bk-cancel-fb"
                onClick={() => setFeedbackModal(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CANCELLATION MODAL ── */}
      {cancelModal && (
        <div className="bk-modal-bg" onClick={() => setCancelModal(null)}>
          <div className="bk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bk-modal-icon">⚠️</div>
            <h3>Cancel Reservation</h3>
            <p className="bk-modal-sub">
              Please review our cancellation policy before proceeding.
            </p>

            <div className="bk-policy-box" style={{
              background: '#fff7ed',
              padding: '20px',
              borderRadius: '20px',
              marginBottom: '24px',
              border: '1.5px solid #ffedd5',
              fontSize: '13px'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#9a3412', fontSize: '14px' }}>Cancellation Policy:</h4>
              <ul style={{ paddingLeft: '20px', margin: 0, color: '#9a3412', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>&gt; 48 hours notice: <strong>80% Refund</strong></li>
                <li>&lt; 48 hours notice: <strong>50% Refund</strong></li>
                <li>Same day: <strong>Non-refundable</strong></li>
              </ul>
              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px dashed #fed7aa', fontWeight: 'bold', color: '#c2410c' }}>
                Estimated Refund: {calculateRefund(cancelModal.eventDate).text}
              </div>
            </div>

            <textarea
              className="bk-textarea"
              placeholder="Please provide a reason for cancellation..."
              value={cancelData.reason}
              onChange={(e) => setCancelData({ ...cancelData, reason: e.target.value })}
            />

            <div className="bk-modal-btns">
              <button className="bk-submit-fb" style={{ background: '#ef4444' }} onClick={submitCancellation}>
                Confirm Cancellation
              </button>
              <button
                className="bk-cancel-fb"
                onClick={() => setCancelModal(null)}
              >
                No, Keep Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
