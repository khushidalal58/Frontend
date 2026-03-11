import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import aboutHero from "../../assets/about-hero.png";

const About = () => {
  return (
    <div className="hw-page-wrapper">
      <Navbar />
      <div className="hw-root">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

          .hw-page-wrapper {
            background: #fdfcff;
            overflow-x: hidden;
          }

          .hw-root {
            font-family: 'Sora', sans-serif;
            color: #1e293b;
          }

          /* ── HERO ── */
          .hw-hero {
            height: 400px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            overflow: hidden;
          }

          .hw-hero-bg {
            position: absolute;
            inset: 0;
            background-image: url(${aboutHero});
            background-size: cover;
            background-position: center;
            z-index: 0;
          }

          .hw-hero-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.75));
            z-index: 1;
          }

          .hw-hero-content {
            position: relative;
            z-index: 2;
            max-width: 800px;
            padding: 0 24px;
            color: #ffffff;
            animation: hw-fadeInUp 0.8s ease-out;
          }

          @keyframes hw-fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .hw-hero-content h1 {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 48px;
            font-weight: 800;
            margin-bottom: 20px;
            letter-spacing: -2px;
          }

          .hw-hero-content p {
            font-size: 18px;
            opacity: 0.9;
            font-weight: 300;
          }

          /* ── STEPS SECTION ── */
          .hw-section {
            padding: 100px 80px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .hw-section-title {
            text-align: center;
            margin-bottom: 80px;
          }

          .hw-section-title h2 {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 36px;
            font-weight: 800;
            margin-bottom: 16px;
          }

          .hw-section-title p {
            color: #64748b;
            font-size: 16px;
          }

          .hw-step-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
            margin-bottom: 100px;
          }

          .hw-step-card {
            background: #ffffff;
            padding: 40px 30px;
            border-radius: 32px;
            border: 1px solid #f1f5f9;
            text-align: center;
            position: relative;
            transition: all 0.3s ease;
          }

          .hw-step-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.03);
            border-color: #4f46e5;
          }

          .hw-step-num {
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 40px;
            background: #4f46e5;
            color: white;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 18px;
            box-shadow: 0 8px 16px rgba(79, 70, 229, 0.3);
          }

          .hw-step-icon {
            font-size: 40px;
            margin-bottom: 24px;
            display: block;
          }

          .hw-step-card h3 {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 20px;
            font-weight: 800;
            margin-bottom: 12px;
          }

          .hw-step-card p {
            font-size: 14px;
            color: #64748b;
            line-height: 1.6;
          }

          /* ── MODULE BREAKDOWN ── */
          .hw-module-box {
            background: #0f172a;
            border-radius: 48px;
            padding: 80px;
            color: white;
          }

          .hw-module-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
          }

          .hw-module-card h4 {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 24px;
            font-weight: 800;
            margin-bottom: 24px;
            color: #4f46e5;
          }

          .hw-module-list {
            list-style: none;
            padding: 0;
          }

          .hw-module-list li {
            margin-bottom: 20px;
            padding-left: 32px;
            position: relative;
            font-size: 15px;
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.5;
          }

          .hw-module-list li::before {
            content: '✓';
            position: absolute;
            left: 0;
            top: 2px;
            width: 22px;
            height: 22px;
            background: rgba(79, 70, 229, 0.2);
            color: #4f46e5;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 900;
          }

          .hw-module-list li strong {
            display: block;
            color: white;
            margin-bottom: 2px;
          }

          @media (max-width: 1024px) {
            .hw-step-grid { grid-template-columns: 1fr 1fr; }
            .hw-module-grid { grid-template-columns: 1fr; }
            .hw-section { padding: 60px 30px; }
            .hw-module-box { padding: 40px 30px; }
          }
        `}</style>

        <section className="hw-hero">
          <div className="hw-hero-bg" />
          <div className="hw-hero-overlay" />
          <div className="hw-hero-content">
            <h1>How It Works</h1>
            <p>A step-by-step guide to navigating the Eventify management ecosystem.</p>
          </div>
        </section>

        <section className="hw-section">
          <div className="hw-section-title">
            <h2>The Core Workflow</h2>
            <p>Eventify simplifies coordination between clients, vendors, and admins.</p>
          </div>

          <div className="hw-step-grid">
            <div className="hw-step-card">
              <span className="hw-step-num">01</span>
              <span className="hw-step-icon">🔐</span>
              <h3>Registration</h3>
              <p>Users sign up as either a <strong>Client</strong> or a <strong>Vendor</strong>. Each role gains access to a customized dashboard.</p>
            </div>

            <div className="hw-step-card">
              <span className="hw-step-num">02</span>
              <span className="hw-step-icon">🔍</span>
              <h3>Discovery</h3>
              <p>Clients browse the marketplace to find event services, while Vendors build their portfolios to attract bookings.</p>
            </div>

            <div className="hw-step-card">
              <span className="hw-step-num">03</span>
              <span className="hw-step-icon">📅</span>
              <h3>Booking</h3>
              <p>Clients follow a structured multi-step process to customize services, catering, and confirm their event dates.</p>
            </div>

            <div className="hw-step-card">
              <span className="hw-step-num">04</span>
              <span className="hw-step-icon">✅</span>
              <h3>Fulfillment</h3>
              <p>Vendors manage incoming requests, update availability, and ensure the event is executed successfully.</p>
            </div>
          </div>

          <div className="hw-module-box">
            <div className="hw-section-title">
              <h2 style={{ color: 'white' }}>Module Functionality</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>A technical breakdown of how our specific modules handle application logic.</p>
            </div>

            <div className="hw-module-grid">
              <div className="hw-module-card">
                <h4>Client Portal</h4>
                <ul className="hw-module-list">
                  <li>
                    <strong>Event Marketplace</strong>
                    Dynamic search and filtering of available event packages.
                  </li>
                  <li>
                    <strong>Multi-Step Booking</strong>
                    A wizard-style interface to collect guest count, catering, and service details.
                  </li>
                  <li>
                    <strong>Feedback Engine</strong>
                    Enables clients to rate services and leave reviews for vendors.
                  </li>
                </ul>
              </div>

              <div className="hw-module-card">
                <h4>Vendor Engine</h4>
                <ul className="hw-module-list">
                  <li>
                    <strong>Menu & Portfolio</strong>
                    Full CRUD operations for managing catering menus and service images.
                  </li>
                  <li>
                    <strong>Availability Sync</strong>
                    Tracks vendor schedules to prevent double-booking of services.
                  </li>
                  <li>
                    <strong>Booking Dashboard</strong>
                    Real-time tracking of pending, confirmed, and completed events.
                  </li>
                </ul>
              </div>

              <div className="hw-module-card">
                <h4>Admin Control</h4>
                <ul className="hw-module-list">
                  <li>
                    <strong>User Verification</strong>
                    Validation of vendor legitimacy and monitoring of user accounts.
                  </li>
                  <li>
                    <strong>Platform Reporting</strong>
                    Generates analytics on event numbers, revenue, and platform growth.
                  </li>
                  <li>
                    <strong>Content Moderation</strong>
                    Centralized management of site content, reviews, and event listings.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
