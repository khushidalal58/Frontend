import React, { useEffect, useState } from "react";
import { useToast, useConfirm } from "../../components/Toast";

const ManageFeedback = () => {
  const toast = useToast();
  const confirm = useConfirm();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    userId: "",
    eventName: "",
    message: "",
    rating: 5,
  });

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/feedback", {
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

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/users", { credentials: "include" });
      const data = await res.json();
      if (res.ok) setUsers(data);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const ok = await confirm("Are you sure you want to delete this feedback?");
    if (!ok) return;

    try {
      const res = await fetch(`http://localhost:5001/api/feedback/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Feedback deleted successfully");
        fetchFeedbacks();
      } else {
        toast.error("Failed to delete feedback");
      }
    } catch (err) {
      toast.error("Server error — try again");
    }
  };

  const handleAddFeedback = async () => {
    if (!newFeedback.message.trim()) {
      toast.error("Please enter a feedback message");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/feedback/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newFeedback),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Feedback added successfully");
        setShowAddModal(false);
        setNewFeedback({ userId: "", eventName: "", message: "", rating: 5 });
        fetchFeedbacks();
      } else {
        toast.error(data.message || "Failed to add feedback");
      }
    } catch (err) {
      console.error("Feedback submit error:", err);
      toast.error("Network error: Check if server is running on port 5001");
    }
  };

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

  const renderInteractiveStars = (rating, onRate) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        onClick={() => onRate(i + 1)}
        style={{
          color: i < rating ? "#f59e0b" : "#e2e8f0",
          fontSize: "28px",
          cursor: "pointer",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.2)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="amf-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Sora:wght@400;500;600;700&display=swap');

        .amf-root {
          font-family: 'Sora', sans-serif;
          animation: amf-fadeIn 0.6s ease;
        }

        @keyframes amf-fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .amf-hdr {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 36px;
        }

        .amf-hdr h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #1e1b4b;
          letter-spacing: -1px;
          margin: 0;
        }

        .amf-hdr p {
          color: #64748b;
          font-size: 15px;
          margin-top: 6px;
        }

        .amf-add-btn {
          height: 52px;
          padding: 0 28px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          border: none;
          border-radius: 16px;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 24px rgba(79, 70, 229, 0.25);
        }

        .amf-add-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 32px rgba(79, 70, 229, 0.35);
        }

        /* ── TABLE ── */
        .amf-table-wrap {
          background: #ffffff;
          border-radius: 28px;
          border: 1.5px solid #f1f5f9;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(30, 27, 75, 0.04);
        }

        .amf-list {
          display: flex;
          flex-direction: column;
        }

        .amf-row {
          display: grid;
          grid-template-columns: 2fr 2.5fr 100px 140px 100px;
          align-items: center;
          padding: 22px 32px;
          border-bottom: 1.5px solid #f8fafc;
          transition: all 0.3s;
        }

        .amf-row:last-child { border-bottom: none; }

        .amf-row:hover:not(.amf-header) {
          background: #fdfcff;
        }

        .amf-header {
          background: #f8fafc;
          padding: 16px 32px;
        }

        .amf-th {
          font-size: 11px;
          font-weight: 800;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .amf-user-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .amf-user-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #1e1b4b;
        }

        .amf-user-email {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 500;
        }

        .amf-event-label {
          font-size: 12px;
          color: #7c3aed;
          font-weight: 600;
          margin-top: 2px;
        }

        .amf-msg {
          font-size: 13.5px;
          color: #475569;
          line-height: 1.6;
          max-width: 340px;
        }

        .amf-stars {
          display: flex;
          gap: 1px;
        }

        .amf-date {
          font-size: 13px;
          color: #64748b;
          font-weight: 600;
        }

        .amf-del-btn {
          height: 38px;
          width: 38px;
          background: #fff;
          border: 1.5px solid #fee2e2;
          color: #ef4444;
          border-radius: 12px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .amf-del-btn:hover {
          background: #ef4444;
          color: #fff;
          border-color: #ef4444;
          box-shadow: 0 6px 16px rgba(239, 68, 68, 0.25);
          transform: scale(1.08);
        }

        /* ── MODAL ── */
        .amf-modal-bg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(30, 27, 75, 0.5);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: amf-modalFadeIn 0.3s ease;
        }

        @keyframes amf-modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .amf-modal {
          background: #ffffff;
          border-radius: 32px;
          padding: 44px 40px;
          width: 100%;
          max-width: 520px;
          box-shadow: 0 40px 100px rgba(30, 27, 75, 0.15);
          animation: amf-modalSlide 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes amf-modalSlide {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .amf-modal h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #1e1b4b;
          margin: 0 0 6px 0;
        }

        .amf-modal-sub {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 28px;
        }

        .amf-field {
          margin-bottom: 20px;
        }

        .amf-field label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .amf-field input,
        .amf-field textarea {
          width: 100%;
          padding: 14px 18px;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          color: #1e1b4b;
          transition: all 0.3s;
          box-sizing: border-box;
          outline: none;
        }

        .amf-field input:focus,
        .amf-field textarea:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.08);
        }

        .amf-field textarea {
          resize: vertical;
          min-height: 100px;
        }

        .amf-stars-input {
          display: flex;
          gap: 6px;
          margin-top: 4px;
        }

        .amf-modal-actions {
          display: flex;
          gap: 14px;
          margin-top: 30px;
        }

        .amf-submit-btn {
          flex: 1;
          height: 54px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          border: none;
          border-radius: 16px;
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }

        .amf-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(79, 70, 229, 0.3);
        }

        .amf-cancel-btn {
          flex: 1;
          height: 54px;
          background: #f8fafc;
          color: #64748b;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }

        .amf-cancel-btn:hover {
          background: #f1f5f9;
          color: #1e1b4b;
        }

        /* ── EMPTY & LOADING ── */
        .amf-loading {
          text-align: center;
          padding: 60px;
          color: #94a3b8;
          font-weight: 600;
        }

        .amf-empty {
          text-align: center;
          padding: 100px 40px;
          background: white;
          border-radius: 40px;
          border: 2px dashed #e2e8f0;
        }

        .amf-empty-icon { font-size: 54px; margin-bottom: 20px; opacity: 0.3; }
        .amf-empty h3 { color: #1e1b4b; font-size: 24px; font-weight: 800; margin-bottom: 10px; }
        .amf-empty p { color: #64748b; font-size: 16px; }
      `}</style>

      <div className="amf-hdr">
        <div>
          <h2>Manage Feedback</h2>
          <p>View, manage, and add user feedback for all events.</p>
        </div>
        <button className="amf-add-btn" onClick={() => setShowAddModal(true)}>
          ➕ Add Feedback
        </button>
      </div>

      {loading ? (
        <div className="amf-loading">Loading feedbacks...</div>
      ) : feedbacks.length > 0 ? (
        <div className="amf-table-wrap">
          <div className="amf-list">
            <div className="amf-row amf-header">
              <span className="amf-th">User</span>
              <span className="amf-th">Feedback</span>
              <span className="amf-th">Rating</span>
              <span className="amf-th">Date</span>
              <span className="amf-th" style={{ textAlign: "center" }}>Action</span>
            </div>

            {feedbacks.map((fb) => (
              <div key={fb._id} className="amf-row">
                <div className="amf-user-info">
                  <span className="amf-user-name">
                    {fb.userId?.name || "Unknown User"}
                  </span>
                  <span className="amf-user-email">
                    {fb.userId?.email || ""}
                  </span>
                  {fb.eventName && (
                    <span className="amf-event-label">🎉 {fb.eventName}</span>
                  )}
                </div>

                <div className="amf-msg">{fb.message}</div>

                <div className="amf-stars">{renderStars(fb.rating)}</div>

                <div className="amf-date">
                  {new Date(fb.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                <div style={{ textAlign: "center" }}>
                  <button
                    className="amf-del-btn"
                    title="Delete feedback"
                    onClick={() => handleDelete(fb._id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="amf-empty">
          <div className="amf-empty-icon">💬</div>
          <h3>No feedback yet</h3>
          <p>When users submit feedback, it will appear here for management.</p>
        </div>
      )}

      {/* ── ADD FEEDBACK MODAL ── */}
      {showAddModal && (
        <div className="amf-modal-bg" onClick={() => setShowAddModal(false)}>
          <div className="amf-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add Feedback</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <p className="amf-modal-sub" style={{ margin: 0 }}>
                Manually add a feedback entry on behalf of a user.
              </p>
              <button
                onClick={() => {
                  const dummies = [
                    { msg: "Amazing event coordination! Highly recommended.", rating: 5 },
                    { msg: "The decoration was top-notch. Everyone loved it.", rating: 5 },
                    { msg: "Good services, though the catering could be slightly faster.", rating: 4 },
                    { msg: "Extremely professional staff and beautiful venue.", rating: 5 },
                    { msg: "Average experience, some issues with the sound system.", rating: 3 }
                  ];
                  const d = dummies[Math.floor(Math.random() * dummies.length)];
                  setNewFeedback({ ...newFeedback, message: d.msg, rating: d.rating, eventName: "Grand Celebration" });
                }}
                style={{
                  padding: "6px 12px",
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#475569",
                  cursor: "pointer"
                }}
              >
                🪄 Fill Dummy
              </button>
            </div>

            <div className="amf-field">
              <label>Select User</label>
              <select
                value={newFeedback.userId}
                onChange={(e) => setNewFeedback({ ...newFeedback, userId: e.target.value })}
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "16px",
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "14px",
                  color: "#1e1b4b",
                  outline: "none",
                  backgroundColor: "#fff",
                  cursor: "pointer"
                }}
              >
                <option value="">(Self / Admin)</option>
                {users.map(u => (
                  <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                ))}
              </select>
            </div>

            <div className="amf-field">
              <label>Event Name</label>
              <input
                type="text"
                placeholder="e.g. Grand Wedding Ceremony"
                value={newFeedback.eventName}
                onChange={(e) =>
                  setNewFeedback({ ...newFeedback, eventName: e.target.value })
                }
              />
            </div>

            <div className="amf-field">
              <label>Feedback Message</label>
              <textarea
                placeholder="Write the feedback message..."
                value={newFeedback.message}
                onChange={(e) =>
                  setNewFeedback({ ...newFeedback, message: e.target.value })
                }
              />
            </div>

            <div className="amf-field">
              <label>Rating</label>
              <div className="amf-stars-input">
                {renderInteractiveStars(newFeedback.rating, (r) =>
                  setNewFeedback({ ...newFeedback, rating: r })
                )}
              </div>
            </div>

            <div className="amf-modal-actions">
              <button className="amf-submit-btn" onClick={handleAddFeedback}>
                Submit Feedback
              </button>
              <button
                className="amf-cancel-btn"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFeedback;
