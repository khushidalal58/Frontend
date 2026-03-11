import React, { useState, useEffect } from "react";

const UserGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/gallery");
                if (res.ok) {
                    const data = await res.json();
                    setImages(data);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    return (
        <div className="ug-container">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

                .ug-container {
                    font-family: 'Sora', sans-serif;
                    animation: ug-fadeIn 0.8s ease;
                }

                @keyframes ug-fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .ug-header {
                    margin-bottom: 40px;
                }

                .ug-header h2 {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 32px;
                    font-weight: 800;
                    color: #1e1b4b;
                    letter-spacing: -1px;
                }

                .ug-header p {
                    color: #64748b;
                    font-size: 15px;
                    margin-top: 4px;
                }

                .ug-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 24px;
                }

                .ug-card {
                    background: white;
                    border-radius: 24px;
                    overflow: hidden;
                    border: 1.5px solid #f1f5f9;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.02);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .ug-card:hover {
                    transform: scale(1.02);
                    box-shadow: 0 30px 60px rgba(79, 70, 229, 0.1);
                    border-color: #4f46e5;
                }

                .ug-img-wrapper {
                    height: 240px;
                    overflow: hidden;
                    position: relative;
                }

                .ug-img-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }

                .ug-card:hover .ug-img-wrapper img {
                    transform: scale(1.1);
                }

                .ug-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(30, 27, 75, 0.4), transparent);
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .ug-card:hover .ug-overlay {
                    opacity: 1;
                }

                .ug-loader {
                    text-align: center;
                    padding: 100px;
                    color: #4f46e5;
                    font-weight: 700;
                }

                .ug-empty {
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 80px;
                    background: #f8fafc;
                    border-radius: 24px;
                    border: 2px dashed #e2e8f0;
                    color: #64748b;
                }
            `}</style>

            <div className="ug-header">
                <h2>Event Memories</h2>
                <p>Relive the magic of past occasions captured through our lens.</p>
            </div>

            {loading ? (
                <div className="ug-loader">Capturing memories...</div>
            ) : (
                <div className="ug-grid">
                    {images.map((img) => {
                        const imgSrc = img.image?.startsWith("/")
                            ? `http://localhost:5001${img.image}`
                            : `http://localhost:5001/uploads/${img.image}`;

                        return (
                            <div key={img._id} className="ug-card">
                                <div className="ug-img-wrapper">
                                    <img
                                        src={imgSrc}
                                        alt="Past Event"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=500";
                                            e.target.style.opacity = "0.5";
                                        }}
                                    />
                                    <div className="ug-overlay" />
                                </div>
                            </div>
                        );
                    })}
                    {images.length === 0 && (
                        <div className="ug-empty">
                            <p>The gallery is currently being curated. Check back soon!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserGallery;
