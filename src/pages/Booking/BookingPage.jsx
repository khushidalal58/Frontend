// // // import { useLocation, useNavigate } from "react-router-dom";

// // // const BookingPage = () => {
// // //   const { state: event } = useLocation();
// // //   const navigate = useNavigate();

// // //   return (
// // //     <div style={styles.page}>
// // //       <div style={styles.card}>
// // //         <h2>Choose Payment Method</h2>

// // //         <h3>{event.title}</h3>
// // //         <p>{event.desc}</p>
// // //         <h2 style={styles.amount}>Amount: {event.price}</h2>

// // //         <div style={styles.options}>
// // //           <button
// // //             style={styles.cashBtn}
// // //             onClick={() =>
// // //               navigate("/payment-status", {
// // //                 state: { event, status: "Pending (Cash)" },
// // //               })
// // //             }
// // //           >
// // //             💵 Cash Payment
// // //           </button>

// // //           <button
// // //             style={styles.onlineBtn}
// // //             onClick={() =>
// // //               navigate("/payment-status", {
// // //                 state: { event, status: "Confirmed (Online)" },
// // //               })
// // //             }
// // //           >
// // //             📱 Online Payment
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const styles = {
// // //   page: {
// // //     minHeight: "100vh",
// // //     display: "flex",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     background: "#eef2ff",
// // //   },
// // //   card: {
// // //     background: "#fff",
// // //     padding: "40px",
// // //     borderRadius: "20px",
// // //     boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
// // //   },
// // //   amount: { color: "#4f46e5" },
// // //   options: { display: "flex", gap: "20px", marginTop: "20px" },
// // //   cashBtn: {
// // //     padding: "12px 20px",
// // //     borderRadius: "999px",
// // //     border: "2px solid #4f46e5",
// // //     background: "#fff",
// // //     color: "#4f46e5",
// // //   },
// // //   onlineBtn: {
// // //     padding: "12px 20px",
// // //     borderRadius: "999px",
// // //     background: "#4f46e5",
// // //     color: "#fff",
// // //     border: "none",
// // //   },
// // // };

// // // export default BookingPage;


// // // import { useLocation, useNavigate } from "react-router-dom";

// // // const BookingPage = () => {
// // //   const { state: event } = useLocation();
// // //   const navigate = useNavigate();

// // //   const price = event.price || "₹ 9,999"; // default price

// // //   return (
// // //     <div style={styles.page}>
// // //       <div style={styles.card}>
// // //         <h2>Confirm Your Booking</h2>

// // //         <img src={event.img} style={styles.img} />

// // //         <h3>{event.title}</h3>
// // //         <p>{event.desc}</p>

// // //         <h2 style={styles.amount}>Total Payment: {price}</h2>

// // //         <div style={styles.options}>
// // //           <button
// // //             style={styles.cashBtn}
// // //             onClick={() =>
// // //               navigate("/payment-status", {
// // //                 state: { event, amount: price, status: "Pending (Cash)" },
// // //               })
// // //             }
// // //           >
// // //             💵 Cash Payment
// // //           </button>

// // //           <button
// // //             style={styles.onlineBtn}
// // //             onClick={() =>
// // //               navigate("/payment", {
// // //                 state: { event, amount: price },
// // //               })
// // //             }
// // //           >
// // //             📱 Online Payment
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const styles = {
// // //   page: {
// // //     minHeight: "100vh",
// // //     display: "flex",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     background: "#eef2ff",
// // //   },
// // //   card: {
// // //     background: "#fff",
// // //     padding: "40px",
// // //     borderRadius: "22px",
// // //     boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
// // //     textAlign: "center",
// // //     width: "450px",
// // //   },
// // //   img: {
// // //     width: "100%",
// // //     height: "220px",
// // //     objectFit: "cover",
// // //     borderRadius: "14px",
// // //   },
// // //   amount: { color: "#4f46e5", margin: "15px 0" },
// // //   options: { display: "flex", gap: "20px", justifyContent: "center" },
// // //   cashBtn: {
// // //     padding: "12px 22px",
// // //     borderRadius: "999px",
// // //     border: "2px solid #4f46e5",
// // //     background: "#fff",
// // //     color: "#4f46e5",
// // //     fontWeight: "700",
// // //   },
// // //   onlineBtn: {
// // //     padding: "12px 22px",
// // //     borderRadius: "999px",
// // //     background: "#4f46e5",
// // //     color: "#fff",
// // //     border: "none",
// // //     fontWeight: "700",
// // //   },
// // // };

// // // export default BookingPage;


// // // import { useLocation, useNavigate } from "react-router-dom";
// // // import { useState } from "react";

// // // const BookingPage = () => {
// // //   const { state: event } = useLocation();
// // //   const navigate = useNavigate();

// // //   const price = event.price || "₹ 9,999"; // default price

// // //   const [showOnline, setShowOnline] = useState(false);

// // //   const upiId = "eventify@upi"; // 🔹 WEBSITE UPI ID

// // //   return (
// // //     <div style={styles.page}>
// // //       <div style={styles.card}>

// // //         <h2 style={styles.heading}>Confirm Your Booking</h2>

// // //         <img src={event.img} style={styles.img} alt={event.title} />

// // //         <h3 style={styles.title}>{event.title}</h3>
// // //         <p style={styles.desc}>{event.desc}</p>

// // //         <div style={styles.amountBox}>
// // //           <span>Total Payment</span>
// // //           <h2 style={styles.amount}>{price}</h2>
// // //         </div>

// // //         <div style={styles.options}>
// // //           <button
// // //             style={styles.cashBtn}
// // //             onClick={() =>
// // //               navigate("/payment-status", {
// // //                 state: { event, amount: price, status: "Pending (Cash)" },
// // //               })
// // //             }
// // //           >
// // //             💵 Cash Payment
// // //           </button>

// // //           <button
// // //             style={styles.onlineBtn}
// // //             onClick={() => setShowOnline(true)}
// // //           >
// // //             📱 Online Payment
// // //           </button>
// // //         </div>

// // //         {/* ===== ONLINE PAYMENT PANEL ===== */}
// // //         {showOnline && (
// // //           <div style={styles.onlinePanel}>
// // //             <h3 style={styles.panelTitle}>Choose Online Method</h3>

// // //             <div style={styles.upiBox}>
// // //               <p><strong>UPI ID:</strong> {upiId}</p>
// // //               <button
// // //                 style={styles.copyBtn}
// // //                 onClick={() => {
// // //                   navigator.clipboard.writeText(upiId);
// // //                   alert("UPI ID Copied!");
// // //                 }}
// // //               >
// // //                 Copy UPI ID
// // //               </button>
// // //             </div>

// // //             <div style={styles.qrBox}>
// // //               <p>Scan QR to Pay</p>
// // //               <img
// // //                 src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=eventify@upi&pn=Eventify"
// // //                 style={styles.qr}
// // //                 alt="UPI QR"
// // //               />
// // //             </div>

// // //             <button
// // //               style={styles.payNowBtn}
// // //               onClick={() =>
// // //                 navigate("/payment-status", {
// // //                   state: { event, amount: price, status: "Paid (Online)" },
// // //                 })
// // //               }
// // //             >
// // //               ✅ Confirm Payment
// // //             </button>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const styles = {
// // //   page: {
// // //     minHeight: "100vh",
// // //     display: "flex",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     background: "linear-gradient(135deg, #eef2ff, #ffffff)",
// // //   },

// // //   card: {
// // //     background: "#ffffff",
// // //     padding: "40px",
// // //     borderRadius: "24px",
// // //     boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
// // //     textAlign: "center",
// // //     width: "460px",
// // //     border: "1px solid #e5e7eb",
// // //   },

// // //   heading: {
// // //     fontSize: "26px",
// // //     fontWeight: "800",
// // //     color: "#111827",
// // //     marginBottom: "15px",
// // //   },

// // //   img: {
// // //     width: "100%",
// // //     height: "220px",
// // //     objectFit: "cover",
// // //     borderRadius: "16px",
// // //     marginBottom: "12px",
// // //   },

// // //   title: {
// // //     fontSize: "20px",
// // //     fontWeight: "700",
// // //     color: "#111827",
// // //   },

// // //   desc: {
// // //     color: "#6b7280",
// // //     fontSize: "14px",
// // //     marginBottom: "12px",
// // //   },

// // //   amountBox: {
// // //     background: "#eef2ff",
// // //     padding: "12px",
// // //     borderRadius: "14px",
// // //     margin: "15px 0",
// // //   },

// // //   amount: {
// // //     color: "#4f46e5",
// // //     marginTop: "5px",
// // //   },

// // //   options: {
// // //     display: "flex",
// // //     gap: "18px",
// // //     justifyContent: "center",
// // //   },

// // //   cashBtn: {
// // //     padding: "12px 22px",
// // //     borderRadius: "999px",
// // //     border: "2px solid #4f46e5",
// // //     background: "#fff",
// // //     color: "#4f46e5",
// // //     fontWeight: "700",
// // //     cursor: "pointer",
// // //   },

// // //   onlineBtn: {
// // //     padding: "12px 22px",
// // //     borderRadius: "999px",
// // //     background: "#4f46e5",
// // //     color: "#fff",
// // //     border: "none",
// // //     fontWeight: "700",
// // //     cursor: "pointer",
// // //   },

// // //   onlinePanel: {
// // //     marginTop: "25px",
// // //     padding: "20px",
// // //     background: "#f9fafb",
// // //     borderRadius: "16px",
// // //     border: "1px solid #e5e7eb",
// // //   },

// // //   panelTitle: {
// // //     fontSize: "18px",
// // //     fontWeight: "700",
// // //     marginBottom: "12px",
// // //   },

// // //   upiBox: {
// // //     background: "#ffffff",
// // //     padding: "10px",
// // //     borderRadius: "12px",
// // //     marginBottom: "12px",
// // //     border: "1px solid #e5e7eb",
// // //   },

// // //   copyBtn: {
// // //     marginTop: "8px",
// // //     padding: "8px 14px",
// // //     borderRadius: "8px",
// // //     border: "none",
// // //     background: "#4f46e5",
// // //     color: "#fff",
// // //     cursor: "pointer",
// // //   },

// // //   qrBox: {
// // //     textAlign: "center",
// // //     marginBottom: "12px",
// // //   },

// // //   qr: {
// // //     width: "180px",
// // //     height: "180px",
// // //     marginTop: "8px",
// // //   },

// // //   payNowBtn: {
// // //     width: "100%",
// // //     padding: "12px",
// // //     borderRadius: "999px",
// // //     background: "#22c55e",
// // //     color: "#fff",
// // //     border: "none",
// // //     fontWeight: "700",
// // //     cursor: "pointer",
// // //   },
// // // };

// // // export default BookingPage;


// // // import { useLocation, useNavigate } from "react-router-dom";
// // // import { useState } from "react";

// // // const BookingPage = () => {
// // //   const { state: event } = useLocation();
// // //   const navigate = useNavigate();

// // //   // ✅ FIX — Hook ko SABSE PEHLE declare kiya
// // //   const [showOnline, setShowOnline] = useState(false);

// // //   // 🔹 WEBSITE UPI ID
// // //   const upiId = "eventify@upi";

// // //   // ✅ AB early return hook ke BAAD aa raha hai — isliye error solve
// // //   if (!event) {
// // //     return (
// // //       <h2 style={{ textAlign: "center", marginTop: "100px", color: "#4f46e5" }}>
// // //         No booking data found. Please go back and select an event again.
// // //       </h2>
// // //     );
// // //   }

// // //   const price = event.price || "₹ 9,999"; // default price

// // //   return (
// // //     <div style={styles.page}>
// // //       <div style={styles.card}>

// // //         <h2 style={styles.heading}>Confirm Your Booking</h2>

// // //         <img src={event.img} style={styles.img} alt={event.title} />

// // //         <h3 style={styles.title}>{event.title}</h3>
// // //         <p style={styles.desc}>{event.desc}</p>

// // //         <div style={styles.amountBox}>
// // //           <span>Total Payment</span>
// // //           <h2 style={styles.amount}>{price}</h2>
// // //         </div>

// // //         <div style={styles.options}>
// // //           <button
// // //             style={styles.cashBtn}
// // //             onClick={() => {
// // //               alert("Cash payment selected ✅");
// // //               navigate("/payment-status", {
// // //                 state: { event, amount: price, status: "Pending (Cash)" },
// // //               });
// // //             }}
// // //           >
// // //             💵 Cash Payment
// // //           </button>

// // //           <button
// // //             style={styles.onlineBtn}
// // //             onClick={() => setShowOnline(true)}
// // //           >
// // //             📱 Online Payment
// // //           </button>
// // //         </div>

// // //         {/* ===== ONLINE PAYMENT PANEL ===== */}
// // //         {showOnline && (
// // //           <div style={styles.onlinePanel}>
// // //             <h3 style={styles.panelTitle}>Choose Online Method</h3>

// // //             <div style={styles.upiBox}>
// // //               <p><strong>UPI ID:</strong> {upiId}</p>
// // //               <button
// // //                 style={styles.copyBtn}
// // //                 onClick={() => {
// // //                   navigator.clipboard.writeText(upiId);
// // //                   alert("UPI ID Copied! 📋");
// // //                 }}
// // //               >
// // //                 Copy UPI ID
// // //               </button>
// // //             </div>

// // //             <div style={styles.qrBox}>
// // //               <p>Scan QR to Pay</p>
// // //               <img
// // //                 src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=eventify@upi&pn=Eventify"
// // //                 style={styles.qr}
// // //                 alt="UPI QR"
// // //               />
// // //             </div>

// // //             <button
// // //               style={styles.payNowBtn}
// // //               onClick={() => {
// // //                 alert("Payment Confirmed Successfully ✅");
// // //                 navigate("/payment-status", {
// // //                   state: { event, amount: price, status: "Paid (Online)" },
// // //                 });
// // //               }}
// // //             >
// // //               ✅ Confirm Payment
// // //             </button>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // --------- (Tumhara PURA styles same — no change) ---------
// // // const styles = {
// // //   page: {
// // //     minHeight: "100vh",
// // //     display: "flex",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     background: "linear-gradient(135deg, #eef2ff, #ffffff)",
// // //   },

// // //   card: {
// // //     background: "#ffffff",
// // //     padding: "40px",
// // //     borderRadius: "24px",
// // //     boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
// // //     textAlign: "center",
// // //     width: "460px",
// // //     border: "1px solid #e5e7eb",
// // //   },

// // //   heading: {
// // //     fontSize: "26px",
// // //     fontWeight: "800",
// // //     color: "#111827",
// // //     marginBottom: "15px",
// // //   },

// // //   img: {
// // //     width: "100%",
// // //     height: "220px",
// // //     objectFit: "cover",
// // //     borderRadius: "16px",
// // //     marginBottom: "12px",
// // //   },

// // //   title: {
// // //     fontSize: "20px",
// // //     fontWeight: "700",
// // //     color: "#111827",
// // //   },

// // //   desc: {
// // //     color: "#6b7280",
// // //     fontSize: "14px",
// // //     marginBottom: "12px",
// // //   },

// // //   amountBox: {
// // //     background: "#eef2ff",
// // //     padding: "12px",
// // //     borderRadius: "14px",
// // //     margin: "15px 0",
// // //   },

// // //   amount: {
// // //     color: "#4f46e5",
// // //     marginTop: "5px",
// // //   },

// // //   options: {
// // //     display: "flex",
// // //     gap: "18px",
// // //     justifyContent: "center",
// // //   },

// // //   cashBtn: {
// // //     padding: "12px 22px",
// // //     borderRadius: "999px",
// // //     border: "2px solid #4f46e5",
// // //     background: "#fff",
// // //     color: "#4f46e5",
// // //     fontWeight: "700",
// // //     cursor: "pointer",
// // //   },

// // //   onlineBtn: {
// // //     padding: "12px 22px",
// // //     borderRadius: "999px",
// // //     background: "#4f46e5",
// // //     color: "#fff",
// // //     border: "none",
// // //     fontWeight: "700",
// // //     cursor: "pointer",
// // //   },

// // //   onlinePanel: {
// // //     marginTop: "25px",
// // //     padding: "20px",
// // //     background: "#f9fafb",
// // //     borderRadius: "16px",
// // //     border: "1px solid #e5e7eb",
// // //   },

// // //   panelTitle: {
// // //     fontSize: "18px",
// // //     fontWeight: "700",
// // //     marginBottom: "12px",
// // //   },

// // //   upiBox: {
// // //     background: "#ffffff",
// // //     padding: "10px",
// // //     borderRadius: "12px",
// // //     marginBottom: "12px",
// // //     border: "1px solid #e5e7eb",
// // //   },

// // //   copyBtn: {
// // //     marginTop: "8px",
// // //     padding: "8px 14px",
// // //     borderRadius: "8px",
// // //     border: "none",
// // //     background: "#4f46e5",
// // //     color: "#fff",
// // //     cursor: "pointer",
// // //   },

// // //   qrBox: {
// // //     textAlign: "center",
// // //     marginBottom: "12px",
// // //   },

// // //   qr: {
// // //     width: "180px",
// // //     height: "180px",
// // //     marginTop: "8px",
// // //   },

// // //   payNowBtn: {
// // //     width: "100%",
// // //     padding: "12px",
// // //     borderRadius: "999px",
// // //     background: "#22c55e",
// // //     color: "#fff",
// // //     border: "none",
// // //     fontWeight: "700",
// // //     cursor: "pointer",
// // //   },
// // // };

// // // export default BookingPage;






// // import { useLocation, useNavigate } from "react-router-dom";
// // import { useState } from "react";

// // const BookingPage = () => {
// //   const { state: event } = useLocation();
// //   const navigate = useNavigate();

// //   const [showOnline, setShowOnline] = useState(false);

// //   // ✅ NEW STATES
// //   const [persons, setPersons] = useState("");
// //   const [services, setServices] = useState([]);
// //   const [catering, setCatering] = useState("");

// //   const upiId = "eventify@upi";

// //   if (!event) {
// //     return (
// //       <h2 style={{ textAlign: "center", marginTop: "100px", color: "#4f46e5" }}>
// //         No booking data found. Please go back and select an event again.
// //       </h2>
// //     );
// //   }

// //   const price = event.price || "₹ 9,999";

// //   const toggleService = (service) => {
// //     setServices((prev) =>
// //       prev.includes(service)
// //         ? prev.filter((s) => s !== service)
// //         : [...prev, service]
// //     );
// //   };

// //   return (
// //     <div style={styles.page}>
// //       <div style={styles.card}>
// //         <h2 style={styles.heading}>Confirm Your Booking</h2>

// //         <img src={event.img} style={styles.img} alt={event.title} />

// //         <h3 style={styles.title}>{event.title}</h3>
// //         <p style={styles.desc}>{event.desc}</p>

// //         {/* PERSON COUNT */}
// //         <div style={styles.section}>
// //           <h4>👥 Number of Persons</h4>
// //           <select
// //             style={styles.input}
// //             value={persons}
// //             onChange={(e) => setPersons(e.target.value)}
// //           >
// //             <option value="">Select persons</option>
// //             <option>50</option>
// //             <option>100</option>
// //             <option>200</option>
// //             <option>500+</option>
// //           </select>
// //         </div>

// //         {/* SERVICES */}
// //         <div style={styles.section}>
// //           <h4>🎶 Event Services</h4>
// //           {[
// //             "DJ",
// //             "Live Band",
// //             "Dhol",
// //             "Stage Decoration",
// //             "Sound System",
// //             "Lighting",
// //             "Anchor / Host",
// //           ].map((item) => (
// //             <label key={item} style={styles.checkbox}>
// //               <input
// //                 type="checkbox"
// //                 checked={services.includes(item)}
// //                 onChange={() => toggleService(item)}
// //               />
// //               {item}
// //             </label>
// //           ))}
// //         </div>

// //         {/* CATERING */}
// //         <div style={styles.section}>
// //           <h4>🍽️ Catering Option</h4>
// //           <select
// //             style={styles.input}
// //             value={catering}
// //             onChange={(e) => setCatering(e.target.value)}
// //           >
// //             <option value="">Select catering</option>
// //             <option>Veg – Basic</option>
// //             <option>Veg – Premium</option>
// //             <option>Non-Veg – Premium</option>
// //             <option>Luxury Buffet</option>
// //           </select>
// //         </div>

// //         {/* AMOUNT */}
// //         <div style={styles.amountBox}>
// //           <span>Total Payment</span>
// //           <h2 style={styles.amount}>{price}</h2>
// //         </div>

// //         {/* PAYMENT */}
// //         <div style={styles.options}>
// //           <button
// //             style={styles.cashBtn}
// //             onClick={() =>
// //               navigate("/payment-status", {
// //                 state: {
// //                   event,
// //                   amount: price,
// //                   persons,
// //                   services,
// //                   catering,
// //                   status: "Pending (Cash)",
// //                 },
// //               })
// //             }
// //           >
// //             💵 Cash Payment
// //           </button>

// //           <button style={styles.onlineBtn} onClick={() => setShowOnline(true)}>
// //             📱 Online Payment
// //           </button>
// //         </div>

// //         {/* ONLINE PAYMENT */}
// //         {showOnline && (
// //           <div style={styles.onlinePanel}>
// //             <p><strong>UPI ID:</strong> {upiId}</p>

// //             <img
// //               src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=${upiId}`}
// //               style={styles.qr}
// //               alt="QR"
// //             />

// //             <button
// //               style={styles.payNowBtn}
// //               onClick={() =>
// //                 navigate("/payment-status", {
// //                   state: {
// //                     event,
// //                     amount: price,
// //                     persons,
// //                     services,
// //                     catering,
// //                     status: "Paid (Online)",
// //                   },
// //                 })
// //               }
// //             >
// //               ✅ Confirm Payment
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // // 🔹 STYLES (minimal added)
// // const styles = {
// //   page: {
// //     minHeight: "100vh",
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     background: "linear-gradient(135deg, #eef2ff, #ffffff)",
// //   },
// //   card: {
// //     background: "#fff",
// //     padding: "40px",
// //     borderRadius: "24px",
// //     width: "480px",
// //     boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
// //   },
// //   heading: { fontSize: "26px", fontWeight: "800", marginBottom: "10px" },
// //   img: { width: "100%", height: "220px", borderRadius: "16px", objectFit: "cover" },
// //   title: { fontSize: "20px", fontWeight: "700" },
// //   desc: { color: "#6b7280", fontSize: "14px" },
// //   section: { marginTop: "15px", textAlign: "left" },
// //   input: {
// //     width: "100%",
// //     padding: "10px",
// //     borderRadius: "8px",
// //     border: "1px solid #ccc",
// //     marginTop: "6px",
// //   },
// //   checkbox: { display: "block", marginTop: "6px" },
// //   amountBox: {
// //     background: "#eef2ff",
// //     padding: "12px",
// //     borderRadius: "14px",
// //     margin: "15px 0",
// //     textAlign: "center",
// //   },
// //   amount: { color: "#4f46e5" },
// //   options: { display: "flex", gap: "14px", justifyContent: "center" },
// //   cashBtn: {
// //     border: "2px solid #4f46e5",
// //     background: "#fff",
// //     color: "#4f46e5",
// //     padding: "10px 18px",
// //     borderRadius: "999px",
// //     fontWeight: "700",
// //   },
// //   onlineBtn: {
// //     background: "#4f46e5",
// //     color: "#fff",
// //     padding: "10px 18px",
// //     borderRadius: "999px",
// //     border: "none",
// //     fontWeight: "700",
// //   },
// //   onlinePanel: {
// //     marginTop: "20px",
// //     padding: "15px",
// //     background: "#f9fafb",
// //     borderRadius: "14px",
// //     textAlign: "center",
// //   },
// //   qr: { width: "160px", height: "160px", margin: "10px auto" },
// //   payNowBtn: {
// //     width: "100%",
// //     padding: "10px",
// //     borderRadius: "999px",
// //     background: "#22c55e",
// //     color: "#fff",
// //     border: "none",
// //     fontWeight: "700",
// //   },
// // };

// // export default BookingPage;









// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";

// const BookingPage = () => {
//   const { state: event } = useLocation();
//   const navigate = useNavigate();

//   const [showOnline, setShowOnline] = useState(false);

//   const [persons, setPersons] = useState("");
//   const [services, setServices] = useState([]);
//   const [catering, setCatering] = useState("");

//   const upiId = "eventify@upi";

//   if (!event) {
//     return (
//       <h2 style={{ textAlign: "center", marginTop: "100px", color: "#4f46e5" }}>
//         No booking data found. Please go back and select an event again.
//       </h2>
//     );
//   }

//   const price = event.price || "₹ 9,999";

//   const toggleService = (service) => {
//     setServices((prev) =>
//       prev.includes(service)
//         ? prev.filter((s) => s !== service)
//         : [...prev, service]
//     );
//   };

//   // 🔥 BACKEND CONNECTED BOOKING FUNCTION
//   const handleBooking = async (status) => {
//     try {
//       // 🔥 REMOVE ₹ and commas → PURE NUMBER
//       const cleanAmount = Number(price.replace(/₹|,/g, ""));

//       const res = await fetch("http://localhost:5001/api/bookings/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",   // 🔥 session ke liye
//         body: JSON.stringify({
//           eventName: event.title,
//           eventDate: event.date || "2026-02-10",
//           location: event.location || "Ahmedabad",
//           totalAmount: cleanAmount,   // 🔥 NUMBER ONLY
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Booking failed ❌");
//         return;
//       }

//       alert("Booking Successful ✅");

//       // 👉 Payment page par bhejo
//       navigate("/payment-status", {
//         state: {
//           event,
//           amount: price,
//           persons,
//           services,
//           catering,
//           status,
//         },
//       });

//     } catch (error) {
//       console.log("FRONTEND BOOKING ERROR:", error);
//       alert("Booking failed ❌");
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h2 style={styles.heading}>Confirm Your Booking</h2>

//         <img src={event.img} style={styles.img} alt={event.title} />

//         <h3 style={styles.title}>{event.title}</h3>
//         <p style={styles.desc}>{event.desc}</p>

//         {/* PERSON COUNT */}
//         <div style={styles.section}>
//           <h4>👥 Number of Persons</h4>
//           <select
//             style={styles.input}
//             value={persons}
//             onChange={(e) => setPersons(e.target.value)}
//           >
//             <option value="">Select persons</option>
//             <option>50</option>
//             <option>100</option>
//             <option>200</option>
//             <option>500+</option>
//           </select>
//         </div>

//         {/* SERVICES */}
//         <div style={styles.section}>
//           <h4>🎶 Event Services</h4>
//           {[
//             "DJ",
//             "Live Band",
//             "Dhol",
//             "Stage Decoration",
//             "Sound System",
//             "Lighting",
//             "Anchor / Host",
//           ].map((item) => (
//             <label key={item} style={styles.checkbox}>
//               <input
//                 type="checkbox"
//                 checked={services.includes(item)}
//                 onChange={() => toggleService(item)}
//               />
//               {item}
//             </label>
//           ))}
//         </div>

//         {/* CATERING */}
//         <div style={styles.section}>
//           <h4>🍽️ Catering Option</h4>
//           <select
//             style={styles.input}
//             value={catering}
//             onChange={(e) => setCatering(e.target.value)}
//           >
//             <option value="">Select catering</option>
//             <option>Veg – Basic</option>
//             <option>Veg – Premium</option>
//             <option>Non-Veg – Premium</option>
//             <option>Luxury Buffet</option>
//           </select>
//         </div>

//         {/* AMOUNT */}
//         <div style={styles.amountBox}>
//           <span>Total Payment</span>
//           <h2 style={styles.amount}>{price}</h2>
//         </div>

//         {/* PAYMENT */}
//         <div style={styles.options}>
//           <button
//             style={styles.cashBtn}
//             onClick={() => handleBooking("Pending (Cash)")}   // 🔥 BACKEND CALL
//           >
//             💵 Cash Payment
//           </button>

//           <button
//             style={styles.onlineBtn}
//             onClick={() => setShowOnline(true)}
//           >
//             📱 Online Payment
//           </button>
//         </div>

//         {/* ONLINE PAYMENT */}
//         {showOnline && (
//           <div style={styles.onlinePanel}>
//             <p><strong>UPI ID:</strong> {upiId}</p>

//             <img
//               src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=${upiId}`}
//               style={styles.qr}
//               alt="QR"
//             />

//             <button
//               style={styles.payNowBtn}
//               onClick={() => handleBooking("Paid (Online)")}   // 🔥 BACKEND CALL
//             >
//               ✅ Confirm Payment
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // 🔹 STYLES (UNCHANGED — UI SAME)
// const styles = {
//   page: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(135deg, #eef2ff, #ffffff)",
//   },
//   card: {
//     background: "#fff",
//     padding: "40px",
//     borderRadius: "24px",
//     width: "480px",
//     boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
//   },
//   heading: { fontSize: "26px", fontWeight: "800", marginBottom: "10px" },
//   img: { width: "100%", height: "220px", borderRadius: "16px", objectFit: "cover" },
//   title: { fontSize: "20px", fontWeight: "700" },
//   desc: { color: "#6b7280", fontSize: "14px" },
//   section: { marginTop: "15px", textAlign: "left" },
//   input: {
//     width: "100%",
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     marginTop: "6px",
//   },
//   checkbox: { display: "block", marginTop: "6px" },
//   amountBox: {
//     background: "#eef2ff",
//     padding: "12px",
//     borderRadius: "14px",
//     margin: "15px 0",
//     textAlign: "center",
//   },
//   amount: { color: "#4f46e5" },
//   options: { display: "flex", gap: "14px", justifyContent: "center" },
//   cashBtn: {
//     border: "2px solid #4f46e5",
//     background: "#fff",
//     color: "#4f46e5",
//     padding: "10px 18px",
//     borderRadius: "999px",
//     fontWeight: "700",
//   },
//   onlineBtn: {
//     background: "#4f46e5",
//     color: "#fff",
//     padding: "10px 18px",
//     borderRadius: "999px",
//     border: "none",
//     fontWeight: "700",
//   },
//   onlinePanel: {
//     marginTop: "20px",
//     padding: "15px",
//     background: "#f9fafb",
//     borderRadius: "14px",
//     textAlign: "center",
//   },
//   qr: { width: "160px", height: "160px", margin: "10px auto" },
//   payNowBtn: {
//     width: "100%",
//     padding: "10px",
//     borderRadius: "999px",
//     background: "#22c55e",
//     color: "#fff",
//     border: "none",
//     fontWeight: "700",
//   },
// };

// export default BookingPage;




