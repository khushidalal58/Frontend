// import React, { useEffect, useState } from "react";

// const PendingEvents = () => {
//   const [events, setEvents] = useState([]);

//   // 🔹 Fetch pending events
//   const fetchPendingEvents = async () => {
//     try {
//       const res = await fetch(
//         "http://localhost:5001/api/admin/events/pending",
//         {
//           credentials: "include", // session ke liye
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Failed to load pending events ❌");
//         return;
//       }

//       setEvents(data);
//     } catch (err) {
//       console.log("Fetch pending error:", err);
//       alert("Server error ❌");
//     }
//   };

//   // 🔹 Approve event
//   const approveEvent = async (id) => {
//     try {
//       const res = await fetch(
//         `http://localhost:5001/api/admin/events/approve/${id}`,
//         {
//           method: "PUT",
//           credentials: "include",
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Approve failed ❌");
//         return;
//       }

//       alert("Event approved ✅");
//       fetchPendingEvents(); // refresh
//     } catch (err) {
//       alert("Server error ❌");
//     }
//   };

//   // 🔹 Reject event
//   const rejectEvent = async (id) => {
//     if (!window.confirm("Reject this event?")) return;

//     try {
//       const res = await fetch(
//         `http://localhost:5001/api/admin/events/reject/${id}`,
//         {
//           method: "PUT",
//           credentials: "include",
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Reject failed ❌");
//         return;
//       }

//       alert("Event rejected ❌");
//       fetchPendingEvents();
//     } catch (err) {
//       alert("Server error ❌");
//     }
//   };

//   useEffect(() => {
//     fetchPendingEvents();
//   }, []);

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Pending Events</h2>

//       {events.length === 0 ? (
//         <p>No pending events 🎉</p>
//       ) : (
//         <div style={styles.grid}>
//           {events.map((event) => (
//             <div key={event._id} style={styles.card}>
//               <img
//                 src={event.image}
//                 alt={event.title}
//                 style={styles.image}
//               />

//               <h3>{event.title}</h3>
//               <p>{event.description}</p>

//               <p>
//                 📍 {event.location} | 📅{" "}
//                 {event.date?.slice(0, 10)}
//               </p>

//               <strong>₹ {event.price}</strong>

//               <div style={styles.btnRow}>
//                 <button
//                   onClick={() => approveEvent(event._id)}
//                   style={styles.approveBtn}
//                 >
//                   ✅ Approve
//                 </button>

//                 <button
//                   onClick={() => rejectEvent(event._id)}
//                   style={styles.rejectBtn}
//                 >
//                   ❌ Reject
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "20px",
//   },

//   heading: {
//     color: "#4f46e5",
//     marginBottom: "20px",
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
//     gap: "20px",
//   },

//   card: {
//     background: "#fff",
//     padding: "15px",
//     borderRadius: "12px",
//     boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//     textAlign: "center",
//   },

//   image: {
//     width: "100%",
//     height: "160px",
//     objectFit: "cover",
//     borderRadius: "10px",
//     marginBottom: "10px",
//   },

//   btnRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: "12px",
//   },

//   approveBtn: {
//     background: "#22c55e",
//     color: "#fff",
//     border: "none",
//     padding: "8px 14px",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "600",
//   },

//   rejectBtn: {
//     background: "#ef4444",
//     color: "#fff",
//     border: "none",
//     padding: "8px 14px",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "600",
//   },
// };

// export default PendingEvents;




import React, { useEffect, useState } from "react";
import { useToast, useConfirm } from "../../components/Toast";

const PendingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const confirm = useConfirm();

  const fetchPendingEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:5001/api/admin/events/pending",
        { credentials: "include" }
      );

      const data = await res.json();
      if (res.ok) {
        setEvents(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Fetch pending error:", err);
    } finally {
      setLoading(false);
    }
  };

  const approveEvent = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5001/api/admin/events/approve/${id}`,
        { method: "PUT", credentials: "include" }
      );

      if (res.ok) {
        toast.success("Event approved successfully");
        fetchPendingEvents();
      } else {
        const data = await res.json();
        toast.error(data.message || "Approve failed");
      }
    } catch {
      toast.error("Server error — please try again.");
    }
  };

  const rejectEvent = async (id) => {
    const ok = await confirm("Are you sure you want to reject this event?");
    if (!ok) return;

    try {
      const res = await fetch(
        `http://localhost:5001/api/admin/events/reject/${id}`,
        { method: "PUT", credentials: "include" }
      );

      if (res.ok) {
        toast.success("Event rejected");
        fetchPendingEvents();
      } else {
        const data = await res.json();
        toast.error(data.message || "Reject failed");
      }
    } catch {
      toast.error("Server error — please try again.");
    }
  };

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  return (
    <div className="pe-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Sora:wght@400;600;700&display=swap');

        .pe-root {
          font-family: 'Sora', sans-serif;
          animation: pe-fadeIn 0.6s ease;
        }

        @keyframes pe-fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .pe-hdr {
          margin-bottom: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pe-hdr-text h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #1e1b4b;
          letter-spacing: -1px;
          margin: 0;
        }

        .pe-hdr-text p {
          color: #64748b;
          font-size: 15px;
          margin-top: 6px;
        }

        .pe-badge-count {
          background: #f5f3ff;
          color: #4f46e5;
          padding: 8px 16px;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 800;
          border: 1.5px solid #e0e7ff;
        }

        /* ── GRID ── */
        .pe-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
        }

        .pe-card {
          background: #ffffff;
          border-radius: 28px;
          border: 1.5px solid #f1f5f9;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .pe-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px rgba(30, 27, 75, 0.08);
          border-color: #e2e8f0;
        }

        .pe-img-box {
          height: 190px;
          position: relative;
        }

        .pe-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pe-cat-label {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 800;
          color: #4f46e5;
          text-transform: uppercase;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .pe-content {
          padding: 24px;
          flex-grow: 1;
        }

        .pe-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #1e1b4b;
          margin-bottom: 10px;
          line-height: 1.3;
        }

        .pe-desc {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .pe-meta-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          margin-bottom: 24px;
          padding: 16px;
          background: #f8fafc;
          border-radius: 16px;
        }

        .pe-meta-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #475569;
          font-weight: 600;
        }

        .pe-organizer {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 20px;
          border-top: 1.5px solid #f1f5f9;
        }

        .pe-avatar {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
          color: #4f46e5;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 800;
        }

        .pe-v-info h5 { font-size: 13px; color: #1e1b4b; font-weight: 700; }
        .pe-v-info p { font-size: 11px; color: #94a3b8; font-weight: 600; }

        .pe-footer-btns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding: 24px;
          background: #fdfcff;
          border-top: 1.5px solid #f1f5f9;
        }

        .pe-btn {
          height: 44px;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .pe-btn-app { background: #4f46e5; color: white; border: none; }
        .pe-btn-app:hover { background: #4338ca; box-shadow: 0 6px 16px rgba(79, 70, 229, 0.25); }

        .pe-btn-rej { background: white; color: #ef4444; border: 1.5px solid #fee2e2; }
        .pe-btn-rej:hover { background: #fef2f2; border-color: #ef4444; }

        .pe-loading-msg { text-align: center; padding: 100px; color: #94a3b8; font-weight: 600; }
        
        .pe-empty-state {
          text-align: center;
          padding: 100px 40px;
          background: white;
          border-radius: 40px;
          border: 2px dashed #e2e8f0;
          grid-column: 1 / -1;
        }
      `}</style>

      <header className="pe-hdr">
        <div className="pe-hdr-text">
          <h2>Verification Hub</h2>
          <p>Review and authenticate upcoming event experiences.</p>
        </div>
        <div className="pe-badge-count">{events.length} Pending Actions</div>
      </header>

      {loading ? (
        <div className="pe-loading-msg">Fetching authorization requests...</div>
      ) : events.length === 0 ? (
        <div className="pe-empty-state">
          <div style={{ fontSize: 48, marginBottom: 20 }}>🎬</div>
          <h3>Queue is Empty</h3>
          <p>All events have been processed. Great work!</p>
        </div>
      ) : (
        <div className="pe-grid">
          {events.map((event) => (
            <div key={event._id} className="pe-card">
              <div className="pe-img-box">
                <img
                  src={event.image && !event.image.startsWith('http') ? `http://localhost:5001${event.image}` : (event.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4")}
                  alt={event.title}
                  className="pe-img"
                />
                <div className="pe-cat-label">{event.category}</div>
              </div>

              <div className="pe-content">
                <h3 className="pe-title">{event.title}</h3>
                <p className="pe-desc">{event.description?.slice(0, 100)}...</p>

                <div className="pe-meta-grid">
                  <div className="pe-meta-row">📍 {event.location}</div>
                  <div className="pe-meta-row">📅 {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  <div className="pe-meta-row" style={{ color: '#4f46e5' }}>💰 ₹{event.price.toLocaleString()}</div>
                </div>

                <div className="pe-organizer">
                  <div className="pe-avatar">{(event.createdBy?.name?.[0] || 'V').toUpperCase()}</div>
                  <div className="pe-v-info">
                    <h5>{event.creatorRole === "admin" ? "System HQ" : event.createdBy?.name}</h5>
                    <p>{event.creatorRole === "admin" ? "Internal Entry" : "External Vendor"}</p>
                  </div>
                </div>
              </div>

              <div className="pe-footer-btns">
                <button className="pe-btn pe-btn-rej" onClick={() => rejectEvent(event._id)}>
                  Reject
                </button>
                <button className="pe-btn pe-btn-app" onClick={() => approveEvent(event._id)}>
                  Approve Entry
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingEvents;
