
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../../components/Toast";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const { event, amount, bookingId } = state;
  const websiteUpi = "eventify@upi";

  // 🔥 PAYMENT SAVE FUNCTION
  const confirmPayment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5001/api/payments/pay",
        {
          bookingId: bookingId,
          amount: Number(amount),
          method: "online",
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        navigate("/payment-status", {
          state: {
            event,
            amount,
            status: "Confirmed (Online)",
          },
        });
      } else {
        toast.error("Payment failed");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment failed — please try again.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Online Payment</h2>

        <h3>{event.title}</h3>
        <p>{event.desc}</p>

        <h2 style={styles.amount}>Pay: ₹ {amount}</h2>

        <div style={styles.options}>
          <div style={styles.box}>
            <h3>📷 Scan QR Code</h3>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${websiteUpi}`}
              style={styles.qr}
            />
            <button style={styles.payBtn} onClick={confirmPayment}>
              I Have Paid
            </button>
          </div>

          <div style={styles.box}>
            <h3>📱 Pay via UPI ID</h3>
            <div style={styles.upiBox}>{websiteUpi}</div>

            <button style={styles.payBtn} onClick={confirmPayment}>
              I Have Paid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 🔹 STYLES — SAME AS YOUR UI */
const styles = { /* SAME AS YOUR CODE — NOT CHANGED */ };

export default PaymentPage;
