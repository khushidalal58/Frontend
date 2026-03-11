import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useToast } from "../../components/Toast";

const categories = [
  { id: "all", label: "All Events", icon: "✨" },
  { id: "Social & Personal", label: "Social", icon: "🥂" },
  { id: "Corporate & Business", label: "Corporate", icon: "💼" },
  { id: "Educational", label: "Educational", icon: "🎓" },
];

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleBookNow = (e, event) => {
    e.stopPropagation();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.warning("Please login first to book an event!");
      navigate("/login");
    } else if (user.role !== "user") {
      toast.error(`As a ${user.role}, you cannot book events. Please login as a customer.`);
    } else {
      navigate("/booking/step1", { state: event });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5001/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.filter(e => e.status === "approved"));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch events error:", err);
        setLoading(false);
      });
  }, []);

  const filteredEvents = events.filter((e) => {
    const matchesCategory = selectedCategory === "all" || e.category === selectedCategory;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Playfair+Display:wght@700;800;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .lt-page {
          background: #f0f4ff;
          min-height: 100vh;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #1a1a2e;
          overflow-x: hidden;
        }

        /* ─── ANIMATED HERO ─── */
        .lt-hero {
          position: relative;
          padding: 90px 40px 130px;
          background: linear-gradient(135deg, #e0e7ff 0%, #fce7f3 50%, #dbeafe 100%);
          text-align: center;
          overflow: hidden;
        }

        /* floating orbs */
        .lt-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          animation: lt-float 8s ease-in-out infinite;
          pointer-events: none;
        }
        .lt-orb-1 { width: 300px; height: 300px; background: rgba(139,92,246,0.18); top: -80px; left: -80px; animation-delay: 0s; }
        .lt-orb-2 { width: 200px; height: 200px; background: rgba(236,72,153,0.18); top: 20px;  right: -50px; animation-delay: 2s; }
        .lt-orb-3 { width: 250px; height: 250px; background: rgba(59,130,246,0.18); bottom: -60px; left: 40%;  animation-delay: 4s; }

        @keyframes lt-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-30px) scale(1.05); }
        }

        .lt-hero-inner {
          position: relative;
          z-index: 5;
          max-width: 820px;
          margin: 0 auto;
        }

        .lt-badge {
          display: inline-block;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(139,92,246,0.25);
          padding: 8px 22px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #7c3aed;
          margin-bottom: 28px;
        }

        .lt-hero-h1 {
          font-family: 'Playfair Display', serif;
          font-size: 62px;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -1px;
          color: #1a1a2e;
          margin-bottom: 22px;
        }

        .lt-hero-h1 em {
          font-style: italic;
          background: linear-gradient(90deg, #7c3aed, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .lt-hero-sub {
          font-size: 18px;
          color: #475569;
          line-height: 1.7;
          max-width: 540px;
          margin: 0 auto;
        }

        /* ─── FLOATING SEARCH ─── */
        .lt-search-float {
          margin-top: -50px;
          position: relative;
          z-index: 50;
          padding: 0 5%;
        }

        .lt-search-box {
          max-width: 780px;
          margin: 0 auto;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px);
          border: 1.5px solid rgba(255,255,255,0.9);
          border-radius: 28px;
          padding: 10px 10px 10px 28px;
          box-shadow:
            0 20px 60px rgba(124,58,237,0.12),
            0 4px 16px rgba(0,0,0,0.06);
          display: flex;
          align-items: center;
          gap: 12px;
          transition: box-shadow 0.3s;
        }

        .lt-search-box:focus-within {
          box-shadow:
            0 20px 60px rgba(124,58,237,0.22),
            0 0 0 3px rgba(124,58,237,0.12),
            0 4px 16px rgba(0,0,0,0.06);
        }

        .lt-search-icon { font-size: 20px; opacity: 0.5; }

        .lt-search-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-family: inherit;
          font-size: 16px;
          color: #1a1a2e;
        }

        .lt-search-input::placeholder { color: #94a3b8; }

        .lt-search-btn {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 20px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(124,58,237,0.3);
        }

        .lt-search-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(124,58,237,0.45);
        }

        /* ─── CATEGORY PILLS ─── */
        .lt-cats {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          padding: 48px 40px 0;
        }

        .lt-cat {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          background: white;
          border: 1.5px solid #e2e8f0;
          border-radius: 100px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: #475569;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .lt-cat:hover {
          border-color: #c4b5fd;
          color: #7c3aed;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(124,58,237,0.12);
        }

        .lt-cat.active {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: white;
          border-color: transparent;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 10px 25px rgba(124,58,237,0.35);
        }

        /* ─── MAIN GRID ─── */
        .lt-main {
          max-width: 1440px;
          margin: 56px auto 120px;
          padding: 0 40px;
        }

        .lt-count {
          font-size: 14px;
          font-weight: 700;
          color: #94a3b8;
          margin-bottom: 32px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .lt-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 36px;
        }

        /* ─── PREMIUM CARD ─── */
        .lt-card {
          background: #ffffff;
          border-radius: 28px;
          overflow: hidden;
          border: 1.5px solid #f1f5f9;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }

        .lt-card:hover {
          transform: translateY(-16px) rotate(-0.5deg);
          box-shadow:
            0 40px 80px -15px rgba(124,58,237,0.18),
            0 20px 40px -20px rgba(0,0,0,0.1);
          border-color: #c4b5fd;
        }

        /* glow ring on hover */
        .lt-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 30px;
          background: linear-gradient(135deg, #a78bfa, #f9a8d4);
          opacity: 0;
          z-index: -1;
          transition: opacity 0.4s;
        }

        .lt-card:hover::before { opacity: 1; }

        .lt-card-img-wrap {
          height: 260px;
          position: relative;
          overflow: hidden;
        }

        .lt-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .lt-card:hover .lt-card-img { transform: scale(1.1); }

        /* gradient fade at bottom of image */
        .lt-card-img-wrap::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 100px;
          background: linear-gradient(to top, rgba(255,255,255,0.6), transparent);
        }

        .lt-tag {
          position: absolute;
          top: 18px; left: 18px; z-index: 5;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.5);
          padding: 6px 14px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #7c3aed;
        }

        .lt-heart {
          position: absolute;
          top: 16px; right: 18px; z-index: 5;
          width: 40px; height: 40px;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(8px);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          border: 1px solid rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .lt-heart:hover { transform: scale(1.2); background: #fce7f3; }

        .lt-card-body { padding: 28px; }

        .lt-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .lt-cat-name {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #7c3aed;
        }

        .lt-stars {
          font-size: 12px;
          font-weight: 700;
          color: #f59e0b;
          display: flex; align-items: center; gap: 4px;
        }

        .lt-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 800;
          color: #1a1a2e;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .lt-card-desc {
          font-size: 14px;
          color: #64748b;
          line-height: 1.65;
          margin-bottom: 26px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .lt-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
          margin-bottom: 22px;
        }

        .lt-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .lt-price-area {}
        .lt-price-lbl { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; }
        .lt-price-amt { font-size: 26px; font-weight: 900; background: linear-gradient(135deg, #7c3aed, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        .lt-book-btn {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: white;
          border: none;
          padding: 13px 28px;
          border-radius: 16px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 18px rgba(124,58,237,0.3);
        }

        .lt-book-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(124,58,237,0.5);
          filter: brightness(1.05);
        }

        /* ─── SKELETON ─── */
        .lt-skel-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 36px;
        }

        .lt-skel {
          height: 490px;
          border-radius: 28px;
          background: linear-gradient(135deg, #f0f4ff, #fce7f3);
          position: relative;
          overflow: hidden;
        }

        .lt-skel::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%);
          transform: translateX(-100%);
          animation: lt-shimmer 1.5s infinite;
        }

        @keyframes lt-shimmer { 100% { transform: translateX(100%); } }

        /* ─── EMPTY ─── */
        .lt-empty {
          grid-column: 1/-1;
          padding: 100px 0;
          text-align: center;
        }

        .lt-empty-ico { font-size: 80px; margin-bottom: 20px; display: block; }
        .lt-empty h3 { font-size: 28px; font-weight: 800; color: #1a1a2e; margin-bottom: 10px; }
        .lt-empty p  { color: #94a3b8; font-size: 15px; }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1024px) {
          .lt-hero-h1 { font-size: 46px; }
          .lt-grid { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
        }

        @media (max-width: 768px) {
          .lt-hero { padding: 60px 20px 100px; }
          .lt-hero-h1 { font-size: 38px; }
          .lt-search-float { padding: 0 20px; }
          .lt-cats, .lt-main { padding-left: 20px; padding-right: 20px; }
          .lt-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="lt-page">

        {/* ── HERO ── */}
        <section className="lt-hero">
          <div className="lt-orb lt-orb-1"></div>
          <div className="lt-orb lt-orb-2"></div>
          <div className="lt-orb lt-orb-3"></div>

          <div className="lt-hero-inner">
            <span className="lt-badge">🎉 Premium Marketplace</span>
            <h1 className="lt-hero-h1">Your Next Event,<br /><em>Perfectly Crafted.</em></h1>
            <p className="lt-hero-sub">Browse curated, top-rated event services, handpicked for elegance, quality, and unforgettable experiences.</p>
          </div>
        </section>

        {/* ── FLOATING SEARCH ── */}
        <div className="lt-search-float">
          <div className="lt-search-box">
            <span className="lt-search-icon">🔍</span>
            <input
              type="text"
              className="lt-search-input"
              placeholder="Search events, moods, or occasions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="lt-search-btn">Search</button>
          </div>
        </div>

        {/* ── CATEGORIES ── */}
        <div className="lt-cats">
          {categories.map(cat => (
            <div
              key={cat.id}
              className={`lt-cat ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.icon}</span> {cat.label}
            </div>
          ))}
        </div>

        {/* ── MAIN ── */}
        <main className="lt-main">
          <p className="lt-count">
            {loading ? "Loading events..." : `${filteredEvents.length} experience${filteredEvents.length !== 1 ? "s" : ""} found`}
          </p>

          {loading ? (
            <div className="lt-skel-grid">
              {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="lt-skel" />)}
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="lt-grid">
              {filteredEvents.map(event => (
                <div
                  key={event._id}
                  className="lt-card"
                  onMouseEnter={() => setHoveredCard(event._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={(e) => handleBookNow(e, event)}
                >
                  {/* Image */}
                  <div className="lt-card-img-wrap">
                    <img
                      src={
                        event.image && !event.image.startsWith("http")
                          ? `http://localhost:5001${event.image}`
                          : event.image || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
                      }
                      alt={event.title}
                      className="lt-card-img"
                    />
                    <div className="lt-tag">{event.category.split(" ")[0]}</div>
                    <button
                      className="lt-heart"
                      onClick={e => e.stopPropagation()}
                      title="Wishlist"
                    >❤️</button>
                  </div>

                  {/* Body */}
                  <div className="lt-card-body">
                    <div className="lt-card-top">
                      <span className="lt-cat-name">{event.category}</span>
                      <span className="lt-stars">⭐ 5.0</span>
                    </div>

                    <h3 className="lt-card-title">{event.title}</h3>
                    <p className="lt-card-desc">{event.description}</p>

                    <div className="lt-divider"></div>

                    <div className="lt-card-footer">
                      <div className="lt-price-area">
                        <p className="lt-price-lbl">Starting from</p>
                        <p className="lt-price-amt">₹{event.price?.toLocaleString() || "0"}</p>
                      </div>
                      <button className="lt-book-btn" onClick={(e) => handleBookNow(e, event)}>Book Now →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="lt-empty">
              <span className="lt-empty-ico">🌸</span>
              <h3>No events found</h3>
              <p>Try a different search term or explore another category.</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default EventList;
