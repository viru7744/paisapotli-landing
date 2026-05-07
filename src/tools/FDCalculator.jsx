import React, { useState, useMemo } from "react";

const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const fmtL = (n) => {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000)   return "₹" + (n / 100000).toFixed(2) + " L";
  return fmt(n);
};

// FD Rates — FY 2025 (General / Senior Citizen)
const BANKS = [
  { name: "SBI",            type: "PSU",     general: 6.80, senior: 7.30, logo: "🏦" },
  { name: "HDFC Bank",      type: "Private", general: 7.10, senior: 7.60, logo: "🏛️" },
  { name: "ICICI Bank",     type: "Private", general: 7.10, senior: 7.60, logo: "🏛️" },
  { name: "Axis Bank",      type: "Private", general: 7.10, senior: 7.75, logo: "🏛️" },
  { name: "Kotak Mahindra", type: "Private", general: 7.10, senior: 7.60, logo: "🏛️" },
  { name: "Bank of Baroda", type: "PSU",     general: 7.15, senior: 7.65, logo: "🏦" },
  { name: "Punjab National",type: "PSU",     general: 6.80, senior: 7.30, logo: "🏦" },
  { name: "Canara Bank",    type: "PSU",     general: 6.90, senior: 7.40, logo: "🏦" },
  { name: "Yes Bank",       type: "Private", general: 7.75, senior: 8.25, logo: "🏛️" },
  { name: "IndusInd Bank",  type: "Private", general: 7.75, senior: 8.25, logo: "🏛️" },
  { name: "IDFC First",     type: "Private", general: 7.75, senior: 8.25, logo: "🏛️" },
  { name: "AU Small Finance",type: "SFB",    general: 8.00, senior: 8.50, logo: "🏢" },
  { name: "Ujjivan SFB",    type: "SFB",     general: 8.25, senior: 8.75, logo: "🏢" },
  { name: "Jana SFB",       type: "SFB",     general: 8.25, senior: 8.75, logo: "🏢" },
];

const TENURES = [
  { label: "1 Year",   months: 12  },
  { label: "2 Years",  months: 24  },
  { label: "3 Years",  months: 36  },
  { label: "5 Years",  months: 60  },
];

const typeColors = {
  PSU:     { bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.3)",  text: "#60a5fa",  badge: "PSU"     },
  Private: { bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.3)",  text: "#10b981",  badge: "Private" },
  SFB:     { bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.3)",  text: "#f59e0b",  badge: "SFB"     },
};

export default function FDCalculator() {
  const [amount, setAmount]       = useState(100000);
  const [tenureIdx, setTenureIdx] = useState(0);
  const [isSenior, setIsSenior]   = useState(false);
  const [filter, setFilter]       = useState("all");
  const [sortBy, setSortBy]       = useState("rate"); // rate | name | maturity

  const tenure = TENURES[tenureIdx];

  const calcMaturity = (rate) => {
    // Compound quarterly
    const r = rate / 100 / 4;
    const n = (tenure.months / 12) * 4;
    return amount * Math.pow(1 + r, n);
  };

  const results = useMemo(() => {
    return BANKS
      .filter(b => filter === "all" || b.type === filter)
      .map(b => {
        const rate     = isSenior ? b.senior : b.general;
        const maturity = calcMaturity(rate);
        const interest = maturity - amount;
        return { ...b, rate, maturity, interest };
      })
      .sort((a, b) => {
        if (sortBy === "rate")     return b.rate - a.rate;
        if (sortBy === "maturity") return b.maturity - a.maturity;
        return a.name.localeCompare(b.name);
      });
  }, [amount, tenureIdx, isSenior, filter, sortBy]);

  const best = results[0];
  const worst = results[results.length - 1];

  return (
    <div>
      <style>{`
        .fd-slider { -webkit-appearance:none; appearance:none; width:100%; height:6px; border-radius:3px; background:#1a3020; outline:none; cursor:pointer; }
        .fd-slider::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%; background:#10b981; cursor:pointer; border:3px solid #050a05; box-shadow:0 0 0 2px #10b981; }
        .fd-slider::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background:#10b981; cursor:pointer; border:3px solid #050a05; }
        .fd-tab { padding:7px 16px; border-radius:20px; font-size:12px; font-weight:600; cursor:pointer; border:1px solid #1a2e1a; background:transparent; color:#64748b; transition:all 0.2s; }
        .fd-tab:hover { color:#fff; border-color:#334155; }
        .fd-tab.active { background:#10b981; border-color:#10b981; color:#fff; }
        .fd-row:hover td { background:#0d1a0d; }
        .toggle-switch { position:relative; display:inline-block; width:44px; height:24px; }
        .toggle-switch input { opacity:0; width:0; height:0; }
        .toggle-slider { position:absolute; cursor:pointer; inset:0; background:#1a3020; border-radius:24px; transition:0.3s; }
        .toggle-slider:before { content:""; position:absolute; height:18px; width:18px; left:3px; bottom:3px; background:#64748b; border-radius:50%; transition:0.3s; }
        input:checked + .toggle-slider { background:#10b981; }
        input:checked + .toggle-slider:before { transform:translateX(20px); background:#fff; }
      `}</style>

      {/* Amount Slider */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <label style={{ fontSize: "13px", color: "#94a3b8" }}>FD Amount</label>
          <span style={{ fontSize: "15px", fontWeight: "700", color: "#10b981", background: "rgba(16,185,129,0.12)", padding: "3px 14px", borderRadius: "8px" }}>
            {fmtL(amount)}
          </span>
        </div>
        <input type="range" className="fd-slider" min={10000} max={5000000} step={10000} value={amount}
          onChange={e => setAmount(Number(e.target.value))} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#334155", marginTop: "5px" }}>
          <span>₹10,000</span><span>₹50 Lakh</span>
        </div>
      </div>

      {/* Tenure + Senior toggle */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {TENURES.map((t, i) => (
            <button key={t.label} className={`fd-tab ${tenureIdx === i ? "active" : ""}`}
              onClick={() => setTenureIdx(i)}>
              {t.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "13px", color: "#94a3b8" }}>Senior Citizen</span>
          <label className="toggle-switch">
            <input type="checkbox" checked={isSenior} onChange={e => setIsSenior(e.target.checked)} />
            <span className="toggle-slider" />
          </label>
          {isSenior && <span style={{ fontSize: "11px", color: "#10b981", background: "rgba(16,185,129,0.1)", padding: "2px 8px", borderRadius: "6px" }}>+0.50%</span>}
        </div>
      </div>

      {/* Best vs Rest highlight */}
      {best && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
          <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "16px", padding: "16px" }}>
            <p style={{ fontSize: "11px", color: "#10b981", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>🏆 Best Rate</p>
            <p style={{ fontSize: "16px", fontWeight: "700", color: "#fff", marginBottom: "2px" }}>{best.name}</p>
            <p style={{ fontSize: "22px", fontWeight: "800", color: "#10b981" }}>{best.rate}%</p>
            <p style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>Maturity: <span style={{ color: "#a7f3d0" }}>{fmtL(best.maturity)}</span></p>
          </div>
          <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "16px", padding: "16px" }}>
            <p style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>📊 Extra Earnings</p>
            <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "4px" }}>Best vs SBI</p>
            <p style={{ fontSize: "20px", fontWeight: "800", color: "#f59e0b" }}>
              +{fmtL(best.maturity - (results.find(r => r.name === "SBI")?.maturity || best.maturity))}
            </p>
            <p style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>in {tenure.label}</p>
          </div>
        </div>
      )}

      {/* Filter + Sort */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          {[["all","सभी"], ["PSU","PSU Banks"], ["Private","Private"], ["SFB","Small Finance"]].map(([val, label]) => (
            <button key={val} className={`fd-tab ${filter === val ? "active" : ""}`}
              style={{ fontSize: "11px", padding: "5px 12px" }}
              onClick={() => setFilter(val)}>
              {label}
            </button>
          ))}
        </div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "10px", padding: "6px 12px", color: "#94a3b8", fontSize: "12px", cursor: "pointer", outline: "none" }}>
          <option value="rate">Sort: Best Rate</option>
          <option value="maturity">Sort: Maturity</option>
          <option value="name">Sort: Bank Name</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ borderRadius: "16px", border: "1px solid #1a2e1a", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "#0d1a0d", borderBottom: "1px solid #1a2e1a" }}>
              {["Bank", "Type", "Interest Rate", "Interest Earned", "Maturity Amount"].map(h => (
                <th key={h} style={{ padding: "11px 16px", textAlign: "left", color: "#475569", fontWeight: "500", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((b, i) => {
              const tc = typeColors[b.type];
              const isBest = i === 0;
              return (
                <tr key={b.name} className="fd-row" style={{ borderBottom: "1px solid #0d1a0d", background: isBest ? "rgba(16,185,129,0.03)" : "transparent" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "20px" }}>{b.logo}</span>
                      <div>
                        <span style={{ color: "#fff", fontWeight: "600", fontSize: "13px" }}>{b.name}</span>
                        {isBest && <span style={{ display: "block", fontSize: "10px", color: "#10b981" }}>🏆 Best Rate</span>}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: "11px", fontWeight: "600", padding: "2px 8px", borderRadius: "6px", background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}>
                      {tc.badge}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: "16px", fontWeight: "800", color: isBest ? "#10b981" : "#fff" }}>{b.rate}%</span>
                    <span style={{ fontSize: "10px", color: "#475569", display: "block" }}>p.a.</span>
                  </td>
                  <td style={{ padding: "12px 16px", color: "#10b981", fontWeight: "600" }}>+{fmtL(b.interest)}</td>
                  <td style={{ padding: "12px 16px", color: "#fff", fontWeight: "700" }}>{fmtL(b.maturity)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: "11px", color: "#334155", textAlign: "center", marginTop: "14px" }}>
        * Rates are indicative for 1-3 year tenure (FY 2025). Verify with your bank before investing. Compounded quarterly.
      </p>
    </div>
  );
}