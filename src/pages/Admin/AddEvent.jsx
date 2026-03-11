import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/Toast";

const AddEvent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({
    title: "",
    category: "Social & Personal",
    price: "",
    description: "",
    requirements: "Standard service requirements",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || (user.role !== "admin" && user.role !== "vendor")) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.warning("File size exceeds 5MB limit");
        return;
      }
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      toast.warning("Please upload an event banner image");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("requirements", form.requirements);
    formData.append("image", imageFile);

    try {
      const res = await fetch("http://localhost:5001/api/events/create", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      toast.success("Event Template Submitted Successfully");
      if (user.role === "admin") navigate("/admin/events");
      else navigate("/vendor/my-events");

    } catch (err) {
      console.error("Add Event Error:", err);
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user || (user.role !== "admin" && user.role !== "vendor")) return null;

  return (
    <div className="ae-root">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

                .ae-root {
                    font-family: 'Sora', sans-serif;
                    animation: ae-fadeIn 0.6s ease;
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 20px;
                }

                @keyframes ae-fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .ae-hdr {
                    text-align: center;
                    margin-bottom: 50px;
                }

                .ae-hdr h1 {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 42px;
                    font-weight: 800;
                    color: #1e1b4b;
                    letter-spacing: -1.5px;
                    margin-bottom: 12px;
                }

                .ae-hdr p {
                    color: #64748b;
                    font-size: 18px;
                }

                .ae-form-card {
                    background: #ffffff;
                    border-radius: 40px;
                    border: 1.5px solid #f1f5f9;
                    padding: 60px;
                    box-shadow: 0 25px 70px rgba(30, 27, 75, 0.05);
                }

                .ae-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                }

                .ae-full {
                    grid-column: 1 / -1;
                }

                .ae-field {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .ae-label {
                    font-size: 13px;
                    font-weight: 800;
                    color: #1e1b4b;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    padding-left: 4px;
                }

                .ae-input, .ae-select, .ae-textarea {
                    padding: 18px 24px;
                    background: #f8fafc;
                    border: 1.5px solid #f1f5f9;
                    border-radius: 20px;
                    font-family: 'Sora', sans-serif;
                    font-size: 15px;
                    color: #1e293b;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    outline: none;
                }

                .ae-input:focus, .ae-select:focus, .ae-textarea:focus {
                    background: #ffffff;
                    border-color: #4f46e5;
                    box-shadow: 0 0 0 5px rgba(79, 70, 229, 0.1);
                }

                .ae-textarea {
                    min-height: 140px;
                    resize: vertical;
                }

                .ae-upload-container {
                    grid-column: 1 / -1;
                }

                .ae-dropzone {
                    width: 100%;
                    min-height: 280px;
                    background: #f8fafc;
                    border: 2px dashed #cbd5e1;
                    border-radius: 30px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    overflow: hidden;
                    position: relative;
                }

                .ae-dropzone:hover {
                    border-color: #4f46e5;
                    background: #f5f3ff;
                }

                .ae-preview-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: absolute;
                    inset: 0;
                }

                .ae-upload-content {
                    text-align: center;
                    z-index: 1;
                }

                .ae-upload-icon {
                    font-size: 48px;
                    margin-bottom: 16px;
                }

                .ae-upload-text {
                    font-weight: 700;
                    color: #1e1b4b;
                    margin-bottom: 4px;
                }

                .ae-upload-hint {
                    font-size: 12px;
                    color: #94a3b8;
                }

                .ae-submit-btn {
                    width: 100%;
                    padding: 20px;
                    background: linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%);
                    color: white;
                    border: none;
                    border-radius: 22px;
                    font-size: 16px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 15px 35px rgba(30, 27, 75, 0.2);
                    margin-top: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                }

                .ae-submit-btn:hover:not(:disabled) {
                    transform: translateY(-5px);
                    box-shadow: 0 25px 50px rgba(30, 27, 75, 0.3);
                }

                .ae-submit-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
            `}</style>

      <header className="ae-hdr">
        <h1>Creation Lab</h1>
        <p>Architecting the future of premium occasion experiences.</p>
      </header>

      <div className="ae-form-card">
        <form onSubmit={handleSubmit}>
          <div className="ae-grid">
            <div className="ae-field ae-full">
              <label className="ae-label">Occasion Title</label>
              <input
                className="ae-input"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. The Grand Crimson Wedding"
                required
              />
            </div>

            <div className="ae-field">
              <label className="ae-label">Classification</label>
              <select
                className="ae-select"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option>Social & Personal</option>
                <option>Corporate & Business</option>
                <option>Educational</option>
              </select>
            </div>

            <div className="ae-field">
              <label className="ae-label">Base Investment (₹)</label>
              <input
                className="ae-input"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="0"
                required
              />
            </div>

            <div className="ae-upload-container">
              <label className="ae-label">Visual Asset</label>
              <div className="ae-dropzone" onClick={() => document.getElementById('ae-file-up').click()}>
                <input
                  id="ae-file-up"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {previewUrl ? (
                  <img src={previewUrl} className="ae-preview-img" alt="Preview" />
                ) : (
                  <div className="ae-upload-content">
                    <div className="ae-upload-icon">🖼️</div>
                    <div className="ae-upload-text">Upload Occasion Banner</div>
                    <div className="ae-upload-hint">Drag & drop or click to select (Max 5MB)</div>
                  </div>
                )}
              </div>
            </div>

            <div className="ae-field ae-full">
              <label className="ae-label">Occasion Narrative</label>
              <textarea
                className="ae-textarea"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the atmosphere, essence and logistics..."
                required
              />
            </div>

            <div className="ae-field ae-full">
              <label className="ae-label">Logistical Requirements</label>
              <textarea
                className="ae-textarea"
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                placeholder="List any specific venue rules, catering needs, or seating tiers..."
              />
            </div>
          </div>

          <button type="submit" className="ae-submit-btn" disabled={loading}>
            {loading ? "ARCHITECTING EXPERIENCE..." : "PUBLISH OCCASION"}
            {!loading && <span>✨</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
