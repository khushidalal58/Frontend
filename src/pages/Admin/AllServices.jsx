
import React, { useEffect, useState } from "react";
import { useToast, useConfirm } from "../../components/Toast";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const confirm = useConfirm();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/services", {
          credentials: "include",
        });
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="as-root">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

                .as-root {
                    font-family: 'Sora', sans-serif;
                    animation: as-fadeIn 0.6s ease;
                }

                @keyframes as-fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .as-hdr {
                    margin-bottom: 40px;
                }

                .as-hdr h1 {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 36px;
                    font-weight: 800;
                    color: #1e1b4b;
                    letter-spacing: -1px;
                    margin-bottom: 8px;
                }

                .as-hdr p {
                    color: #64748b;
                    font-size: 16px;
                }

                .as-card-container {
                    background: #ffffff;
                    border-radius: 32px;
                    border: 1.5px solid #f1f5f9;
                    overflow: hidden;
                    box-shadow: 0 10px 40px rgba(30, 27, 75, 0.04);
                }

                .as-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .as-table th {
                    text-align: left;
                    padding: 24px;
                    background: #f8fafc;
                    border-bottom: 1.5px solid #f1f5f9;
                    color: #64748b;
                    font-size: 12px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .as-table td {
                    padding: 24px;
                    border-bottom: 1.5px solid #f8fafc;
                    color: #1e293b;
                    font-size: 14px;
                    font-weight: 500;
                }

                .as-table tr:hover td {
                    background: #fdfcff;
                }

                .as-category {
                    padding: 6px 12px;
                    border-radius: 8px;
                    font-size: 10px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    background: #f1f5f9;
                    color: #475569;
                }

                .as-price {
                    font-weight: 800;
                    color: #4f46e5;
                }

                .as-vendor-info {
                    display: flex;
                    flex-direction: column;
                }

                .as-v-name {
                    font-weight: 700;
                    color: #1e1b4b;
                }

                .as-v-email {
                    font-size: 12px;
                    color: #94a3b8;
                }

                .as-loading {
                    padding: 60px;
                    text-align: center;
                    color: #94a3b8;
                }
            `}</style>

      <header className="as-hdr">
        <h1>Service Marketplace</h1>
        <p>Comprehensive catalog of all vendor-provided solutions.</p>
      </header>

      <div className="as-card-container">
        {loading ? (
          <div className="as-loading">Aggregating service data...</div>
        ) : services.length === 0 ? (
          <div className="as-loading">No services discovered in the marketplace.</div>
        ) : (
          <table className="as-table">
            <thead>
              <tr>
                <th>Service Bundle</th>
                <th>Classification</th>
                <th>Investment</th>
                <th>Merchant Partner</th>
                <th>Communication</th>
                <th>Tactical Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s._id}>
                  <td>
                    <div className="as-v-name">{s.title}</div>
                  </td>
                  <td>
                    <span className="as-category">{s.category}</span>
                  </td>
                  <td>
                    <div className="as-price">₹{s.price?.toLocaleString()}</div>
                  </td>
                  <td>
                    <div className="as-v-name">{s.vendorId?.name || "Independent"}</div>
                  </td>
                  <td>
                    <div className="as-v-email">{s.vendorId?.email || "N/A"}</div>
                  </td>
                  <td>
                    <button
                      className="as-view-btn"
                      style={{
                        padding: "8px 16px",
                        background: "white",
                        border: "1.5px solid #fee2e2",
                        color: "#ef4444",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: "800",
                        cursor: "pointer",
                        transition: "0.3s"
                      }}
                      onMouseOver={e => { e.target.style.background = '#ef4444'; e.target.style.color = 'white'; }}
                      onMouseOut={e => { e.target.style.background = 'white'; e.target.style.color = '#ef4444'; }}
                      onClick={async () => {
                        const ok = await confirm(`Permanently remove service "${s.title}"?`);
                        if (ok) {
                          try {
                            const res = await fetch(`http://localhost:5001/api/services/${s._id}`, {
                              method: 'DELETE',
                              credentials: 'include'
                            });
                            const result = await res.json();
                            if (result.success) {
                              toast.success("Service removed successfully");
                              setServices(services.filter(srv => srv._id !== s._id));
                            } else {
                              toast.error(result.message || "Failed to remove service");
                            }
                          } catch (error) {
                            console.error("Delete error:", error);
                            toast.error("An error occurred while removing the service.");
                          }
                        }
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllServices;

