import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user_admin") || localStorage.getItem("user"));
    const navGroups = [
        {
            label: "Management",
            items: [
                { to: "users", icon: "👥", label: "Participants" },
                { to: "vendors", icon: "🏪", label: "Merchants" },
                { to: "events", icon: "🎉", label: "Inventories" },
                { to: "services", icon: "🛠️", label: "Marketplace" },
                { to: "gallery", icon: "🖼️", label: "Gallery" },
            ]
        },
        {
            label: "Strategic Actions",
            items: [
                { to: "bookings", icon: "📅", label: "User Bookings" },
                { to: "cancellations", icon: "🚫", label: "Cancellations" },
                { to: "feedback", icon: "💬", label: "Feedback" },
                { to: "add-event", icon: "➕", label: "Add Event" },
                { to: "reports", icon: "📊", label: "Analytics" },
            ]
        }
    ];

    return (
        <div className="ad-page-wrapper">
            <Navbar />
            <div className="ad-root">
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

                    .ad-page-wrapper {
                        background: #fdfcff;
                        min-height: 100vh;
                    }

                    .ad-root {
                        display: flex;
                        height: calc(100vh - 70px);
                        font-family: 'Sora', sans-serif;
                    }

                    /* ── SIDEBAR ── */
                    .ad-sidebar {
                        width: 300px;
                        background: #ffffff;
                        border-right: 1.5px solid #f1f5f9;
                        display: flex;
                        flex-direction: column;
                        padding: 32px 24px;
                        box-shadow: 10px 0 50px rgba(0,0,0,0.02);
                        z-index: 100;
                    }

                    .ad-brand-section {
                        margin-bottom: 40px;
                    }

                    .ad-brand-card {
                        background: linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%);
                        padding: 24px;
                        border-radius: 24px;
                        color: white;
                        box-shadow: 0 15px 35px rgba(30, 27, 75, 0.2);
                        display: flex;
                        align-items: center;
                        gap: 16px;
                    }

                    .ad-brand-icon {
                        width: 48px;
                        height: 48px;
                        background: rgba(255,255,255,0.15);
                        backdrop-filter: blur(8px);
                        border: 1px solid rgba(255,255,255,0.2);
                        border-radius: 14px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 22px;
                    }

                    .ad-brand-text h2 {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-size: 18px;
                        font-weight: 800;
                        margin: 0;
                        line-height: 1;
                    }

                    .ad-brand-text span {
                        font-size: 11px;
                        opacity: 0.7;
                        font-weight: 500;
                        letter-spacing: 0.5px;
                    }

                    .ad-nav-group {
                        margin-bottom: 32px;
                    }

                    .ad-nav-label {
                        font-size: 11px;
                        font-weight: 800;
                        color: #94a3b8;
                        text-transform: uppercase;
                        letter-spacing: 1.5px;
                        margin-bottom: 16px;
                        padding-left: 12px;
                    }

                    .ad-nav-link {
                        display: flex;
                        align-items: center;
                        gap: 14px;
                        padding: 12px 16px;
                        border-radius: 18px;
                        text-decoration: none;
                        color: #64748b;
                        font-weight: 600;
                        margin-bottom: 6px;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        font-size: 14px;
                    }

                    .ad-nav-link:hover {
                        background: #f8fafc;
                        color: #4f46e5;
                        transform: translateX(5px);
                    }

                    .ad-nav-link.active {
                        background: #4f46e5;
                        color: #ffffff;
                        box-shadow: 0 8px 25px rgba(79, 70, 229, 0.25);
                    }

                    .ad-nav-icon {
                        width: 32px;
                        height: 32px;
                        background: #f1f5f9;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 16px;
                        transition: background 0.3s;
                    }

                    .ad-nav-link.active .ad-nav-icon {
                        background: rgba(255,255,255,0.2);
                    }

                    .ad-sidebar-footer {
                        margin-top: auto;
                        padding-top: 24px;
                        border-top: 1.5px solid #f1f5f9;
                    }

                    .ad-status-pill {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        background: #f0fdf4;
                        padding: 12px 16px;
                        border-radius: 16px;
                        border: 1px solid #bbf7d0;
                    }

                    .ad-status-dot {
                        width: 8px;
                        height: 8px;
                        background: #22c55e;
                        border-radius: 50%;
                        box-shadow: 0 0 10px rgba(34, 197, 94, 0.4);
                        animation: ad-pulse 2s infinite;
                    }

                    @keyframes ad-pulse {
                        0% { transform: scale(0.95); opacity: 0.8; }
                        50% { transform: scale(1.1); opacity: 1; }
                        100% { transform: scale(0.95); opacity: 0.8; }
                    }

                    .ad-status-text {
                        font-size: 12px;
                        font-weight: 700;
                        color: #16a34a;
                    }

                    /* ── MAIN CONTENT ── */
                    .ad-main {
                        flex: 1;
                        padding: 40px 60px;
                        overflow-y: auto;
                        background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
                        animation: ad-fadeSlide 0.6s ease both;
                    }

                    @keyframes ad-fadeSlide {
                        from { opacity: 0; transform: translateX(20px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                `}</style>

                <aside className="ad-sidebar">
                    <div className="ad-brand-section">
                        <div className="ad-brand-card">
                            <div className="ad-brand-icon">⚡</div>
                            <div className="ad-brand-text">
                                <h2>AdminHub</h2>
                                <span>Control Center v2.0</span>
                            </div>
                        </div>
                    </div>

                    <nav className="ad-nav">
                        {navGroups.map((group, idx) => (
                            <div key={idx} className="ad-nav-group">
                                <div className="ad-nav-label">{group.label}</div>
                                {group.items.map((item) => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        className={({ isActive }) =>
                                            isActive ? "ad-nav-link active" : "ad-nav-link"
                                        }
                                    >
                                        <div className="ad-nav-icon">{item.icon}</div>
                                        <span>{item.label}</span>
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                    </nav>

                    <div className="ad-sidebar-footer">
                        <div className="ad-status-pill">
                            <div className="ad-status-dot"></div>
                            <span className="ad-status-text">Core Systems Online</span>
                        </div>
                    </div>
                </aside>

                <main className="ad-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
