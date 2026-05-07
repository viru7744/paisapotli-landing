import React, { useState, useMemo } from "react";

const fmt  = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const fmtL = (n) => {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000)   return "₹" + (n / 100000).toFixed(2) + " L";
  return fmt(n);
};

const GOALS = [
  { id: "car",       label: "New Car",          emoji: "🚗", defaultAmt: 800000,   defaultYrs: 3,  color: "#3b82f6"  },
  { id: "house",     label: "Dream House",      emoji: "🏠", defaultAmt: 5000000,  defaultYrs: 10, color: "#10b981"  },
  { id: "vacation",  label: "Vacation",         emoji: "✈️", defaultAmt: 200000,   defaultYrs: 2,  color: "#f59e0b"  },
  { id: "wedding",   label: "Wedding",          emoji: "💍", defaultAmt: 1500000,  defaultYrs: 3,  color: "#ec4899"  },
  { id: "education", label: "Child Education",  emoji: "🎓", defaultAmt: 2000000,  defaultYrs: 15, color: "#8b5cf6"  },
  { id: "retire",    label: "Retirement",       emoji: "🌴", defaultAmt: 10000000, defaultYrs: 25, color: "#14b8a6"  },
  { id: "emergency", label: "Emergency Fund",   emoji: "🛡️", defaultAmt: 300000,   defaultYrs: 2,  color: "#f97316"  },
  { id: "custom",    label: "Custom Goal",      emoji: "🎯", defaultAmt: 500000,   defaultYrs: 5,  color: "#94a3b8"  },
];

const INVEST_OPTIONS = [
  { label: "Savings A/c",   rate: 3.5,  risk: "Zero",   color: "#64748b" },
  { label: "FD",            rate: 7.0,  risk: "Low",    color: "#3b82f6" },
  { label: "Debt Mutual Fund", rate: 8.0, risk: "Low",  color: "#6366f1" },
  { label: "Balanced Fund", rate: 11.0, risk: "Medium", color: "#f59e0b" },
  { label: "Equity SIP",    rate: 13.0, risk: "High",   color: "#10b981" },
  { label: "Small Cap",     rate: 16.0, risk: "V.High", color: "#ec4899" },
];

export default function GoalPlanner() {
  const [goalId, setGoalId]         = useState("car");
  const [goalName, setGoalName]     = useState("");
  const [targetAmt, setTargetAmt]   = useState(800000);
  const [years, setYears]           = useState(3);
  const [alreadySaved, setAlreadySaved] = useState(0);
  const [investIdx, setInvestIdx]   = useState(3);
  const [inflation, setInflation]   = useState(true);

  const goal = GOALS.find(g => g.id === goalId);
  const invest = INVEST_OPTIONS[investIdx];

  const selectGoal = (g) => {
    setGoalId(g.id);
    setTargetAmt(g.defaultAmt);
    setYears(g.defaultYrs);
  };

  const result = useMemo(() => {
    const inflationRate  = inflation ? 0.06 : 0;
    const inflatedTarget = targetAmt * Math.pow(1 + inflationRate, years);
    const remaining      = Math.max(0, inflatedTarget - alreadySaved * Math.pow(1 + invest.rate / 100, years));

    const r = invest.rate / 100 / 12;
    const n = years * 12;

    // Monthly SIP needed
    const monthlySip = r === 0
      ? remaining / n
      : remaining * r / (Math.pow(1 + r, n) - 1);

    // Lumpsum needed today
    const lumpsum = inflatedTarget / Math.pow(1 + invest.rate / 100, years);

    // If already saving 0 — what will existing savings grow to
    const savedGrowth = alreadySaved * Math.pow(1 + invest.rate / 100, years);

    // Progress if doing monthly SIP
    const totalInvested   = monthlySip * n + alreadySaved;
    const totalReturns    = inflatedTarget - totalInvested;
    const progressPct     = Math.min(100, (alreadySaved / inflatedTarget) * 100);

    // Year by year milestones
    const milestones = [0.25, 0.5, 0.75, 1].map(pct => {
      const targetYear = inflatedTarget * pct;
      let corpus = alreadySaved;
      let months = 0;
      while (corpus < targetYear && months < n) {
        corpus = corpus * (1 + r) + monthlySip;
        months++;
      }
      return { pct: pct * 100, months: Math.ceil(months), corpus: targetYear };
    });

    return { inflatedTarget, monthlySip, lumpsum, savedGrowth, totalInvested, totalReturns, progressPct, milestones };
  }, [targetAmt, years, alreadySaved, investIdx, inflation, invest.rate]);

  const sliders = [
    { label: "Goal Amount",        val: targetAmt,    set: setTargetAmt,    min: 50000,  max: 20000000, step: 50000, display: fmtL(targetAmt)    },
    { label: "Time to Achieve",    val: years,        set: setYears,        min: 1,      max: 30,       step: 1,     display: years + " Years"    },
    { label: "Already Saved",      val: alreadySaved, set: setAlreadySaved, min: 0,      max: targetAmt, step: 10000, display: fmtL(alreadySaved) },
  ];

  return (
    <div>
      <style>{`
        .gp-slider { -webkit-appearance:none; appearance:none; width:100%; height:6px; border-radius:3px; background:#1a3020; outline:none; cursor:pointer; }
        .gp-slider::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%; background:#10b981; cursor:pointer; border:3px solid #050a05; box-shadow:0 0 0 2px #10b981; }
        .gp-slider::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background:#10b981; cursor:pointer; border:3px solid #050a05; }
        .gp-goal:hover { border-color:#166534 !important; transform:translateY(-2px); }
        .toggle-sw { position:relative; display:inline-block; width:40px; height:22px; }
        .toggle-sw input { opacity:0; width:0; height:0; }
        .toggle-sl { position:absolute; cursor:pointer; inset:0; background:#1a3020; border-radius:22px; transition:0.3s; }
        .toggle-sl:before { content:""; position:absolute; height:16px; width:16px; left:3px; bottom:3px; background:#64748b; border-radius:50%; transition:0.3s; }
        input:checked + .toggle-sl { background:#10b981; }
        input:checked + .toggle-sl:before { transform:translateX(18px); background:#fff; }
      `}</style>

      {/* Goal Type Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px", marginBottom: "24px" }}>
        {GOALS.map(g => (
          <button key={g.id} className="gp-goal"
            onClick={() => selectGoal(g)}
            style={{
              padding: "12px 8px", borderRadius: "14px", cursor: "pointer", border: "1px solid",
              borderColor: goalId === g.id ? g.color : "#1a2e1a",
              background: goalId === g.id ? `${g.color}18` : "#0d1a0d",
              transition: "all 0.2s", textAlign: "center"
            }}>
            <div style={{ fontSize: "22px", marginBottom: "4px" }}>{g.emoji}</div>
            <div style={{ fontSize: "10px", fontWeight: "700", color: goalId === g.id ? g.color : "#64748b" }}>{g.label}</div>
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div style={{ marginBottom: "20px" }}>
        {sliders.map(s => (
          <div key={s.label} style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label style={{ fontSize: "13px", color: "#94a3b8" }}>{s.label}</label>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#10b981", background: "rgba(16,185,129,0.12)", padding: "3px 12px", borderRadius: "8px" }}>
                {s.display}
              </span>
            </div>
            <input type="range" className="gp-slider" min={s.min} max={s.max} step={s.step} value={s.val}
              onChange={e => s.set(Number(e.target.value))} />
          </div>
        ))}
      </div>

      {/* Investment type + Inflation toggle */}
      <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "16px", padding: "18px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <p style={{ fontSize: "13px", color: "#94a3b8" }}>Investment Option</p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "#64748b" }}>Inflation (6%)</span>
            <label className="toggle-sw">
              <input type="checkbox" checked={inflation} onChange={e => setInflation(e.target.checked)} />
              <span className="toggle-sl" />
            </label>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px" }}>
          {INVEST_OPTIONS.map((opt, i) => (
            <button key={opt.label} onClick={() => setInvestIdx(i)}
              style={{
                padding: "10px 8px", borderRadius: "12px", cursor: "pointer", border: "1px solid",
                borderColor: investIdx === i ? opt.color : "#1a2e1a",
                background: investIdx === i ? `${opt.color}15` : "transparent",
                transition: "all 0.2s", textAlign: "center"
              }}>
              <div style={{ fontSize: "14px", fontWeight: "800", color: investIdx === i ? opt.color : "#fff" }}>{opt.rate}%</div>
              <div style={{ fontSize: "10px", color: "#64748b", marginTop: "2px" }}>{opt.label}</div>
              <div style={{ fontSize: "9px", color: investIdx === i ? opt.color : "#334155", marginTop: "1px" }}>{opt.risk} Risk</div>
            </button>
          ))}
        </div>
      </div>

      {/* RESULT */}
      {/* Inflation adjusted target */}
      {inflation && (
        <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "14px", padding: "12px 16px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "13px", color: "#94a3b8" }}>🔥 Inflation के बाद {years} साल में actual cost</span>
          <span style={{ fontSize: "16px", fontWeight: "800", color: "#f59e0b" }}>{fmtL(result.inflatedTarget)}</span>
        </div>
      )}

      {/* Main result card */}
      <div style={{ background: `${goal.color}10`, border: `1px solid ${goal.color}40`, borderRadius: "20px", padding: "24px", textAlign: "center", marginBottom: "20px" }}>
        <p style={{ fontSize: "12px", color: goal.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
          {goal.emoji} {goal.label} — हर महीने invest करो
        </p>
        <p style={{ fontSize: "48px", fontWeight: "800", color: goal.color, letterSpacing: "-2px", lineHeight: 1 }}>
          {fmtL(result.monthlySip)}
        </p>
        <p style={{ fontSize: "13px", color: "#64748b", marginTop: "6px" }}>
          per month in {invest.label} ({invest.rate}% returns)
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "20px" }}>
        {[
          { label: "Lumpsum Option",    val: fmtL(result.lumpsum),      color: "#fff",     sub: "invest today" },
          { label: "Total Invested",    val: fmtL(result.totalInvested), color: "#cbd5e1",  sub: "SIP + savings" },
          { label: "Wealth Gained",     val: fmtL(result.totalReturns),  color: "#10b981",  sub: "pure returns" },
        ].map(c => (
          <div key={c.label} style={{ background: "#0d1a0d", border: "1px solid #1a2e1a", borderRadius: "14px", padding: "14px", textAlign: "center" }}>
            <p style={{ fontSize: "10px", color: "#64748b", marginBottom: "4px", textTransform: "uppercase" }}>{c.label}</p>
            <p style={{ fontSize: "14px", fontWeight: "700", color: c.color }}>{c.val}</p>
            <p style={{ fontSize: "10px", color: "#334155", marginTop: "2px" }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Progress bar if already saved */}
      {alreadySaved > 0 && (
        <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "16px", padding: "18px", marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", color: "#94a3b8" }}>Goal Progress</span>
            <span style={{ fontSize: "13px", fontWeight: "700", color: goal.color }}>{result.progressPct.toFixed(1)}%</span>
          </div>
          <div style={{ height: "10px", background: "#1e293b", borderRadius: "5px", overflow: "hidden", marginBottom: "6px" }}>
            <div style={{ height: "100%", width: `${result.progressPct}%`, background: goal.color, borderRadius: "5px", transition: "width 0.6s ease" }} />
          </div>
          <p style={{ fontSize: "11px", color: "#475569" }}>
            Already saved: {fmtL(alreadySaved)} → Grow karega to {fmtL(result.savedGrowth)} in {years} years
          </p>
        </div>
      )}

      {/* Milestone Timeline */}
      <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "16px", padding: "18px" }}>
        <p style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "14px" }}>
          🗓️ Milestone Timeline
        </p>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "11px", top: "8px", bottom: "8px", width: "2px", background: "#1a2e1a" }} />
          {result.milestones.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "14px", position: "relative" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: m.pct === 100 ? goal.color : "#0d1a0d", border: `2px solid ${m.pct === 100 ? goal.color : "#1a2e1a"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
                <span style={{ fontSize: "10px", color: m.pct === 100 ? "#fff" : "#64748b", fontWeight: "700" }}>{m.pct}%</span>
              </div>
              <div style={{ background: "#0d1a0d", borderRadius: "10px", padding: "8px 14px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                    {m.pct === 100 ? "🎉 Goal Achieved!" : `${fmtL(m.corpus)} ready`}
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: "700", color: goal.color }}>
                    {m.months < 12 ? `${m.months}m` : `${Math.floor(m.months / 12)}y ${m.months % 12}m`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: "11px", color: "#334155", textAlign: "center", marginTop: "14px" }}>
        * Returns are estimated. Invest according to your risk profile.
      </p>
    </div>
  );
}