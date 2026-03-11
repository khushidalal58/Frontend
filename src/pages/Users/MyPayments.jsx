import React, { useEffect, useState } from "react";

const MyPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPayments = async () => {
        try {
            const res = await fetch("http://localhost:5001/api/payments/my", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            if (res.ok) setPayments(data);
        } catch (error) {
            console.error("Payment fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    return (
        <div className="payments-root">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Sora:wght@400;600;700&display=swap');

                .payments-root {
                    font-family: 'Sora', sans-serif;
                    animation: pay-fadeIn 0.6s ease;
                }

                @keyframes pay-fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .pay-hdr {
                    margin-bottom: 40px;
                }

                .pay-hdr h2 {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 32px;
                    font-weight: 800;
                    color: #1e1b4b;
                    letter-spacing: -1px;
                    margin: 0;
                }

                .pay-hdr p {
                    color: #64748b;
                    font-size: 15px;
                    margin-top: 6px;
                }

                .pay-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 24px;
                }

                .pay-card {
                    background: #ffffff;
                    border-radius: 24px;
                    padding: 24px;
                    border: 1.5px solid #f1f5f9;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.02);
                    transition: all 0.3s;
                }

                .pay-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(79, 70, 229, 0.08);
                }

                .pay-status {
                    display: inline-flex;
                    padding: 4px 12px;
                    border-radius: 100px;
                    font-size: 10px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 16px;
                }

                .pay-status.success { background: #f0fdf4; color: #10b981; }
                .pay-status.pending { background: #fffbeb; color: #f59e0b; }

                .pay-amount {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 24px;
                    font-weight: 800;
                    color: #1e1b4b;
                    margin-bottom: 4px;
                }

                .pay-method {
                    font-size: 12px;
                    color: #94a3b8;
                    font-weight: 600;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .pay-divider {
                    height: 1px;
                    background: #f1f5f9;
                    margin: 16px 0;
                }

                .pay-info-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 8px;
                    font-size: 13px;
                }

                .pay-label { color: #94a3b8; font-weight: 600; }
                .pay-value { color: #475569; font-weight: 700; }

                .pay-txn {
                    font-size: 11px;
                    color: #cbd5e1;
                    margin-top: 12px;
                    display: block;
                }

                .pay-loading { text-align: center; padding: 60px; color: #94a3b8; }

                .pay-empty {
                    text-align: center;
                    padding: 80px 40px;
                    background: white;
                    border-radius: 32px;
                    border: 2px dashed #e2e8f0;
                    grid-column: 1 / -1;
                }
            `}</style>

            <header className="pay-hdr">
                <h2>Payment History</h2>
                <p>Transactions and financial summary for your account.</p>
            </header>

            {loading ? (
                <div className="pay-loading">Reviewing transactions...</div>
            ) : payments.length > 0 ? (
                <div className="pay-grid">
                    {payments.map((pay) => (
                        <div key={pay._id} className="pay-card">
                            <div className={`pay-status ${pay.status}`}>
                                {pay.status === 'success' ? 'Settled' : 'Processing'}
                            </div>
                            <div className="pay-amount">₹{pay.amount?.toLocaleString()}</div>
                            <div className="pay-method">
                                <span>{pay.method === 'online' ? '💳 Digital Payment' : '💵 Cash Settlement'}</span>
                            </div>

                            <div className="pay-divider" />

                            <div className="pay-info-row">
                                <span className="pay-label">Account</span>
                                <span className="pay-value">{pay.booking?.eventName || "Event Service"}</span>
                            </div>
                            <div className="pay-info-row">
                                <span className="pay-label">Date</span>
                                <span className="pay-value">{new Date(pay.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            </div>

                            <span className="pay-txn">#ID: {pay.transactionId || pay._id.slice(-10).toUpperCase()}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="pay-empty">
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>💳</div>
                    <h3>No Transactions Yet</h3>
                    <p>Your financial history is clean. Payments appear here after booking.</p>
                </div>
            )}
        </div>
    );
};

export default MyPayments;
