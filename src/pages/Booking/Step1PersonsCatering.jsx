import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../../components/Toast";
import step1Img from "../../assets/step1.jpg";

const Step1PersonsCatering = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { state } = useLocation();

  // Auth context
  const user = JSON.parse(localStorage.getItem("user"));

  const [selectedDate, setSelectedDate] = useState("");
  const [bookedDates, setBookedDates] = useState([]);
  const [timeHour, setTimeHour] = useState("12");
  const [timeMin, setTimeMin] = useState("00");
  const [timePeriod, setTimePeriod] = useState("PM");
  const [guests, setGuests] = useState("");
  const [hours, setHours] = useState(1);
  const [email, setEmail] = useState(user?.email || "");
  const [document, setDocument] = useState(null);
  const [focused, setFocused] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const eventPrice = state?.price || 1500;
  const totalPrice = hours * eventPrice;

  useEffect(() => {
    if (!state) {
      navigate("/events");
      return;
    }

    if (user && user.role !== "user") {
      toast.error("Access denied. Only customers can book events.");
      const dashboardPath = user.role === "vendor" ? "/vendor/dashboard" : "/admin/dashboard";
      navigate(dashboardPath);
      return;
    }

    // Fetch booked dates
    const fetchBookedDates = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/bookings/booked-dates");
        const data = await response.json();
        // 🔥 Defensive check: ensure data is an array
        if (Array.isArray(data)) {
          setBookedDates(data);
        } else {
          console.error("Expected array from booked-dates API, got:", data);
          setBookedDates([]); // Fallback to empty array
        }
      } catch (err) {
        console.error("Failed to fetch booked dates", err);
        setBookedDates([]); // Fallback on network error
      }
    };
    fetchBookedDates();
  }, [state, navigate]);

  const handleNext = () => {
    if (!selectedDate || !guests || !hours || !email) {
      toast.warning("Please complete all required information");
      return;
    }

    if (Array.isArray(bookedDates) && bookedDates.includes(selectedDate)) {
      toast.error("This date is already booked! Please choose another one.");
      return;
    }

    const finalStartTime = `${timeHour}:${timeMin} ${timePeriod}`;

    navigate("/booking/step2", {
      state: {
        eventId: state?._id,
        eventTitle: state?.title || "Premium Event",
        location: state?.location || "TBD",
        eventPrice: eventPrice,
        date: selectedDate,
        startTime: finalStartTime,
        guests,
        hours,
        contactEmail: email,
        baseAmount: totalPrice,
        image: state.image, // 🔥 Carry image to next step
      },
    });
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setDocument(file);
  };

  return (
    <div className="s1-container">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Sora:wght@300;400;600;700&display=swap');

                .s1-container {
                    min-height: 100vh;
                    background: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)),
                                url(${step1Img});
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Sora', sans-serif;
                    padding: 60px 20px;
                }

                .s1-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 40px;
                    padding: 48px;
                    width: 100%;
                    max-width: 680px;
                    box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.4);
                    position: relative;
                    overflow: hidden;
                }

                .s1-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 6px;
                    background: linear-gradient(90deg, #4f46e5, #9333ea, #4f46e5);
                    background-size: 200% 100%;
                    animation: gradientMove 3s linear infinite;
                }

                @keyframes gradientMove {
                    0% { background-position: 100% 0; }
                    100% { background-position: -100% 0; }
                }

                .s1-back-btn {
                    position: absolute;
                    top: 40px;
                    left: 40px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    color: #1e293b;
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    z-index: 10;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .s1-back-btn:hover {
                    background: #1e293b;
                    color: white;
                    transform: scale(1.1) rotate(-5deg);
                }

                .s1-header {
                    text-align: center;
                    margin-bottom: 40px;
                    padding-top: 10px;
                }

                .s1-progress {
                    display: flex;
                    gap: 8px;
                    justify-content: center;
                    margin-bottom: 24px;
                }

                .progress-dot {
                    width: 32px;
                    height: 6px;
                    border-radius: 10px;
                    background: #e2e8f0;
                    transition: all 0.5s;
                }

                .progress-dot.filled { background: #10b981; }
                .progress-dot.current { width: 64px; background: #4f46e5; }

                .s1-badge {
                    display: inline-flex;
                    padding: 8px 16px;
                    background: #f5f3ff;
                    color: #4f46e5;
                    border-radius: 100px;
                    font-size: 12px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin-bottom: 20px;
                }

                .s1-title {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 36px;
                    font-weight: 800;
                    color: #0f172a;
                    letter-spacing: -1.5px;
                    margin-bottom: 12px;
                }

                .s1-subtitle {
                    color: #475569;
                    font-size: 16px;
                    max-width: 400px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .s1-form-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                    margin-bottom: 32px;
                }

                .s1-input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .s1-input-group.full { grid-column: span 2; }

                .s1-label {
                    font-size: 13px;
                    font-weight: 700;
                    color: #334155;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .s1-label-icon { color: #4f46e5; font-size: 16px; }

                .s1-input-wrapper {
                    position: relative;
                    transition: transform 0.3s;
                }

                .s1-input-wrapper:focus-within {
                    transform: translateY(-2px);
                }

                .s1-input {
                    width: 100%;
                    padding: 16px 20px;
                    background: #f8fafc;
                    border: 2px solid #f1f5f9;
                    border-radius: 18px;
                    font-family: inherit;
                    font-size: 15px;
                    color: #1e293b;
                    transition: all 0.3s;
                    box-sizing: border-box;
                }

                .s1-input:focus {
                    background: white;
                    border-color: #4f46e5;
                    box-shadow: 0 10px 20px -10px rgba(79, 70, 229, 0.2);
                    outline: none;
                }

                .s1-time-controls {
                    display: flex;
                    gap: 12px;
                }

                .s1-select {
                    flex: 1;
                    padding: 16px;
                    background: #f8fafc;
                    border: 2px solid #f1f5f9;
                    border-radius: 18px;
                    font-family: inherit;
                    font-weight: 700;
                    cursor: pointer;
                    appearance: none;
                    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 12px center;
                }

                .s1-period-picker {
                    display: flex;
                    background: #f1f5f9;
                    padding: 5px;
                    border-radius: 14px;
                }

                .period-option {
                    padding: 10px 14px;
                    border: none;
                    background: transparent;
                    color: #64748b;
                    font-size: 11px;
                    font-weight: 800;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .period-option.active {
                    background: white;
                    color: #4f46e5;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                }

                .s1-upload-card {
                    background: #f8fafc;
                    border: 2px dashed #cbd5e1;
                    border-radius: 20px;
                    padding: 30px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    position: relative;
                }

                .s1-upload-card:hover { border-color: #4f46e5; background: #f5f3ff; }

                .s1-upload-icon {
                    font-size: 40px;
                    margin-bottom: 12px;
                    display: block;
                }

                .s1-upload-title {
                    font-size: 15px;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 4px;
                }

                .s1-upload-subtitle { font-size: 13px; color: #64748b; }

                .s1-estimate-footer {
                    margin-top: 40px;
                    padding: 32px;
                    background: #1e1b4b;
                    border-radius: 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: white;
                    position: relative;
                    overflow: hidden;
                }

                .s1-estimate-footer::after {
                    content: '✨';
                    position: absolute;
                    font-size: 80px;
                    right: -20px;
                    bottom: -20px;
                    opacity: 0.1;
                }

                .footer-label {
                    font-size: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: #94a3b8;
                    margin-bottom: 4px;
                }

                .footer-amount {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 36px;
                    font-weight: 800;
                }

                .s1-submit-btn {
                    padding: 20px 48px;
                    background: white;
                    color: #1e1b4b;
                    border: none;
                    border-radius: 18px;
                    font-family: inherit;
                    font-size: 16px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .s1-submit-btn:hover {
                    transform: scale(1.05) translateX(5px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                }

                .stepper-control {
                    display: flex;
                    align-items: center;
                    background: #f8fafc;
                    border: 2px solid #f1f5f9;
                    border-radius: 18px;
                    height: 56px;
                    padding: 0 4px;
                }

                .step-inner-btn {
                    width: 48px;
                    height: 48px;
                    border: none;
                    background: white;
                    border-radius: 14px;
                    color: #1e293b;
                    font-size: 20px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                }

                .step-inner-btn:hover { background: #1e293b; color: white; }

                .step-display {
                    flex: 1;
                    border: none;
                    background: transparent;
                    text-align: center;
                    font-family: inherit;
                    font-weight: 800;
                    font-size: 18px;
                    color: #1e1b4b;
                    width: 50px;
                }

                @media (max-width: 640px) {
                    .s1-form-grid { grid-template-columns: 1fr; }
                    .s1-input-group.full { grid-column: span 1; }
                    .s1-card { padding: 40px 24px; }
                    .s1-estimate-footer { flex-direction: column; gap: 24px; text-align: center; }
                    .s1-submit-btn { width: 100%; justify-content: center; }
                    .s1-title { font-size: 28px; }
                }
            `}</style>

      <div className="s1-card">
        <button className="s1-back-btn" onClick={() => navigate(-1)} title="Go Back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </button>

        <div className="s1-header">
          <div className="s1-progress">
            <div className="progress-dot current"></div>
            <div className="progress-dot"></div>
            <div className="progress-dot"></div>
            <div className="progress-dot"></div>
          </div>
          <div className="s1-badge">Step 1 • Event Basics</div>
          <h1 className="s1-title">{state?.title || "Premium Event"}</h1>
          <p className="s1-subtitle">{state?.description || "Reserve your exclusive date and let us handle the magic for you."}</p>
        </div>

        <div className="s1-form-grid">
          <div className="s1-input-group">
            <label className="s1-label">
              <span className="s1-label-icon">📅</span> Selected Date
            </label>
            <div className="s1-input-wrapper">
              <input
                type="date"
                className={`s1-input ${Array.isArray(bookedDates) && bookedDates.includes(selectedDate) ? "booked-error" : ""}`}
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={Array.isArray(bookedDates) && bookedDates.includes(selectedDate) ? { borderColor: '#ef4444', backgroundColor: '#fef2f2' } : {}}
              />
            </div>
            {Array.isArray(bookedDates) && bookedDates.includes(selectedDate) && (
              <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: '700', paddingLeft: '8px' }}>
                ⚠️ This date is currently unavailable
              </span>
            )}
          </div>

          <div className="s1-input-group">
            <label className="s1-label">
              <span className="s1-label-icon">⏰</span> Prime Time
            </label>
            <div className="s1-time-controls">
              <select className="s1-select" value={timeHour} onChange={(e) => setTimeHour(e.target.value)}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                  <option key={h} value={h < 10 ? `0${h}` : `${h}`}>{h}</option>
                ))}
              </select>
              <select className="s1-select" value={timeMin} onChange={(e) => setTimeMin(e.target.value)}>
                {Array.from({ length: 60 }, (_, i) => i < 10 ? `0${i}` : `${i}`).map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <div className="s1-period-picker">
                <button
                  className={`period-option ${timePeriod === 'AM' ? 'active' : ''}`}
                  onClick={() => setTimePeriod('AM')}
                >AM</button>
                <button
                  className={`period-option ${timePeriod === 'PM' ? 'active' : ''}`}
                  onClick={() => setTimePeriod('PM')}
                >PM</button>
              </div>
            </div>
          </div>

          <div className="s1-input-group">
            <label className="s1-label">
              <span className="s1-label-icon">👥</span> Expected Guests
            </label>
            <div className="s1-input-wrapper">
              <input
                type="number"
                className="s1-input"
                placeholder="e.g. 150"
                min="1"
                value={guests}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || parseInt(val) >= 1) {
                    setGuests(val);
                  }
                }}
              />
            </div>
          </div>

          <div className="s1-input-group">
            <label className="s1-label">
              <span className="s1-label-icon">⏳</span> Event Duration (Hrs)
            </label>
            <div className="stepper-control">
              <button className="step-inner-btn" onClick={() => setHours(Math.max(1, hours - 1))}>−</button>
              <input
                type="number"
                className="step-display"
                value={hours}
                onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button className="step-inner-btn" onClick={() => setHours(hours + 1)}>+</button>
            </div>
          </div>

          <div className="s1-input-group full">
            <label className="s1-label">
              <span className="s1-label-icon">📧</span> Confirmation Email
            </label>
            <div className="s1-input-wrapper">
              <input
                type="email"
                className="s1-input"
                placeholder="Where should we send your VIP invite?"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* <div className="s1-upload-card" onClick={() => document.getElementById('id-upload').click()}>
          <input
            id="id-upload"
            type="file"
            onChange={(e) => setDocument(e.target.files[0])}
            accept=".pdf,image/*"
            style={{ display: 'none' }}
          />
          <span className="s1-upload-icon">🖋️</span>
          <div className="s1-upload-title">Identity Verification Document</div>
          <div className="s1-upload-subtitle">Upload Aadhaar or PAN Card (PDF/Image)</div>
          {document && (
            <div style={{ marginTop: '16px', color: '#10b981', fontWeight: '800', fontSize: '13px' }}>
              ✨ {document.name} attached successfully
            </div>
          )}
        </div> */}

        <div className="s1-estimate-footer">
          <div className="footer-info">
            <div className="footer-label">Booking Estimate</div>
            <div className="footer-amount">₹{totalPrice.toLocaleString()}</div>
          </div>
          <button className="s1-submit-btn" onClick={handleNext}>
            Select Services <span style={{ fontSize: '20px' }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1PersonsCatering;