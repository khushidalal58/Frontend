import React, { useState, useEffect } from "react";
import { useToast } from "../../components/Toast";
import { BASE_URL } from "../../config";

const UserProfile = () => {
  const toast = useToast();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    createdAt: ""
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.id || storedUser?._id;

        if (!storedUser || !userId) {
          toast.error("Session expired. Please login again.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${BASE_URL}/api/users/${userId}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          credentials: "include"
        });

        if (res.ok) {
          const data = await res.json();
          setUser({
            ...data,
            id: data._id || data.id // Normalize ID
          });
        } else {
          toast.error("Failed to load profile data.");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        toast.error("An error occurred while fetching profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [toast]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const userId = user._id || user.id;
      const res = await fetch(`${BASE_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name: user.name,
          phone: user.phone
        }),
        credentials: "include"
      });

      if (res.ok) {
        const updatedUser = await res.json();

        // CRITICAL: Normalize ID before saving to localStorage
        const normalizedUser = {
          ...updatedUser,
          id: updatedUser._id || updatedUser.id
        };

        localStorage.setItem("user", JSON.stringify(normalizedUser));
        setUser(normalizedUser);
        toast.success("Profile updated successfully! ✨");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Server Error — please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column', gap: '20px', padding: '100px' }}>
      <div className="up-loader"></div>
      <p style={{ color: '#64748b', fontWeight: 600, fontFamily: 'Sora' }}>Syncing Account Data...</p>
      <style>{`
                .up-loader { width: 48px; height: 48px; border: 5px solid #f1f5f9; border-top-color: #4f46e5; border-radius: 50%; animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
    </div>
  );

  return (
    <div className="up-container">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

                .up-container {
                    font-family: 'Sora', sans-serif;
                    animation: up-fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
                    max-width: 900px;
                }

                @keyframes up-fadeIn {
                    from { opacity: 0; transform: translateY(25px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .up-header { margin-bottom: 40px; }
                .up-header h2 {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 36px;
                    font-weight: 800;
                    color: #0f172a;
                    letter-spacing: -1.5px;
                    margin: 0;
                }
                .up-header p { color: #64748b; font-size: 16px; margin-top: 8px; font-weight: 500; }

                .up-card {
                    background: #ffffff;
                    border-radius: 40px;
                    border: 1px solid rgba(226, 232, 240, 0.8);
                    padding: 50px;
                    box-shadow: 0 30px 60px rgba(15, 23, 42, 0.04);
                    display: grid;
                    grid-template-columns: 280px 1fr;
                    gap: 50px;
                }

                .up-sidebar {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    border-right: 1.5px solid #f1f5f9;
                    padding-right: 50px;
                }

                .up-avatar-circle {
                    width: 120px;
                    height: 120px;
                    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                    border-radius: 45px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 48px;
                    color: white;
                    font-weight: 800;
                    margin-bottom: 24px;
                    box-shadow: 0 20px 40px rgba(79, 70, 229, 0.2);
                    border: 4px solid #ffffff;
                }

                .up-role-label {
                    padding: 8px 16px;
                    background: #eef2ff;
                    color: #4f46e5;
                    border-radius: 99px;
                    font-size: 12px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .up-form { display: grid; gap: 28px; }
                .up-field { display: flex; flex-direction: column; gap: 10px; }
                .up-label {
                    font-size: 12px;
                    font-weight: 800;
                    color: #1e293b;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    margin-left: 4px;
                }

                .up-input {
                    padding: 18px 24px;
                    background: #f8fafc;
                    border: 1.5px solid #f1f5f9;
                    border-radius: 20px;
                    font-family: 'Sora', sans-serif;
                    font-size: 15px;
                    color: #0f172a;
                    outline: none;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .up-input:focus {
                    background: #ffffff;
                    border-color: #4f46e5;
                    box-shadow: 0 10px 30px rgba(79, 70, 229, 0.08);
                }

                .up-input:disabled { background: #f1f5f9; color: #94a3b8; cursor: not-allowed; }

                .up-btn-save {
                    margin-top: 12px;
                    padding: 20px;
                    background: #0f172a;
                    color: white;
                    border: none;
                    border-radius: 22px;
                    font-size: 16px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.15);
                }

                .up-btn-save:hover:not(:disabled) {
                    background: #4f46e5;
                    transform: translateY(-4px);
                    box-shadow: 0 25px 50px rgba(79, 70, 229, 0.25);
                }

                @media (max-width: 800px) {
                    .up-card { grid-template-columns: 1fr; }
                    .up-sidebar { border-right: none; padding-right: 0; padding-bottom: 40px; border-bottom: 1.5px solid #f1f5f9; }
                }
            `}</style>

      <header className="up-header">
        <h2>Account Settings</h2>
        <p>Manage your identity and professional communication preferences.</p>
      </header>

      <div className="up-card">
        <div className="up-sidebar">
          <div className="up-avatar-circle">
            {(user.name?.[0] || 'U').toUpperCase()}
          </div>
          <div className="up-role-label">Verified {user.role}</div>
          <p style={{ marginTop: '20px', fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>
            Member since {user.createdAt ? new Date(user.createdAt).getFullYear() : '2024'}
          </p>
        </div>

        <form className="up-form" onSubmit={handleUpdate}>
          <div className="up-field">
            <label className="up-label">Full Profile Name</label>
            <input
              type="text"
              className="up-input"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />
          </div>

          <div className="up-field">
            <label className="up-label">Registered Email</label>
            <input
              type="email"
              className="up-input"
              value={user.email}
              disabled
            />
          </div>

          <div className="up-field">
            <label className="up-label">Contact Number</label>
            <input
              type="text"
              className="up-input"
              value={user.phone || ""}
              placeholder="Add your phone number"
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>

          <button type="submit" className="up-btn-save" disabled={updating}>
            {updating ? "SYNCHRONIZING..." : "SAVE CHANGES"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
