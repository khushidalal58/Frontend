import React, { useState } from "react";

const Ratings = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleRate = (value) => {
    setRating(value);
    if (onRate) onRate(value);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Rate Your Experience</h3>

      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              ...styles.star,
              color: star <= rating ? "#facc15" : "#d1d5db",
            }}
            onClick={() => handleRate(star)}
          >
            ★
          </span>
        ))}
      </div>

      {rating > 0 && (
        <p style={styles.text}>You rated {rating} star{rating > 1 && "s"} ⭐</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: "#fff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
    textAlign: "center",
  },
  title: {
    fontWeight: "700",
    marginBottom: "10px",
  },
  star: {
    fontSize: "32px",
    cursor: "pointer",
    margin: "0 6px",
  },
  text: {
    marginTop: "10px",
    color: "#4f46e5",
    fontWeight: "600",
  },
};

export default Ratings;
