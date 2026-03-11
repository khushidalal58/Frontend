import React, { useEffect, useState } from "react";

const VendorFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFeedbacks = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5001/api/feedback/vendor", {
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
                    fontSize: "17px",
                }}
            >
                ★
            </span>
        ));
    };

    const avgRating =
        feedbacks.length > 0
            ? (
                feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length
            ).toFixed(1)
            : "0.0";

    return (
        <div className="vfb-root">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Sora:wght@400;500;600;700&display=swap');

        .vfb-root {
          font-family: 'Sora', sans-serif;
          animation: vfb-fadeIn 0.6s ease;
        }

        @keyframes vfb-fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .vfb-hdr {
          margin-bottom: 36px;
        }

        .vfb-hdr h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #1e1b4b;
          letter-spacing: -1px;
          margin: 0;
        }

        .vfb-hdr p {
          color: #64748b;
          font-size: 15px;
          margin-top: 6px;
        }

        /* ── STATS BAR ── */
        .vfb-stats {
          display: flex;
          gap: 20px;
          margin-bottom: 32px;
        }

        .vfb-stat-card {
          flex: 1;
          background: #ffffff;
          border: 1.5px solid #f1f5f9;
          border-radius: 24px;
          padding: 24px 28px;
          box-shadow: 0 6px 24px rgba(30, 27, 75, 0.04);
          transition: all 0.3s;
        }

        .vfb-stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(30, 27, 75, 0.08);
        }

        .vfb-stat-label {
          font-size: 11px;
          font-weight: 800;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .vfb-stat-value {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: #1e1b4b;
          margin-top: 6px;
        }

        .vfb-stat-value.gold {
          background: linear-gradient(135deg, #f59e0b, #ef4444);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .vfb-stat-value.purple {
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* ── FEEDBACK CARDS ── */
        .vfb-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 22px;
        }

        .vfb-card {
          background: #ffffff;
          border-radius: 24px;
          border: 1.5px solid #f1f5f9;
          padding: 28px;
          box-shadow: 0 6px 28px rgba(30, 27, 75, 0.04);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .vfb-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(30, 27, 75, 0.08);
          border-color: #e2e8f0;
        }

        .vfb-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .vfb-avatar {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 16px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .vfb-user-block {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .vfb-u-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #1e1b4b;
          margin: 0;
        }

        .vfb-u-event {
          font-size: 12px;
          color: #7c3aed;
          font-weight: 600;
        }

        .vfb-stars {
          display: flex;
          gap: 1px;
        }

        .vfb-msg {
          font-size: 14px;
          color: #475569;
          line-height: 1.7;
          background: #f8fafc;
          border-radius: 14px;
          padding: 16px 18px;
          border: 1px solid #f1f5f9;
        }

        .vfb-time {
          display: block;
          margin-top: 14px;
          font-size: 11px;
          color: #94a3b8;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* ── EMPTY & LOADING ── */
        .vfb-loading {
          text-align: center;
          padding: 60px;
          color: #94a3b8;
          font-weight: 600;
        }

        .vfb-empty {
          text-align: center;
          padding: 100px 40px;
          background: white;
          border-radius: 40px;
          border: 2px dashed #e2e8f0;
        }

        .vfb-empty-icon { font-size: 54px; margin-bottom: 20px; opacity: 0.3; }
        .vfb-empty h3 { color: #1e1b4b; font-size: 24px; font-weight: 800; margin-bottom: 10px; }
        .vfb-empty p { color: #64748b; font-size: 16px; }
      `}</style>

            <header className="vfb-hdr">
                <h2>Customer Feedback</h2>
                <p>See what customers are saying about their event experiences.</p>
            </header>

            {!loading && feedbacks.length > 0 && (
                <div className="vfb-stats">
                    <div className="vfb-stat-card">
                        <div className="vfb-stat-label">Total Reviews</div>
                        <div className="vfb-stat-value purple">{feedbacks.length}</div>
                    </div>
                    <div className="vfb-stat-card">
                        <div className="vfb-stat-label">Average Rating</div>
                        <div className="vfb-stat-value gold">{avgRating} ★</div>
                    </div>
                    <div className="vfb-stat-card">
                        <div className="vfb-stat-label">5-Star Reviews</div>
                        <div className="vfb-stat-value purple">
                            {feedbacks.filter((fb) => fb.rating === 5).length}
                        </div>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="vfb-loading">Loading customer feedback...</div>
            ) : feedbacks.length > 0 ? (
                <div className="vfb-grid">
                    {feedbacks.map((fb) => (
                        <div key={fb._id} className="vfb-card">
                            <div className="vfb-card-top">
                                <div className="vfb-user-block">
                                    <div className="vfb-avatar">
                                        {(fb.userId?.name?.[0] || "U").toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="vfb-u-name">
                                            {fb.userId?.name || "Anonymous"}
                                        </h4>
                                        {fb.eventName && (
                                            <span className="vfb-u-event">🎉 {fb.eventName}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="vfb-stars">{renderStars(fb.rating)}</div>
                            </div>

                            <div className="vfb-msg">{fb.message}</div>

                            <span className="vfb-time">
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
                <div className="vfb-empty">
                    <div className="vfb-empty-icon">💬</div>
                    <h3>No feedback yet</h3>
                    <p>Customer reviews will appear here once they submit feedback.</p>
                </div>
            )}
        </div>
    );
};

export default VendorFeedback;
