import React, { useEffect, useState } from "react";

const ManageReports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/admin/stats", {
        method: "GET",
        credentials: "include",
      });
      const json = await res.json();
      if (res.ok) setData(json.stats);
    } catch (error) {
      console.error("Stats Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const stats = [
    {
      label: "Total Participants",
      value: data?.totalParticipants?.toLocaleString() || "0",
      icon: "👥",
      color: "#4f46e5"
    },
    {
      label: "Verified Merchants",
      value: data?.verifiedMerchants?.toLocaleString() || "0",
      icon: "🏪",
      color: "#10b981"
    },
    {
      label: "Successful Occasions",
      value: data?.successfulEvents?.toLocaleString() || "0",
      icon: "🎉",
      color: "#f59e0b"
    },
    {
      label: "Admin Profit",
      value: `₹${(data?.adminProfit || 0).toLocaleString()}`,
      icon: "⚖️",
      color: "#4f46e5"
    },
    {
      label: "Vendor Revenue",
      value: `₹${(data?.vendorProfit || 0).toLocaleString()}`,
      icon: "🏪",
      color: "#ec4899"
    },
  ];

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
        <div className="mr-loading-spinner"></div>
        <p>Generating Strategic Analytics...</p>
        <style>{`
                    .mr-loading-spinner {
                        width: 40px;
                        height: 40px;
                        border: 3px solid #f1f5f9;
                        border-top: 3px solid #4f46e5;
                        border-radius: 50%;
                        margin: 0 auto 20px;
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin { to { transform: rotate(360deg); } }
                `}</style>
      </div>
    );
  }

  return (
    <div className="mr-root">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

                .mr-root {
                    font-family: 'Sora', sans-serif;
                    animation: mr-fadeIn 0.6s ease;
                }

                @keyframes mr-fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .mr-hdr {
                    margin-bottom: 40px;
                }

                .mr-hdr h1 {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 36px;
                    font-weight: 800;
                    color: #1e1b4b;
                    letter-spacing: -1px;
                    margin-bottom: 8px;
                }

                .mr-hdr p {
                    color: #64748b;
                    font-size: 16px;
                }

                .mr-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 24px;
                    margin-bottom: 40px;
                }

                .mr-stat-card {
                    background: #ffffff;
                    border-radius: 28px;
                    border: 1.5px solid #f1f5f9;
                    padding: 32px;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 20px rgba(30, 27, 75, 0.02);
                }

                .mr-stat-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 40px rgba(30, 27, 75, 0.06);
                    border-color: #e2e8f0;
                }

                .mr-icon-box {
                    width: 56px;
                    height: 56px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    margin-bottom: 24px;
                    background: #f8fafc;
                }

                .mr-stat-val {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 32px;
                    font-weight: 800;
                    color: #1e1b4b;
                    margin-bottom: 4px;
                    display: block;
                }

                .mr-stat-lbl {
                    font-size: 13px;
                    color: #94a3b8;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .mr-section {
                    background: #ffffff;
                    border-radius: 32px;
                    border: 1.5px solid #f1f5f9;
                    padding: 40px;
                    box-shadow: 0 10px 40px rgba(30, 27, 75, 0.03);
                }

                .mr-section-title {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 22px;
                    font-weight: 800;
                    color: #1e1b4b;
                    margin-bottom: 24px;
                }

                .mr-progress-item {
                    margin-bottom: 24px;
                }

                .mr-p-info {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    font-size: 14px;
                    font-weight: 700;
                    color: #475569;
                }

                .mr-p-bar-bg {
                    height: 12px;
                    background: #f1f5f9;
                    border-radius: 6px;
                    overflow: hidden;
                }

                .mr-p-bar-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #4f46e5, #7c3aed);
                    border-radius: 6px;
                    transition: width 1s ease-out;
                }

                .mr-logic-section {
                    margin-bottom: 40px;
                }

                .mr-logic-card {
                    background: #ffffff;
                    border-radius: 32px;
                    border: 1.5px solid #f1f5f9;
                    padding: 40px;
                    display: flex;
                    align-items: center;
                    gap: 32px;
                    box-shadow: 0 10px 40px rgba(30, 27, 75, 0.03);
                }

                .mr-logic-item {
                    flex: 1;
                    display: flex;
                    gap: 20px;
                }

                .mr-logic-icon {
                    width: 64px;
                    height: 64px;
                    background: #f8fafc;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 28px;
                    flex-shrink: 0;
                }

                .mr-logic-content h3 {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 18px;
                    font-weight: 800;
                    color: #1e1b4b;
                    margin-bottom: 8px;
                }

                .mr-logic-content p {
                    font-size: 13px;
                    color: #64748b;
                    line-height: 1.6;
                    margin-bottom: 16px;
                }

                .mr-logic-formula {
                    display: inline-block;
                    background: #f5f3ff;
                    color: #4f46e5;
                    padding: 8px 16px;
                    border-radius: 12px;
                    font-size: 12px;
                    font-weight: 700;
                    font-family: monospace;
                }

                .mr-logic-formula.v {
                    background: #fdf2f8;
                    color: #ec4899;
                }

                .mr-logic-divider {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .mr-plus-circle {
                    width: 40px;
                    height: 40px;
                    background: #f1f5f9;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #94a3b8;
                    font-weight: 800;
                    font-size: 20px;
                }

                @media (max-width: 900px) {
                    .mr-logic-card { flex-direction: column; }
                    .mr-logic-divider { transform: rotate(90deg); }
                }
            `}</style>

      <header className="mr-hdr">
        <h1>Performance Insights</h1>
        <p>Strategic overview of platform growth and engagement metrics.</p>
      </header>

      <div className="mr-grid">
        {stats.map((s, i) => (
          <div key={i} className="mr-stat-card">
            <div className="mr-icon-box" style={{ background: `${s.color}10`, color: s.color }}>
              {s.icon}
            </div>
            <span className="mr-stat-val">{s.value}</span>
            <span className="mr-stat-lbl">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="mr-logic-section">
        <h2 className="mr-section-title">Profit Architecture</h2>
        <div className="mr-logic-card">
          <div className="mr-logic-item admin">
            <div className="mr-logic-icon">🏛️</div>
            <div className="mr-logic-content">
              <h3>Admin Revenue Stream</h3>
              <p>Generated from <strong>Event Base Rates</strong>. As the platform owner, 100% of the event inventory pricing is allocated to your core treasury.</p>
              <div className="mr-logic-formula">Admin Profit = ∑(Confirmed Booking Base Rates)</div>
            </div>
          </div>

          <div className="mr-logic-divider">
            <div className="mr-plus-circle">+</div>
          </div>

          <div className="mr-logic-item vendor">
            <div className="mr-logic-icon">🛠️</div>
            <div className="mr-logic-content">
              <h3>Vendor Revenue Stream</h3>
              <p>Combined <strong>Marketplace Service Fees</strong>. This represents the total value generated by third-party merchants providing catering, decor, and extra services.</p>
              <div className="mr-logic-formula v">Vendor Profit = ∑(Add-on Service Charges)</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ManageReports;
