import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  // 🔥 Find current role-based user
  let role = 'client';
  if (path.includes('/admin')) role = 'admin';
  else if (path.includes('/vendor')) role = 'vendor';

  const user = JSON.parse(localStorage.getItem(`user_${role}`) || localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem(`user_${role}`);
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    if (user.role === "admin") return "/admin/dashboard";
    if (user.role === "vendor") return "/vendor/dashboard";
    return "/users/dashboard";
  };

  return (
    <div className="nb-wrapper">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

                .nb-wrapper {
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(241, 245, 249, 0.8);
                    height: 72px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 60px;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    font-family: 'Sora', sans-serif;
                }

                .nb-logo-section {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    text-decoration: none;
                }

                .nb-logo-img {
                    height: 38px;
                    width: auto;
                    border-radius: 10px;
                    transition: transform 0.3s ease;
                }

                .nb-logo-section:hover .nb-logo-img {
                    transform: rotate(-5deg) scale(1.1);
                }

                .nb-logo-text {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 20px;
                    font-weight: 800;
                    color: #1e1b4b;
                    letter-spacing: -0.5px;
                }

                .nb-nav-links {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .nb-right-side {
                    display: flex;
                    align-items: center;
                    gap: 40px;
                }

                .nb-nav-link {
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 700;
                    color: #64748b;
                    padding: 10px 16px;
                    border-radius: 12px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                }

                .nb-nav-link:hover {
                    color: #4f46e5;
                    background: #f5f3ff;
                    transform: translateY(-1px);
                }

                .nb-nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 8px;
                    left: 16px;
                    width: 0;
                    height: 2px;
                    background: #4f46e5;
                    border-radius: 2px;
                    transition: width 0.3s ease;
                }

                .nb-nav-link:hover::after {
                    width: calc(100% - 32px);
                }

                .nb-nav-link.active {
                    color: #4f46e5;
                    background: #f5f3ff;
                }

                .nb-actions {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .nb-btn-login {
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 700;
                    color: #4f46e5;
                    padding: 10px 20px;
                    border-radius: 12px;
                    transition: all 0.3s;
                }

                .nb-btn-login:hover {
                    background: #f5f3ff;
                }

                .nb-btn-register {
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 700;
                    color: white;
                    background: #4f46e5;
                    padding: 10px 24px;
                    border-radius: 12px;
                    box-shadow: 0 10px 20px rgba(79, 70, 229, 0.15);
                    transition: all 0.3s;
                }

                .nb-btn-register:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px rgba(79, 70, 229, 0.25);
                    background: #4338ca;
                }

                .nb-user-profile {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 6px 16px 6px 6px;
                    background: #f8fafc;
                    border: 1px solid #f1f5f9;
                    border-radius: 999px;
                    text-decoration: none;
                    transition: all 0.3s;
                }

                .nb-user-profile:hover {
                    background: #ffffff;
                    border-color: #4f46e5;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
                }

                .nb-user-avatar {
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    font-weight: 800;
                }

                .nb-user-name {
                    font-size: 13px;
                    font-weight: 700;
                    color: #1e1b4b;
                }

                .nb-btn-logout {
                    background: none;
                    border: none;
                    color: #ef4444;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 10px;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .nb-btn-logout:hover {
                    background: #fef2f2;
                    transform: scale(1.1);
                }

                @media (max-width: 1024px) {
                    .nb-wrapper { padding: 0 30px; }
                    .nb-nav-links { gap: 20px; }
                }

                @media (max-width: 768px) {
                    .nb-nav-links { display: none; }
                    .nb-user-name { display: none; }
                    .nb-user-profile { padding: 6px; }
                }
            `}</style>

      <Link to="/" className="nb-logo-section">
        <img src={logo} alt="Logo" className="nb-logo-img" />
      </Link>

      <div className="nb-right-side">
        <nav className="nb-nav-links">
          <Link to="/" className="nb-nav-link">Home</Link>
          <Link to="/about" className="nb-nav-link">About</Link>
          <Link to="/events" className="nb-nav-link">Marketplace</Link>
          {user && <Link to={getDashboardLink()} className="nb-nav-link">Dashboard</Link>}
        </nav>

        <div className="nb-actions">
          {!user ? (
            <>
              <Link to="/login" className="nb-btn-login">Login</Link>
              <Link to="/register" className="nb-btn-register">Register</Link>
            </>
          ) : (
            <>
              <Link to={getDashboardLink()} className="nb-user-profile">
                <div className="nb-user-avatar">
                  {(user.name?.[0] || 'U').toUpperCase()}
                </div>
                <span className="nb-user-name">{user.name}</span>
              </Link>
              <button className="nb-btn-logout" onClick={handleLogout} title="Logout">
                ⎋
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;