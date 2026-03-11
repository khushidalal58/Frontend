import React, { useCallback, useEffect, useRef, useState } from "react";

const VendorNotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
    const bellRef = useRef(null);

    const unread = notifications.filter((n) => !n.read).length;

    const fetchNotifications = useCallback(async () => {
        try {
            const res = await fetch("http://localhost:5001/api/notifications/my", {
                credentials: "include",
            });
            const data = await res.json();
            if (Array.isArray(data)) setNotifications(data);
        } catch (_) { }
    }, []);

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 20000);
        return () => clearInterval(interval);
    }, [fetchNotifications]);

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (bellRef.current && !bellRef.current.contains(e.target)) {
                // also check dropdown portal
                const portal = document.getElementById("vnb-portal");
                if (portal && portal.contains(e.target)) return;
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleBellClick = () => {
        if (!open && bellRef.current) {
            const rect = bellRef.current.getBoundingClientRect();
            // Position dropdown below the bell, aligned to the right of it
            setDropdownPos({
                top: rect.bottom + 10,
                left: Math.min(rect.left - 280, window.innerWidth - 380), // keep on screen
            });
        }
        setOpen((o) => !o);
    };

    const markAllRead = async () => {
        try {
            await fetch("http://localhost:5001/api/notifications/read-all", {
                method: "PATCH",
                credentials: "include",
            });
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        } catch (_) { }
    };

    const deleteOne = async (id, e) => {
        e.stopPropagation();
        try {
            await fetch(`http://localhost:5001/api/notifications/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            setNotifications((prev) => prev.filter((n) => n._id !== id));
        } catch (_) { }
    };

    const timeAgo = (dateStr) => {
        const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
        if (diff < 60) return `${diff}s ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    return (
        <>
            <style>{`
        /* ── Bell Button ── */
        .vnb-bell-btn {
          position: relative;
          width: 40px; height: 40px;
          border-radius: 12px;
          background: rgba(255,255,255,0.12);
          border: 1.5px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          font-size: 18px;
          transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
          user-select: none;
          backdrop-filter: blur(8px);
          flex-shrink: 0;
        }
        .vnb-bell-btn:hover {
          background: rgba(255,255,255,0.22);
          transform: scale(1.1) rotate(-8deg);
        }
        .vnb-badge {
          position: absolute;
          top: -7px; right: -7px;
          min-width: 20px; height: 20px;
          background: linear-gradient(135deg, #f43f5e, #dc2626);
          color: white;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          padding: 0 4px;
          border: 2px solid #1e1b4b;
          animation: vnb-pop 0.35s cubic-bezier(0.34,1.56,0.64,1);
          line-height: 1;
        }
        @keyframes vnb-pop {
          from { transform: scale(0) rotate(-15deg); }
          to   { transform: scale(1) rotate(0deg); }
        }

        /* ── Dropdown (rendered via fixed positioning) ── */
        #vnb-portal {
          position: fixed;
          z-index: 99999;
          width: 370px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 22px;
          box-shadow:
            0 25px 60px rgba(0,0,0,0.15),
            0 8px 20px rgba(0,0,0,0.06);
          overflow: hidden;
          animation: vnb-slide 0.22s cubic-bezier(0.34,1.2,0.64,1);
        }
        @keyframes vnb-slide {
          from { opacity: 0; transform: translateY(-10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .vnb-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 18px 20px 14px;
          background: linear-gradient(135deg, #1e1b4b, #312e81);
          color: white;
        }
        .vnb-header-left h4 {
          font-size: 15px; font-weight: 800; margin: 0;
        }
        .vnb-header-left span {
          font-size: 11px; opacity: 0.65; font-weight: 600;
        }
        .vnb-read-btn {
          font-size: 11px; font-weight: 700;
          color: rgba(255,255,255,0.75);
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          padding: 5px 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .vnb-read-btn:hover { background: rgba(255,255,255,0.22); color: white; }

        .vnb-list { max-height: 360px; overflow-y: auto; }
        .vnb-list::-webkit-scrollbar { width: 4px; }
        .vnb-list::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }

        .vnb-item {
          display: flex; gap: 12px; align-items: flex-start;
          padding: 14px 18px;
          border-bottom: 1px solid #f1f5f9;
          transition: background 0.2s;
        }
        .vnb-item:last-child { border-bottom: none; }
        .vnb-item:hover { background: #f8fafc; }
        .vnb-item.unread { background: #f0f4ff; }
        .vnb-item.unread:hover { background: #e8ecff; }

        .vnb-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #4f46e5;
          flex-shrink: 0; margin-top: 5px;
        }
        .vnb-item:not(.unread) .vnb-dot { background: transparent; }

        .vnb-body { flex: 1; min-width: 0; }
        .vnb-title {
          font-size: 13px; font-weight: 700; color: #1e1b4b;
          margin-bottom: 3px;
        }
        .vnb-msg {
          font-size: 12px; color: #475569; line-height: 1.5;
          white-space: normal; word-break: break-word;
        }
        .vnb-time {
          font-size: 10px; color: #94a3b8; font-weight: 600; margin-top: 5px;
          display: flex; align-items: center; gap: 4px;
        }
        .vnb-del {
          background: none; border: none; cursor: pointer;
          color: #cbd5e1; font-size: 18px; line-height: 1;
          padding: 2px 4px; border-radius: 6px;
          transition: all 0.2s; flex-shrink: 0;
        }
        .vnb-del:hover { color: #ef4444; background: #fee2e2; }

        .vnb-empty {
          padding: 50px 20px;
          text-align: center;
          color: #94a3b8;
        }
        .vnb-empty-ico { font-size: 40px; display: block; margin-bottom: 10px; }
        .vnb-empty p  { font-size: 13px; font-weight: 600; }
      `}</style>

            {/* Bell button */}
            <div ref={bellRef} className="vnb-bell-btn" onClick={handleBellClick} title="Notifications">
                🔔
                {unread > 0 && (
                    <span className="vnb-badge">{unread > 9 ? "9+" : unread}</span>
                )}
            </div>

            {/* Fixed-positioned dropdown — escapes all overflow:hidden parents */}
            {open && (
                <div
                    id="vnb-portal"
                    style={{ top: dropdownPos.top, left: dropdownPos.left }}
                >
                    <div className="vnb-header">
                        <div className="vnb-header-left">
                            <h4>🔔 Notifications</h4>
                            <span>{unread > 0 ? `${unread} unread` : "All caught up"}</span>
                        </div>
                        {unread > 0 && (
                            <button className="vnb-read-btn" onClick={markAllRead}>
                                ✓ Mark all read
                            </button>
                        )}
                    </div>

                    <div className="vnb-list">
                        {notifications.length === 0 ? (
                            <div className="vnb-empty">
                                <span className="vnb-empty-ico">🔕</span>
                                <p>No notifications yet.</p>
                            </div>
                        ) : (
                            notifications.map((n) => (
                                <div key={n._id} className={`vnb-item ${!n.read ? "unread" : ""}`}>
                                    <div className="vnb-dot" />
                                    <div className="vnb-body">
                                        <div className="vnb-title">{n.title}</div>
                                        <div className="vnb-msg">{n.message}</div>
                                        <div className="vnb-time">🕒 {timeAgo(n.createdAt)}</div>
                                    </div>
                                    <button
                                        className="vnb-del"
                                        onClick={(e) => deleteOne(n._id, e)}
                                        title="Dismiss"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default VendorNotificationBell;
