import React, { useState, useMemo } from "react";

const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const fmtL = (n) => {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + " L";
  return fmt(n);
};

const LOAN_TYPES = [
  { label: "Home Loan", rate: 8.5, years: 20, max: 10000000 },
  { label: "Car Loan", rate: 9.5, years: 7, max: 3000000 },
  { label: "Personal Loan", rate: 14, years: 5, max: 1500000 },
  { label: "Education Loan", rate: 10.5, years: 10, max: 2000000 },
];

export default function EMICalculator() {
  const [loanType, setLoanType] = useState(0);
  const [principal, setPrincipal] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [showSchedule, setShowSchedule] = useState(false);

  const result = useMemo(() => {
    const n = years * 12;
    const r = rate / 100 / 12;
    const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;
    return { emi, totalPayment, totalInterest };
  }, [principal, rate, years]);

  const schedule = useMemo(() => {
    const r = rate / 100 / 12;
    const emi = result.emi;
    let bal = principal;
    return Array.from({ length: years }, (_, i) => {
      let yp = 0, yi = 0;
      for (let m = 0; m < 12 && bal > 0.01; m++) {
        const interest = bal * r;
        const princ = Math.min(emi - interest, bal);
        yi += interest; yp += princ; bal -= princ;
      }
      return { yr: i + 1, principal: yp, interest: yi, balance: Math.max(bal, 0) };
    });
  }, [principal, rate, years, result.emi]);

  const selectLoan = (i) => {
    setLoanType(i);
    setRate(LOAN_TYPES[i].rate);
    setYears(LOAN_TYPES[i].years);
    setPrincipal(Math.min(principal, LOAN_TYPES[i].max));
  };

  const lt = LOAN_TYPES[loanType];
  const interestPct = result.totalPayment > 0 ? ((result.totalInterest / result.totalPayment) * 100) : 0;
  const principalPct = 100 - interestPct;

  const sliders = [
    { label: "Loan Amount", val: principal, set: setPrincipal, min: 50000, max: lt.max, step: 50000, display: fmtL(principal) },
    { label: "Interest Rate (p.a.)", val: rate, set: setRate, min: 5, max: 24, step: 0.1, display: rate.toFixed(1) + "%" },
    { label: "Loan Tenure", val: years, set: setYears, min: 1, max: 30, step: 1, display: years + " Years" },
  ];

  return (
    <div>
      <style>{`
        .emi-slider { -webkit-appearance:none; appearance:none; width:100%; height:6px; border-radius:3px; background:#1a3020; outline:none; cursor:pointer; }
        .emi-slider::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%; background:#10b981; cursor:pointer; border:3px solid #050a05; box-shadow:0 0 0 2px #10b981; }
        .emi-slider::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background:#10b981; cursor:pointer; border:3px solid #050a05; }
        .loan-tab { padding:8px 14px; border-radius:10px; font-size:12px; font-weight:600; cursor:pointer; border:1px solid #1a2e1a; background:#0d1a0d; color:#94a3b8; transition:all 0.2s; }
        .loan-tab:hover { border-color:#166534; color:#fff; }
        .loan-tab.active { background:#059669; border-color:#059669; color:#fff; }
        .schedule-row:hover td { background: #0d1a0d; }
      `}</style>

      {/* Loan Type Tabs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px", marginBottom: "24px" }}>
        {LOAN_TYPES.map((l, i) => (
          <button key={l.label} className={`loan-tab ${loanType === i ? "active" : ""}`} onClick={() => selectLoan(i)}>
            {l.label}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div style={{ marginBottom: "28px" }}>
        {sliders.map((s) => (
          <div key={s.label} style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <label style={{ fontSize: "13px", color: "#94a3b8" }}>{s.label}</label>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#10b981", background: "rgba(16,185,129,0.12)", padding: "3px 12px", borderRadius: "8px" }}>
                {s.display}
              </span>
            </div>
            <input type="range" className="emi-slider" min={s.min} max={s.max} step={s.step} value={s.val}
              onChange={(e) => s.set(Number(e.target.value))} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#334155", marginTop: "5px" }}>
              <span>{fmtL(s.min)}</span><span>{fmtL(s.max)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* EMI Highlight */}
      <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "20px", padding: "24px", textAlign: "center", marginBottom: "20px" }}>
        <p style={{ fontSize: "11px", color: "#059669", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>Monthly EMI</p>
        <p style={{ fontSize: "42px", fontWeight: "800", color: "#10b981", letterSpacing: "-1px" }}>{fmt(result.emi)}</p>
        <p style={{ fontSize: "12px", color: "#475569", marginTop: "4px" }}>per month for {years} years</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", marginBottom: "20px" }}>
        {[
          { label: "Principal", val: fmtL(principal), color: "#cbd5e1" },
          { label: "Total Interest", val: fmtL(result.totalInterest), color: "#f87171" },
          { label: "Total Payment", val: fmtL(result.totalPayment), color: "#fff" },
        ].map((c) => (
          <div key={c.label} style={{ background: "#0d1a0d", border: "1px solid #1a2e1a", borderRadius: "14px", padding: "14px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", color: "#64748b", marginBottom: "6px" }}>{c.label}</p>
            <p style={{ fontSize: "14px", fontWeight: "700", color: c.color }}>{c.val}</p>
          </div>
        ))}
      </div>

      {/* Split Bar */}
      <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "16px", padding: "20px", marginBottom: "16px" }}>
        <p style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Payment Breakdown</p>
        <div style={{ display: "flex", height: "12px", borderRadius: "6px", overflow: "hidden", marginBottom: "8px" }}>
          <div style={{ width: `${principalPct}%`, background: "#10b981", transition: "width 0.5s ease" }} />
          <div style={{ width: `${interestPct}%`, background: "#ef4444", transition: "width 0.5s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
          <span style={{ color: "#10b981" }}>● Principal {principalPct.toFixed(1)}%</span>
          <span style={{ color: "#f87171" }}>● Interest {interestPct.toFixed(1)}%</span>
        </div>
      </div>

      {/* Amortization Toggle */}
      <button
        onClick={() => setShowSchedule(p => !p)}
        style={{ width: "100%", padding: "14px 20px", background: "#0d1a0d", border: "1px solid #1a2e1a", borderRadius: "14px", color: "#94a3b8", fontSize: "13px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s", marginBottom: "12px" }}
        onMouseOver={e => e.currentTarget.style.borderColor = "#166534"}
        onMouseOut={e => e.currentTarget.style.borderColor = "#1a2e1a"}
      >
        <span>Year-wise Amortization Schedule</span>
        <span>{showSchedule ? "▲" : "▼"}</span>
      </button>

      {showSchedule && (
        <div style={{ borderRadius: "14px", border: "1px solid #1a2e1a", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ background: "#0d1a0d", borderBottom: "1px solid #1a2e1a" }}>
                {["Year", "Principal", "Interest", "Balance"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#64748b", fontWeight: "500", textTransform: "uppercase", fontSize: "10px", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.yr} className="schedule-row" style={{ borderBottom: "1px solid #0f1f0f" }}>
                  <td style={{ padding: "10px 14px", color: "#94a3b8" }}>Year {row.yr}</td>
                  <td style={{ padding: "10px 14px", color: "#10b981" }}>{fmt(row.principal)}</td>
                  <td style={{ padding: "10px 14px", color: "#f87171" }}>{fmt(row.interest)}</td>
                  <td style={{ padding: "10px 14px", color: "#cbd5e1" }}>{fmt(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p style={{ fontSize: "11px", color: "#334155", textAlign: "center", marginTop: "14px" }}>* Calculations are indicative. Consult your bank for exact figures.</p>
    </div>
  );
}