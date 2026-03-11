

// import React, { useState } from "react";

// const VendorAddEvent = () => {
//   const [event, setEvent] = useState({
//     title: "",
//     date: "",
//     location: "",
//     price: "",
//     image: "",
//     category: "Social & Personal",
//     description: "",
//   });

//   const handleChange = (e) => {
//     setEvent({
//       ...event,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5001/api/vendor/events/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(event),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Failed ❌");
//         return;
//       }

//       alert("Event sent for admin approval ✅");

//       setEvent({
//         title: "",
//         date: "",
//         location: "",
//         price: "",
//         image: "",
//         category: "Social & Personal",
//         description: "",
//       });

//     } catch (err) {
//       alert("Server error ❌");
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>

//         <h2 style={styles.title}>➕ Add New Event</h2>
//         <p style={styles.sub}>Submit event for admin approval</p>

//         <form onSubmit={handleSubmit} style={styles.form}>

//           {/* Title */}
//           <input
//             type="text"
//             name="title"
//             placeholder="Event Title"
//             value={event.title}
//             onChange={handleChange}
//             style={styles.input}
//             required
//           />

//           {/* Date */}
//           <input
//             type="date"
//             name="date"
//             value={event.date}
//             onChange={handleChange}
//             style={styles.input}
//             required
//           />

//           {/* Location */}
//           <input
//             type="text"
//             name="location"
//             placeholder="Location"
//             value={event.location}
//             onChange={handleChange}
//             style={styles.input}
//             required
//           />

//           {/* Price */}
//           <input
//             type="number"
//             name="price"
//             placeholder="Price (₹)"
//             value={event.price}
//             onChange={handleChange}
//             style={styles.input}
//             required
//           />

//           {/* Image */}
//           <input
//             type="text"
//             name="image"
//             placeholder="Image URL"
//             value={event.image}
//             onChange={handleChange}
//             style={styles.input}
//             required
//           />

//           {/* Category */}
//           <select
//             name="category"
//             value={event.category}
//             onChange={handleChange}
//             style={styles.select}
//           >
//             <option>Social & Personal</option>
//             <option>Corporate & Business</option>
//             <option>Entertainment & Cultural</option>
//             <option>Educational</option>
//             <option>Religious & Traditional</option>
//             <option>Sports & Outdoor</option>
//           </select>

//           {/* Description */}
//           <textarea
//             name="description"
//             placeholder="Event Description"
//             value={event.description}
//             onChange={handleChange}
//             style={styles.textarea}
//             required
//           />

//           {/* Button */}
//           <button type="submit" style={styles.button}>
//             🚀 Submit Event
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default VendorAddEvent;

// /* ================= STYLES ================= */

// const styles = {
//   page: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(135deg,#eef2ff,#f9fafb)",
//     padding: "30px",
//   },

//   card: {
//     width: "100%",
//     maxWidth: "480px",
//     background: "#fff",
//     padding: "35px",
//     borderRadius: "20px",
//     boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
//   },

//   title: {
//     textAlign: "center",
//     color: "#4f46e5",
//     marginBottom: "6px",
//   },

//   sub: {
//     textAlign: "center",
//     color: "#6b7280",
//     marginBottom: "25px",
//     fontSize: "14px",
//   },

//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "14px",
//   },

//   input: {
//     padding: "11px 14px",
//     borderRadius: "8px",
//     border: "1px solid #d1d5db",
//     fontSize: "14px",
//     outline: "none",
//   },

//   select: {
//     padding: "11px 14px",
//     borderRadius: "8px",
//     border: "1px solid #d1d5db",
//     fontSize: "14px",
//   },

//   textarea: {
//     padding: "12px",
//     borderRadius: "8px",
//     border: "1px solid #d1d5db",
//     minHeight: "90px",
//     resize: "none",
//     fontSize: "14px",
//   },

//   button: {
//     marginTop: "10px",
//     background: "linear-gradient(135deg,#4f46e5,#6366f1)",
//     color: "#fff",
//     border: "none",
//     padding: "12px",
//     borderRadius: "999px",
//     fontWeight: "700",
//     cursor: "pointer",
//     fontSize: "15px",
//     transition: "0.3s",
//   },
// };






import React, { useState } from "react";
import { useToast } from "../../components/Toast";

const VendorAddEvent = () => {
  const toast = useToast();

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    price: "",
    image: "",
    category: "Social & Personal",
    description: "",
  });


  // INPUT CHANGE
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };


  // SUBMIT FORM
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        "http://localhost:5001/api/events/create",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          // 🔥 MOST IMPORTANT LINE
          credentials: "include",

          body: JSON.stringify(form),

        }
      );


      const data = await res.json();


      if (!res.ok) {
        toast.error(data.message || "Server Error");
        return;
      }
      toast.success("Event Sent For Approval! ✅");


      // CLEAR FORM
      setForm({
        title: "",
        date: "",
        location: "",
        price: "",
        image: "",
        category: "Social & Personal",
        description: "",
      });


    } catch (err) {

      console.log("Add Event Error:", err);
      toast.error("Server Error — please try again.");

    }
  };


  // SECURITY
  if (!user || user.role !== "vendor") {
    return <h2 style={{ textAlign: "center" }}>Access Denied ❌</h2>;
  }


  return (
    <div style={styles.container}>

      <form style={styles.card} onSubmit={handleSubmit}>

        <h2 style={styles.title}>➕ Add New Event</h2>


        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={styles.input}
        />


        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          style={styles.input}
        />


        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
          style={styles.input}
        />


        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          style={styles.input}
        />


        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
          style={styles.input}
        />


        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          style={styles.input}
        >

          <option>Social & Personal</option>
          <option>Corporate</option>
          <option>Educational</option>
        </select>


        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        />


        <button style={styles.btn}>
          🚀 Submit Event
        </button>

      </form>

    </div>
  );
};

export default VendorAddEvent;



/* ===== STYLES ===== */

const styles = {

  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  },

  card: {
    width: "420px",
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#4f46e5",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  textarea: {
    width: "100%",
    padding: "10px",
    height: "90px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  btn: {
    width: "100%",
    padding: "12px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },

};
