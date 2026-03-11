import React, { useEffect, useState } from "react";

const VendorBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/vendor/bookings", {
          credentials: "include",
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setBookings(data);
        }
      } catch (err) {
        console.error("Booking fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h2 style={styles.title}>My Bookings</h2>
        <span style={styles.sub}>Recent event bookings from your customers</span>
      </div>

      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
          Refreshing your booking ledger...
        </div>
      ) : bookings.length === 0 ? (
        <div style={{ padding: "60px", textAlign: "center", background: "#f8fafc", borderRadius: "20px", border: "2px dashed #e2e8f0" }}>
          <p style={{ color: "#64748b", fontSize: "15px", fontWeight: "600" }}>No bookings found yet. Keep growing your portfolio! 📑</p>
        </div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Event / Services</th>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Event Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} style={styles.row}>
                <td style={styles.td}>
                  <div style={{ fontWeight: "800", color: "#4f46e5" }}>{b.eventName}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>📍 {b.location}</div>
                </td>
                <td style={styles.td}>
                  <div style={{ fontWeight: "700" }}>{b.user?.name || "Guest"}</div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>{b.user?.email || b.contactEmail}</div>
                </td>
                <td style={styles.td}>
                  {new Date(b.eventDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      background:
                        b.status === "confirmed" || b.status === "completed"
                          ? "linear-gradient(135deg, #10b981, #059669)"
                          : b.status === "pending"
                            ? "linear-gradient(135deg, #f59e0b, #d97706)"
                            : b.status === "cancellation_requested"
                              ? "linear-gradient(135deg, #fb923c, #f97316)"
                              : "linear-gradient(135deg, #ef4444, #dc2626)",
                    }}
                  >
                    {b.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <div style={{ fontWeight: "800", color: "#1e1b4b" }}>₹{b.totalAmount.toLocaleString()}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    marginBottom: "20px",
  },

  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
  },

  sub: {
    fontSize: "13px",
    color: "#6b7280",
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 10px",
  },

  th: {
    textAlign: "left",
    fontSize: "13px",
    color: "#6b7280",
    fontWeight: "600",
    paddingBottom: "10px",
  },

  row: {
    background: "#f9fafb",
    borderRadius: "14px",
  },

  td: {
    padding: "14px 12px",
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

export default VendorBookings;
