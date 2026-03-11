// const ManageUsers = () => (
//   <div style={styles.card}>
//     <h2>All Users</h2>
//     <p>Total registered users: 120</p>
//   </div>
// );
// const styles={card:{background:"#fff",padding:35,borderRadius:20,boxShadow:"0 20px 40px rgba(0,0,0,.08)"}}
// export default ManageUsers;

import React, { useState, useEffect } from "react";
import { useToast, useConfirm } from "../../components/Toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const confirm = useConfirm();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/users", {
          credentials: "include",
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Fetch users error:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="mu-root">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');

                .mu-root {
                    font-family: 'Sora', sans-serif;
                    animation: mu-fadeIn 0.6s ease;
                }

                @keyframes mu-fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .mu-hdr {
                    margin-bottom: 40px;
                }

                .mu-hdr h1 {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 36px;
                    font-weight: 800;
                    color: #1e1b4b;
                    letter-spacing: -1px;
                    margin-bottom: 8px;
                }

                .mu-hdr p {
                    color: #64748b;
                    font-size: 16px;
                }

                .mu-card-container {
                    background: #ffffff;
                    border-radius: 32px;
                    border: 1.5px solid #f1f5f9;
                    overflow: hidden;
                    box-shadow: 0 10px 40px rgba(30, 27, 75, 0.04);
                }

                .mu-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .mu-table th {
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

                .mu-table td {
                    padding: 24px;
                    border-bottom: 1.5px solid #f8fafc;
                    color: #1e293b;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.2s;
                }

                .mu-table tr:last-child td { border-bottom: none; }

                .mu-table tr:hover td {
                    background: #fdfcff;
                }

                .mu-user-info {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .mu-avatar {
                    width: 44px;
                    height: 44px;
                    background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
                    color: #4f46e5;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 18px;
                    border: 1px solid #c7d2fe;
                }

                .mu-name {
                    font-weight: 700;
                    color: #1e1b4b;
                    margin-bottom: 2px;
                }

                .mu-email {
                    font-size: 12px;
                    color: #94a3b8;
                }

                .mu-role {
                    padding: 6px 14px;
                    border-radius: 10px;
                    font-size: 10px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    display: inline-block;
                }

                .mu-role.admin {
                    background: #eef2ff;
                    color: #4f46e5;
                    border: 1px solid #c7d2fe;
                }

                .mu-role.vendor {
                    background: #f0fdf4;
                    color: #16a34a;
                    border: 1px solid #bbf7d0;
                }

                .mu-role.user {
                    background: #f8fafc;
                    color: #64748b;
                    border: 1px solid #e2e8f0;
                }

                .mu-status {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 13px;
                    color: #16a34a;
                    font-weight: 600;
                }

                .mu-status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #22c55e;
                    box-shadow: 0 0 10px rgba(34, 197, 94, 0.4);
                }

                .mu-action-wrap {
                    display: flex;
                    gap: 12px;
                }

                .mu-view-btn {
                    padding: 8px 16px;
                    border-radius: 12px;
                    border: 1.5px solid #f1f5f9;
                    background: white;
                    color: #64748b;
                    font-weight: 700;
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .mu-view-btn:hover {
                    background: #f8fafc;
                    border-color: #e2e8f0;
                    color: #1e1b4b;
                    transform: translateY(-2px);
                }

                .mu-loading {
                    padding: 60px;
                    text-align: center;
                    color: #94a3b8;
                    font-weight: 500;
                }
            `}</style>

      <header className="mu-hdr">
        <h1>Member Directory</h1>
        <p>Manage and monitor all platform participants in real-time.</p>
      </header>

      <div className="mu-card-container">
        {loading ? (
          <div className="mu-loading">Syncing platform members...</div>
        ) : users.length === 0 ? (
          <div className="mu-loading">No participants found in the system.</div>
        ) : (
          <table className="mu-table">
            <thead>
              <tr>
                <th>Participant</th>
                <th>Role</th>
                <th>Joined Date</th>
                <th>Access Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="mu-user-info">
                      <div className="mu-avatar">
                        {(user.name?.[0] || 'U').toUpperCase()}
                      </div>
                      <div>
                        <div className="mu-name">{user.name}</div>
                        <div className="mu-email">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`mu-role ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>
                    <div className="mu-status">
                      <div className="mu-status-dot"></div>
                      Active
                    </div>
                  </td>
                  <td>
                    <div className="mu-action-wrap">
                      <button className="mu-view-btn">Edit Access</button>
                      <button
                        className="mu-view-btn"
                        style={{ color: '#dc2626', borderColor: '#fecaca' }}
                        onClick={async () => {
                          const ok = await confirm(`Permanently remove ${user.name}? This will also delete all their services and events if they are a vendor.`);
                          if (ok) {
                            try {
                              const res = await fetch(`http://localhost:5001/api/users/${user._id}`, {
                                method: 'DELETE',
                                credentials: 'include'
                              });
                              const result = await res.json();
                              if (result.success) {
                                toast.success("Member removed successfully");
                                setUsers(users.filter(u => u._id !== user._id));
                              } else {
                                toast.error(result.error ? `Failed to remove member: ${result.error}` : (result.message || "Failed to remove user"));
                              }
                            } catch (error) {
                              console.error("Delete error:", error);
                              toast.error("An error occurred while removing the user.");
                            }
                          }
                        }}
                      >
                        Delete Member
                      </button>
                    </div>
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

export default ManageUsers;

