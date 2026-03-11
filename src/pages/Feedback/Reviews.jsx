import React, { useState } from "react";
import { useToast } from "../../components/Toast";
import Ratings from "./Ratings";

const Reviews = () => {
  const toast = useToast();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const submitReview = () => {
    if (!review || rating === 0) {
      toast.warning("Please add both a rating and a review");
      return;
    }

    setReviews([
      ...reviews,
      {
        text: review,
        rating,
        date: new Date().toLocaleDateString(),
      },
    ]);

    setReview("");
    setRating(0);
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>💬 Feedback & Reviews</h2>

      {/* ⭐ Rating */}
      <Ratings onRate={(r) => setRating(r)} />

      {/* ✍️ Review Input */}
      <textarea
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        style={styles.textarea}
      />

      <button style={styles.btn} onClick={submitReview}>
        Submit Review
      </button>

      {/* 📋 REVIEWS LIST */}
      <div style={styles.list}>
        {reviews.map((r, i) => (
          <div key={i} style={styles.card}>
            <p style={styles.stars}>
              {"★".repeat(r.rating)}
              {"☆".repeat(5 - r.rating)}
            </p>
            <p style={styles.text}>{r.text}</p>
            <small style={styles.date}>{r.date}</small>
          </div>
        ))}

        {reviews.length === 0 && (
          <p style={styles.empty}>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "60px",
    maxWidth: "700px",
    margin: "auto",
    minHeight: "100vh",
    background: "#f9fafb",
  },

  heading: {
    fontSize: "30px",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: "25px",
    color: "#4f46e5",
  },

  textarea: {
    width: "100%",
    height: "110px",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    marginTop: "15px",
    fontSize: "15px",
    outline: "none",
  },

  btn: {
    marginTop: "18px",
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "15px",
  },

  list: {
    marginTop: "35px",
  },

  card: {
    background: "#ffffff",
    padding: "18px",
    borderRadius: "14px",
    boxShadow: "0 10px 22px rgba(0,0,0,.08)",
    marginBottom: "15px",
  },

  stars: {
    color: "#facc15",
    fontSize: "18px",
    marginBottom: "6px",
  },

  text: {
    fontSize: "15px",
    color: "#111827",
    marginBottom: "6px",
  },

  date: {
    color: "#6b7280",
    fontSize: "12px",
  },

  empty: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: "20px",
  },
};

export default Reviews;
