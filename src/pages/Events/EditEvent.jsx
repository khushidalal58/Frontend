import React, { useState } from "react";
import { useToast } from "../../components/Toast";

const EditEvent = () => {
  const toast = useToast();
  const [event, setEvent] = useState({
    title: "Wedding",
    date: "2026-05-10",
    price: "₹2,50,000",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
    description: "Complete wedding planning & decoration",
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Event Updated Successfully!");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Edit Event</h1>

      <form style={styles.form} onSubmit={handleSubmit}>
        <input name="title" value={event.title} style={styles.input} onChange={handleChange} />
        <input name="date" type="date" value={event.date} style={styles.input} onChange={handleChange} />
        <input name="price" value={event.price} style={styles.input} onChange={handleChange} />
        <input name="image" value={event.image} style={styles.input} onChange={handleChange} />
        <textarea name="description" value={event.description} style={styles.textarea} onChange={handleChange} />

        <button style={styles.btn} type="submit">Update Event</button>
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

export default EditEvent;
