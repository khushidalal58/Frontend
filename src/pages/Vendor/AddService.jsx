import React, { useState } from "react";
import { useToast } from "../../components/Toast";

const AddService = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !price) {
      toast.warning("Please complete all mandatory fields");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    if (file) formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5001/api/services/add", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Professional Service Launched Successfully!");
        setTitle("");
        setDescription("");
        setPrice("");
        setFile(null);
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (err) {
      toast.error("Network connectivity issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="as-container">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Sora:wght@300;400;600;700&display=swap');

                .as-container {
                    animation: as-fadeIn 0.6s ease;
                    max-width: 800px;
                    margin: 0 auto;
                }

                @keyframes as-fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .as-header { margin-bottom: 40px; }
                .as-header h1 {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 32px;
                    font-weight: 800;
                    color: #1e1b4b;
                    letter-spacing: -1px;
                }
                .as-header p { color: #64748b; font-size: 15px; margin-top: 8px; }

                .as-card {
                    background: #ffffff;
                    border: 1.5px solid #f1f5f9;
                    border-radius: 32px;
                    padding: 40px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.02);
                }

                .as-form {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                }

                .as-field { display: flex; flex-direction: column; gap: 8px; }
                .as-field.full { grid-column: 1 / -1; }

                .as-label {
                    font-size: 12px;
                    font-weight: 700;
                    color: #475569;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .as-input, .as-select, .as-textarea {
                    background: #f8fafc;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 14px;
                    padding: 14px 18px;
                    font-family: inherit;
                    font-size: 14px;
                    color: #1e293b;
                    transition: all 0.3s;
                    outline: none;
                }

                .as-input:focus, .as-select:focus, .as-textarea:focus {
                    background: #ffffff;
                    border-color: #4f46e5;
                    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
                }

                .as-textarea { height: 120px; resize: none; }

                .as-upload-box {
                    background: #fcfdfe;
                    border: 2px dashed #e2e8f0;
                    border-radius: 20px;
                    padding: 30px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .as-upload-box:hover { border-color: #4f46e5; background: #f5f3ff; }

                .as-submit-btn {
                    grid-column: 1 / -1;
                    height: 56px;
                    background: #1e1b4b;
                    color: white;
                    border: none;
                    border-radius: 16px;
                    font-weight: 800;
                    font-size: 15px;
                    cursor: pointer;
                    transition: all 0.3s;
                    margin-top: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                }

                .as-submit-btn:hover { background: #4f46e5; transform: translateY(-2px); }
                .as-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
            `}</style>

      <header className="as-header">
        <h1>Launch New Service</h1>
        <p>Register your premium offerings and reach thousands of event planners.</p>
      </header>

      <div className="as-card">
        <form className="as-form" onSubmit={handleSubmit}>
          <div className="as-field">
            <label className="as-label">Service Title</label>
            <input
              className="as-input"
              placeholder="e.g. Cinematic Photography"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>



          <div className="as-field">
            <label className="as-label">Base Pricing (₹)</label>
            <input
              type="number"
              className="as-input"
              placeholder="5000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="as-field">
            <label className="as-label">Service Media</label>
            <input
              type="file"
              className="as-input"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className="as-field full">
            <label className="as-label">Detailed Description</label>
            <textarea
              className="as-textarea"
              placeholder="Describe what makes your service premium & unique..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button className="as-submit-btn" type="submit" disabled={loading}>
            {loading ? "PROCESSING..." : "REGISTER SERVICE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
