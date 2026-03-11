import React, { useEffect, useState } from "react";
import { useToast, useConfirm } from "../../components/Toast";

const ManageMenu = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: "", description: "", price: "", category: "Starters", foodType: "Veg",
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [saving, setSaving] = useState(false);
    const toast = useToast();
    const confirm = useConfirm();

    const categories = ["Starters", "Main Course", "Breads", "Desserts", "Beverages"];

    const fetchItems = async () => {
        try {
            const res = await fetch("http://localhost:5001/api/menu/my", { credentials: "include" });
            const data = await res.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchItems(); }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(file ? URL.createObjectURL(file) : null);
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleAdd = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, v));
            if (image) fd.append("image", image);

            const res = await fetch("http://localhost:5001/api/menu/add", {
                method: "POST", credentials: "include", body: fd,
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Menu item added!");
                setForm({ name: "", description: "", price: "", category: "Starters", foodType: "Veg" });
                setImage(null); setPreview(null);
                fetchItems();
            } else {
                toast.error(data.message || "Failed to add item");
            }
        } catch (err) {
            toast.error("Server error — please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleToggle = async (id, current) => {
        try {
            await fetch(`http://localhost:5001/api/menu/${id}`, {
                method: "PUT", credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isAvailable: !current }),
            });
            toast.success(`Item marked as ${!current ? 'available' : 'unavailable'}`);
            fetchItems();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        const ok = await confirm("Remove this menu item?");
        if (!ok) return;
        try {
            await fetch(`http://localhost:5001/api/menu/${id}`, {
                method: "DELETE", credentials: "include",
            });
            toast.success("Menu item removed");
            fetchItems();
        } catch (err) {
            console.error(err);
            toast.error("Failed to remove item");
        }
    };

    // Group items by category
    const grouped = categories.reduce((acc, cat) => {
        const catItems = items.filter(i => i.category === cat);
        if (catItems.length) acc[cat] = catItems;
        return acc;
    }, {});

    return (
        <div className="mm-root">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        .mm-root { font-family: 'Plus Jakarta Sans', sans-serif; color: #1a1a2e; animation: mm-in 0.5s ease; }
        @keyframes mm-in { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

        .mm-h1 { font-size: 30px; font-weight: 900; letter-spacing: -1px; margin-bottom: 6px; }
        .mm-sub { font-size: 14px; color: #64748b; margin-bottom: 36px; }

        /* ADD FORM */
        .mm-form-card {
          background: white; border-radius: 24px; border: 1.5px solid #ede9fe;
          padding: 32px; margin-bottom: 40px;
          box-shadow: 0 8px 30px rgba(124,58,237,0.06);
        }
        .mm-form-title { font-size: 18px; font-weight: 800; margin-bottom: 24px; color: #7c3aed; }

        .mm-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .mm-field { display: flex; flex-direction: column; gap: 6px; }
        .mm-field.full { grid-column: 1 / -1; }

        .mm-label { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }

        .mm-input, .mm-select, .mm-textarea {
          padding: 12px 16px; border: 1.5px solid #e2e8f0; border-radius: 12px;
          font-family: inherit; font-size: 14px; font-weight: 600; outline: none;
          transition: border 0.2s, box-shadow 0.2s; color: #1a1a2e;
        }
        .mm-input:focus, .mm-select:focus, .mm-textarea:focus {
          border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
        }
        .mm-textarea { resize: vertical; min-height: 80px; }

        .mm-radio-row { display: flex; gap: 14px; }
        .mm-radio-label {
          display: flex; align-items: center; gap: 8px; cursor: pointer;
          padding: 10px 18px; border-radius: 12px; border: 1.5px solid #e2e8f0;
          font-size: 14px; font-weight: 700; transition: all 0.2s;
        }
        .mm-radio-label:has(input:checked) { border-color: #7c3aed; background: #faf5ff; color: #7c3aed; }
        .mm-radio-label input { display: none; }

        .mm-img-area {
          border: 2px dashed #ddd6fe; border-radius: 16px; padding: 20px; text-align: center;
          cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden;
        }
        .mm-img-area:hover { border-color: #7c3aed; background: #faf5ff; }
        .mm-img-area input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
        .mm-img-preview { width: 100%; height: 120px; object-fit: cover; border-radius: 10px; }

        .mm-submit-btn {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: white; border: none; padding: 14px 36px; border-radius: 14px;
          font-family: inherit; font-size: 15px; font-weight: 800; cursor: pointer;
          transition: all 0.3s; box-shadow: 0 6px 20px rgba(124,58,237,0.3);
          margin-top: 8px;
        }
        .mm-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(124,58,237,0.4); }
        .mm-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .mm-msg { margin-top: 12px; font-size: 14px; font-weight: 700; color: #7c3aed; }

        /* ITEMS DISPLAY */
        .mm-cat-section { margin-bottom: 36px; }
        .mm-cat-title {
          font-size: 16px; font-weight: 800; color: #1a1a2e; margin-bottom: 16px;
          display: flex; align-items: center; gap: 10px;
        }
        .mm-cat-title::after { content:''; flex:1; height:1px; background: #ede9fe; }

        .mm-items-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px; }

        .mm-item-card {
          background: white; border: 1.5px solid #f1f5f9; border-radius: 20px;
          overflow: hidden; transition: all 0.3s;
        }
        .mm-item-card:hover { box-shadow: 0 10px 30px rgba(124,58,237,0.1); transform: translateY(-4px); border-color: #ddd6fe; }
        .mm-item-img { width: 100%; height: 140px; object-fit: cover; background: #f8f8f8; }

        .mm-item-body { padding: 16px; }
        .mm-item-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; }
        .mm-item-name { font-size: 15px; font-weight: 800; }
        .mm-veg-badge {
          font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 6px;
          background: #dcfce7; color: #16a34a;
        }
        .mm-veg-badge.non { background: #fee2e2; color: #dc2626; }
        .mm-veg-badge.both { background: #fefce8; color: #ca8a04; }

        .mm-item-desc { font-size: 12px; color: #94a3b8; line-height: 1.5; margin-bottom: 14px;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        .mm-item-footer { display: flex; justify-content: space-between; align-items: center; }
        .mm-item-price { font-size: 18px; font-weight: 900; color: #7c3aed; }

        .mm-action-row { display: flex; gap: 8px; }
        .mm-toggle-btn {
          padding: 6px 14px; border-radius: 10px; font-family: inherit; font-size: 12px; font-weight: 700;
          border: 1.5px solid; cursor: pointer; transition: all 0.2s;
        }
        .mm-toggle-btn.avail { border-color: #16a34a; color: #16a34a; background: #dcfce7; }
        .mm-toggle-btn.avail:hover { background: #16a34a; color: white; }
        .mm-toggle-btn.unavail { border-color: #94a3b8; color: #94a3b8; background: #f1f5f9; }
        .mm-del-btn {
          width: 34px; height: 34px; border-radius: 10px; border: none;
          background: #fee2e2; color: #dc2626; cursor: pointer; font-size: 14px;
          display: flex; align-items: center; justify-content: center; transition: all 0.2s;
        }
        .mm-del-btn:hover { background: #dc2626; color: white; }

        .mm-empty {
          padding: 60px; text-align: center; background: #faf5ff;
          border-radius: 20px; border: 2px dashed #ddd6fe; color: #94a3b8;
          font-weight: 600;
        }
        .mm-loader { padding: 60px; text-align: center; color: #7c3aed; font-weight: 700; }
      `}</style>

            <h1 className="mm-h1">🍽️ Manage Catering Menu</h1>
            <p className="mm-sub">Add dishes to your menu. Users will see these when selecting your catering service during booking.</p>

            {/* ── ADD ITEM FORM ── */}
            <div className="mm-form-card">
                <p className="mm-form-title">➕ Add New Dish</p>
                <form onSubmit={handleAdd}>
                    <div className="mm-form-grid">

                        <div className="mm-field">
                            <label className="mm-label">Dish Name *</label>
                            <input className="mm-input" name="name" value={form.name}
                                onChange={handleChange} placeholder="e.g. Paneer Tikka" required />
                        </div>

                        <div className="mm-field">
                            <label className="mm-label">Price per Person (₹) *</label>
                            <input className="mm-input" name="price" type="number" min="0"
                                value={form.price} onChange={handleChange} placeholder="e.g. 150" required />
                        </div>

                        <div className="mm-field">
                            <label className="mm-label">Category *</label>
                            <select className="mm-select" name="category" value={form.category} onChange={handleChange}>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="mm-field">
                            <label className="mm-label">Type</label>
                            <div className="mm-radio-row">
                                <label className="mm-radio-label">
                                    <input type="radio" name="foodType" value="Veg"
                                        checked={form.foodType === "Veg"} onChange={handleChange} />
                                    🟢 Veg
                                </label>
                                <label className="mm-radio-label">
                                    <input type="radio" name="foodType" value="Non-Veg"
                                        checked={form.foodType === "Non-Veg"} onChange={handleChange} />
                                    🔴 Non-Veg
                                </label>
                                <label className="mm-radio-label">
                                    <input type="radio" name="foodType" value="Both"
                                        checked={form.foodType === "Both"} onChange={handleChange} />
                                    🟡 Both
                                </label>
                            </div>
                        </div>

                        <div className="mm-field full">
                            <label className="mm-label">Description</label>
                            <textarea className="mm-textarea" name="description" value={form.description}
                                onChange={handleChange} placeholder="Describe the dish..." />
                        </div>

                        <div className="mm-field full">
                            <label className="mm-label">Photo</label>
                            <div className="mm-img-area">
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                                {preview
                                    ? <img src={preview} alt="preview" className="mm-img-preview" />
                                    : <p style={{ color: "#a78bfa", fontWeight: 600, fontSize: 14 }}>
                                        📷 Click or drag to upload a dish photo
                                    </p>
                                }
                            </div>
                        </div>

                    </div>

                    <button type="submit" className="mm-submit-btn" disabled={saving}>
                        {saving ? "Adding..." : "Add to Menu"}
                    </button>
                </form>
            </div>

            {/* ── ITEM LIST ── */}
            {loading ? (
                <div className="mm-loader">Loading your menu...</div>
            ) : items.length === 0 ? (
                <div className="mm-empty">
                    <p style={{ fontSize: 40, marginBottom: 12 }}>🍴</p>
                    <p>No menu items yet. Add your first dish above!</p>
                </div>
            ) : (
                Object.entries(grouped).map(([cat, catItems]) => (
                    <div key={cat} className="mm-cat-section">
                        <div className="mm-cat-title">{cat}</div>
                        <div className="mm-items-grid">
                            {catItems.map(item => (
                                <div key={item._id} className="mm-item-card">
                                    <img
                                        className="mm-item-img"
                                        src={item.image?.startsWith("/") ? `http://localhost:5001${item.image}` : (item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop")}
                                        alt={item.name}
                                        onError={e => e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop"}
                                    />
                                    <div className="mm-item-body">
                                        <div className="mm-item-row">
                                            <span className="mm-item-name">{item.name}</span>
                                            <span className={`mm-veg-badge ${item.foodType === "Non-Veg" ? "non" : item.foodType === "Both" ? "both" : ""}`}>{item.foodType?.toUpperCase()}</span>
                                        </div>
                                        <p className="mm-item-desc">{item.description || "—"}</p>
                                        <div className="mm-item-footer">
                                            <span className="mm-item-price">₹{item.price}/person</span>
                                            <div className="mm-action-row">
                                                <button
                                                    className={`mm-toggle-btn ${item.isAvailable ? "avail" : "unavail"}`}
                                                    onClick={() => handleToggle(item._id, item.isAvailable)}
                                                >
                                                    {item.isAvailable ? "✓ Available" : "Unavailable"}
                                                </button>
                                                <button className="mm-del-btn" onClick={() => handleDelete(item._id)}>🗑</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ManageMenu;
