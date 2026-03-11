
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";   // ✅ ADDED

const events = [
  {
    id: 1,
    title: "Luxury Wedding",
    category: "Wedding",
    price: "₹ 49,999",
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
  },
  {
    id: 2,
    title: "Corporate Conference",
    category: "Corporate",
    price: "₹ 29,999",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
  },
  {
    id: 3,
    title: "Birthday Celebration",
    category: "Birthday",
    price: "₹ 14,999",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
  },
  {
    id: 4,
    title: "Music Concert",
    category: "Concert",
    price: "₹ 39,999",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
  },
];

const EventGallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();   // ✅ ADDED

  return (
    <>
      <Navbar />   {/* ✅ NAVBAR ADDED */}

      <div style={styles.page}>
        <h1 style={styles.heading}>Event Gallery</h1>
        <p style={styles.sub}>Explore premium events with stunning visuals</p>

        <div style={styles.grid}>
          {events.map((event) => (
            <div key={event.id} style={styles.card}>
              <div style={styles.imgWrapper} onClick={() => setSelectedImg(event.img)}>
                <img src={event.img} alt={event.title} style={styles.image} />
              </div>

              <div style={styles.cardBody}>
                <h3 style={styles.title}>{event.title}</h3>
                <p style={styles.cat}>{event.category}</p>
                <p style={styles.price}>{event.price}</p>
                <button style={styles.btn}>View Details</button>
              </div>
            </div>
          ))}
        </div>

        {/* FULL IMAGE MODAL */}
        {selectedImg && (
          <div style={styles.modal} onClick={() => setSelectedImg(null)}>
            <img src={selectedImg} style={styles.modalImg} />
          </div>
        )}
      </div>

      {/* ✅ FLOATING BACK TO HOME BUTTON */}
      <button
        style={styles.backHomeBtn}
        onClick={() => navigate("/")}
      >
        🏠 Back to Home
      </button>
    </>
  );
};

const styles = {
  page: {
    padding: "60px",
    background: "#f9fafb",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#111827",
  },
  sub: {
    color: "#6b7280",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    transition: "transform 0.3s",
  },
  imgWrapper: {
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },
  cardBody: {
    padding: "20px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  cat: {
    color: "#4f46e5",
    fontWeight: "600",
  },
  price: {
    fontSize: "18px",
    fontWeight: "700",
    margin: "8px 0",
  },
  btn: {
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "999px",
    fontWeight: "700",
    cursor: "pointer",
  },
  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImg: {
    width: "65%",
    borderRadius: "18px",
  },

  // ✅ FLOATING BUTTON STYLE (NEW)
  backHomeBtn: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "999px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(79,70,229,0.4)",
  },
};

export default EventGallery;
