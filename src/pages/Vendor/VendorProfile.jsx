import React, { useState, useEffect } from "react";
import { useToast } from "../../components/Toast";
import { BASE_URL } from "../../config";

const VendorProfile = () => {
    const toast = useToast();
    const [vendor, setVendor] = useState({
        name: "",
        email: "",
        phone: "",
        bio: "",
        role: "vendor",
        createdAt: ""
    });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const storedVendor = JSON.parse(localStorage.getItem("user_vendor") || localStorage.getItem("user"));
                const vendorId = storedVendor?.id || storedVendor?._id;

                if (!storedVendor || !vendorId) {
                    toast.error("Session expired. Please login again.");
                    setLoading(false);
                    return;
                }

                const res = await fetch(`${BASE_URL}/api/users/${vendorId}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    credentials: "include"
                });

                if (res.ok) {
                    const data = await res.json();
                    setVendor(prev => ({
                        ...prev,
                        ...data,
                        id: data._id || data.id
                    }));
                } else {
                    toast.error("Failed to load profile data.");
                }
            } catch (err) {
                console.error("Profile fetch error:", err);
                toast.error("An error occurred while fetching profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [toast]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const vendorId = vendor._id || vendor.id;
            const res = await fetch(`${BASE_URL}/api/users/${vendorId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    name: vendor.name,
                    phone: vendor.phone,
                    bio: vendor.bio
                }),
                credentials: "include"
            });

            if (res.ok) {
                const updatedVendor = await res.json();
                const normalizedVendor = { ...updatedVendor, id: updatedVendor._id || updatedVendor.id };
                localStorage.setItem("user_vendor", JSON.stringify(normalizedVendor));
                localStorage.setItem("user", JSON.stringify(normalizedVendor));
                setVendor(normalizedVendor);
                toast.success("Profile synchronized successfully! ✨");
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || "Update failed");
            }
        } catch (err) {
            console.error("Update error:", err);
            toast.error("Server synchronization failed.");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return (
        <div className="vp-loading-screen">
            <div className="vp-spinner"></div>
            <p>Gathering Business Insights...</p>
            <style>{`
                .vp-loading-screen {
                    height: 50vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;
                    color: #64748b;
                    font-family: 'Sora', sans-serif;
                }
                .vp-spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid #f1f5f9;
                    border-top: 4px solid #4f46e5;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );

    return (
        <div className="vp-wrapper">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

                .vp-wrapper {
                    font-family: 'Sora', sans-serif;
                    padding: 20px 0;
                    max-width: 1080px;
                    margin: 0 auto;
                }

                .vp-header-visual {
                    margin-bottom: 50px;
                    position: relative;
                }

                .vp-header-visual h1 {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 42px;
                    font-weight: 800;
                    color: #0f172a;
                    letter-spacing: -2px;
                    margin: 0;
                }

                .vp-header-visual p {
                    font-size: 18px;
                    color: #64748b;
                    margin-top: 10px;
                    font-weight: 500;
                }

                .vp-main-grid {
                    display: grid;
                    grid-template-columns: 380px 1fr;
                    gap: 40px;
                    align-items: start;
                }

                /* ── LEFT CARD: IDENTITY ── */
                .vp-identity-card {
                    background: #ffffff;
                    border-radius: 40px;
                    padding: 50px 40px;
                    border: 1px solid rgba(226, 232, 240, 0.6);
                    box-shadow: 0 40px 80px -20px rgba(15, 23, 42, 0.08);
                    text-align: center;
                    position: sticky;
                    top: 20px;
                    transition: transform 0.4s ease;
                }

                .vp-identity-card:hover {
                    transform: translateY(-5px);
                }

                .vp-avatar-prime {
                    width: 150px;
                    height: 150px;
                    background: linear-gradient(135deg, #4f46e5 0%, #818cf8 100%);
                    border-radius: 54px;
                    margin: 0 auto 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 64px;
                    color: white;
                    font-weight: 800;
                    border: 8px solid #f8fafc;
                    box-shadow: 0 25px 50px -12px rgba(79, 70, 229, 0.3);
                    position: relative;
                }

                .vp-badge-verified {
                    position: absolute;
                    bottom: -10px;
                    right: -10px;
                    background: #10b981;
                    color: white;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    border: 4px solid #ffffff;
                    box-shadow: 0 10px 20px rgba(16, 185, 129, 0.2);
                }

                .vp-name-display {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 28px;
                    font-weight: 800;
                    color: #0f172a;
                    margin-bottom: 8px;
                }

                .vp-tier-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 24px;
                    background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(129, 140, 248, 0.1) 100%);
                    color: #4f46e5;
                    border-radius: 99px;
                    font-size: 14px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin-bottom: 40px;
                    border: 1px solid rgba(79, 70, 229, 0.2);
                    box-shadow: 0 10px 20px rgba(79, 70, 229, 0.05);
                }

                .vp-tier-tag::before {
                    content: '✦';
                    font-size: 16px;
                }

                .vp-mini-stats {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    border-top: 1px solid #f1f5f9;
                    padding-top: 40px;
                }

                .vp-m-stat span:first-child {
                    display: block;
                    font-size: 11px;
                    font-weight: 800;
                    color: #94a3b8;
                    text-transform: uppercase;
                    margin-bottom: 6px;
                }

                .vp-m-stat span:last-child {
                    font-size: 16px;
                    font-weight: 700;
                    color: #1e1b4b;
                }

                /* ── RIGHT CARD: CONTROL PANEL ── */
                .vp-form-card {
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(20px);
                    border-radius: 40px;
                    padding: 50px;
                    border: 1px solid rgba(226, 232, 240, 0.6);
                    box-shadow: 0 30px 60px -15px rgba(0,0,0,0.05);
                }

                .vp-section-title {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 40px;
                }

                .vp-section-title i {
                    width: 48px;
                    height: 48px;
                    background: #4f46e5;
                    color: white;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    font-style: normal;
                }

                .vp-section-title h3 {
                    font-size: 22px;
                    font-weight: 800;
                    color: #0f172a;
                    margin: 0;
                }

                .vp-input-group {
                    display: grid;
                    gap: 30px;
                }

                .vp-field-box {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .vp-field-box label {
                    font-size: 13px;
                    font-weight: 700;
                    color: #334155;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding-left: 4px;
                }

                .vp-input-style {
                    padding: 18px 24px;
                    background: #f8fafc;
                    border: 2px solid transparent;
                    border-radius: 20px;
                    font-family: 'Sora', sans-serif;
                    font-size: 15px;
                    color: #0f172a;
                    transition: all 0.3s;
                }

                .vp-input-style:focus {
                    background: #ffffff;
                    border-color: #4f46e5;
                    box-shadow: 0 0 0 6px rgba(79, 70, 229, 0.08);
                    outline: none;
                }

                .vp-input-style:disabled {
                    color: #94a3b8;
                    cursor: not-allowed;
                    background: #f1f5f9;
                }

                .vp-textarea-style {
                    min-height: 140px;
                    resize: none;
                    line-height: 1.6;
                }

                .vp-save-btn {
                    margin-top: 20px;
                    padding: 22px;
                    background: #0f172a;
                    color: #ffffff;
                    border: none;
                    border-radius: 24px;
                    font-size: 17px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
                }

                .vp-save-btn:hover:not(:disabled) {
                    background: #4f46e5;
                    transform: translateY(-4px);
                    box-shadow: 0 25px 50px rgba(79, 70, 229, 0.3);
                }

                .vp-save-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .vp-spinner-sm {
                    width: 20px;
                    height: 20px;
                    border: 3px solid rgba(255,255,255,0.3);
                    border-top: 3px solid #ffffff;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }

                @media (max-width: 900px) {
                    .vp-main-grid { grid-template-columns: 1fr; }
                    .vp-identity-card { position: static; }
                }

            `}</style>

            <header className="vp-header-visual">
                <h1>Professional Profile</h1>
                <p>Manage your business identity and presence on Eventify.</p>
            </header>

            <div className="vp-main-grid">
                {/* ── IDENTITY CARD ── */}
                <div className="vp-identity-card">
                    <div className="vp-avatar-prime">
                        {(vendor.name?.[0] || 'V').toUpperCase()}
                        <div className="vp-badge-verified">✓</div>
                    </div>
                    <h2 className="vp-name-display">{vendor.name}</h2>
                    <div className="vp-tier-tag">
                        Eventify
                    </div>

                    <div className="vp-mini-stats">
                        <div className="vp-m-stat">
                            <span>Joined</span>
                            <span>{vendor.createdAt ? new Date(vendor.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Mar 2024'}</span>
                        </div>
                        <div className="vp-m-stat">
                            <span>Status</span>
                            <span style={{ color: '#10b981' }}>Active</span>
                        </div>
                    </div>
                </div>

                {/* ── FORM CARD ── */}
                <div className="vp-form-card">
                    <div className="vp-section-title">
                        <i>👤</i>
                        <h3>Account Details</h3>
                    </div>

                    <form onSubmit={handleUpdate} className="vp-input-group">
                        <div className="vp-field-box">
                            <label>Business Name</label>
                            <input
                                type="text"
                                className="vp-input-style"
                                value={vendor.name}
                                onChange={(e) => setVendor({ ...vendor, name: e.target.value })}
                                placeholder="Enter legal business name"
                                required
                            />
                        </div>

                        <div className="vp-field-box">
                            <label>Official Email (Primary)</label>
                            <input
                                type="email"
                                className="vp-input-style"
                                value={vendor.email}
                                disabled
                            />
                        </div>

                        <div className="vp-field-box">
                            <label>Business Contact Number</label>
                            <input
                                type="text"
                                className="vp-input-style"
                                value={vendor.phone || ""}
                                onChange={(e) => setVendor({ ...vendor, phone: e.target.value })}
                                placeholder="+91 00000 00000"
                            />
                        </div>

                        <div className="vp-field-box">
                            <label>Merchant Bio / About Us</label>
                            <textarea
                                className="vp-input-style vp-textarea-style"
                                value={vendor.bio || ""}
                                onChange={(e) => setVendor({ ...vendor, bio: e.target.value })}
                                placeholder="Describe your services, experience, and what makes you unique..."
                            />
                        </div>

                        <button type="submit" className="vp-save-btn" disabled={updating}>
                            {updating ? (
                                <>
                                    <div className="vp-spinner-sm"></div>
                                    Syncing...
                                </>
                            ) : (
                                "Update Profile"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VendorProfile;
