import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Social & Personal", "Corporate & Business", "Educational"];

const MyEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === "All" || e.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="discovery-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Sora:wght@400;600;700&display=swap');

        .discovery-root {
          font-family: 'Sora', sans-serif;
          animation: disc-fadeIn 0.6s ease;
        }

        @keyframes disc-fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── HEADER SECTION ── */
        .disc-hdr {
          margin-bottom: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .disc-title-box h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #1e1b4b;
          letter-spacing: -1px;
          margin: 0;
        }

        .disc-title-box p {
          color: #64748b;
          font-size: 15px;
          margin-top: 6px;
        }

        .disc-search-container {
          position: relative;
          width: 100%;
          max-width: 360px;
        }

        .disc-search-input {
          width: 100%;
          height: 54px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 18px;
          padding: 0 20px 0 52px;
          font-family: inherit;
          font-size: 14px;
          color: #1e293b;
          outline: none;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }

        .disc-search-input:focus {
          border-color: #4f46e5;
          box-shadow: 0 8px 24px rgba(79, 70, 229, 0.1);
        }

        .disc-search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 18px;
          opacity: 0.4;
        }

        /* ── CATEGORY BAR ── */
        .disc-cats {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 16px;
          margin-bottom: 32px;
          scrollbar-width: none;
        }
        .disc-cats::-webkit-scrollbar { display: none; }

        .disc-cat-btn {
          padding: 10px 20px;
          border-radius: 14px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          font-size: 13px;
          font-weight: 700;
          color: #64748b;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .disc-cat-btn:hover {
          border-color: #4f46e5;
          color: #4f46e5;
          background: #f5f3ff;
        }

        .disc-cat-btn.active {
          background: #4f46e5;
          border-color: #4f46e5;
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
          transform: translateY(-2px);
        }

        /* ── GRID & CARDS ── */
        .disc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 28px;
        }

        .disc-card {
          background: #ffffff;
          border-radius: 28px;
          border: 1.5px solid #f1f5f9;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          position: relative;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .disc-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 24px 48px rgba(30, 27, 75, 0.08);
          border-color: #e2e8f0;
        }

        .disc-img-wrap {
          height: 200px;
          position: relative;
          overflow: hidden;
        }

        .disc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .disc-card:hover .disc-img {
          transform: scale(1.1);
        }

        .disc-badge {
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
          letter-spacing: 0.5px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .disc-body {
          padding: 24px;
        }

        .disc-event-title {
          font-size: 19px;
          font-weight: 800;
          color: #1e1b4b;
          margin-bottom: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          line-height: 1.3;
        }

        .disc-event-desc {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .disc-event-desc.full {
          -webkit-line-clamp: unset;
          overflow: visible;
          display: block;
        }

        .read-more-btn {
          color: #4f46e5;
          font-weight: 800;
          cursor: pointer;
          font-size: 13px;
          margin-left: 4px;
          border: none;
          background: none;
          padding: 0;
          display: inline-block;
        }

        .disc-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          border-top: 1.5px solid #f8fafc;
        }

        .disc-price-box {
          display: flex;
          flex-direction: column;
        }

        .disc-price-lbl {
          font-size: 10px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
        }

        .disc-price {
          font-size: 20px;
          font-weight: 800;
          color: #4f46e5;
        }

        .disc-book-btn {
          padding: 10px 18px;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 6px 16px rgba(79, 70, 229, 0.25);
        }

        .disc-book-btn:hover {
          background: #4338ca;
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.35);
        }

        /* ── LOADING & EMPTY ── */
        .disc-loading {
          text-align: center;
          padding: 100px;
          color: #94a3b8;
          font-weight: 600;
          grid-column: 1 / -1;
        }

        .disc-empty {
          text-align: center;
          padding: 80px 40px;
          background: #ffffff;
          border-radius: 32px;
          border: 2px dashed #e2e8f0;
          grid-column: 1 / -1;
        }

        .disc-empty-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.5; }
        .disc-empty h3 { color: #1e1b4b; margin-bottom: 8px; font-weight: 800; }
        .disc-empty p { color: #64748b; }
      `}</style>

      <header className="disc-hdr">
        <div className="disc-title-box">
          <h2>Discover Events</h2>
          <p>Hand-picked experiences tailored for your premium lifestyle.</p>
        </div>

        <div className="disc-search-container">
          <span className="disc-search-icon">🔍</span>
          <input
            className="disc-search-input"
            type="text"
            placeholder="What are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className="disc-cats">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`disc-cat-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="disc-grid">
        {loading ? (
          <div className="disc-loading">Curating your experience...</div>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event._id}
              className="disc-card"
              onClick={() => navigate("/booking/step1", { state: event })}
            >
              <div className="disc-img-wrap">
                <img
                  className="disc-img"
                  src={event.image && !event.image.startsWith('http') ? `http://localhost:5001${event.image}` : (event.image || "https://images.unsplash.com/photo-1521336575822-6da63fb45455")}
                  alt={event.title}
                />
                <div className="disc-badge">{event.category.split(' ')[0]}</div>
              </div>

              <div className="disc-body">
                <h3 className="disc-event-title">{event.title}</h3>
                <p className="disc-event-desc">
                  {event.description}
                  {event.description.length > 80 && (
                    <span className="read-more-btn">...</span>
                  )}
                </p>

                <div className="disc-footer">
                  <div className="disc-price-box">
                    <span className="disc-price-lbl">Starting from</span>
                    <span className="disc-price">₹{event.price.toLocaleString()}</span>
                  </div>
                  <button className="disc-book-btn">Confirm Spot</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="disc-empty">
            <div className="disc-empty-icon">✨</div>
            <h3>No Collections Found</h3>
            <p>Try refining your search or exploring another category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
