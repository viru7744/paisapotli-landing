import React, { useState, useMemo } from "react";

const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const fmtL = (n) => {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + " L";
  return fmt(n);
};

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    const n = years * 12;
    const r = rate / 100 / 12;
    const invested = monthly * n;
    const maturity = r === 0 ? invested : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const gains = maturity - invested;
    return { invested, maturity, gains };
  }, [monthly, rate, years]);

  const chartData = useMemo(() => {
    return Array.from({ length: years }, (_, i) => {
      const yr = i + 1;
      const n = yr * 12;
      const r = rate / 100 / 12;
      const invested = monthly * n;
      const maturity = r === 0 ? invested : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      return { yr, invested, maturity };
    });
  }, [monthly, rate, years]);

  const maxVal = chartData[chartData.length - 1]?.maturity || 1;

  const sliders = [
    { label: "Monthly SIP Amount", val: monthly, set: setMonthly, min: 500, max: 100000, step: 500, display: fmt(monthly) },
    { label: "Expected Return (p.a.)", val: rate, set: setRate, min: 1, max: 30, step: 0.5, display: rate + "%" },
    { label: "Investment Period", val: years, set: setYears, min: 1, max: 40, step: 1, display: years + " Years" },
  ];

  return (
    <div>
      <style>{`
        .sip-slider { -webkit-appearance:none; appearance:none; width:100%; height:6px; border-radius:3px; background:#1a3020; outline:none; cursor:pointer; }
        .sip-slider::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%; background:#10b981; cursor:pointer; border:3px solid #050a05; box-shadow:0 0 0 2px #10b981; }
        .sip-slider::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background:#10b981; cursor:pointer; border:3px solid #050a05; }
        .sip-slider:hover::-webkit-slider-thumb { background:#34d399; }
      `}</style>

      {/* Sliders */}
      <div style={{ marginBottom: "32px" }}>
        {sliders.map((s) => (
          <div key={s.label} style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <label style={{ fontSize: "13px", color: "#94a3b8" }}>{s.label}</label>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#10b981", background: "rgba(16,185,129,0.12)", padding: "3px 12px", borderRadius: "8px" }}>
                {s.display}
              </span>
            </div>
            <input
              type="range"
              className="sip-slider"
              min={s.min} max={s.max} step={s.step} value={s.val}
              onChange={(e) => s.set(Number(e.target.value))}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#334155", marginTop: "5px" }}>
              <span>{s.min}{s.label.includes("Return") ? "%" : s.label.includes("Period") ? " Yr" : ""}{s.label.includes("Amount") ? " ₹" : ""}</span>
              <span>{s.max}{s.label.includes("Return") ? "%" : s.label.includes("Period") ? " Yrs" : ""}{s.label.includes("Amount") ? " ₹" : ""}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Result Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "Total Invested", val: fmtL(result.invested), color: "#cbd5e1", border: "#1a2e1a" },
          { label: "Est. Returns", val: fmtL(result.gains), color: "#10b981", border: "#1a2e1a" },
          { label: "Maturity Value", val: fmtL(result.maturity), color: "#34d399", border: "#166534" },
        ].map((c) => (
          <div key={c.label} style={{ background: "#0d1a0d", border: `1px solid ${c.border}`, borderRadius: "16px", padding: "16px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", color: "#64748b", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.label}</p>
            <p style={{ fontSize: "16px", fontWeight: "700", color: c.color }}>{c.val}</p>
          </div>
        ))}
      </div>

      {/* Split Bar */}
      <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "16px", padding: "20px", marginBottom: "20px" }}>
        <p style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "14px" }}>Investment Split</p>
        {[
          { label: "Invested", pct: (result.invested / result.maturity) * 100, color: "#475569", textColor: "#94a3b8" },
          { label: "Returns", pct: (result.gains / result.maturity) * 100, color: "#10b981", textColor: "#10b981" },
        ].map((b) => (
          <div key={b.label} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "5px" }}>
              <span style={{ color: b.textColor }}>● {b.label}</span>
              <span style={{ color: b.textColor }}>{b.pct.toFixed(1)}%</span>
            </div>
            <div style={{ height: "8px", background: "#1e293b", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${b.pct}%`, background: b.color, borderRadius: "4px", transition: "width 0.5s ease" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "16px", padding: "20px" }}>
        <p style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>Year-by-Year Growth</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "100px" }}>
          {chartData.map((d) => (
            <div key={d.yr} style={{ flex: 1, height: "100%", display: "flex", alignItems: "flex-end" }}>
              <div style={{ width: "100%", position: "relative", height: `${(d.maturity / maxVal) * 100}%`, transition: "height 0.4s ease" }}>
                <div style={{ position: "absolute", inset: 0, background: "rgba(16,185,129,0.25)", borderRadius: "3px 3px 0 0" }} />
                <div style={{ position: "absolute", bottom: 0, width: "100%", height: `${(d.invested / d.maturity) * 100}%`, background: "#334155", borderRadius: "3px 3px 0 0", transition: "height 0.4s ease" }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#334155", marginTop: "6px" }}>
          <span>Yr 1</span><span>Yr {Math.round(years / 2)}</span><span>Yr {years}</span>
        </div>
        <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
          {[{ color: "#334155", label: "Invested" }, { color: "rgba(16,185,129,0.5)", label: "Total Value" }].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "10px", height: "10px", background: l.color, borderRadius: "2px" }} />
              <span style={{ fontSize: "11px", color: "#64748b" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontSize: "11px", color: "#334155", textAlign: "center", marginTop: "14px" }}>* Returns are estimated. Actual returns may vary.</p>
    </div>
  );
}