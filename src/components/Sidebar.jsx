const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h3>Admin Panel</h3>
      <ul style={styles.list}>
        <li>All Events</li>
        <li>Add Event</li>
        <li>Vendors</li>
        <li>Bookings</li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#ffffff",
    padding: "20px",
    boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
  },
  list: {
    listStyle: "none",
    marginTop: "20px",
  },
};

export default Sidebar;
