

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ ADDED
import Navbar from "../../components/Navbar";    // ✅ ADDED

const vendorImages = [
  {
    id: 1,
    vendor: "Royal Caterers",
    category: "Catering",
    img: "https://images.unsplash.com/photo-1555244162-803834f70033",
  },
  {
    id: 2,
    vendor: "Dream Decor",
    category: "Decoration",
    img: "https://images.unsplash.com/photo-1562777717-dc6987f65a63",
  },
  {
    id: 3,
    vendor: "Pixel Studios",
    category: "Photography",
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865",
  },
];

const VendorGallery = () => {
  const [filter, setFilter] = useState("All");
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();   // ✅ ADDED

  const filteredImages =
    filter === "All"
      ? vendorImages
      : vendorImages.filter((v) => v.category === filter);

  return (
    <>
      <Navbar />   {/* ✅ NAVBAR ADDED */}

      <div style={styles.page}>
        <h1 style={styles.heading}>Vendor Gallery</h1>
        <p style={styles.sub}>Explore vendor portfolio from real events</p>

        {/* FILTER BUTTONS */}
        <div style={styles.filterBar}>
          {["All", "Catering", "Decoration", "Photography"].map((f) => (
            <button
              key={f}
              style={{
                ...styles.filterBtn,
                background: filter === f ? "#4f46e5" : "#e0e7ff",
                color: filter === f ? "#fff" : "#4f46e5",
              }}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div style={styles.grid}>
          {filteredImages.map((v) => (
            <div key={v.id} style={styles.card}>
              <div
                style={styles.imgWrapper}
                onClick={() => setSelectedImg(v.img)}
              >
                <img src={v.img} style={styles.image} />
              </div>
              <div style={styles.cardBody}>
                <h3 style={styles.title}>{v.vendor}</h3>
                <p style={styles.cat}>{v.category}</p>
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
  },
  sub: {
    color: "#6b7280",
    marginBottom: "30px",
  },
  filterBar: {
    display: "flex",
    gap: "15px",
    marginBottom: "25px",
  },
  filterBtn: {
    border: "none",
    padding: "10px 18px",
    borderRadius: "999px",
    fontWeight: "700",
    cursor: "pointer",
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
    padding: "18px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  cat: {
    color: "#4f46e5",
    fontWeight: "600",
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

export default VendorGallery;
