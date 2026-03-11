import React, { useEffect, useState } from "react";
import { useToast } from "../../components/Toast";

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const toast = useToast();

    const fetchBookings = async () => {
        try {
            const res = await fetch("http://localhost:5001/api/admin/bookings", {
                credentials: "include"
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                toast.error(`Server Error (${res.status}): ${errData.message || errData.error || 'Access Denied'}`);
                return;
            }

            const data = await res.json();
            if (data.success) {
                setBookings(data.bookings);
            } else {
                toast.error(data.message || "Failed to fetch bookings from server");
            }
        } catch (error) {
            toast.error("Network Error: Could not connect to backend");
            console.error("Fetch failed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleUpdateStatus = async (id, status, adminMessage = "") => {
        try {
            const res = await fetch(`http://localhost:5001/api/admin/bookings/${id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, adminMessage }),
                credentials: "include"
            });
            const data = await res.json();
            if (data.success) {
                toast.success(`Booking ${status === 'confirmed' ? 'Approved' : 'Rejected'} successfully`);
                fetchBookings();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Action failed");
        }
    };

    const promptReject = (id) => {
        const reason = window.prompt("Enter reason for rejection (this will be emailed to the user):");
        if (reason !== null) {
            handleUpdateStatus(id, "rejected", reason);
        }
    };

    const filtered = bookings.filter(b => filter === "all" ? true : b.status === filter);

    if (loading) return <div className="mb-loading">Analyzing Platform Reservations...</div>;

    return (
        <div className="mb-container">
            <style>{`
                .mb-container { animation: mb-fadeIn 0.5s ease; }
                @keyframes mb-fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                
                .mb-hdr { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
                .mb-title h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 32px; font-weight: 800; color: #1e1b4b; margin: 0; }
                .mb-title p { color: #64748b; margin-top: 4px; }

                .mb-filters { display: flex; gap: 8px; background: #fff; padding: 6px; border-radius: 14px; border: 1.5px solid #f1f5f9; }
                .mb-filter-btn { padding: 8px 16px; border-radius: 10px; border: none; background: transparent; color: #64748b; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 13px; }
                .mb-filter-btn.active { background: #4f46e5; color: #fff; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2); }

                .mb-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
                .mb-card { background: #fff; border-radius: 24px; border: 1.5px solid #f1f5f9; padding: 32px; display: flex; flex-direction: column; gap: 24px; transition: all 0.3s; position: relative; }
                .mb-card:hover { border-color: #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.03); transform: translateY(-2px); }

                .mb-info { display: flex; gap: 20px; align-items: flex-start; width: 100%; }
                .mb-user-avatar { width: 48px; height: 48px; background: #4f46e5; color: #fff; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 18px; }
                
                .mb-details { flex: 1; }
                .mb-header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; border-bottom: 2px solid #f1f5f9; padding-bottom: 16px; }
                .mb-event-name { font-size: 24px; font-weight: 800; color: #1e1b4b; margin: 0; }
                
                .mb-status-row { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
                .mb-essential-info { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; background: #f8fafc; padding: 20px; border-radius: 20px; margin-bottom: 24px; }
                .mb-info-block { display: flex; flex-direction: column; gap: 4px; }
                
                .mb-lbl { font-size: 11px; color: #94a3b8; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
                .mb-val { font-size: 16px; color: #1e1b4b; font-weight: 700; }
                .mb-sub-val { font-size: 13px; color: #64748b; font-weight: 500; }
                
                .mb-assignment-log { border: 1.5px solid #f1f5f9; border-radius: 24px; padding: 24px; background: #fff; }
                .mb-log-grid { display: flex; flex-direction: column; gap: 12px; margin-top: 12px; }
                .mb-log-row { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: #fdfcff; border-radius: 16px; border: 1px solid #eef2ff; }
                .mb-log-row.main { border-color: #e0e7ff; background: #f5f3ff; }
                
                .mb-log-vendor { display: flex; flex-direction: column; align-items: flex-start; flex: 1; }
                .mb-log-vendor span { font-size: 10px; color: #94a3b8; text-transform: uppercase; font-weight: 700; margin-bottom: 2px; }
                .mb-log-vendor strong { font-size: 15px; color: #4338ca; }

                .mb-log-arrow { color: #cbd5e1; font-size: 20px; padding: 0 20px; }
                
                .mb-log-svc { display: flex; flex-direction: column; align-items: flex-end; flex: 1; }
                .mb-log-svc span { font-size: 10px; color: #94a3b8; text-transform: uppercase; font-weight: 700; margin-bottom: 2px; }
                .mb-log-svc strong { font-size: 15px; color: #1e1b4b; text-align: right; }
                .mb-log-svc small { font-size: 10px; color: #4f46e5; text-transform: uppercase; font-weight: 800; }

                .mb-empty-log { padding: 20px; text-align: center; color: #94a3b8; font-style: italic; }
                
                .mb-status-pill { padding: 6px 14px; border-radius: 10px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
                .mb-status-pending { background: #fff7ed; color: #c2410c; }
                .mb-status-confirmed { background: #f0fdf4; color: #15803d; }
                .mb-status-completed { background: #f0f9ff; color: #0369a1; }
                .mb-status-rejected { background: #fef2f2; color: #b91c1c; }
                .mb-status-cancellation_requested { background: #fffcf0; color: #c2410c; }
                .mb-status-cancelled { background: #fef2f2; color: #b91c1c; }

                .mb-card-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1.5px solid #f8fafc; margin-top: 10px; }
                .mb-price-tag { display: flex; flex-direction: column; }
                .mb-price { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 800; color: #1e1b4b; }
                
                .mb-processed-info { display: flex; flex-direction: column; align-items: flex-end; color: #10b981; }
                .mb-processed-info span { font-size: 11px; font-weight: 800; text-transform: uppercase; }
                .mb-processed-info small { font-size: 11px; color: #94a3b8; font-weight: 600; }

                .mb-btn { padding: 12px 24px; border-radius: 12px; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.2s; border: none; }
                .mb-btn-approve { background: #4f46e5; color: #fff; }
                .mb-btn-approve:hover { background: #4338ca; transform: scale(1.05); }
                .mb-btn-reject { background: #f8fafc; color: #ef4444; border: 1.5px solid #fee2e2; }
                .mb-btn-reject:hover { background: #fee2e2; }
                
                .mb-loading { padding: 100px; text-align: center; color: #64748b; font-weight: 600; }
                .mb-empty { padding: 60px; text-align: center; background: #f8fafc; border-radius: 20px; color: #94a3b8; border: 2px dashed #e2e8f0; }
            `}</style>

            <header className="mb-hdr">
                <div className="mb-title">
                    <h1>Event Reservations</h1>
                    <p>Manage and verify customer event requests.</p>
                </div>
                <div className="mb-filters">
                    {["all", "pending", "confirmed", "completed", "rejected"].map(f => (
                        <button
                            key={f}
                            className={`mb-filter-btn ${filter === f ? 'active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </header>

            <div className="mb-grid">
                {filtered.length > 0 ? filtered.map(booking => (
                    <div key={booking._id} className="mb-card">
                        <div className="mb-info">
                            <div className="mb-user-avatar">
                                {booking.user?.name?.charAt(0) || "U"}
                            </div>
                            <div className="mb-details">
                                <div className="mb-header-row">
                                    <h3 className="mb-event-name">{booking.eventName}</h3>
                                    <span className={`mb-status-pill mb-status-${booking.status}`}>{booking.status}</span>
                                </div>

                                <div className="mb-status-row">
                                    <span className="mb-lbl">Booking Progress:</span>
                                    <span className={`mb-status-pill mb-status-${booking.status}`}>{booking.status}</span>
                                </div>

                                <div className="mb-essential-info">
                                    {/* Column 1: Who */}
                                    <div className="mb-info-block">
                                        <div className="mb-lbl">👤 Booking For (User)</div>
                                        <div className="mb-val">{booking.user?.name || "Client"}</div>
                                        <div className="mb-sub-val">{booking.user?.email || "No contact info"}</div>
                                    </div>

                                    {/* Column 2: When */}
                                    <div className="mb-info-block">
                                        <div className="mb-lbl">📅 Event Schedule</div>
                                        <div className="mb-val">{new Date(booking.eventDate).toLocaleDateString()}</div>
                                        <div className="mb-val" style={{ color: '#4f46e5' }}>⏰ {booking.startTime || "TBD"}</div>
                                    </div>
                                </div>

                                <div className="mb-assignment-log">
                                    <div className="mb-lbl">🛠️ Service Providers</div>
                                    <div className="mb-log-grid">
                                        {/* Main Event Provider */}
                                        <div className="mb-log-row main">
                                            <div className="mb-log-vendor">
                                                <span>Vendor Name:</span>
                                                <strong>{booking.vendor?.name || "Event Host"}</strong>
                                            </div>
                                            <div className="mb-log-arrow">➜</div>
                                            <div className="mb-log-svc">
                                                <span>Selected Service:</span>
                                                <strong>{booking.eventName}</strong>
                                                <small>(Main Venue/Event)</small>
                                            </div>
                                        </div>

                                        {/* Marketplace Service Providers */}
                                        {booking.services?.map((svc, idx) => (
                                            <div key={idx} className="mb-log-row">
                                                <div className="mb-log-vendor">
                                                    <span>Vendor Name:</span>
                                                    <strong>{svc.vendorId?.name || "Merchant"}</strong>
                                                </div>
                                                <div className="mb-log-arrow">➜</div>
                                                <div className="mb-log-svc">
                                                    <span>Selected Service:</span>
                                                    <strong>{svc.title}</strong>
                                                    <small>({svc.category})</small>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-card-footer">
                            <div className="mb-price-tag">
                                <span className="mb-lbl">Total Investment</span>
                                <div className="mb-price">₹{(booking.totalAmount || 0).toLocaleString()}</div>
                            </div>

                            <div className="mb-actions">
                                {booking.status === "pending" && (
                                    <>
                                        <button
                                            className="mb-btn mb-btn-approve"
                                            onClick={() => handleUpdateStatus(booking._id, "confirmed")}
                                        >
                                            Approve Booking
                                        </button>
                                        <button
                                            className="mb-btn mb-btn-reject"
                                            onClick={() => promptReject(booking._id)}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                                {booking.status === "confirmed" && (
                                    <button
                                        className="mb-btn mb-btn-approve"
                                        style={{ background: '#10b981' }}
                                        onClick={() => handleUpdateStatus(booking._id, "completed")}
                                    >
                                        Mark as Completed
                                    </button>
                                )}
                                {(booking.status === "rejected" || booking.status === "completed") && (
                                    <div className="mb-processed-info">
                                        <span>✓ Event {booking.status === 'completed' ? 'Finished' : 'Rejected'}</span>
                                        <small>Date: {new Date(booking.updatedAt).toLocaleDateString()}</small>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="mb-empty">
                        No reservations found for this criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageBookings;
