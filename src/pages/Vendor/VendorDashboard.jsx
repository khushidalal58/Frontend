import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import VendorNotificationBell from "../../components/VendorNotificationBell";

const VendorDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user_vendor") || localStorage.getItem("user"));

    const navItems = [
        { to: "bookings", icon: "📋", label: "My Bookings", desc: "Customer reservations" },
        { to: "add-service", icon: "🛠️", label: "Add Service", desc: "Register a service" },
        { to: "services", icon: "📦", label: "My Services", desc: "Manage offerings" },
        { to: "menu", icon: "🍽️", label: "Manage Menu", desc: "Catering menu items" },
        { to: "feedback", icon: "💬", label: "Feedback", desc: "Customer reviews" },
        { to: "availability", icon: "🗓️", label: "Availability", desc: "Schedule management" },
        { to: "profile", icon: "👤", label: "My Profile", desc: "Manage business profile" },
    ];

    return (
        <div className="vd-page-wrapper">
            <Navbar />

            <div className="vd-root">
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

                    .vd-page-wrapper {
                        background: #fdfcff;
                        min-height: 100vh;
                    }

                    .vd-root {
                        display: flex;
                        height: calc(100vh - 70px);
                        font-family: 'Sora', sans-serif;
                    }

                    /* ── SIDEBAR ── */
                    .vd-sidebar {
                        width: 300px;
                        background: #ffffff;
                        border-right: 1.5px solid #e2e8f0;
                        display: flex;
                        flex-direction: column;
                        padding: 32px 24px;
                        box-shadow: 10px 0 50px rgba(0,0,0,0.02);
                        z-index: 100;
                    }

                    .vd-profile-section {
                        margin-bottom: 32px;
                    }

                    .vd-vendor-card {
                        background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
                        padding: 24px;
                        border-radius: 24px;
                        color: white;
                        box-shadow: 0 15px 35px rgba(30, 27, 75, 0.25);
                        position: relative;
                        overflow: hidden;
                    }

                    .vd-vendor-card::before {
                        content: '';
                        position: absolute;
                        top: -50px;
                        right: -50px;
                        width: 120px;
                        height: 120px;
                        background: rgba(255,255,255,0.05);
                        border-radius: 50%;
                    }

                    .vd-avatar-box {
                        width: 52px;
                        height: 52px;
                        border-radius: 16px;
                        background: rgba(255,255,255,0.15);
                        backdrop-filter: blur(8px);
                        border: 1px solid rgba(255,255,255,0.2);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 22px;
                        font-weight: 800;
                        margin-bottom: 16px;
                    }

                    .vd-v-name {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-size: 17px;
                        font-weight: 800;
                        margin: 0;
                    }

                    .vd-v-tag {
                        display: inline-block;
                        font-size: 10px;
                        font-weight: 700;
                        padding: 3px 10px;
                        background: #4f46e5;
                        border-radius: 40px;
                        margin-top: 6px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }

                    .vd-nav-label {
                        font-size: 11px;
                        font-weight: 800;
                        color: #94a3b8;
                        text-transform: uppercase;
                        letter-spacing: 1.5px;
                        margin: 20px 0 12px 12px;
                    }

                    .vd-nav {
                        flex: 1;
                        overflow-y: auto;
                        padding-right: 5px;
                    }

                    .vd-nav::-webkit-scrollbar { width: 4px; }
                    .vd-nav::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }

                    .vd-link {
                        display: flex;
                        align-items: center;
                        gap: 14px;
                        padding: 12px 14px;
                        border-radius: 18px;
                        text-decoration: none;
                        color: #64748b;
                        font-weight: 600;
                        margin-bottom: 6px;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    }

                    .vd-link:hover {
                        background: #f8fafc;
                        color: #4f46e5;
                        transform: translateX(5px);
                    }

                    .vd-link.active {
                        background: #4f46e5;
                        color: #ffffff;
                        box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
                    }

                    .vd-icon {
                        width: 38px;
                        height: 38px;
                        background: #f1f5f9;
                        border-radius: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 17px;
                        transition: background 0.3s;
                    }

                    .vd-link.active .vd-icon {
                        background: rgba(255,255,255,0.2);
                    }

                    .vd-link-info h4 {
                        font-size: 14px;
                        font-weight: 700;
                        margin: 0;
                    }

                    .vd-link-info p {
                        font-size: 10.5px;
                        opacity: 0.6;
                        margin-top: 1px;
                        font-weight: 500;
                    }

                    .vd-link.active .vd-link-info p { opacity: 0.85; }

                    /* ── MAIN CONTENT ── */
                    .vd-main {
                        flex: 1;
                        padding: 40px 50px;
                        overflow-y: auto;
                        background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
                    }
                `}</style>

                <aside className="vd-sidebar">
                    <div className="vd-profile-section">
                        <div className="vd-vendor-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div className="vd-avatar-box">{(user?.name?.[0] || 'V').toUpperCase()}</div>
                                <VendorNotificationBell />
                            </div>
                            <h3 className="vd-v-name">{user?.name || "Business Pro"}</h3>
                            <span className="vd-v-tag">Verified Vendor</span>
                        </div>
                    </div>

                    <div className="vd-nav-label">Merchant Console</div>
                    <nav className="vd-nav">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    isActive ? "vd-link active" : "vd-link"
                                }
                            >
                                <div className="vd-icon">{item.icon}</div>
                                <div className="vd-link-info">
                                    <h4>{item.label}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                <main className="vd-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default VendorDashboard;