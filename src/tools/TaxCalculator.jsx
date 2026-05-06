import React, { useState, useMemo } from "react";

const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const fmtL = (n) => {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + " L";
  return fmt(n);
};

const OLD_SLABS = [
  { min: 0,       max: 250000,  rate: 0  },
  { min: 250000,  max: 500000,  rate: 5  },
  { min: 500000,  max: 1000000, rate: 20 },
  { min: 1000000, max: Infinity,rate: 30 },
];
const NEW_SLABS = [
  { min: 0,        max: 300000,  rate: 0  },
  { min: 300000,   max: 600000,  rate: 5  },
  { min: 600000,   max: 900000,  rate: 10 },
  { min: 900000,   max: 1200000, rate: 15 },
  { min: 1200000,  max: 1500000, rate: 20 },
  { min: 1500000,  max: Infinity,rate: 30 },
];

function calcTax(income, slabs) {
  let tax = 0;
  const breakdown = [];
  for (const slab of slabs) {
    if (income <= slab.min) break;
    const taxable = Math.min(income, slab.max) - slab.min;
    const t = (taxable * slab.rate) / 100;
    if (taxable > 0) breakdown.push({ rate: slab.rate, taxable, tax: t });
    tax += t;
  }
  return { tax, breakdown };
}

function totalTax(income, slabs, rebateLimit, rebateMax) {
  let { tax, breakdown } = calcTax(income, slabs);
  const rebate = income <= rebateLimit ? Math.min(tax, rebateMax) : 0;
  tax = Math.max(0, tax - rebate);
  const cess = tax * 0.04;
  const total = tax + cess;
  return { baseTax: tax, cess, total, rebate, breakdown };
}

const DEDUCTIONS = [
  { key: "sec80c",  label: "80C (PPF/ELSS/LIC)",     max: 150000 },
  { key: "sec80d",  label: "80D (Health Insurance)",  max: 50000  },
  { key: "hra",     label: "HRA Exemption",            max: 300000 },
  { key: "homeLoan",label: "Home Loan Interest (24b)", max: 200000 },
  { key: "nps",     label: "80CCD(1B) NPS",            max: 50000  },
];

export default function TaxCalculator() {
  const [income, setIncome] = useState(1000000);
  const [deductions, setDeductions] = useState({ sec80c: 150000, sec80d: 25000, hra: 0, homeLoan: 0, nps: 0 });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const totalDed = Object.values(deductions).reduce((a, b) => a + b, 0) + 50000; // +std deduction
  const oldTaxableIncome = Math.max(0, income - totalDed);
  const newTaxableIncome = Math.max(0, income - 75000); // only std ded in new regime

  const oldTax = useMemo(() => totalTax(oldTaxableIncome, OLD_SLABS, 500000, 12500), [oldTaxableIncome]);
  const newTax = useMemo(() => totalTax(newTaxableIncome, NEW_SLABS, 700000, 25000), [newTaxableIncome]);

  const savings = newTax.total - oldTax.total; // +ve = old is better, -ve = new is better
  const better = savings > 100 ? "old" : savings < -100 ? "new" : "equal";

  const bannerColor = better === "new" ? { bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)", text: "#10b981" }
    : better === "old" ? { bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.3)", text: "#60a5fa" }
    : { bg: "rgba(100,116,139,0.1)", border: "rgba(100,116,139,0.3)", text: "#94a3b8" };

  return (
    <div>
      <style>{`
        .tax-slider { -webkit-appearance:none; appearance:none; width:100%; height:6px; border-radius:3px; background:#1a3020; outline:none; cursor:pointer; }
        .tax-slider::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%; background:#10b981; cursor:pointer; border:3px solid #050a05; box-shadow:0 0 0 2px #10b981; }
        .tax-slider::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background:#10b981; cursor:pointer; border:3px solid #050a05; }
        .tax-ded-slider { -webkit-appearance:none; appearance:none; width:100%; height:4px; border-radius:2px; background:#1a3020; outline:none; cursor:pointer; }
        .tax-ded-slider::-webkit-slider-thumb { -webkit-appearance:none; width:16px; height:16px; border-radius:50%; background:#10b981; cursor:pointer; border:2px solid #050a05; }
        .tax-ded-slider::-moz-range-thumb { width:16px; height:16px; border-radius:50%; background:#10b981; cursor:pointer; border:2px solid #050a05; }
        .toggle-btn { width:100%; padding:12px 16px; background:#0d1a0d; border:1px solid #1a2e1a; border-radius:12px; color:#94a3b8; font-size:12px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; transition:all 0.2s; margin-top:8px; }
        .toggle-btn:hover { border-color:#166534; color:#fff; }
      `}</style>

      {/* Income Slider */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <label style={{ fontSize: "13px", color: "#94a3b8" }}>Annual Gross Income</label>
          <span style={{ fontSize: "15px", fontWeight: "700", color: "#10b981", background: "rgba(16,185,129,0.12)", padding: "3px 14px", borderRadius: "8px" }}>
            {fmtL(income)}
          </span>
        </div>
        <input type="range" className="tax-slider" min={250000} max={10000000} step={50000} value={income}
          onChange={(e) => setIncome(Number(e.target.value))} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#334155", marginTop: "5px" }}>
          <span>₹2.5 L</span><span>₹1 Cr</span>
        </div>
      </div>

      {/* Deductions */}
      <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "16px", padding: "20px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <p style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>Deductions (Old Regime)</p>
          <span style={{ fontSize: "11px", background: "rgba(59,130,246,0.15)", color: "#60a5fa", padding: "2px 8px", borderRadius: "6px" }}>FY 2024–25</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {DEDUCTIONS.map((d) => (
            <div key={d.key}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <label style={{ fontSize: "11px", color: "#64748b" }}>{d.label}</label>
                <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "600" }}>{fmt(deductions[d.key])}</span>
              </div>
              <input type="range" className="tax-ded-slider" min={0} max={d.max} step={1000} value={deductions[d.key]}
                onChange={(e) => setDeductions(p => ({ ...p, [d.key]: Number(e.target.value) }))} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #1a2e1a", display: "flex", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: "12px", color: "#64748b" }}>Standard Deduction (auto): </span>
            <span style={{ fontSize: "12px", color: "#10b981" }}>₹50,000</span>
          </div>
          <div>
            <span style={{ fontSize: "12px", color: "#64748b" }}>Total Deductions: </span>
            <span style={{ fontSize: "13px", color: "#10b981", fontWeight: "700" }}>{fmtL(totalDed)}</span>
          </div>
        </div>
      </div>

      {/* Recommendation Banner */}
      <div style={{ background: bannerColor.bg, border: `1px solid ${bannerColor.border}`, borderRadius: "14px", padding: "16px 20px", marginBottom: "20px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <span style={{ fontSize: "20px", flexShrink: 0 }}>
          {better === "new" ? "✅" : better === "old" ? "✅" : "⚖️"}
        </span>
        <div>
          <p style={{ fontSize: "14px", fontWeight: "700", color: bannerColor.text }}>
            {better === "new"
              ? `New Regime बेहतर है — ${fmtL(Math.abs(savings))} की बचत होगी`
              : better === "old"
              ? `Old Regime बेहतर है — ${fmtL(Math.abs(savings))} की बचत होगी`
              : "दोनों regime में tax लगभग समान है"}
          </p>
          <p style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
            {better === "new"
              ? "आपकी deductions कम हैं। New Regime में tax कम लगेगा।"
              : better === "old"
              ? "आपकी deductions ज़्यादा हैं। Old Regime फायदेमंद है।"
              : "आप कोई भी regime चुन सकते हैं।"}
          </p>
        </div>
      </div>

      {/* Side-by-side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
        {[
          { label: "Old Regime", taxable: oldTaxableIncome, data: oldTax, isBetter: better === "old", color: "#60a5fa", borderColor: better === "old" ? "#1d4ed8" : "#1a2e1a", show: showOld, setShow: setShowOld },
          { label: "New Regime", taxable: newTaxableIncome, data: newTax, isBetter: better === "new", color: "#10b981", borderColor: better === "new" ? "#166534" : "#1a2e1a", show: showNew, setShow: setShowNew },
        ].map((r) => (
          <div key={r.label} style={{ background: "#0a0f0a", border: `1px solid ${r.borderColor}`, borderRadius: "16px", padding: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <p style={{ fontSize: "11px", fontWeight: "700", color: r.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{r.label}</p>
              {r.isBetter && (
                <span style={{ fontSize: "10px", background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "2px 8px", borderRadius: "6px" }}>Best ✓</span>
              )}
            </div>

            <p style={{ fontSize: "10px", color: "#475569", marginBottom: "2px" }}>Taxable Income</p>
            <p style={{ fontSize: "13px", fontWeight: "600", color: "#cbd5e1", marginBottom: "14px" }}>{fmtL(r.taxable)}</p>

            <div style={{ fontSize: "12px" }}>
              {[
                { label: "Base Tax", val: fmt(r.data.baseTax), color: "#fff" },
                ...(r.data.rebate > 0 ? [{ label: "Rebate 87A", val: "-" + fmt(r.data.rebate), color: "#10b981" }] : []),
                { label: "Cess (4%)", val: fmt(r.data.cess), color: "#fff" },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #0f1f0f" }}>
                  <span style={{ color: "#64748b" }}>{row.label}</span>
                  <span style={{ color: row.color }}>{row.val}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 4px", borderTop: "1px solid #1a2e1a", marginTop: "4px" }}>
                <span style={{ color: "#cbd5e1", fontWeight: "600" }}>Total Tax</span>
                <span style={{ color: r.color, fontWeight: "800", fontSize: "16px" }}>{fmtL(r.data.total)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}>
                <span style={{ color: "#475569", fontSize: "11px" }}>Effective Rate</span>
                <span style={{ color: "#94a3b8", fontSize: "11px" }}>{income > 0 ? ((r.data.total / income) * 100).toFixed(2) : 0}%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}>
                <span style={{ color: "#475569", fontSize: "11px" }}>Monthly In-hand</span>
                <span style={{ color: "#94a3b8", fontSize: "11px" }}>{fmtL((income - r.data.total) / 12)}</span>
              </div>
            </div>

            <button className="toggle-btn" onClick={() => r.setShow(p => !p)}>
              <span>Slab Breakdown</span><span>{r.show ? "▲" : "▼"}</span>
            </button>

            {r.show && (
              <div style={{ marginTop: "8px" }}>
                {r.data.breakdown.length === 0
                  ? <p style={{ fontSize: "11px", color: "#475569", textAlign: "center", padding: "8px" }}>No tax applicable</p>
                  : r.data.breakdown.map((b, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", background: "#0d1a0d", borderRadius: "8px", padding: "8px 12px", marginBottom: "4px", fontSize: "11px" }}>
                      <span style={{ color: "#64748b" }}>{b.rate}% on {fmtL(b.taxable)}</span>
                      <span style={{ color: "#fff" }}>{fmt(b.tax)}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison Bar */}
      <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "16px", padding: "20px", marginBottom: "16px" }}>
        <p style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "14px" }}>Tax Comparison</p>
        {[
          { label: "Old Regime", val: oldTax.total, color: "#3b82f6" },
          { label: "New Regime", val: newTax.total, color: "#10b981" },
        ].map((b) => {
          const maxTax = Math.max(oldTax.total, newTax.total, 1);
          return (
            <div key={b.label} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "5px" }}>
                <span style={{ color: "#94a3b8" }}>{b.label}</span>
                <span style={{ color: "#fff", fontWeight: "600" }}>{fmtL(b.val)}</span>
              </div>
              <div style={{ height: "10px", background: "#1e293b", borderRadius: "5px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(b.val / maxTax) * 100}%`, background: b.color, borderRadius: "5px", transition: "width 0.6s ease" }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {[
          { title: "Old Regime में", color: "#60a5fa", points: ["80C: ₹1.5L deduction", "HRA + Home Loan benefit", "ज़्यादा deductions = फायदा"] },
          { title: "New Regime में", color: "#10b981", points: ["सिर्फ ₹75,000 std. deduction", "कोई 80C/HRA नहीं", "Lower slabs, simple & easy"] },
        ].map((c) => (
          <div key={c.title} style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "14px", padding: "16px" }}>
            <p style={{ fontSize: "12px", fontWeight: "700", color: c.color, marginBottom: "10px" }}>{c.title}</p>
            {c.points.map((p) => (
              <div key={p} style={{ display: "flex", gap: "8px", marginBottom: "5px" }}>
                <span style={{ color: c.color, fontSize: "11px", flexShrink: 0 }}>•</span>
                <span style={{ fontSize: "11px", color: "#64748b" }}>{p}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <p style={{ fontSize: "11px", color: "#334155", textAlign: "center", marginTop: "16px" }}>
        * Based on FY 2024–25 tax slabs. Consult a CA for accurate tax planning.
      </p>
    </div>
  );
}