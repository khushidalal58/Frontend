import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

// Hybrid assets
import logo from "../../assets/logo.jpg";
import hero1 from "../../assets/event-hero.jpg";
import hero2 from "../../assets/event-hero2.jpg";
import hero3 from "../../assets/event-hero3.jpg";

const heroImages = [hero1, hero2, hero3];

const features = [
  { icon: "✨", title: "Precision Planning", desc: "Architect every detail of weddings, galas, and corporate summits." },
  { icon: "🏢", title: "Merchant Network", desc: "Curated directory of top-tier decorators, caterers and planners." },
  { icon: "📱", title: "Seamless Bookings", desc: "Fluid reservation experience with real-time availability sync." },
  { icon: "🛡️", title: "Secure Transactions", desc: "Enterprise-grade security for all your financial commitments." },
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hm-page-wrapper">
      <Navbar />
      <div className="hm-root">
        <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

                    .hm-page-wrapper {
                        background: #fdfcff;
                        overflow-x: hidden;
                    }

                    .hm-root {
                        font-family: 'Sora', sans-serif;
                    }

                    /* ── HERO SECTION ── */
                    .hm-hero {
                        height: 720px;
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        padding-left: 120px;
                        overflow: hidden;
                    }

                    .hm-hero-bg {
                        position: absolute;
                        inset: 0;
                        background-size: cover;
                        background-position: center;
                        transition: opacity 1.5s ease;
                        z-index: 0;
                        transform: scale(1.05); /* Slight zoom for premium feel */
                    }

                    .hm-hero-overlay {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(135deg, rgba(30, 27, 75, 0.85) 0%, rgba(79, 70, 229, 0.45) 55%, rgba(124, 58, 237, 0.3) 100%);
                        z-index: 1;
                    }

                    .hm-hero-content {
                        position: relative;
                        z-index: 2;
                        text-align: left;
                        max-width: 800px;
                        padding: 0 24px;
                        animation: hm-slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) both;
                    }

                    @keyframes hm-slideUp {
                        from { opacity: 0; transform: translateY(40px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .hm-hero-badge {
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                        background: rgba(255, 255, 255, 0.15);
                        backdrop-filter: blur(12px);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        padding: 8px 18px;
                        border-radius: 999px;
                        margin-bottom: 28px;
                    }

                    .hm-badge-dot {
                        width: 8px;
                        height: 8px;
                        background: #4f46e5;
                        border-radius: 50%;
                        box-shadow: 0 0 10px #4f46e5;
                        animation: hm-pulse 2s infinite;
                    }

                    @keyframes hm-pulse {
                        0% { opacity: 0.6; transform: scale(0.9); }
                        50% { opacity: 1; transform: scale(1.1); }
                        100% { opacity: 0.6; transform: scale(0.9); }
                    }

                    .hm-hero-badge span {
                        color: #ffffff;
                        font-size: 11px;
                        font-weight: 800;
                        text-transform: uppercase;
                        letter-spacing: 1.5px;
                    }

                    .hm-hero-content h1 {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-size: 64px;
                        font-weight: 800;
                        color: #ffffff;
                        line-height: 1.1;
                        letter-spacing: -2px;
                        margin-bottom: 24px;
                    }

                    .hm-hero-content p {
                        font-size: 18px;
                        color: rgba(255, 255, 255, 0.8);
                        line-height: 1.6;
                        margin-bottom: 40px;
                        max-width: 500px;
                        margin-left: 0;
                        margin-right: auto;
                    }

                    .hm-hero-actions {
                        display: flex;
                        gap: 16px;
                        justify-content: flex-start;
                    }

                    .hm-btn-primary {
                        padding: 16px 36px;
                        background: #ffffff;
                        color: #1e1b4b;
                        border: none;
                        border-radius: 16px;
                        font-size: 15px;
                        font-weight: 800;
                        cursor: pointer;
                        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                        text-decoration: none;
                    }

                    .hm-btn-primary:hover {
                        transform: translateY(-5px);
                        background: #4f46e5;
                        color: white;
                        box-shadow: 0 20px 45px rgba(79, 70, 229, 0.3);
                    }

                    .hm-btn-secondary {
                        padding: 16px 36px;
                        background: rgba(255, 255, 255, 0.1);
                        backdrop-filter: blur(8px);
                        border: 1.5px solid rgba(255, 255, 255, 0.2);
                        color: #ffffff;
                        border-radius: 16px;
                        font-size: 15px;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all 0.3s;
                        text-decoration: none;
                    }

                    .hm-btn-secondary:hover {
                        border-color: #ffffff;
                        background: rgba(255, 255, 255, 0.2);
                    }

                    /* ── FEATURES SECTION ── */
                    .hm-features {
                        padding: 120px 80px;
                        background: #ffffff;
                    }

                    .hm-section-hdr {
                        text-align: center;
                        margin-bottom: 80px;
                    }

                    .hm-section-hdr h2 {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-size: 42px;
                        font-weight: 800;
                        color: #1e1b4b;
                        letter-spacing: -1.5px;
                        margin-bottom: 16px;
                    }

                    .hm-section-hdr p {
                        font-size: 18px;
                        color: #64748b;
                    }

                    .hm-feat-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                        gap: 32px;
                        max-width: 1200px;
                        margin: 0 auto;
                    }

                    .hm-feat-card {
                        background: #fdfcff;
                        border-radius: 32px;
                        border: 1.5px solid #f1f5f9;
                        padding: 40px;
                        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                        cursor: default;
                    }

                    .hm-feat-card:hover {
                        background: #ffffff;
                        border-color: #4f46e5;
                        transform: translateY(-10px);
                        box-shadow: 0 25px 60px rgba(79, 70, 229, 0.08);
                    }

                    .hm-feat-icon {
                        width: 60px;
                        height: 60px;
                        background: #f5f3ff;
                        color: #4f46e5;
                        border-radius: 18px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 28px;
                        margin-bottom: 24px;
                        transition: all 0.3s;
                    }

                    .hm-feat-card:hover .hm-feat-icon {
                        background: #4f46e5;
                        color: white;
                        transform: rotate(-5deg) scale(1.1);
                    }

                    .hm-feat-card h3 {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-size: 20px;
                        font-weight: 800;
                        color: #1e1b4b;
                        margin-bottom: 12px;
                    }

                    .hm-feat-card p {
                        font-size: 15px;
                        color: #64748b;
                        line-height: 1.6;
                    }

                    /* ── CTA SECTION ── */
                    .hm-cta {
                        padding: 100px 80px;
                        background: linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%);
                        margin: 0 80px 80px;
                        border-radius: 40px;
                        text-align: center;
                        color: white;
                        position: relative;
                        overflow: hidden;
                        box-shadow: 0 30px 70px rgba(30, 27, 75, 0.3);
                    }

                    .hm-cta-content {
                        position: relative;
                        z-index: 2;
                    }

                    .hm-cta h2 {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-size: 48px;
                        font-weight: 800;
                        margin-bottom: 20px;
                        letter-spacing: -2px;
                    }

                    .hm-cta p {
                        font-size: 18px;
                        opacity: 0.8;
                        margin-bottom: 40px;
                    }

                    /* ── NEW FOOTER ── */
                    .hm-footer-v2 {
                        background: #0a0a0a;
                        color: white;
                        padding: 100px 80px 40px;
                        font-family: 'Sora', sans-serif;
                    }

                    .hm-footer-grid {
                        display: grid;
                        grid-template-columns: 1.5fr 1fr 1fr;
                        gap: 80px;
                        max-width: 1300px;
                        margin: 0 auto 80px;
                    }

                    .hm-footer-col-brand .hm-footer-logo {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        margin-bottom: 24px;
                    }

                    .hm-footer-col-brand .hm-footer-logo img {
                        height: 40px;
                        border-radius: 10px;
                    }

                    .hm-footer-col-brand .hm-footer-logo span {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-size: 24px;
                        font-weight: 800;
                        letter-spacing: -1px;
                        color: white;
                    }

                    .hm-footer-desc {
                        font-size: 15px;
                        color: #94a3b8;
                        line-height: 1.7;
                        margin-bottom: 32px;
                    }

                    .hm-footer-socials {
                        display: flex;
                        gap: 16px;
                    }

                    .hm-footer-socials a {
                        width: 40px;
                        height: 40px;
                        background: #1e293b;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        text-decoration: none;
                        transition: all 0.3s;
                        font-size: 18px;
                    }

                    .hm-footer-socials a:hover {
                        background: #4f46e5;
                        transform: translateY(-5px);
                    }

                    .hm-footer-col h4 {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-size: 18px;
                        font-weight: 800;
                        margin-bottom: 30px;
                        color: white;
                    }

                    .hm-footer-col a, .hm-footer-col p {
                        display: block;
                        color: #94a3b8;
                        text-decoration: none;
                        font-size: 15px;
                        margin-bottom: 16px;
                        transition: color 0.3s;
                    }

                    .hm-footer-col a:hover {
                        color: #ffffff;
                    }

                    .hm-footer-bottom {
                        max-width: 1300px;
                        margin: 0 auto;
                        padding-top: 40px;
                        border-top: 1px solid #1e293b;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: #64748b;
                        font-size: 13px;
                        font-weight: 600;
                    }

                    .hm-footer-legal {
                        display: flex;
                        gap: 24px;
                    }

                    .hm-footer-legal a {
                        color: #64748b;
                        text-decoration: none;
                        transition: color 0.3s;
                    }

                    .hm-footer-legal a:hover {
                        color: white;
                    }

                    @media (max-width: 768px) {
                        .hm-hero-content h1 { font-size: 42px; }
                        .hm-feat-card { padding: 30px; }
                        .hm-cta { margin: 0 20px 60px; padding: 60px 30px; }
                    }
                `}</style>

        {/* HERO */}
        <section className="hm-hero">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className="hm-hero-bg"
              style={{
                backgroundImage: `url(${img})`,
                opacity: currentImage === idx ? 1 : 0
              }}
            />
          ))}
          <div className="hm-hero-overlay" />
          <div className="hm-hero-content">
            <h1>Celebrate Every Moment <br /> with Perfection</h1>
            <p>The simplest way to discover, book, and manage your dream events in one place.</p>
            <div className="hm-hero-actions">
              <Link to="/register" className="hm-btn-primary">Register</Link>
              <Link to="/login" className="hm-btn-secondary">Login</Link>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="hm-features">
          <div className="hm-section-hdr">
            <h2>Elite Capabilities</h2>
            <p>Everything you need to orchestrate events at the highest level.</p>
          </div>
          <div className="hm-feat-grid">
            {features.map((f, i) => (
              <div key={i} className="hm-feat-card">
                <div className="hm-feat-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="hm-cta">
          <div className="hm-cta-content">
            <h2>Experience the Future</h2>
            <p>Join the circle of over 10,000 professional event architects today.</p>
            <Link to="/register" className="hm-btn-primary" style={{ padding: '18px 48px' }}>Register Now</Link>
          </div>
        </section>

        <footer className="hm-footer-v2">
          <div className="hm-footer-grid">
            <div className="hm-footer-col-brand">
              <div className="hm-footer-logo">
                <img src={logo} alt="Logo" />
              </div>
              <p className="hm-footer-desc">
                We specialize in architecting unforgettable occasions. From luxury weddings to high-stakes corporate summits, our platform provides the elite tools needed for perfection.
              </p>
              <div className="hm-footer-socials">
                <a href="#">𝕏</a>
                <a href="#">📸</a>
                <a href="#">📘</a>
                <a href="#">🔗</a>
              </div>
            </div>

            <div className="hm-footer-col">
              <h4>Platform</h4>
              <Link to="/about">About Us</Link>
              <Link to="/events">Marketplace</Link>
              <Link to="/register">Join as Vendor</Link>
              <Link to="/login">Manage Events</Link>
              <Link to="/">Gallery</Link>
            </div>

            <div className="hm-footer-col">
              <h4>Service</h4>
              <a href="#">Photography</a>
              <a href="#">Catering</a>
              <a href="#">Decoration</a>
              <a href="#">Security</a>
            </div>


          </div>
          <div className="hm-footer-bottom">
            <p>© 2026 EVENTIFY ELITE • ARCHITECTING MOMENTS WITH PRECISION</p>
            <div className="hm-footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;