// const Footer = () => {
//   return (
//     <div style={styles.footer}>
//       © 2026 Eventify | Event Management System
//     </div>
//   );
// };

// const styles = {
//   footer: {
//     background: "#ffffff",
//     textAlign: "center",
//     padding: "15px",
//     borderTop: "1px solid #eee",
//   },
// };

// export default Footer;






// const Footer = () => {
//   return (
//     <div style={styles.footer}>
//       <div style={styles.top}>
//         <div>
//           <h3 style={styles.logo}>Eventify</h3>
//           <p style={styles.text}>
//             Eventify is a modern event management platform that helps you plan,
//             organize and manage events with ease and professionalism.
//           </p>
//         </div>

//         <div>
//           <h4 style={styles.heading}>Quick Links</h4>
//           <p style={styles.link}>Home</p>
//           <p style={styles.link}>Events</p>
//           <p style={styles.link}>Login</p>
//           <p style={styles.link}>Register</p>
//         </div>

//         <div>
//           <h4 style={styles.heading}>Contact Us</h4>
//           <p style={styles.text}>📧 support@eventify.com</p>
//           <p style={styles.text}>📞 +91 98765 43210</p>
//           <p style={styles.text}>📍 India</p>
//         </div>
//       </div>

//       <div style={styles.bottom}>
//         © 2026 Eventify | Event Management System
//       </div>
//     </div>
//   );
// };

// const styles = {
//   footer: {
//     background: "#ffffff",
//     padding: "50px 80px 20px",
//     borderTop: "1px solid #e5e7eb",
//     fontFamily: "'Inter', sans-serif",
//   },

//   top: {
//     display: "grid",
//     gridTemplateColumns: "2fr 1fr 1fr",
//     gap: "40px",
//     marginBottom: "30px",
//   },

//   logo: {
//     fontSize: "26px",
//     fontWeight: "800",
//     color: "#4f46e5",
//     fontFamily: "'Playfair Display', serif",
//     marginBottom: "10px",
//   },

//   heading: {
//     fontSize: "18px",
//     fontWeight: "700",
//     marginBottom: "12px",
//   },

//   text: {
//     color: "#6b7280",
//     lineHeight: "1.6",
//     fontSize: "14px",
//   },

//   link: {
//     fontSize: "14px",
//     color: "#4f46e5",
//     cursor: "pointer",
//     marginBottom: "6px",
//   },

//   bottom: {
//     textAlign: "center",
//     paddingTop: "20px",
//     borderTop: "1px solid #e5e7eb",
//     fontSize: "13px",
//     color: "#6b7280",
//   },
// };

// export default Footer;


// const Footer = () => {
//   return (
//     <div style={styles.footer}>
//       <div style={styles.top}>
//         <div>
//           <h3 style={styles.logo}>Eventify</h3>
//           <p style={styles.text}>
//             Eventify helps you manage weddings, parties, corporate events and
//             celebrations with ease and professionalism.
//           </p>
//         </div>

//         <div>
//           <h4 style={styles.heading}>Quick Links</h4>
//           <p style={styles.link}>Home</p>
//           <p style={styles.link}>Events</p>
//           <p style={styles.link}>Login</p>
//           <p style={styles.link}>Register</p>
//         </div>

//         <div>
//           <h4 style={styles.heading}>Contact</h4>
//           <p style={styles.text}>📧 support@eventify.com</p>
//           <p style={styles.text}>📞 +91 98765 43210</p>
//           <p style={styles.text}>📍 India</p>
//         </div>
//       </div>

//       <div style={styles.bottom}>
//         © 2026 Eventify | Event Management System
//       </div>
//     </div>
//   );
// };

// const styles = {
//   footer:{
//     background:"#ffffff",
//     padding:"50px 80px 20px",
//     borderTop:"1px solid #e5e7eb",
//     fontFamily:"'Inter', sans-serif"
//   },
//   top:{
//     display:"grid",
//     gridTemplateColumns:"2fr 1fr 1fr",
//     gap:"40px",
//     marginBottom:"30px"
//   },
//   logo:{
//     fontSize:"26px",
//     fontWeight:800,
//     color:"#4f46e5",
//     fontFamily:"'Playfair Display', serif",
//     marginBottom:"10px"
//   },
//   heading:{
//     fontSize:"18px",
//     fontWeight:700,
//     marginBottom:"10px"
//   },
//   text:{
//     color:"#6b7280",
//     fontSize:"14px",
//     lineHeight:"1.6"
//   },
//   link:{
//     fontSize:"14px",
//     color:"#4f46e5",
//     cursor:"pointer",
//     marginBottom:"6px"
//   },
//   bottom:{
//     textAlign:"center",
//     paddingTop:"20px",
//     borderTop:"1px solid #e5e7eb",
//     fontSize:"13px",
//     color:"#6b7280"
//   }
// };

// export default Footer;



import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Libre+Baskerville:wght@700&display=swap');

        .ft-root {
          font-family: 'Sora', sans-serif;
          background: #0a0a0a;
          color: #f8fafc;
        }

        /* ── HOW IT WORKS STRIP ── */
        .ft-how {
          background: linear-gradient(135deg, #0d9488, #0369a1);
          padding: 56px 80px;
          position: relative;
          overflow: hidden;
        }

        .ft-how::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 280px; height: 280px;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
          pointer-events: none;
        }

        .ft-how::after {
          content: '';
          position: absolute;
          bottom: -60px; left: 30%;
          width: 200px; height: 200px;
          background: rgba(255,255,255,0.04);
          border-radius: 50%;
          pointer-events: none;
        }

        .ft-how-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          text-align: center;
          margin-bottom: 10px;
        }

        .ft-how-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 30px;
          font-weight: 700;
          color: #fff;
          text-align: center;
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
        }

        .ft-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
        }

        .ft-step {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 18px;
          padding: 24px 20px;
          text-align: center;
          transition: all 0.25s ease;
        }

        .ft-step:hover {
          background: rgba(255,255,255,0.18);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.2);
        }

        .ft-step-num {
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 800;
          color: #fff;
          margin: 0 auto 14px;
        }

        .ft-step-icon { font-size: 26px; margin-bottom: 10px; }

        .ft-step-title {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 6px;
        }

        .ft-step-desc {
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          line-height: 1.5;
        }

        /* ── MAIN FOOTER ── */
        .ft-main {
          padding: 64px 80px 40px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 48px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        /* Brand col */
        .ft-brand-name {
          font-family: 'Libre Baskerville', serif;
          font-size: 24px;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 12px;
        }

        .ft-brand-name span { color: #14b8a6; }

        .ft-brand-desc {
          font-size: 13.5px;
          color: rgba(255,255,255,0.4);
          line-height: 1.7;
          margin-bottom: 24px;
          max-width: 260px;
        }

        /* Social icons */
        .ft-socials {
          display: flex;
          gap: 10px;
        }

        .ft-social-btn {
          width: 38px; height: 38px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.22s;
          text-decoration: none;
        }

        .ft-social-btn:hover {
          background: #0d9488;
          border-color: #0d9488;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(13,148,136,0.35);
        }

        /* Nav cols */
        .ft-col-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #14b8a6;
          margin-bottom: 20px;
        }

        .ft-col-links {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .ft-col-link {
          font-size: 13.5px;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ft-col-link::before {
          content: '›';
          color: #0d9488;
          font-size: 16px;
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.2s;
        }

        .ft-col-link:hover {
          color: #f8fafc;
          transform: translateX(4px);
        }

        .ft-col-link:hover::before { opacity: 1; transform: translateX(0); }

        /* Contact col */
        .ft-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 14px;
        }

        .ft-contact-icon {
          width: 32px; height: 32px;
          background: rgba(13,148,136,0.15);
          border: 1px solid rgba(13,148,136,0.2);
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
        }

        .ft-contact-text {
          font-size: 12.5px;
          color: rgba(255,255,255,0.45);
          line-height: 1.5;
        }

        .ft-contact-text strong {
          display: block;
          font-size: 12px;
          color: rgba(255,255,255,0.25);
          font-weight: 500;
          margin-bottom: 1px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* ── BOTTOM BAR ── */
        .ft-bottom {
          padding: 22px 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .ft-copy {
          font-size: 13px;
          color: rgba(255,255,255,0.25);
        }

        .ft-copy span { color: #14b8a6; font-weight: 600; }

        .ft-bottom-links {
          display: flex;
          gap: 20px;
        }

        .ft-bottom-link {
          font-size: 12.5px;
          color: rgba(255,255,255,0.25);
          text-decoration: none;
          transition: color 0.2s;
        }

        .ft-bottom-link:hover { color: #14b8a6; }

        @media (max-width: 900px) {
          .ft-how { padding: 48px 28px; }
          .ft-main { grid-template-columns: 1fr 1fr; padding: 48px 28px 32px; }
          .ft-bottom { padding: 20px 28px; }
        }

        @media (max-width: 560px) {
          .ft-main { grid-template-columns: 1fr; }
          .ft-steps { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <footer className="ft-root">

        {/* ── HOW IT WORKS ── */}
        <div className="ft-how">
          <div className="ft-how-eyebrow">✦ Simple Process</div>
          <h3 className="ft-how-title">How Eventify Works</h3>

          <div className="ft-steps">
            {[
              { num: "1", icon: "📝", title: "Register", desc: "Create your free account in seconds" },
              { num: "2", icon: "🎯", title: "Choose Event", desc: "Pick from 20+ event categories" },
              { num: "3", icon: "⚙️", title: "Customize", desc: "Set date, guests, hours & services" },
              { num: "4", icon: "✅", title: "Confirm & Enjoy", desc: "We handle everything for you" },
            ].map((s) => (
              <div key={s.num} className="ft-step">
                <div className="ft-step-num">{s.num}</div>
                <div className="ft-step-icon">{s.icon}</div>
                <div className="ft-step-title">{s.title}</div>
                <div className="ft-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN FOOTER ── */}
        <div className="ft-main">

          {/* Brand */}
          <div>
            <div className="ft-brand-name">Event<span>ify</span></div>
            <p className="ft-brand-desc">
              A modern event management platform designed to make your special moments unforgettable.
            </p>
            <div className="ft-socials">
              <a className="ft-social-btn" href="#" title="Instagram">📸</a>
              <a className="ft-social-btn" href="#" title="Facebook">📘</a>
              <a className="ft-social-btn" href="#" title="Twitter">🐦</a>
              <a className="ft-social-btn" href="#" title="WhatsApp">💬</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="ft-col-title">Quick Links</div>
            <div className="ft-col-links">
              <Link to="/" className="ft-col-link">Home</Link>
              <Link to="/about" className="ft-col-link">About Us</Link>
              <Link to="/events" className="ft-col-link">Events</Link>
              <Link to="/login" className="ft-col-link">Login</Link>
              <Link to="/register" className="ft-col-link">Register</Link>
            </div>
          </div>

          {/* Events */}
          <div>
            <div className="ft-col-title">Our Events</div>
            <div className="ft-col-links">
              {["Royal Wedding", "Birthday Bash", "Corporate Conf.", "DJ Night Party", "Product Launch"].map(e => (
                <span key={e} className="ft-col-link" style={{ cursor: "default" }}>{e}</span>
              ))}
            </div>
          </div>


        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="ft-bottom">
          <div className="ft-copy">
            © 2026 <span>Eventify</span> | Event Management System. All rights reserved.
          </div>
          <div className="ft-bottom-links">
            <a href="#" className="ft-bottom-link">Privacy Policy</a>
            <a href="#" className="ft-bottom-link">Terms of Service</a>
            <a href="#" className="ft-bottom-link">Support</a>
          </div>
        </div>

      </footer>
    </>
  );
};

export default Footer;