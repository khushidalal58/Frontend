import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TAB_ICONS = {
  Starters: "🥗",
  "Main Course": "🍛",
  Breads: "🫓",
  Desserts: "🍮",
  Beverages: "🥤",
};
const ALL_TABS = Object.keys(TAB_ICONS);

const PLACEHOLDER = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop";

const CateringMenu = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const cateringService = state?.cateringService || {};
  const bookingState = state?.bookingState || {};
  const personsCount = bookingState?.guests || 1;
  const vendorId = cateringService?.vendorId?._id || cateringService?.vendorId;

  const [allItems, setAllItems] = useState([]);   // all items from DB
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Starters");
  const [cart, setCart] = useState({});            // { itemId: qty }

  /* ── Fetch vendor's menu from backend ── */
  useEffect(() => {
    if (!vendorId) { setLoading(false); return; }
    fetch(`http://localhost:5001/api/menu/vendor/${vendorId}`)
      .then(r => r.json())
      .then(data => setAllItems(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [vendorId]);

  /* ── Cart helpers ── */
  const toggleItem = (id) =>
    setCart(p => ({ ...p, [id]: p[id] ? 0 : 1 }));

  const changeQty = (id, delta) =>
    setCart(p => ({ ...p, [id]: Math.max(0, (p[id] || 0) + delta) }));

  /* ── Items currently visible in active tab ── */
  const tabItems = allItems.filter(i => i.category === activeTab);

  /* ── Cart summary ── */
  const cartItems = Object.entries(cart)
    .filter(([, q]) => q > 0)
    .map(([id, qty]) => {
      const item = allItems.find(i => i._id === id);
      return item ? { ...item, qty } : null;
    })
    .filter(Boolean);

  const menuTotal = cartItems.reduce((s, i) => s + i.price * personsCount, 0);
  const grandTotal = menuTotal; // 🔥 Removed cateringBase (Base Price)

  /* ── Navigation ── */
  const handleConfirm = () => {
    navigate("/booking/step2", {
      state: {
        ...bookingState,
        returnedCateringService: {
          ...cateringService,
          price: grandTotal,
          menuItems: cartItems,
          menuTotal,
        },
      },
    });
  };

  const handleBack = () => navigate("/booking/step2", { state: bookingState });

  /* ── Tabs that have at least one item ── */
  const activeTabs = ALL_TABS.filter(t => allItems.some(i => i.category === t));

  const imgSrc = (item) =>
    item.image?.startsWith("/")
      ? `http://localhost:5001${item.image}`
      : (item.image || PLACEHOLDER);

  return (
    <div className="cm-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cm-root {
          min-height: 100vh; background: #f5f3ff;
          font-family: 'Plus Jakarta Sans', sans-serif; color: #1a1a2e;
        }

        /* HEADER */
        .cm-header {
          background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
          color: white; padding: 28px 40px;
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 200;
          box-shadow: 0 4px 30px rgba(124,58,237,0.3);
        }
        .cm-back-btn {
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);
          color: white; width: 40px; height: 40px; border-radius: 12px;
          font-weight: 700; font-size: 20px; cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); font-family: inherit;
        }
        .cm-back-btn:hover { 
          background: white; color: #7c3aed; 
          transform: translateX(-4px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
        }
        .cm-header-center h1 { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; text-align: center; }
        .cm-header-center p  { font-size: 13px; opacity: 0.8; text-align: center; margin-top: 4px; }
        .cm-cart-pill {
          background: rgba(255,255,255,0.15); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 16px; padding: 10px 18px; text-align: right; min-width: 130px;
        }
        .cm-cart-pill span { display: block; font-size: 11px; opacity: 0.75; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .cm-cart-pill strong { font-size: 18px; font-weight: 900; }

        /* VENDOR BANNER */
        .cm-vendor-bar {
          background: white; border-bottom: 1px solid #ede9fe;
          padding: 16px 40px; display: flex; align-items: center; gap: 16px;
        }
        .cm-vendor-icon { font-size: 32px; }
        .cm-vendor-info h3 { font-size: 16px; font-weight: 800; }
        .cm-vendor-info p  { font-size: 13px; color: #7c3aed; font-weight: 600; }
        .cm-base-price {
          margin-left: auto; background: #faf5ff;
          border: 1.5px solid #ddd6fe; padding: 10px 20px; border-radius: 14px; text-align: center;
        }
        .cm-base-price span { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #a78bfa; font-weight: 700; }
        .cm-base-price strong { font-size: 18px; font-weight: 900; color: #7c3aed; }

        /* BODY LAYOUT */
        .cm-body { display: flex; max-width: 1400px; margin: 0 auto; padding: 36px 40px 120px; }

        /* TABS */
        .cm-tabs {
          width: 220px; flex-shrink: 0; display: flex; flex-direction: column; gap: 6px;
          margin-right: 36px; position: sticky; top: 110px; align-self: flex-start;
        }
        .cm-tab {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 18px; border-radius: 16px; cursor: pointer;
          font-size: 14px; font-weight: 700; color: #64748b;
          border: 1.5px solid transparent;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .cm-tab:hover { background: white; color: #7c3aed; transform: translateX(4px); }
        .cm-tab.active {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: white; box-shadow: 0 8px 20px rgba(124,58,237,0.3);
        }
        .cm-tab-cnt {
          margin-left: auto; background: rgba(255,255,255,0.25);
          padding: 2px 8px; border-radius: 20px; font-size: 11px; font-weight: 800;
        }
        .cm-tab:not(.active) .cm-tab-cnt { background: #f1f5f9; color: #94a3b8; }

        /* MENU AREA */
        .cm-menu-area { flex: 1; }
        .cm-category-title {
          font-family: 'Playfair Display', serif; font-size: 28px; font-style: italic;
          margin-bottom: 24px;
        }
        .cm-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 22px; }

        /* DISH CARD */
        .cm-dish {
          background: white; border-radius: 22px; overflow: hidden;
          border: 1.5px solid #f1f5f9;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); position: relative;
        }
        .cm-dish:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(124,58,237,0.1); border-color: #ddd6fe; }
        .cm-dish.selected { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.15); }

        .cm-dish-img { height: 165px; width: 100%; object-fit: cover; transition: transform 0.5s; }
        .cm-dish:hover .cm-dish-img { transform: scale(1.07); }

        .cm-veg-dot {
          position: absolute; top: 12px; right: 12px;
          width: 22px; height: 22px; border-radius: 4px; border: 2px solid white;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 900; box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .cm-veg-dot.veg { background: #16a34a; color: white; }
        .cm-veg-dot.non { background: #dc2626; color: white; }
        .cm-veg-dot.both { background: #ca8a04; color: white; } /* Yellow for Both */

        .cm-dish-body { padding: 18px; }
        .cm-dish-name { font-size: 16px; font-weight: 800; margin-bottom: 6px; }
        .cm-dish-desc {
          font-size: 12px; color: #94a3b8; line-height: 1.5; margin-bottom: 16px;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .cm-dish-footer { display: flex; align-items: center; justify-content: space-between; }
        .cm-dish-price {
          font-size: 18px; font-weight: 900;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .cm-dish-price sub { font-size: 10px; -webkit-text-fill-color: #94a3b8; }

        .cm-add-btn {
          background: linear-gradient(135deg, #7c3aed, #ec4899); color: white; border: none;
          width: 36px; height: 36px; border-radius: 12px; font-size: 20px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; transition: all 0.3s; box-shadow: 0 4px 12px rgba(124,58,237,0.3);
        }
        .cm-add-btn:hover { transform: scale(1.15); }

        .cm-qty-ctrl { display: flex; align-items: center; gap: 10px; }
        .cm-qty-btn {
          width: 30px; height: 30px; border-radius: 10px;
          border: 1.5px solid #ddd6fe; background: white; color: #7c3aed;
          font-size: 18px; font-weight: 900; cursor: pointer;
          display: flex; align-items: center; justify-content: center; transition: all 0.2s;
        }
        .cm-qty-btn:hover { background: #7c3aed; color: white; }
        .cm-qty-num { font-size: 16px; font-weight: 900; color: #7c3aed; min-width: 20px; text-align: center; }

        /* EMPTY / LOADING */
        .cm-empty {
          padding: 60px; text-align: center; background: white;
          border-radius: 20px; border: 2px dashed #ddd6fe; color: #94a3b8;
          grid-column: 1 / -1; font-weight: 600;
        }
        .cm-loader { padding: 80px; text-align: center; color: #7c3aed; font-size: 16px; font-weight: 700; }

        /* CONFIRM BAR */
        .cm-confirm-bar {
          position: fixed; bottom: 0; left: 0; right: 0; background: white;
          border-top: 1.5px solid #ede9fe; padding: 18px 40px;
          display: flex; align-items: center; justify-content: space-between;
          z-index: 300; box-shadow: 0 -10px 40px rgba(124,58,237,0.1);
        }
        .cm-bar-summary { display: flex; flex-direction: column; gap: 2px; }
        .cm-bar-items   { font-size: 12px; color: #94a3b8; font-weight: 600; }
        .cm-bar-total   {
          font-size: 24px; font-weight: 900;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .cm-bar-note { font-size: 11px; color: #a78bfa; }
        .cm-confirm-btn {
          background: linear-gradient(135deg, #7c3aed, #ec4899); color: white; border: none;
          padding: 16px 40px; border-radius: 18px; font-family: inherit;
          font-size: 16px; font-weight: 800; cursor: pointer; transition: all 0.3s;
          box-shadow: 0 8px 24px rgba(124,58,237,0.35);
        }
        .cm-confirm-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(124,58,237,0.5); }
        .cm-skip-bar-btn {
          background: none; border: 1.5px dashed #cbd5e1; color: #94a3b8;
          padding: 14px 28px; border-radius: 14px; font-family: inherit;
          font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; margin-right: 16px;
        }
        .cm-skip-bar-btn:hover { border-color: #7c3aed; color: #7c3aed; }

        @media (max-width: 900px) {
          .cm-body { flex-direction: column; padding: 20px 16px 120px; }
          .cm-tabs { width: 100%; flex-direction: row; overflow-x: auto; position: static; margin-right: 0; margin-bottom: 24px; }
          .cm-header, .cm-confirm-bar { padding: 14px 20px; }
        }
      `}</style>

      {/* HEADER */}
      <header className="cm-header">
        <button className="cm-back-btn" onClick={handleBack}>← Back</button>
        <div className="cm-header-center">
          <h1>🍽️ Catering Menu</h1>
          <p>Select dishes for your event • Priced per person</p>
        </div>
        <div className="cm-cart-pill">
          <span>Cart Total</span>
          <strong>₹{menuTotal.toLocaleString()}</strong>
        </div>
      </header>

      {/* VENDOR BANNER */}
      <div className="cm-vendor-bar">
        <div className="cm-vendor-icon">🍴</div>
        <div className="cm-vendor-info">
          <h3>{cateringService.title || "Catering Service"}</h3>
          <p>By {cateringService.vendorId?.name || "Verified Caterer"} &nbsp;•&nbsp; Item-based pricing</p>
        </div>
      </div>

      {/* BODY */}
      {loading ? (
        <div className="cm-loader">🍴 Loading catering menu...</div>
      ) : (
        <div className="cm-body">
          {/* Sidebar tabs — only show categories that have items */}
          <aside className="cm-tabs">
            {(activeTabs.length ? activeTabs : ALL_TABS).map(tab => {
              const cnt = allItems.filter(i => i.category === tab).length;
              return (
                <div
                  key={tab}
                  className={`cm-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  <span style={{ fontSize: 20 }}>{TAB_ICONS[tab]}</span>
                  {tab}
                  {cnt > 0 && <span className="cm-tab-cnt">{cnt}</span>}
                </div>
              );
            })}
          </aside>

          {/* Menu grid */}
          <section className="cm-menu-area">
            <h2 className="cm-category-title">{TAB_ICONS[activeTab]} {activeTab}</h2>
            <div className="cm-grid">
              {tabItems.length === 0 ? (
                <div className="cm-empty">
                  <p style={{ fontSize: 36, marginBottom: 10 }}>🍽️</p>
                  <p>No dishes added in this category yet.</p>
                </div>
              ) : tabItems.map(item => {
                const qty = cart[item._id] || 0;
                return (
                  <div key={item._id} className={`cm-dish ${qty > 0 ? "selected" : ""}`}>
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      <img
                        src={imgSrc(item)}
                        alt={item.name}
                        className="cm-dish-img"
                        onError={e => e.target.src = PLACEHOLDER}
                      />
                      <div className={`cm-veg-dot ${item.foodType === "Veg" ? "veg" : item.foodType === "Non-Veg" ? "non" : "both"}`}>
                        {item.foodType === "Veg" ? "V" : item.foodType === "Non-Veg" ? "N" : "B"}
                      </div>
                    </div>

                    <div className="cm-dish-body">
                      <p className="cm-dish-name">{item.name}</p>
                      <p className="cm-dish-desc">{item.description || "Freshly prepared with premium ingredients."}</p>
                      <div className="cm-dish-footer">
                        <div className="cm-dish-price">
                          ₹{item.price}
                        </div>
                        {qty === 0 ? (
                          <button className="cm-add-btn" onClick={() => toggleItem(item._id)}>+</button>
                        ) : (
                          <button
                            className="cm-add-btn"
                            style={{ background: "#dc2626", transform: "rotate(45deg)" }}
                            onClick={() => toggleItem(item._id)}
                          >
                            +
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* FLOATING CONFIRM BAR */}
      <div className="cm-confirm-bar">
        <div className="cm-bar-summary">
          <span className="cm-bar-items">
            {cartItems.length > 0
              ? `${cartItems.length} dish(es) selected for ${personsCount} person(s)`
              : "No dishes selected yet — skip or choose above"}
          </span>
          <span className="cm-bar-total">₹{grandTotal.toLocaleString()}</span>
          <span className="cm-bar-note">Total for {personsCount} guests based on selected items</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button className="cm-skip-bar-btn" onClick={handleBack}>Skip Menu</button>
          <button className="cm-confirm-btn" onClick={handleConfirm}>
            ✅ Confirm Menu &amp; Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CateringMenu;
