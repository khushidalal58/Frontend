
import React, { useState } from "react";
import { useToast } from "../../components/Toast";

const AddEvent = () => {
  const toast = useToast();
  const [event, setEvent] = useState({
    title: "",
    date: "",
    location: "",
    price: "",
    image: "",
    description: "",
    category: "",   // 🔥 NEW FIELD
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/api/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(event),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Event add failed");
        return;
      }

      toast.success("Event Added Successfully! ✅");

      // clear form
      setEvent({
        title: "",
        date: "",
        location: "",
        price: "",
        image: "",
        description: "",
        category: "",
      });

    } catch (err) {
      console.log("Add event error:", err);
      toast.error("Event add failed — please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add New Event</h1>

      <form style={styles.form} onSubmit={handleSubmit}>
        <input name="title" placeholder="Event Name" style={styles.input} value={event.title} onChange={handleChange} />
        <input name="date" type="date" style={styles.input} value={event.date} onChange={handleChange} />
        <input name="location" placeholder="Location" style={styles.input} value={event.location} onChange={handleChange} />
        <input name="price" placeholder="Price (₹)" style={styles.input} value={event.price} onChange={handleChange} />
        <input name="image" placeholder="Image URL" style={styles.input} value={event.image} onChange={handleChange} />

        {/* 🔥 CATEGORY DROPDOWN */}
        <select name="category" style={styles.input} value={event.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option>Social & Personal</option>
          <option>Corporate & Business</option>
          <option>Educational</option>
        </select>

        <textarea name="description" placeholder="Event Description" style={styles.textarea} value={event.description} onChange={handleChange} />

        <button style={styles.btn} type="submit">Add Event</button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: "60px", background: "#f9fafb", minHeight: "100vh" },
  title: { fontSize: "32px", textAlign: "center", marginBottom: "30px" },
  form: {
    maxWidth: "500px",
    margin: "auto",
    background: "#fff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
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
    height: "100px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginBottom: "12px",
  },
  btn: {
    width: "100%",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
  },
};

export default AddEvent;
