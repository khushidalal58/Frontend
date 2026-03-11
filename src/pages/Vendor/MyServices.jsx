import React, { useEffect, useState } from "react";
import { useToast, useConfirm } from "../../components/Toast";

const MyServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const confirm = useConfirm();

  const fetchMyServices = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/services/my", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setServices(data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyServices();
  }, []);

  const handleDelete = async (id) => {
    const ok = await confirm("Are you sure you want to remove this service?");
    if (!ok) return;
    try {
      const res = await fetch(`http://localhost:5001/api/services/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Service removed successfully");
        fetchMyServices();
      } else {
        toast.error("Failed to remove service");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Server error — please try again.");
    }
  };

  return (
    <div className="ms-container">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Sora:wght@400;600;700&display=swap');

                .ms-container {
                    animation: ms-fadeIn 0.6s ease;
                }

                @keyframes ms-fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .ms-header {
                    margin-bottom: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .ms-header h1 {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 32px;
                    font-weight: 800;
                    color: #1e1b4b;
                    letter-spacing: -1px;
                }

                .ms-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 28px;
                }

                .ms-card {
                    background: #ffffff;
                    border: 1.5px solid #f1f5f9;
                    border-radius: 28px;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                }

                .ms-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(30, 27, 75, 0.06);
                    border-color: #e2e8f0;
                }

                .ms-img-wrap {
                    height: 180px;
                    background: #f8fafc;
                    position: relative;
                }

                .ms-img-wrap img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .ms-badge {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(8px);
                    padding: 6px 14px;
                    border-radius: 12px;
                    font-size: 11px;
                    font-weight: 800;
                    color: #4f46e5;
                    text-transform: uppercase;
                }

                .ms-body {
                    padding: 24px;
                }

                .ms-title {
                    font-size: 19px;
                    font-weight: 800;
                    color: #1e1b4b;
                    margin-bottom: 8px;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                }

                .ms-desc {
                    font-size: 13px;
                    color: #64748b;
                    line-height: 1.6;
                    margin-bottom: 20px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .ms-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 16px;
                    border-top: 1.5px solid #f8fafc;
                }

                .ms-price-lbl { font-size: 10px; color: #94a3b8; font-weight: 700; text-transform: uppercase; }
                .ms-price { font-size: 20px; font-weight: 800; color: #1e1b4b; }

                .ms-delete-btn {
                    background: #fff1f2;
                    color: #ef4444;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                }

                .ms-delete-btn:hover { background: #ef4444; color: white; }

                .ms-loader { text-align: center; padding: 100px; color: #64748b; font-weight: 600; }
                .ms-empty {
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 80px 40px;
                    background: #f8fafc;
                    border-radius: 32px;
                    border: 2px dashed #e2e8f0;
                    color: #64748b;
                }
            `}</style>

      <header className="ms-header">
        <h1>My Services</h1>
      </header>

      {loading ? (
        <div className="ms-loader">Fetching your offering catalog...</div>
      ) : (
        <div className="ms-grid">
          {services.map((s) => (
            <div key={s._id} className="ms-card">
              <div className="ms-img-wrap">
                <img
                  src={s.image?.startsWith('/') ? `http://localhost:5001${s.image}` : (s.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30")}
                  alt={s.title}
                  onError={(e) => e.target.src = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"}
                />
                <div className="ms-badge">{s.category}</div>
              </div>
              <div className="ms-body">
                <h3 className="ms-title">{s.title}</h3>
                <p className="ms-desc">{s.description}</p>
                <div className="ms-footer">
                  <div className="ms-price-box">
                    <div className="ms-price-lbl">Starting Price</div>
                    <div className="ms-price">₹{s.price.toLocaleString()}</div>
                  </div>
                  <button className="ms-delete-btn" onClick={() => handleDelete(s._id)}>🗑️</button>
                </div>
              </div>
            </div>
          ))}
          {services.length === 0 && (
            <div className="ms-empty">
              <p>You haven't registered any services yet. Start growing your business today!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyServices;
