

import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import bgImage from "../../assets/event-hero.jpg"; // tumhari background image

const EventPanel = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div style={styles.page}>

        {/* ✅ BLURRED BACKGROUND LAYER (SAME) */}
        <div
          style={{
            ...styles.bgImage,
            backgroundImage: `url(${bgImage})`,
          }}
        ></div>

        {/* DARK OVERLAY (SAME) */}
        <div style={styles.bgOverlay}></div>

        {/* PANEL (SAME) */}
        <div style={styles.panel}>

          <h2 style={styles.heading}>🎉 Event Control Panel</h2>
          <p style={styles.sub}>
            Manage, create and update all your events from one place
          </p>

          <div style={styles.grid}>

            {/* ✅ EVENT LIST (SAME) */}
            <div 
              style={styles.card} 
              onClick={() => navigate("/events/list")}
            >
              <div style={styles.iconBox}>📋</div>
              <h3 style={styles.cardTitle}>Event List</h3>
              <p style={styles.cardText}>
                View all upcoming and past events with pricing
              </p>
            </div>

            {/* ❌ EVENT DETAILS REMOVED (AS YOU SAID) */}

            {/* ✅ ADD EVENT (SAME) */}
            <div 
              style={styles.card} 
              onClick={() => navigate("/events/add")}
            >
              <div style={styles.iconBox}>➕</div>
              <h3 style={styles.cardTitle}>Add Event</h3>
              <p style={styles.cardText}>
                Create a new event with full details
              </p>
            </div>

            {/* ✅ EDIT EVENT (SAME) */}
            <div 
              style={styles.card} 
              onClick={() => navigate("/events/edit/1")}
            >
              <div style={styles.iconBox}>✏</div>
              <h3 style={styles.cardTitle}>Edit Event</h3>
              <p style={styles.cardText}>
                Modify existing event information
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  page: {
    minHeight: "calc(100vh - 70px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: "40px",
    paddingBottom: "50px",
    overflow: "hidden",
  },

  // ✅ CORRECT BLUR BACKGROUND (SAME)
  bgImage: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    filter: "blur(4px)",
    transform: "scale(1.08)",
    zIndex: 0,
  },

  bgOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    zIndex: 1,
  },

  panel: {
    background: "#ffffff",
    padding: "60px",
    borderRadius: "28px",
    width: "100%",
    maxWidth: "620px",
    textAlign: "center",
    boxShadow: "0 25px 60px rgba(0,0,0,0.12)",
    border: "1px solid #e5e7eb",
    position: "relative",
    zIndex: 2,
  },

  heading: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#111827",
    fontFamily: "'Playfair Display', serif",
  },

  sub: {
    fontSize: "15px",
    color: "#6b7280",
    marginBottom: "40px",
    fontFamily: "'Inter', sans-serif",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 👈 AB 3 COLUMNS (CLEAN LOOK)
    gap: "28px",
  },

  card: {
    background: "#f9fafb",
    padding: "30px",
    borderRadius: "22px",
    cursor: "pointer",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
    transition: "all 0.3s ease-in-out",
  },

  iconBox: {
    fontSize: "36px",
    marginBottom: "12px",
    background: "#e0e7ff",
    width: "70px",
    height: "70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "16px",
    margin: "0 auto 12px auto",
  },

  cardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
    fontFamily: "'Playfair Display', serif",
  },

  cardText: {
    fontSize: "14px",
    color: "#6b7280",
    marginTop: "8px",
    fontFamily: "'Inter', sans-serif",
  },
};

export default EventPanel;
