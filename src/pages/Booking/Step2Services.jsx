import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import step2Img from "../../assets/step2.jpg";

const isCatering = (service) =>
  (service.category || "").toLowerCase().includes("catering") ||
  (service.title || "").toLowerCase().includes("catering") ||
  (service.title || "").toLowerCase().includes("food");

const Step2Services = () => {
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState([]);
  const [confirmedCatering, setConfirmedCatering] = useState(null); // catering returned from menu page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      navigate("/users/dashboard/my-events");
      return;
    }

    // ✅ Restore confirmed catering service when coming back from CateringMenu
    if (state.returnedCateringService) {
      setConfirmedCatering(state.returnedCateringService);
    }

    const loadServices = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/services", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Server error");
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("❌ Failed to load premium services");
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, [state, navigate]);

  // For non-catering services: toggle select
  const toggleService = (service) => {
    setSelected((prev) =>
      prev.find((s) => s._id === service._id)
        ? prev.filter((s) => s._id !== service._id)
        : [...prev, service]
    );
  };

  // Smart click: catering → open menu page, others → toggle
  const handleServiceClick = (service) => {
    if (isCatering(service)) {
      navigate("/booking/catering-menu", {
        state: {
          cateringService: service,
          bookingState: state,
        },
      });
    } else {
      toggleService(service);
    }
  };

  const cateringTotal = confirmedCatering ? Number(confirmedCatering.price || 0) : 0;
  const servicesTotal = selected.reduce((sum, s) => sum + Number(s.price || 0), 0) + cateringTotal;
  const totalWithServices = (state?.baseAmount || 0) + servicesTotal;

  const handleNext = () => {
    const allServices = confirmedCatering
      ? [...selected, confirmedCatering]
      : selected;
    navigate("/booking/step3", {
      state: {
        ...state,
        selectedServices: allServices,
        servicesAmount: servicesTotal,
        totalAmount: totalWithServices,
      },
    });
  };

  return (
    <div className="s2-container">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Sora:wght@300;400;600;700&display=swap');

                .s2-container {
                    min-height: 100vh;
                    background: linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)),
                                url(${step2Img});
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Sora', sans-serif;
                    padding: 60px 20px;
                }

                .s2-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    border-radius: 40px;
                    padding: 48px;
                    width: 100%;
                    max-width: 1200px;
                    box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.4);
                    position: relative;
                }

                .s2-header {
                    text-align: center;
                    margin-bottom: 48px;
                }

                .s2-progress {
                    display: flex;
                    gap: 8px;
                    justify-content: center;
                    margin-bottom: 24px;
                }

                .progress-dot {
                    width: 32px;
                    height: 6px;
                    border-radius: 10px;
                    background: #e2e8f0;
                }

                .progress-dot.active { background: #4f46e5; }
                .progress-dot.filled { background: #10b981; width: 32px; }
                .progress-dot.current { width: 64px; background: #4f46e5; }

                .s2-badge {
                    display: inline-flex;
                    padding: 8px 16px;
                    background: #f0f9ff;
                    color: #0ea5e9;
                    border-radius: 100px;
                    font-size: 12px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin-bottom: 20px;
                }

                .s2-back-btn {
                    position: absolute;
                    top: 40px;
                    left: 40px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    color: #1e293b;
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    z-index: 10;
                }

                .s2-back-btn:hover { background: #1e293b; color: white; transform: scale(1.1); }

                .s2-title {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 40px;
                    font-weight: 800;
                    color: #0f172a;
                    letter-spacing: -1.5px;
                    margin-bottom: 12px;
                }

                .s2-subtitle {
                    color: #475569;
                    font-size: 16px;
                    max-width: 600px;
                    margin: 0 auto 24px;
                }

                .s2-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 24px;
                    margin-bottom: 48px;
                }

                .service-item {
                    background: white;
                    border: 2px solid #f1f5f9;
                    border-radius: 28px;
                    padding: 0;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    position: relative;
                }

                .service-item:hover {
                    transform: translateY(-8px);
                    border-color: #4f46e5;
                    box-shadow: 0 20px 40px -10px rgba(79, 70, 229, 0.1);
                }

                .service-item.active {
                    border-color: #4f46e5;
                    background: #f5f3ff;
                }

                .service-img-wrap {
                    height: 220px;
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                }

                .service-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }

                .service-item:hover .service-img { transform: scale(1.1); }

                .service-content { padding: 24px; flex-grow: 1; display: flex; flex-direction: column; }

                .service-title {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 20px;
                    font-weight: 800;
                    color: #1e1b4b;
                    margin-bottom: 6px;
                }

                .service-vendor {
                    font-size: 11px;
                    font-weight: 700;
                    color: #4f46e5;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 12px;
                }

                .service-desc {
                    font-size: 14px;
                    color: #64748b;
                    line-height: 1.6;
                    margin-bottom: 24px;
                }

                .service-footer {
                    margin-top: auto;
                    padding-top: 16px;
                    border-top: 1px solid #f1f5f9;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .service-price {
                    font-size: 20px;
                    font-weight: 800;
                    color: #1e1b4b;
                }

                .service-select-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    background: #f1f5f9;
                    color: #64748b;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    transition: all 0.3s;
                }

                .active .service-select-btn {
                    background: #10b981;
                    color: white;
                }

                .s2-summary-bar {
                    background: #1e1b4b;
                    border-radius: 30px;
                    padding: 32px 48px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: white;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.2);
                    position: sticky;
                    bottom: 0;
                    z-index: 100;
                }

                .summary-total {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 36px;
                    font-weight: 800;
                }

                .s2-next-btn {
                    padding: 20px 48px;
                    background: white;
                    color: #1e1b4b;
                    border: none;
                    border-radius: 18px;
                    font-family: inherit;
                    font-size: 16px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.4s;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .s2-next-btn:hover {
                    transform: scale(1.05) translateX(5px);
                }

                .s2-skip-btn {
                    background: rgba(255, 255, 255, 0.8);
                    border: 1.5px dashed #cbd5e1;
                    padding: 10px 24px;
                    border-radius: 100px;
                    font-size: 13px;
                    font-weight: 700;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .s2-skip-btn:hover { border-color: #4f46e5; color: #4f46e5; background: white; }

                @media (max-width: 768px) {
                    .s2-summary-bar { flex-direction: column; gap: 24px; text-align: center; padding: 24px; }
                    .s2-next-btn { width: 100%; justify-content: center; }
                    .s2-title { font-size: 30px; }
                }
            `}</style>

      <div className="s2-card">
        <button className="s2-back-btn" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </button>

        <div className="s2-header">
          <div className="s2-progress">
            <div className="progress-dot filled"></div>
            <div className="progress-dot current"></div>
            <div className="progress-dot"></div>
            <div className="progress-dot"></div>
          </div>
          <div className="s2-badge">Step 2 • Enhance Your Event</div>
          <h1 className="s2-title">Curated Premium Services</h1>
          <p className="s2-subtitle">Elevate your celebration with our hand-picked selection of verified expert vendors and exclusive services.</p>
          <button className="s2-skip-btn" onClick={handleNext}>
            ⏭️ Skip to summary — I'll add services later
          </button>
        </div>

        <div className="s2-grid">
          {loading ? (
            <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '60px' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>✨</div>
              <p style={{ fontWeight: 700, color: '#64748b' }}>Discovering exclusive services...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '60px' }}>
              <p style={{ color: '#ef4444' }}>{error}</p>
            </div>
          ) : (
            services.map((service) => {
              const isChosen = selected.find(s => s._id === service._id);
              const isCat = isCatering(service);
              const catChosen = isCat && confirmedCatering?._id === service._id;
              return (
                <div
                  key={service._id}
                  className={`service-item ${isChosen || catChosen ? "active" : ""}`}
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="service-img-wrap">
                    <img
                      className="service-img"
                      src={service.image && service.image.startsWith('/') ? `http://localhost:5001${service.image}` : (service.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop")}
                      alt={service.title}
                      onError={(e) => e.target.src = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop"}
                    />
                    {isCat && (
                      <div style={{
                        position: "absolute", top: 16, right: 16,
                        background: catChosen ? "#10b981" : "white",
                        color: catChosen ? "white" : "#4f46e5",
                        padding: "8px 16px", borderRadius: "12px",
                        fontSize: "11px", fontWeight: 800,
                        boxShadow: "0 8px 20px rgba(0,0,0,0.1)", zIndex: 10
                      }}>
                        {catChosen ? "✅ MENU SELECTED" : "🍽️ VIEW MENU"}
                      </div>
                    )}
                  </div>
                  <div className="service-content">
                    <div className="service-title">{service.title}</div>
                    <div className="service-vendor">by {service.vendorId?.name || "Verified Expert"}</div>
                    <p className="service-desc">
                      {isCat
                        ? (catChosen ? `Premium catering selected with ${confirmedCatering.menuItems?.length || 0} dishes.` : "Explore a world of flavors with our customizable premium catering menus.")
                        : (service.description || "High-quality professional service to make your event truly unforgettable.")}
                    </p>
                    <div className="service-footer">
                      <div className="service-price">
                        {isCat ? "Item Based" : `₹${service.price?.toLocaleString()}`}
                      </div>
                      <div className="service-select-btn">
                        {isChosen || catChosen ? "✓" : "+"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="s2-summary-bar">
          <div className="summary-info">
            <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', fontWeight: 700 }}>Total Estimate</div>
            <div className="summary-total">₹{totalWithServices.toLocaleString()}</div>
          </div>
          <button className="s2-next-btn" onClick={handleNext}>
            {(selected.length + (confirmedCatering ? 1 : 0)) > 0 ? 'Review Final Summary' : 'Proceed to Summary'} <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2Services;
