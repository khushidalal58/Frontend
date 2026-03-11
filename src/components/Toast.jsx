import React, { createContext, useCallback, useContext, useState, useMemo } from "react";

/* ─────────────────────────────────────────────
   CONTEXT & HOOK
───────────────────────────────────────────── */
const ToastContext = createContext(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
};

/* ─────────────────────────────────────────────
   PROVIDER
───────────────────────────────────────────── */
let _id = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = ++_id;
    setToasts((prev) => [...prev, { id, message, type, exiting: false }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
      );
      setTimeout(
        () => setToasts((prev) => prev.filter((t) => t.id !== id)),
        350
      );
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      350
    );
  }, []);

  // Convenience helpers
  const toast = React.useMemo(() => ({
    success: (msg, dur) => addToast(msg, "success", dur),
    error: (msg, dur) => addToast(msg, "error", dur),
    info: (msg, dur) => addToast(msg, "info", dur),
    warning: (msg, dur) => addToast(msg, "warning", dur),
  }), [addToast]);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

/* ─────────────────────────────────────────────
   CONFIRM DIALOG (replaces window.confirm)
───────────────────────────────────────────── */
let _confirmResolver = null;

export const ConfirmProvider = ({ children }) => {
  const [dialog, setDialog] = useState(null);

  // We expose a global function via window so non-React code can call it too
  // but components should use the hook
  const confirm = useCallback((message) => {
    return new Promise((resolve) => {
      _confirmResolver = resolve;
      setDialog(message);
    });
  }, []);

  const handleChoice = (accepted) => {
    setDialog(null);
    if (_confirmResolver) {
      _confirmResolver(accepted);
      _confirmResolver = null;
    }
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {dialog && (
        <>
          <style>{`
            .cfm-overlay {
              position: fixed; inset: 0; z-index: 999998;
              background: rgba(15,10,40,0.55);
              backdrop-filter: blur(4px);
              display: flex; align-items: center; justify-content: center;
              animation: cfm-fade-in 0.2s ease;
            }
            @keyframes cfm-fade-in { from { opacity: 0; } to { opacity: 1; } }
            .cfm-box {
              background: #ffffff;
              border-radius: 28px;
              padding: 40px 36px 32px;
              width: 380px;
              max-width: 90vw;
              box-shadow: 0 40px 80px rgba(30,27,75,0.2);
              font-family: 'Sora', sans-serif;
              animation: cfm-pop 0.3s cubic-bezier(0.34,1.56,0.64,1);
            }
            @keyframes cfm-pop {
              from { transform: scale(0.85); opacity: 0; }
              to   { transform: scale(1);    opacity: 1; }
            }
            .cfm-icon { font-size: 42px; text-align: center; margin-bottom: 16px; }
            .cfm-msg {
              font-size: 15px; font-weight: 600; color: #334155;
              text-align: center; line-height: 1.6; margin-bottom: 28px;
            }
            .cfm-actions { display: flex; gap: 12px; }
            .cfm-btn {
              flex: 1; padding: 14px;
              border-radius: 16px; border: none;
              font-size: 13px; font-weight: 800;
              cursor: pointer; transition: all 0.25s;
              font-family: 'Sora', sans-serif;
            }
            .cfm-btn-cancel {
              background: #f1f5f9; color: #64748b;
            }
            .cfm-btn-cancel:hover { background: #e2e8f0; }
            .cfm-btn-confirm {
              background: linear-gradient(135deg, #ef4444, #dc2626);
              color: white;
              box-shadow: 0 10px 20px rgba(239,68,68,0.3);
            }
            .cfm-btn-confirm:hover { transform: translateY(-2px); box-shadow: 0 14px 28px rgba(239,68,68,0.4); }
          `}</style>
          <div className="cfm-overlay">
            <div className="cfm-box">
              <div className="cfm-icon">⚠️</div>
              <p className="cfm-msg">{dialog}</p>
              <div className="cfm-actions">
                <button className="cfm-btn cfm-btn-cancel" onClick={() => handleChoice(false)}>
                  Cancel
                </button>
                <button className="cfm-btn cfm-btn-confirm" onClick={() => handleChoice(true)}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </ConfirmContext.Provider>
  );
};

const ConfirmContext = createContext(null);
export const useConfirm = () => {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used inside <ConfirmProvider>");
  return ctx;
};

/* ─────────────────────────────────────────────
   TOAST CONTAINER UI
───────────────────────────────────────────── */
const ICON = { success: "✅", error: "❌", info: "ℹ️", warning: "⚠️" };
const COLORS = {
  success: { bar: "#22c55e", bg: "#f0fdf4", border: "#bbf7d0", text: "#15803d" },
  error: { bar: "#ef4444", bg: "#fef2f2", border: "#fecaca", text: "#dc2626" },
  info: { bar: "#4f46e5", bg: "#eef2ff", border: "#c7d2fe", text: "#4338ca" },
  warning: { bar: "#f59e0b", bg: "#fffbeb", border: "#fde68a", text: "#b45309" },
};

const ToastContainer = ({ toasts, onRemove }) => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;700&display=swap');

      .toast-portal {
        position: fixed;
        top: 24px;
        right: 24px;
        z-index: 999999;
        display: flex;
        flex-direction: column;
        gap: 12px;
        pointer-events: none;
        max-width: 400px;
        width: calc(100vw - 48px);
      }

      .toast-item {
        pointer-events: all;
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 14px 16px 14px 0;
        border-radius: 18px;
        border: 1.5px solid;
        box-shadow: 0 16px 40px rgba(0,0,0,0.1);
        font-family: 'Sora', sans-serif;
        animation: toast-in 0.38s cubic-bezier(0.34,1.3,0.64,1) forwards;
        position: relative;
        overflow: hidden;
        cursor: pointer;
      }

      .toast-item.toast-out {
        animation: toast-out 0.35s cubic-bezier(0.4,0,1,1) forwards;
      }

      @keyframes toast-in {
        from { opacity: 0; transform: translateX(110%) scale(0.85); }
        to   { opacity: 1; transform: translateX(0) scale(1); }
      }
      @keyframes toast-out {
        from { opacity: 1; transform: translateX(0) scale(1); max-height: 200px; margin-bottom: 0; }
        to   { opacity: 0; transform: translateX(110%) scale(0.85); max-height: 0; margin-bottom: -12px; }
      }

      .toast-bar {
        width: 5px;
        align-self: stretch;
        border-radius: 0 0 0 0;
        flex-shrink: 0;
        margin-left: 0;
        border-radius: 99px;
        margin-left: 14px;
      }

      .toast-icon {
        font-size: 20px;
        flex-shrink: 0;
        line-height: 1;
        margin-top: 1px;
      }

      .toast-body { flex: 1; min-width: 0; }

      .toast-msg {
        font-size: 13.5px;
        font-weight: 600;
        line-height: 1.5;
        word-break: break-word;
      }

      .toast-close {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
        line-height: 1;
        opacity: 0.45;
        padding: 0 2px;
        flex-shrink: 0;
        transition: opacity 0.2s;
        margin-right: 4px;
      }
      .toast-close:hover { opacity: 1; }

      .toast-progress {
        position: absolute;
        bottom: 0; left: 0;
        height: 3px;
        border-radius: 0 0 18px 18px;
        animation: toast-progress var(--dur, 4s) linear forwards;
      }
      @keyframes toast-progress {
        from { width: 100%; }
        to   { width: 0%; }
      }
    `}</style>

    <div className="toast-portal" role="region" aria-label="Notifications">
      {toasts.map((t) => {
        const c = COLORS[t.type] || COLORS.info;
        return (
          <div
            key={t.id}
            className={`toast-item${t.exiting ? " toast-out" : ""}`}
            style={{ background: c.bg, borderColor: c.border }}
            onClick={() => onRemove(t.id)}
            role="alert"
          >
            <div className="toast-bar" style={{ background: c.bar }} />
            <span className="toast-icon">{ICON[t.type]}</span>
            <div className="toast-body">
              <p className="toast-msg" style={{ color: c.text }}>{t.message}</p>
            </div>
            <button className="toast-close" style={{ color: c.text }} onClick={(e) => { e.stopPropagation(); onRemove(t.id); }}>×</button>
            <div
              className="toast-progress"
              style={{ background: c.bar, "--dur": `${(t.duration || 4000) / 1000}s` }}
            />
          </div>
        );
      })}
    </div>
  </>
);

export default ToastProvider;
