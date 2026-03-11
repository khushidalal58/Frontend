import React, { useEffect, useState } from "react";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const res = await fetch(
      "http://localhost:5001/api/events/pending",
      { credentials: "include" }
    );

    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const approveEvent = async (id) => {
    await fetch(
      `http://localhost:5001/api/events/approve/${id}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    loadEvents();
  };

  return (
    <div>
      <h2>Pending Events</h2>

      {events.map((e) => (
        <div key={e._id} style={box}>
          <h3>{e.title}</h3>
          <p>{e.category}</p>

          <button onClick={() => approveEvent(e._id)}>
            Approve ✅
          </button>
        </div>
      ))}
    </div>
  );
};

const box = {
  background: "#fff",
  padding: 15,
  marginBottom: 12,
  borderRadius: 8,
};

export default AdminEvents;
