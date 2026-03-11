import React, { useEffect, useState } from "react";

const VendorMyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendorEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5001/api/vendor/events", {
          credentials: "include",
        });

        const data = await res.json();
        if (Array.isArray(data)) {
          setEvents(data);
        } else if (Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Fetch vendor events error:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorEvents();
  }, []);

  return (
    <div className="vme-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

        .vme-root {
          font-family: 'Sora', sans-serif;
          animation: vme-fadeIn 0.5s ease;
        }

        @keyframes vme-fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .vme-header {
          margin-bottom: 32px;
        }

        .vme-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 28px;
          color: #1e1b4b;
          margin-bottom: 6px;
        }

        .vme-subtitle {
          font-size: 14px;
          color: #64748b;
        }

        .vme-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .vme-card {
          background: #ffffff;
          border-radius: 20px;
          border: 1.5px solid #e2e8f0;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }

        .vme-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(30, 27, 75, 0.08);
          border-color: #cbd5e1;
        }

        .vme-img-wrap {
          height: 180px;
          position: relative;
        }

        .vme-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .vme-status-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
        }

        .vme-status-approved { background: rgba(34, 197, 94, 0.9); color: white; }
        .vme-status-pending { background: rgba(245, 158, 11, 0.9); color: white; }
        .vme-status-rejected { background: rgba(239, 68, 68, 0.9); color: white; }

        .vme-body {
          padding: 20px;
          flex-grow: 1;
        }

        .vme-event-title {
          font-size: 17px;
          font-weight: 700;
          color: #1e1b4b;
          margin-bottom: 8px;
        }

        .vme-desc {
          font-size: 13px;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .vme-footer {
          padding: 16px 20px;
          background: #f8fafc;
          border-top: 1.5px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .vme-price {
          font-size: 18px;
          font-weight: 800;
          color: #4f46e5;
        }

        .vme-empty {
          text-align: center;
          padding: 80px 40px;
          background: #fff;
          border-radius: 24px;
          border: 1.5px dashed #e2e8f0;
          grid-column: 1 / -1;
        }
      `}</style>

      <div className="vme-header">
        <h2 className="vme-title">My Created Events</h2>
        <p className="vme-subtitle">Track and manage your event submissions and Status.</p>
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Refreshing your events...</div>
      ) : events.length === 0 ? (
        <div className="vme-empty">
          <div style={{ fontSize: 40, marginBottom: 16 }}>📁</div>
          <h3>No events found</h3>
          <p>You haven't created any events yet. Click 'Add Event' to start!</p>
        </div>
      ) : (
        <div className="vme-grid">
          {events.map((event) => (
            <div key={event._id} className="vme-card">
              <div className="vme-img-wrap">
                <img
                  className="vme-img"
                  src={event.image && !event.image.startsWith('http') ? `http://localhost:5001${event.image}` : (event.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30")}
                  alt={event.title}
                />
                <div className={`vme-status-badge vme-status-${event.status}`}>
                  {event.status}
                </div>
              </div>

              <div className="vme-body">
                <h3 className="vme-event-title">{event.title}</h3>
                <p className="vme-desc">{event.description?.slice(0, 80)}...</p>

                <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
                  <span>📍 {event.location}</span>
                  <span>•</span>
                  <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="vme-footer">
                <span className="vme-price">₹{event.price.toLocaleString()}</span>
                <button style={{
                  background: 'none',
                  border: '1.5px solid #e2e8f0',
                  padding: '6px 14px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#64748b',
                  cursor: 'pointer'
                }}>
                  Edit Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorMyEvents;
