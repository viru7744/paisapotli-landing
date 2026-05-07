import React, { useState, useMemo } from "react";

const fmt  = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const fmtL = (n) => {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000)   return "₹" + (n / 100000).toFixed(2) + " L";
  return fmt(n);
};

const LOAN_TYPES = [
  {
    id: "home", label: "Home Loan", emoji: "🏠",
    rate: 8.5, maxTenure: 30, multiplier: 60,
    desc: "Salary ka 60x tak mil sakta hai",
    color: "#3b82f6",
  },
  {
    id: "car", label: "Car Loan", emoji: "🚗",
    rate: 9.5, maxTenure: 7, multiplier: 36,
    desc: "Salary ka 36x tak mil sakta hai",
    color: "#10b981",
  },
  {
    id: "personal", label: "Personal Loan", emoji: "💼",
    rate: 14, maxTenure: 5, multiplier: 24,
    desc: "Salary ka 24x tak mil sakta hai",
    color: "#f59e0b",
  },
  {
    id: "education", label: "Education Loan", emoji: "🎓",
    rate: 10.5, maxTenure: 10, multiplier: 48,
    desc: "Salary ka 48x tak mil sakta hai",
    color: "#8b5cf6",
  },
];

const BANKS_DATA = [
  { name: "SBI",         homePct: 0.85, carPct: 0.80, personalPct: 0.75, logo: "🏦" },
  { name: "HDFC Bank",   homePct: 0.90, carPct: 0.85, personalPct: 0.80, logo: "🏛️" },
  { name: "ICICI Bank",  homePct: 0.90, carPct: 0.85, personalPct: 0.80, logo: "🏛️" },
  { name: "Axis Bank",   homePct: 0.85, carPct: 0.80, personalPct: 0.78, logo: "🏛️" },
  { name: "Kotak Bank",  homePct: 0.88, carPct: 0.82, personalPct: 0.76, logo: "🏛️" },
];

export default function LoanEligibility() {
  const [loanTypeId, setLoanTypeId]   = useState("home");
  const [salary, setSalary]           = useState(50000);
  const [existingEmi, setExistingEmi] = useState(0);
  const [tenure, setTenure]           = useState(20);
  const [cibil, setCibil]             = useState(750);

  const lt = LOAN_TYPES.find(l => l.id === loanTypeId);

  const result = useMemo(() => {
    // FOIR (Fixed Obligation to Income Ratio) — banks allow max 50-60%
    const foir        = 0.50;
    const maxEmiAllowed = (salary * foir) - existingEmi;
    if (maxEmiAllowed <= 0) return null;

    // CIBIL score multiplier
    const cibilMult = cibil >= 800 ? 1.0 : cibil >= 750 ? 0.95 : cibil >= 700 ? 0.85 : cibil >= 650 ? 0.70 : 0.50;

    const r = lt.rate / 100 / 12;
    const n = tenure * 12;

    // Max loan from EMI capacity
    const maxLoanFromEmi = maxEmiAllowed * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));

    // Max loan from multiplier rule
    const maxLoanFromMultiplier = salary * lt.multiplier;

    const rawEligible  = Math.min(maxLoanFromEmi, maxLoanFromMultiplier);
    const eligible     = rawEligible * cibilMult;
    const monthlyEmi   = eligible * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyEmi * n;
    const totalInterest = totalPayment - eligible;

    const cibilStatus =
      cibil >= 800 ? { label: "Excellent", color: "#10b981" } :
      cibil >= 750 ? { label: "Good",      color: "#10b981" } :
      cibil >= 700 ? { label: "Fair",      color: "#f59e0b" } :
      cibil >= 650 ? { label: "Poor",      color: "#f97316" } :
                     { label: "Bad",       color: "#ef4444" };

    return { eligible, monthlyEmi, totalPayment, totalInterest, cibilStatus, maxEmiAllowed };
  }, [salary, existingEmi, tenure, loanTypeId, cibil, lt]);

  const sliders = [
    { label: "Monthly Salary (Net)", val: salary,      set: setSalary,      min: 15000,  max: 500000, step: 5000,  display: fmtL(salary)      },
    { label: "Existing EMIs",        val: existingEmi, set: setExistingEmi, min: 0,      max: 100000, step: 1000,  display: fmt(existingEmi)   },
    { label: "Loan Tenure",          val: tenure,      set: setTenure,      min: 1,      max: lt.maxTenure, step: 1, display: tenure + " Yrs" },
  ];

  return (
    <div>
      <style>{`
        .le-slider { -webkit-appearance:none; appearance:none; width:100%; height:6px; border-radius:3px; background:#1a3020; outline:none; cursor:pointer; }
        .le-slider::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%; background:#10b981; cursor:pointer; border:3px solid #050a05; box-shadow:0 0 0 2px #10b981; }
        .le-slider::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background:#10b981; cursor:pointer; border:3px solid #050a05; }
        .cibil-track { height:8px; border-radius:4px; background:linear-gradient(to right,#ef4444 0%,#f97316 25%,#f59e0b 50%,#10b981 75%,#059669 100%); position:relative; margin-bottom:6px; }
      `}</style>

      {/* Loan Type Selector */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px", marginBottom: "24px" }}>
        {LOAN_TYPES.map(l => (
          <button key={l.id} onClick={() => { setLoanTypeId(l.id); setTenure(Math.min(tenure, l.maxTenure)); }}
            style={{
              padding: "12px 8px", borderRadius: "14px", cursor: "pointer", border: "1px solid",
              borderColor: loanTypeId === l.id ? l.color : "#1a2e1a",
              background: loanTypeId === l.id ? `${l.color}20` : "#0d1a0d",
              transition: "all 0.2s", textAlign: "center"
            }}>
            <div style={{ fontSize: "22px", marginBottom: "4px" }}>{l.emoji}</div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: loanTypeId === l.id ? l.color : "#64748b" }}>{l.label}</div>
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div style={{ marginBottom: "24px" }}>
        {sliders.map(s => (
          <div key={s.label} style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label style={{ fontSize: "13px", color: "#94a3b8" }}>{s.label}</label>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#10b981", background: "rgba(16,185,129,0.12)", padding: "3px 12px", borderRadius: "8px" }}>
                {s.display}
              </span>
            </div>
            <input type="range" className="le-slider" min={s.min} max={s.max} step={s.step} value={s.val}
              onChange={e => s.set(Number(e.target.value))} />
          </div>
        ))}
      </div>

      {/* CIBIL Score */}
      <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "16px", padding: "18px", marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <label style={{ fontSize: "13px", color: "#94a3b8" }}>CIBIL / Credit Score</label>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "18px", fontWeight: "800", color: result?.cibilStatus.color || "#fff" }}>{cibil}</span>
            <span style={{ fontSize: "11px", fontWeight: "600", padding: "2px 8px", borderRadius: "6px",
              background: `${result?.cibilStatus.color || "#10b981"}20`,
              color: result?.cibilStatus.color || "#10b981" }}>
              {result?.cibilStatus.label || "Good"}
            </span>
          </div>
        </div>
        <div className="cibil-track" />
        <input type="range" className="le-slider" min={300} max={900} step={10} value={cibil}
          onChange={e => setCibil(Number(e.target.value))} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#334155", marginTop: "4px" }}>
          <span>300 (Bad)</span><span>650</span><span>750</span><span>900 (Excellent)</span>
        </div>
        {cibil < 700 && (
          <p style={{ fontSize: "12px", color: "#f97316", marginTop: "8px", background: "rgba(249,115,22,0.08)", padding: "8px 12px", borderRadius: "8px" }}>
            ⚠️ CIBIL score {cibil} se loan milna mushkil hai। Pehle score improve karein।
          </p>
        )}
      </div>

      {/* Result */}
      {result ? (
        <>
          {/* Main eligibility */}
          <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "20px", padding: "24px", textAlign: "center", marginBottom: "20px" }}>
            <p style={{ fontSize: "12px", color: "#10b981", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
              आप इतने Loan के Eligible हैं
            </p>
            <p style={{ fontSize: "44px", fontWeight: "800", color: "#10b981", letterSpacing: "-1px" }}>{fmtL(result.eligible)}</p>
            <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
              at {lt.rate}% p.a. for {tenure} years
            </p>
          </div>

          {/* Summary cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "20px" }}>
            {[
              { label: "Monthly EMI",    val: fmt(result.monthlyEmi),    color: "#fff"    },
              { label: "Total Interest", val: fmtL(result.totalInterest),color: "#f87171" },
              { label: "Total Payment",  val: fmtL(result.totalPayment), color: "#cbd5e1" },
            ].map(c => (
              <div key={c.label} style={{ background: "#0d1a0d", border: "1px solid #1a2e1a", borderRadius: "14px", padding: "14px", textAlign: "center" }}>
                <p style={{ fontSize: "10px", color: "#64748b", marginBottom: "6px", textTransform: "uppercase" }}>{c.label}</p>
                <p style={{ fontSize: "14px", fontWeight: "700", color: c.color }}>{c.val}</p>
              </div>
            ))}
          </div>

          {/* Tips to increase eligibility */}
          <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "16px", padding: "18px", marginBottom: "16px" }}>
            <p style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
              💡 Eligibility कैसे बढ़ाएं?
            </p>
            {[
              { tip: "Existing EMIs कम करें",      impact: "High",   color: "#10b981" },
              { tip: "CIBIL score 750+ रखें",       impact: "High",   color: "#10b981" },
              { tip: "Tenure बढ़ाएं (EMI कम होगी)", impact: "Medium", color: "#f59e0b" },
              { tip: "Co-applicant add करें",       impact: "High",   color: "#10b981" },
              { tip: "Income proof पूरा दें",        impact: "Medium", color: "#f59e0b" },
            ].map(t => (
              <div key={t.tip} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid #0d1a0d" }}>
                <span style={{ fontSize: "13px", color: "#94a3b8" }}>✦ {t.tip}</span>
                <span style={{ fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "6px",
                  background: `${t.color}15`, color: t.color }}>
                  {t.impact}
                </span>
              </div>
            ))}
          </div>

          {/* Bank comparison */}
          <div style={{ borderRadius: "16px", border: "1px solid #1a2e1a", overflow: "hidden" }}>
            <div style={{ background: "#0d1a0d", padding: "12px 16px", borderBottom: "1px solid #1a2e1a" }}>
              <p style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>Bank-wise Eligibility</p>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
              <thead>
                <tr style={{ background: "#0a0f0a", borderBottom: "1px solid #1a2e1a" }}>
                  {["Bank", "Max Loan", "Approx. EMI"].map(h => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", color: "#475569", fontWeight: "500", fontSize: "10px", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BANKS_DATA.map((b, i) => {
                  const pct   = loanTypeId === "home" ? b.homePct : loanTypeId === "car" ? b.carPct : b.personalPct;
                  const bankL = result.eligible * pct;
                  const r     = lt.rate / 100 / 12;
                  const n     = tenure * 12;
                  const emi   = bankL * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                  return (
                    <tr key={b.name} style={{ borderBottom: "1px solid #0d1a0d" }}>
                      <td style={{ padding: "10px 16px" }}>
                        <span style={{ fontSize: "16px", marginRight: "8px" }}>{b.logo}</span>
                        <span style={{ color: "#cbd5e1", fontWeight: "500" }}>{b.name}</span>
                      </td>
                      <td style={{ padding: "10px 16px", color: "#10b981", fontWeight: "600" }}>{fmtL(bankL)}</td>
                      <td style={{ padding: "10px 16px", color: "#94a3b8" }}>{fmt(emi)}/mo</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "16px", padding: "20px", textAlign: "center" }}>
          <p style={{ color: "#f87171", fontSize: "15px", fontWeight: "600" }}>❌ Loan Eligible Nahi</p>
          <p style={{ color: "#64748b", fontSize: "13px", marginTop: "6px" }}>
            Existing EMIs bahut zyada hain। Pehle kuch EMIs close karein।
          </p>
        </div>
      )}

      <p style={{ fontSize: "11px", color: "#334155", textAlign: "center", marginTop: "14px" }}>
        * Eligibility indicative hai। Final approval bank ke discretion pe hota hai।
      </p>
    </div>
  );
}