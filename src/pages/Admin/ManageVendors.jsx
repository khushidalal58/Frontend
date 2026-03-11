// const ManageVendors = () => (
//   <div style={styles.card}>
//     <h2>All Vendors</h2>
//     <p>Total vendors: 45</p>
//   </div>
// );
// const styles={card:{background:"#fff",padding:35,borderRadius:20,boxShadow:"0 20px 40px rgba(0,0,0,.08)"}}
// export default ManageVendors;

import React, { useState, useEffect } from "react";
import { useToast, useConfirm } from "../../components/Toast";

const ManageVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const confirm = useConfirm();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/users", {
          credentials: "include",
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          // Filter for vendors
          const vendorList = data.filter(u => u.role === "vendor");
          setVendors(vendorList);
        } else {
          setVendors([]);
        }
      } catch (error) {
        console.error("Fetch vendors error:", error);
        setVendors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  return (
    <div className="mv-root">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

                .mv-root {
                    font-family: 'Sora', sans-serif;
                    animation: mv-fadeIn 0.6s ease;
                }

                @keyframes mv-fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .mv-hdr {
                    margin-bottom: 40px;
                }

                .mv-hdr h1 {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 36px;
                    font-weight: 800;
                    color: #1e1b4b;
                    letter-spacing: -1px;
                    margin-bottom: 8px;
                }

                .mv-hdr p {
                    color: #64748b;
                    font-size: 16px;
                }

                .mv-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 28px;
                }

                .mv-card {
                    background: #ffffff;
                    border-radius: 28px;
                    border: 1.5px solid #f1f5f9;
                    padding: 32px;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                }

                .mv-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 24px 48px rgba(30, 27, 75, 0.08);
                    border-color: #e2e8f0;
                }

                .mv-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 6px;
                    background: linear-gradient(90deg, #4f46e5, #7c3aed);
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .mv-card:hover::before { opacity: 1; }

                .mv-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 24px;
                }

                .mv-avatar {
                    width: 64px;
                    height: 64px;
                    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
                    color: white;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    font-weight: 800;
                    box-shadow: 0 10px 20px rgba(30, 27, 75, 0.15);
                }

                .mv-badge {
                    padding: 6px 12px;
                    background: #f0fdf4;
                    color: #16a34a;
                    border-radius: 10px;
                    font-size: 10px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .mv-info h3 {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 20px;
                    font-weight: 800;
                    color: #1e1b4b;
                    margin-bottom: 4px;
                }

                .mv-info p {
                    color: #64748b;
                    font-size: 14px;
                    margin-bottom: 20px;
                }

                .mv-stats {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                    padding-top: 20px;
                    border-top: 1.5px solid #f8fafc;
                }

                .stat-box {
                    text-align: center;
                }

                .stat-val {
                    display: block;
                    font-size: 18px;
                    font-weight: 800;
                    color: #1e1b4b;
                }

                .stat-lbl {
                    font-size: 11px;
                    color: #94a3b8;
                    text-transform: uppercase;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                }

                .mv-action {
                    width: 100%;
                    margin-top: 24px;
                    padding: 12px;
                    background: #f8fafc;
                    border: 1.5px solid #f1f5f9;
                    border-radius: 14px;
                    color: #1e1b4b;
                    font-weight: 700;
                    font-size: 13px;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .mv-action:hover {
                    background: #1e1b4b;
                    color: white;
                    border-color: #1e1b4b;
                }

                .mv-loading {
                    grid-column: 1 / -1;
                    padding: 60px;
                    text-align: center;
                    color: #94a3b8;
                }
            `}</style>

      <header className="mv-hdr">
        <h1>Merchant Directory</h1>
        <p>Oversee and collaborate with our professional service providers.</p>
      </header>

      <div className="mv-grid">
        {loading ? (
          <div className="mv-loading">Identifying platform partners...</div>
        ) : vendors.length === 0 ? (
          <div className="mv-loading">No professional vendors currently registered.</div>
        ) : (
          vendors.map((vendor) => (
            <div key={vendor._id} className="mv-card">
              <div className="mv-top">
                <div className="mv-avatar">
                  {(vendor.name?.[0] || 'V').toUpperCase()}
                </div>
                <span className="mv-badge">Verified</span>
              </div>
              <div className="mv-info">
                <h3>{vendor.name}</h3>
                <p>{vendor.email}</p>
              </div>
              <div className="mv-stats">
                <div className="stat-box">
                  <span className="stat-val">Partner</span>
                  <span className="stat-lbl">Status</span>
                </div>
                <div className="stat-box">
                  <span className="stat-val">Active</span>
                  <span className="stat-lbl">Inventory</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button className="mv-action" style={{ margin: 0 }}>View Merchant</button>
                <button
                  className="mv-action"
                  style={{
                    margin: 0,
                    background: '#fee2e2',
                    color: '#991b1b',
                    borderColor: '#fecaca'
                  }}
                  onClick={async () => {
                    const ok = await confirm(`Are you sure you want to remove ${vendor.name}? All their services, events, and data will be permanently deleted.`);
                    if (ok) {
                      try {
                        const res = await fetch(`http://localhost:5001/api/users/${vendor._id}`, {
                          method: 'DELETE',
                          credentials: 'include'
                        });
                        const result = await res.json();
                        if (result.success) {
                          toast.success("Vendor removed successfully");
                          setVendors(vendors.filter(v => v._id !== vendor._id));
                        } else {
                          toast.error(result.error ? `Failed to remove vendor: ${result.error}` : (result.message || "Failed to remove vendor"));
                        }
                      } catch (error) {
                        console.error("Delete error:", error);
                        toast.error("An error occurred while removing the vendor.");
                      }
                    }
                  }}
                >
                  Remove Merchant
                </button>
              </div>
            </div>

          ))
        )}
      </div>
    </div>
  );
};

export default ManageVendors;

