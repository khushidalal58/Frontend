import React, { useState, useEffect } from "react";

const VendorAvailability = () => {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/vendor/availability", {
          credentials: "include",
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setAvailability(data);
        }
      } catch (error) {
        console.error("Error fetching availability:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h2 style={styles.title}>My Availability</h2>
        <p style={styles.subText}>Dates you are currently booked for</p>
      </div>

      {loading ? (
        <p style={{ color: "#64748b", fontSize: "14px" }}>Checking your schedule...</p>
      ) : availability.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", background: "#f8fafc", borderRadius: "16px", border: "1.5px dashed #e2e8f0" }}>
          <p style={{ color: "#64748b", fontSize: "14px" }}>No bookings yet. Your entire calendar is free! 📅</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {availability.map((a, idx) => (
            <div
              key={idx}
              style={{
                ...styles.item,
                background:
                  a.status === "Booked"
                    ? "linear-gradient(135deg, #fee2e2, #fecaca)"
                    : "linear-gradient(135deg, #dcfce7, #bbf7d0)",
              }}
            >
              <div>
                <p style={styles.date}>{a.date}</p>
                <p style={{ fontSize: "11px", color: "#b91ca1", fontWeight: "700", marginTop: "4px" }}>{a.eventName}</p>
              </div>
              <span
                style={{
                  ...styles.badge,
                  backgroundColor: a.status === "Booked" ? "#b91c1c" : "#15803d",
                }}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    background: "#ffffff",
    padding: "35px",
    borderRadius: "22px",
    boxShadow: "0 20px 45px rgba(0,0,0,0.08)",
  },

  header: {
    marginBottom: "25px",
  },

  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
  },

  subText: {
    fontSize: "13px",
    color: "#6b7280",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "18px",
  },

  item: {
    padding: "18px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  date: {
    fontWeight: "600",
    color: "#111827",
  },

  badge: {
    padding: "6px 14px",
    borderRadius: "999px",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "700",
  },
};

export default VendorAvailability;
