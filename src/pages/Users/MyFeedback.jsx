import React, { useEffect, useState } from "react";
import { useToast } from "../../components/Toast";

const MyFeedback = () => {
    const toast = useToast();
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFeedbacks = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5001/api/feedback/my", {
                credentials: "include",
            });
            const data = await res.json();
            if (res.ok) setFeedbacks(data);
        } catch (err) {
            console.error("Fetch feedback error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span
                key={i}
                style={{
                    color: i < rating ? "#f59e0b" : "#e2e8f0",
                    fontSize: "18px",
                }}
            >
                ★
            </span>
        ));
    };

    return (
        <div className="mfb-root">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Sora:wght@400;500;600;700&display=swap');

        .mfb-root {
          font-family: 'Sora', sans-serif;
          animation: mfb-fadeIn 0.6s ease;
        }

        @keyframes mfb-fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mfb-hdr {
          margin-bottom: 36px;
        }

        .mfb-hdr h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #1e1b4b;
          letter-spacing: -1px;
          margin: 0;
        }

        .mfb-hdr p {
          color: #64748b;
          font-size: 15px;
          margin-top: 6px;
        }

        .mfb-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 24px;
        }

        .mfb-card {
          background: #ffffff;
          border-radius: 28px;
          border: 1.5px solid #f1f5f9;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(30, 27, 75, 0.04);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .mfb-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #7c3aed, #ec4899);
          border-radius: 28px 28px 0 0;
        }

        .mfb-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(124, 58, 237, 0.10);
          border-color: #ddd6fe;
        }

        .mfb-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .mfb-event-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: #1e1b4b;
          margin: 0 0 6px 0;
        }

        .mfb-event-date {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 600;
        }

        .mfb-stars {
          display: flex;
          gap: 2px;
        }

        .mfb-message {
          background: #f8fafc;
          border-radius: 16px;
          padding: 18px 20px;
          font-size: 14px;
          color: #475569;
          line-height: 1.7;
          border: 1px solid #f1f5f9;
          font-style: italic;
        }

        .mfb-message::before {
          content: '"';
          font-size: 32px;
          color: #c4b5fd;
          font-family: 'Plus Jakarta Sans', sans-serif;
          line-height: 0;
          vertical-align: -12px;
          margin-right: 4px;
        }

        .mfb-timestamp {
          display: inline-block;
          margin-top: 16px;
          font-size: 11px;
          color: #a78bfa;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* ── EMPTY & LOADING ── */
        .mfb-loading {
          text-align: center;
          padding: 60px;
          color: #94a3b8;
          font-weight: 600;
        }

        .mfb-empty {
          text-align: center;
          padding: 100px 40px;
          background: white;
          border-radius: 40px;
          border: 2px dashed #e2e8f0;
        }

        .mfb-empty-icon { font-size: 54px; margin-bottom: 20px; opacity: 0.3; }
        .mfb-empty h3 { color: #1e1b4b; font-size: 24px; font-weight: 800; margin-bottom: 10px; }
        .mfb-empty p { color: #64748b; font-size: 16px; }
      `}</style>

            <header className="mfb-hdr">
                <h2>My Feedback</h2>
                <p>All the reviews and ratings you've shared for your bookings.</p>
            </header>

            {loading ? (
                <div className="mfb-loading">Loading your feedback...</div>
            ) : feedbacks.length > 0 ? (
                <div className="mfb-grid">
                    {feedbacks.map((fb) => (
                        <div key={fb._id} className="mfb-card">
                            <div className="mfb-card-header">
                                <div>
                                    <h3 className="mfb-event-name">
                                        {fb.eventName || fb.bookingId?.eventName || "Event"}
                                    </h3>
                                    <span className="mfb-event-date">
                                        {fb.bookingId?.eventDate
                                            ? new Date(fb.bookingId.eventDate).toLocaleDateString(
                                                "en-GB",
                                                { day: "numeric", month: "short", year: "numeric" }
                                            )
                                            : ""}
                                    </span>
                                </div>
                                <div className="mfb-stars">{renderStars(fb.rating)}</div>
                            </div>
                            <div className="mfb-message">{fb.message}</div>
                            <span className="mfb-timestamp">
                                Submitted{" "}
                                {new Date(fb.createdAt).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mfb-empty">
                    <div className="mfb-empty-icon">💬</div>
                    <h3>No feedback yet</h3>
                    <p>Complete a booking and share your experience to see your reviews here.</p>
                </div>
            )}
        </div>
    );
};

export default MyFeedback;
