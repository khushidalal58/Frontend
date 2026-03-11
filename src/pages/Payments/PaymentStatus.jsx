
import { useLocation } from "react-router-dom";

const PaymentStatus = () => {
  const { state } = useLocation();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Payment Status</h2>

        <h3>{state.event.title}</h3>
        <p>{state.event.desc}</p>

        <h2 style={styles.amount}>Paid Amount: ₹{state.amount}</h2>

        <div
          style={{
            ...styles.badge,
            background: "#dcfce7",
            color: "#15803d",
          }}
        >
          {state.status}
        </div>

        <h3 style={styles.success}>✅ Payment Confirmed Successfully!</h3>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef2ff",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "22px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
    textAlign: "center",
    width: "450px",
  },
  amount: { color: "#4f46e5", margin: "15px 0" },
  badge: {
    marginTop: "10px",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "700",
  },
  success: { marginTop: "15px", color: "#15803d" },
};

export default PaymentStatus;
