import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.jpg";
import { useToast, useConfirm } from "../../components/Toast";

const ManageGallery = () => {
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const confirm = useConfirm();

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch("http://localhost:5001/api/gallery");
            if (res.ok) {
                const data = await res.json();
                setImages(data);
            }
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch("http://localhost:5001/api/gallery", {
                method: "POST",
                body: formData,
                credentials: "include"
            });

            if (res.ok) {
                toast.success("Image uploaded successfully!");
                setFile(null);
                fetchImages();
            } else {
                const errorData = await res.json().catch(() => ({}));
                toast.error(`Upload failed: ${errorData.message || "We couldn't process your upload."}`);
            }
        } catch (err) {
            console.error("Upload error:", err);
            toast.error("Server Error — please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const ok = await confirm("Delete this memory forever?");
        if (!ok) return;

        try {
            const res = await fetch(`http://localhost:5001/api/gallery/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (res.ok) {
                toast.success("Image removed from gallery");
                fetchImages();
            } else {
                toast.error("Failed to remove image");
            }
        } catch (err) {
            console.error("Delete error:", err);
            toast.error("Server Error — please try again.");
        }
    };

    return (
        <div className="mg-container">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

                .mg-container {
                    font-family: 'Sora', sans-serif;
                    animation: mg-fadeIn 0.6s ease;
                }

                @keyframes mg-fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .mg-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 40px;
                }

                .mg-title h2 {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 32px;
                    font-weight: 800;
                    color: #1e1b4b;
                    letter-spacing: -1px;
                }

                .mg-title p {
                    color: #64748b;
                    font-size: 14px;
                    margin-top: 4px;
                }

                .mg-upload-card {
                    background: #ffffff;
                    padding: 30px;
                    border-radius: 24px;
                    border: 1.5px solid #f1f5f9;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.03);
                    margin-bottom: 40px;
                    display: flex;
                    align-items: center;
                    gap: 24px;
                }

                .mg-file-input {
                    flex: 1;
                    padding: 12px;
                    border: 2px dashed #e2e8f0;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .mg-file-input:hover {
                    border-color: #4f46e5;
                    background: #f5f3ff;
                }

                .mg-btn-upload {
                    padding: 14px 28px;
                    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                    color: white;
                    border: none;
                    border-radius: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 10px 20px rgba(79, 70, 229, 0.2);
                }

                .mg-btn-upload:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px rgba(79, 70, 229, 0.3);
                }

                .mg-btn-upload:disabled { opacity: 0.6; cursor: not-allowed; }

                .mg-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                    gap: 24px;
                }

                .mg-img-card {
                    background: white;
                    border-radius: 20px;
                    overflow: hidden;
                    border: 1.5px solid #f1f5f9;
                    transition: all 0.3s;
                    position: relative;
                }

                .mg-img-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
                }

                .mg-img-wrapper {
                    height: 200px;
                    overflow: hidden;
                }

                .mg-img-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .mg-img-actions {
                    padding: 16px;
                    display: flex;
                    justify-content: flex-end;
                }

                .mg-btn-delete {
                    background: #fff1f2;
                    color: #ef4444;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .mg-btn-delete:hover {
                    background: #ef4444;
                    color: white;
                }
            `}</style>

            <header className="mg-header">
                <div className="mg-title">
                    <h2>Gallery Management</h2>
                    <p>Curate the visual experiences for your platform users.</p>
                </div>
            </header>

            <form className="mg-upload-card" onSubmit={handleUpload}>
                <input
                    type="file"
                    className="mg-file-input"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/*"
                />
                <button
                    type="submit"
                    className="mg-btn-upload"
                    disabled={loading || !file}
                >
                    {loading ? "UPLOADING..." : "UPLOAD NEW MEMORY"}
                </button>
            </form>

            <div className="mg-grid">
                {images.map((img) => {
                    const imgSrc = img.image?.startsWith("/")
                        ? `http://localhost:5001${img.image}`
                        : `http://localhost:5001/uploads/${img.image}`;

                    return (
                        <div key={img._id} className="mg-img-card">
                            <div className="mg-img-wrapper">
                                <img
                                    src={imgSrc}
                                    alt="Gallery Memory"
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=500";
                                        e.target.style.opacity = "0.5";
                                    }}
                                />
                            </div>
                            <div className="mg-img-actions">
                                <button className="mg-btn-delete" onClick={() => handleDelete(img._id)}>
                                    🗑️ Remove
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            {images.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
                    <p>No memories in the gallery yet. Start by uploading one!</p>
                </div>
            )}
        </div>
    );
};

export default ManageGallery;
