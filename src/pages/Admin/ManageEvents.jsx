// // import React, { useEffect, useState } from "react";

// // const ManageEvents = () => {
// //   const [events, setEvents] = useState([]);

// //   useEffect(() => {
// //     fetch("http://localhost:5001/api/events", {
// //       credentials: "include",
// //     })
// //       .then((res) => res.json())
// //       .then((data) => setEvents(data))
// //       .catch((err) => console.log("Fetch events error:", err));
// //   }, []);

// //   return (
// //     <div style={{ padding: "30px" }}>
// //       <h2 style={{ color: "#4f46e5", marginBottom: "20px" }}>Manage Events</h2>

// //       {events.length === 0 ? (
// //         <p>No events added yet.</p>
// //       ) : (
// //         <table style={{ width: "100%", background: "#fff", borderRadius: "12px" }}>
// //           <thead>
// //             <tr>
// //               <th style={th}>Title</th>
// //               <th style={th}>Date</th>
// //               <th style={th}>Price</th>
// //               <th style={th}>Location</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {events.map((ev) => (
// //               <tr key={ev._id}>
// //                 <td style={td}>{ev.title}</td>
// //                 <td style={td}>{ev.date}</td>
// //                 <td style={td}>₹ {ev.price}</td>
// //                 <td style={td}>{ev.location}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // };

// // const th = { padding: "12px", textAlign: "left", background: "#eef2ff" };
// // const td = { padding: "10px", borderBottom: "1px solid #eee" };

// // export default ManageEvents;









// import { useEffect, useState } from "react";

// const ManageEvents = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   /* ================= FETCH EVENTS ================= */
//   useEffect(() => {
//     fetch("http://localhost:5001/api/events", {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setEvents(Array.isArray(data) ? data : []);
//       })
//       .catch(() => {
//         alert("Failed to load events");
//       });
//   }, []);

//   return (
//     <div style={{ padding: "10px" }}>
//       <h2 style={{ marginBottom: "20px" }}>🎉 Manage Events</h2>

//       {events.length === 0 ? (
//         <p>No events found</p>
//       ) : (
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Date</th>
//               <th>Price</th>
//               <th>Location</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {events.map((e) => (
//               <tr key={e._id}>
//                 <td>{e.title}</td>
//                 <td>{e.date?.slice(0, 10)}</td>
//                 <td>₹ {e.price}</td>
//                 <td>{e.location}</td>

//                 {/* VIEW BUTTON */}
//                 <td>
//                   <button
//                     style={styles.viewBtn}
//                     onClick={() => setSelectedEvent(e)}
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* ================= DETAILS MODAL ================= */}
//       {selectedEvent && (
//         <div style={styles.modalBg}>

//           <div style={styles.modal}>

//             <h3 style={{ marginBottom: "15px" }}>
//               📄 Event Details
//             </h3>

//             <div style={styles.row}>
//               <span>Title:</span>
//               <b>{selectedEvent.title}</b>
//             </div>

//             <div style={styles.row}>
//               <span>Description:</span>
//               <b>{selectedEvent.description}</b>
//             </div>

//             <div style={styles.row}>
//               <span>Date:</span>
//               <b>{selectedEvent.date?.slice(0, 10)}</b>
//             </div>

//             <div style={styles.row}>
//               <span>Location:</span>
//               <b>{selectedEvent.location}</b>
//             </div>

//             <div style={styles.row}>
//               <span>Price:</span>
//               <b>₹ {selectedEvent.price}</b>
//             </div>

//             <div style={styles.row}>
//               <span>Category:</span>
//               <b>{selectedEvent.category || "N/A"}</b>
//             </div>

//             <div style={styles.row}>
//               <span>Status:</span>
//               <b
//                 style={{
//                   color:
//                     selectedEvent.status === "approved"
//                       ? "green"
//                       : selectedEvent.status === "pending"
//                       ? "orange"
//                       : "red",
//                 }}
//               >
//                 {selectedEvent.status}
//               </b>
//             </div>
// {/* 
//             <div style={styles.row}>
//               <span>Vendor:</span>
//               <b>{selectedEvent.createdBy?.name || "Admin"}</b>
//             </div>

//             <div style={styles.row}>
//               <span>Email:</span>
//               <b>{selectedEvent.createdBy?.email || "N/A"}</b>
//             </div> */}
//             <div style={styles.row}>
//   <span>Vendor:</span>
//   <b>
//     {selectedEvent.createdBy
//       ? selectedEvent.createdBy.name
//       : "Not Assigned"}
//   </b>
// </div>

// <div style={styles.row}>
//   <span>Email:</span>
//   <b>
//     {selectedEvent.createdBy
//       ? selectedEvent.createdBy.email
//       : "Not Available"}
//   </b>
// </div>


//             <button
//               style={styles.closeBtn}
//               onClick={() => setSelectedEvent(null)}
//             >
//               Close
//             </button>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ================= STYLES ================= */

// const styles = {
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//   },

//   viewBtn: {
//     padding: "6px 12px",
//     background: "#4f46e5",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontWeight: "600",
//   },

//   modalBg: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: "rgba(0,0,0,0.4)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 999,
//   },

//   modal: {
//     background: "#fff",
//     width: "420px",
//     padding: "25px",
//     borderRadius: "16px",
//     boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
//   },

//   row: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: "10px",
//     fontWeight: "600",
//   },

//   closeBtn: {
//     width: "100%",
//     marginTop: "15px",
//     padding: "10px",
//     background: "#ef4444",
//     color: "#fff",
//     border: "none",
//     borderRadius: "10px",
//     fontWeight: "700",
//     cursor: "pointer",
//   },
// };

// export default ManageEvents;








import { useEffect, useState } from "react";
import { useToast, useConfirm } from "../../components/Toast";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const confirm = useConfirm();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5001/api/events", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Manage fetch error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="manage-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Sora:wght@400;600;700&display=swap');

        .manage-root {
          font-family: 'Sora', sans-serif;
          animation: mg-fadeIn 0.6s ease;
        }

        @keyframes mg-fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mg-hdr {
          margin-bottom: 40px;
        }

        .mg-hdr h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #1e1b4b;
          letter-spacing: -1px;
          margin: 0;
        }

        .mg-hdr p {
          color: #64748b;
          font-size: 15px;
          margin-top: 6px;
        }

        /* ── TABLE ── */
        .mg-card-container {
          background: #ffffff;
          border-radius: 32px;
          border: 1.5px solid #f1f5f9;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(30, 27, 75, 0.04);
        }

        .mg-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .mg-table th {
          background: #f8fafc;
          padding: 20px 28px;
          font-size: 11px;
          font-weight: 800;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border-bottom: 1.5px solid #f1f5f9;
        }

        .mg-table td {
          padding: 24px 28px;
          font-size: 14.5px;
          color: #334155;
          border-bottom: 1px solid #f8fafc;
        }

        .mg-table tr:hover td { background: #fdfcff; }

        .mg-status {
          padding: 6px 12px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .mg-status.approved { background: #f0fdf4; color: #16a34a; }
        .mg-status.pending  { background: #fffbeb; color: #d97706; }
        .mg-status.rejected { background: #fef2f2; color: #dc2626; }

        .mg-view-btn {
          height: 40px;
          padding: 0 20px;
          background: #ffffff;
          border: 1.5px solid #e0e7ff;
          border-radius: 12px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          color: #4f46e5;
          cursor: pointer;
          transition: all 0.3s;
        }

        .mg-view-btn:hover {
          background: #4f46e5;
          color: white;
          border-color: #4f46e5;
          box-shadow: 0 8px 16px rgba(79, 70, 229, 0.2);
        }

        /* ── MODAL ── */
        .mg-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(12px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .mg-modal {
          background: #ffffff;
          width: 520px;
          border-radius: 40px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.2);
          animation: mg-fadeIn 0.4s ease;
        }

        .mg-modal-hdr {
          padding: 30px 40px;
          background: #f8fafc;
          border-bottom: 1.5px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .mg-modal-hdr h3 { font-size: 22px; font-weight: 800; color: #1e1b4b; }

        .mg-modal-body { padding: 40px; }

        .mg-row {
          display: flex;
          justify-content: space-between;
          padding: 16px 0;
          border-bottom: 1.2px solid #f8fafc;
        }
        .mg-row:last-child { border-bottom: none; }

        .mg-lbl { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .mg-val { font-size: 15px; font-weight: 700; color: #1e1b4b; text-align: right; max-width: 60%; }

        .mg-close {
          width: calc(100% - 80px);
          margin: 0 40px 40px;
          height: 54px;
          background: #1e1b4b;
          color: white;
          border: none;
          border-radius: 18px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .mg-close:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(30, 27, 75, 0.2); }
      `}</style>

      <header className="mg-hdr">
        <h2>Global Inventory</h2>
        <p>Monitor and manage the entire lifecycle of registered event experiences.</p>
      </header>

      {loading ? (
        <div className="mg-loading">Synchronizing records...</div>
      ) : events.length === 0 ? (
        <div style={{ padding: 60, textAlign: 'center', background: 'white', borderRadius: 40, border: '2px dashed #e2e8f0' }}>
          <h3>No records found</h3>
        </div>
      ) : (
        <div className="mg-card-container">
          <table className="mg-table">
            <thead>
              <tr>
                <th>Identifier</th>
                <th>Collection</th>
                <th>Timeline</th>
                <th>Governance</th>
                <th>Insights</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e._id}>
                  <td style={{ fontWeight: 800, color: '#1e1b4b' }}>{e.title}</td>
                  <td style={{ color: '#64748b', fontWeight: 600 }}>{e.category}</td>
                  <td style={{ fontWeight: 600 }}>{new Date(e.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td>
                    <span className={`mg-status ${e.status}`}>
                      {e.status}
                    </span>
                  </td>
                  <td>
                    <button className="mg-view-btn" onClick={() => setSelectedEvent(e)}>
                      Details
                    </button>
                  </td>
                  <td>
                    <button
                      className="mg-view-btn"
                      style={{ color: '#dc2626', borderColor: '#fecaca' }}
                      onClick={async () => {
                        const ok = await confirm(`Permanently remove event "${e.title}"?`);
                        if (ok) {
                          try {
                            const res = await fetch(`http://localhost:5001/api/events/${e._id}`, {
                              method: 'DELETE',
                              credentials: 'include'
                            });
                            const result = await res.json();
                            if (result.success) {
                              toast.success("Event removed successfully");
                              setEvents(events.filter(ev => ev._id !== e._id));
                            } else {
                              toast.error(result.message || "Failed to remove event");
                            }
                          } catch (error) {
                            console.error("Delete error:", error);
                            toast.error("An error occurred while removing the event.");
                          }
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedEvent && (
        <div className="mg-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="mg-modal" onClick={e => e.stopPropagation()}>
            <div className="mg-modal-hdr">
              <h3>Event Portfolio</h3>
              <button onClick={() => setSelectedEvent(null)} style={{ background: 'none', border: 'none', fontSize: 28, cursor: 'pointer', color: '#94a3b8' }}>&times;</button>
            </div>

            <div className="mg-modal-body">
              <div className="mg-row">
                <span className="mg-lbl">Experience</span>
                <span className="mg-val">{selectedEvent.title}</span>
              </div>
              <div className="mg-row">
                <span className="mg-lbl">Summary</span>
                <span className="mg-val">{selectedEvent.description}</span>
              </div>
              <div className="mg-row">
                <span className="mg-lbl">Investment</span>
                <span className="mg-val" style={{ color: '#4f46e5' }}>₹{selectedEvent.price.toLocaleString()}</span>
              </div>
              <div className="mg-row">
                <span className="mg-lbl">Venue</span>
                <span className="mg-val">{selectedEvent.location}</span>
              </div>
              <div className="mg-row">
                <span className="mg-lbl">Curator</span>
                <span className="mg-val">{selectedEvent.creatorRole === 'admin' ? 'Master HQ' : selectedEvent.createdBy?.name}</span>
              </div>
              <div className="mg-row">
                <span className="mg-lbl">Channel</span>
                <span className="mg-val">{selectedEvent.creatorRole === 'admin' ? 'admin@eventify.com' : selectedEvent.createdBy?.email}</span>
              </div>
            </div>

            <button className="mg-close" onClick={() => setSelectedEvent(null)}>
              Exit View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
