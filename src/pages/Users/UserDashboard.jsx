import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user_client") || localStorage.getItem("user"));
    const [stats, setStats] = useState({ totalEvents: 0, myBookings: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/users/stats", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    credentials: "include"
                });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        };
        fetchStats();
    }, []);

    const navItems = [
        { to: "my-events", icon: "🎉", label: "My Events", desc: "Browse happenings" },
        { to: "my-bookings", icon: "🎟️", label: "My Bookings", desc: "Manage admissions" },
        { to: "payments", icon: "💳", label: "Payments", desc: "Monetary summary" },
        { to: "gallery", icon: "🖼️", label: "Gallery", desc: "Event memories" },
        { to: "feedback", icon: "💬", label: "My Feedback", desc: "Reviews & ratings" },
        { to: "profile", icon: "👤", label: "Profile", desc: "Account settings" },
    ];

    return (
        <div className="ud-page-wrapper">
            <Navbar />

            <div className="ud-root">
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

                    .ud-page-wrapper {
                        background: #f5f3ff;
                        min-height: 100vh;
                    }

                    .ud-root {
                        display: flex;
                        height: calc(100vh - 70px);
                        font-family: 'Sora', sans-serif;
                    }

                    /* ── SIDEBAR ── */
                    .ud-sidebar {
                        width: 290px;
                        background: #ffffff;
                        border-right: 1.5px solid #ede9fe;
                        display: flex;
                        flex-direction: column;
                        padding: 32px 24px;
                        box-shadow: 10px 0 40px rgba(124, 58, 237, 0.05);
                        z-index: 100;
                    }

                    .ud-profile-section {
                        margin-bottom: 40px;
                    }

                    .ud-user-card {
                        background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
                        padding: 24px;
                        border-radius: 24px;
                        color: white;
                        box-shadow: 0 12px 24px rgba(124, 58, 237, 0.30);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                    }

                    .ud-avatar-circle {
                        width: 60px;
                        height: 60px;
                        border-radius: 20px;
                        background: rgba(255,255,255,0.2);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255,255,255,0.3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 24px;
                        font-weight: 800;
                        margin-bottom: 14px;
                        font-family: 'Plus Jakarta Sans', sans-serif;
                    }

                    .ud-u-name {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-size: 16px;
                        font-weight: 800;
                        letter-spacing: -0.5px;
                    }

                    .ud-u-role {
                        font-size: 11px;
                        opacity: 0.8;
                        font-weight: 600;
                        margin-top: 2px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }

                    .ud-nav {
                        flex: 1;
                    }

                    .ud-nav-label {
                        font-size: 11px;
                        font-weight: 800;
                        color: #c4b5fd;
                        text-transform: uppercase;
                        letter-spacing: 1.5px;
                        margin-bottom: 12px;
                        padding-left: 12px;
                    }

                    .ud-link {
                        display: flex;
                        align-items: center;
                        gap: 14px;
                        padding: 12px 16px;
                        border-radius: 16px;
                        text-decoration: none;
                        color: #64748b;
                        font-weight: 600;
                        margin-bottom: 6px;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        border: 1px solid transparent;
                    }

                    .ud-link:hover {
                        background: #faf5ff;
                        color: #7c3aed;
                        transform: translateX(4px);
                        border-color: #ede9fe;
                    }

                    .ud-link.active {
                        background: #f5f3ff;
                        color: #7c3aed;
                        border-color: #ddd6fe;
                        box-shadow: 0 4px 12px rgba(124, 58, 237, 0.08);
                    }

                    .ud-icon-box {
                        width: 40px;
                        height: 40px;
                        background: #f8fafc;
                        border-radius: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 18px;
                        transition: all 0.3s;
                    }

                    .ud-link.active .ud-icon-box {
                        background: linear-gradient(135deg, #7c3aed, #ec4899);
                        box-shadow: 0 6px 14px rgba(124, 58, 237, 0.3);
                    }

                    .ud-link-text h4 {
                        font-size: 14px;
                        font-weight: 700;
                        margin: 0;
                    }

                    .ud-link-text p {
                        font-size: 11px;
                        opacity: 0.6;
                        margin-top: 1px;
                        font-weight: 500;
                    }

                    /* ── FOOTER STATS ── */
                    .ud-sidebar-footer {
                        padding-top: 24px;
                        border-top: 1.5px solid #ede9fe;
                    }

                    .ud-stats-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 12px;
                        margin-top: 12px;
                    }

                    .ud-stat-tile {
                        background: #faf5ff;
                        padding: 14px 10px;
                        border-radius: 18px;
                        text-align: center;
                        border: 1px solid #ede9fe;
                        transition: all 0.3s;
                    }

                    .ud-stat-tile:hover {
                        background: #ede9fe;
                        transform: translateY(-2px);
                        box-shadow: 0 6px 16px rgba(124, 58, 237, 0.10);
                    }

                    .ud-s-val {
                        display: block;
                        font-size: 20px;
                        font-weight: 800;
                        background: linear-gradient(135deg, #7c3aed, #ec4899);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        font-family: 'Plus Jakarta Sans', sans-serif;
                    }

                    .ud-s-lbl {
                        font-size: 10px;
                        color: #a78bfa;
                        font-weight: 700;
                        text-transform: uppercase;
                    }

                    /* ── MAIN CONTENT ── */
                    .ud-main-content {
                        flex: 1;
                        padding: 40px 50px;
                        overflow-y: auto;
                        background: linear-gradient(135deg, #f5f3ff 0%, #fce7f3 60%, #ede9fe 100%);
                    }
                `}</style>

                <aside className="ud-sidebar">
                    <div className="ud-profile-section">
                        <div className="ud-user-card">
                            <div className="ud-avatar-circle">
                                {(user?.name?.[0] || "U").toUpperCase()}
                            </div>
                            <h3 className="ud-u-name">{user?.name || "User Account"}</h3>
                            <p className="ud-u-role">Premium Explorer</p>
                        </div>
                    </div>

                    <div className="ud-nav">
                        <div className="ud-nav-label">Main Explorer</div>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    isActive ? "ud-link active" : "ud-link"
                                }
                            >
                                <div className="ud-icon-box">{item.icon}</div>
                                <div className="ud-link-text">
                                    <h4>{item.label}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            </NavLink>
                        ))}
                    </div>

                    <div className="ud-sidebar-footer">
                        <div className="ud-nav-label">Insight Glance</div>
                        <div className="ud-stats-grid">
                            <div className="ud-stat-tile">
                                <span className="ud-s-val">{stats.totalEvents}</span>
                                <span className="ud-s-lbl">Live Events</span>
                            </div>
                            <div className="ud-stat-tile">
                                <span className="ud-s-val">{stats.myBookings}</span>
                                <span className="ud-s-lbl">Bookings</span>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="ud-main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default UserDashboard;
