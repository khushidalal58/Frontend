import React, { useEffect, useState } from "react";
import { useToast } from "../../components/Toast";

const ManageCancellations = () => {
    const [cancellations, setCancellations] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    const fetchCancellations = async () => {
        try {
            const res = await fetch("http://localhost:5001/api/cancellations/all", {
                credentials: "include"
            });
            const data = await res.json();
            if (res.ok) {
                setCancellations(data);
            } else {
                toast.error(data.message || "Failed to fetch cancellations");
            }
        } catch (error) {
            toast.error("Error connecting to server");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCancellations();
    }, []);

    const handleAction = async (cancellationId, status) => {
        try {
            const res = await fetch("http://localhost:5001/api/cancellations/update-status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cancellationId, status }),
                credentials: "include"
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(`Cancellation ${status} successfully`);
                fetchCancellations();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Action failed");
        }
    };

    if (loading) return <div className="mc-loading">Loading cancellation requests...</div>;

    return (
        <div className="mc-container">
            <style>{`
                .mc-container { animation: mc-fadeIn 0.5s ease; }
                @keyframes mc-fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                
                .mc-hdr { margin-bottom: 32px; }
                .mc-title h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 32px; font-weight: 800; color: #1e1b4b; margin: 0; }
                .mc-title p { color: #64748b; margin-top: 4px; }

                .mc-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
                .mc-card { background: #fff; border-radius: 24px; border: 1.5px solid #f1f5f9; padding: 24px; display: flex; flex-direction: column; gap: 16px; transition: all 0.3s; }
                .mc-card:hover { border-color: #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.03); }

                .mc-header { display: flex; justify-content: space-between; align-items: flex-start; }
                .mc-booking-info h3 { font-size: 20px; font-weight: 800; color: #1e1b4b; margin: 0; }
                .mc-booking-info span { font-size: 12px; color: #94a3b8; font-weight: 600; }

                .mc-status-badge { padding: 6px 12px; border-radius: 12px; font-size: 11px; font-weight: 800; text-transform: uppercase; }
                .mc-status-pending { background: #fef3c7; color: #92400e; }
                .mc-status-approved { background: #d1fae5; color: #065f46; }
                .mc-status-rejected { background: #fee2e2; color: #991b1b; }

                .mc-details { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #f8fafc; padding: 20px; border-radius: 20px; }
                .mc-detail-item label { display: block; font-size: 11px; color: #94a3b8; font-weight: 800; text-transform: uppercase; margin-bottom: 4px; }
                .mc-detail-item p { font-size: 14px; font-weight: 700; color: #1e1b4b; margin: 0; }

                .mc-reason-box { background: #fdfcff; border: 1px solid #eef2ff; padding: 16px; border-radius: 16px; }
                .mc-reason-box label { font-size: 11px; color: #94a3b8; font-weight: 800; text-transform: uppercase; display: block; margin-bottom: 8px; }
                .mc-reason-text { font-size: 14px; color: #475569; font-style: italic; }

                .mc-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1.5px solid #f8fafc; }
                .mc-refund-info { display: flex; flex-direction: column; }
                .mc-refund-amt { font-size: 18px; font-weight: 800; color: #ef4444; }
                .mc-refund-pct { font-size: 11px; color: #94a3b8; font-weight: 600; }

                .mc-actions { display: flex; gap: 10px; }
                .mc-btn { padding: 10px 20px; border-radius: 12px; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.2s; border: none; }
                .mc-btn-approve { background: #10b981; color: #fff; }
                .mc-btn-approve:hover { background: #059669; transform: scale(1.05); }
                .mc-btn-reject { background: #f8fafc; color: #ef4444; border: 1.5px solid #fee2e2; }
                .mc-btn-reject:hover { background: #fee2e2; }

                .mc-loading { padding: 100px; text-align: center; color: #64748b; font-weight: 600; }
                .mc-empty { padding: 60px; text-align: center; background: #f8fafc; border-radius: 20px; color: #94a3b8; border: 2px dashed #e2e8f0; }
            `}</style>

            <header className="mc-hdr">
                <div className="mc-title">
                    <h1>Manage Cancellations</h1>
                    <p>Process refund requests and cancellation claims.</p>
                </div>
            </header>

            <div className="mc-grid">
                {cancellations.length > 0 ? cancellations.map(c => (
                    <div key={c._id} className="mc-card">
                        <div className="mc-header">
                            <div className="mc-booking-info">
                                <h3>{c.bookingId?.eventName || "Event"}</h3>
                                <span>REF: #{c.bookingId?._id.slice(-6).toUpperCase()}</span>
                            </div>
                            <span className={`mc-status-badge mc-status-${c.status}`}>{c.status}</span>
                        </div>

                        <div className="mc-details">
                            <div className="mc-detail-item">
                                <label>Customer</label>
                                <p>{c.userId?.name}</p>
                                <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>{c.userId?.email}</p>
                            </div>
                            <div className="mc-detail-item">
                                <label>Event Date</label>
                                <p>{c.bookingId ? new Date(c.bookingId.eventDate).toLocaleDateString() : "N/A"}</p>
                            </div>
                        </div>

                        <div className="mc-reason-box">
                            <label>Reason for Cancellation</label>
                            <p className="mc-reason-text">"{c.reason}"</p>
                        </div>

                        <div className="mc-footer">
                            <div className="mc-refund-info">
                                <span className="mc-detail-item"><label>Refund Estimate</label></span>
                                <div className="mc-refund-amt">₹{c.refundAmount.toLocaleString()}</div>
                                <div className="mc-refund-pct">{c.refundPercentage}% of total</div>
                            </div>

                            <div className="mc-actions">
                                {c.status === "pending" ? (
                                    <>
                                        <button
                                            className="mc-btn mc-btn-approve"
                                            onClick={() => handleAction(c._id, "approved")}
                                        >
                                            Approve & Refund
                                        </button>
                                        <button
                                            className="mc-btn mc-btn-reject"
                                            onClick={() => handleAction(c._id, "rejected")}
                                        >
                                            Reject
                                        </button>
                                    </>
                                ) : (
                                    <div style={{ color: c.status === 'approved' ? '#10b981' : '#ef4444', fontWeight: 700, fontSize: '13px' }}>
                                        {c.status === 'approved' ? '✓ Processed' : '✕ Discarded'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="mc-empty">
                        No cancellation requests pending.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageCancellations;
