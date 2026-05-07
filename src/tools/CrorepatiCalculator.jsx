import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fmtL = (n) => {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000)   return "₹" + (n / 100000).toFixed(2) + " L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
};
const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

const MILESTONES = [
  { label: "10 Lakh",   amount: 1000000,   emoji: "🌱" },
  { label: "25 Lakh",   amount: 2500000,   emoji: "💰" },
  { label: "50 Lakh",   amount: 5000000,   emoji: "💎" },
  { label: "1 Crore",   amount: 10000000,  emoji: "🏆" },
  { label: "5 Crore",   amount: 50000000,  emoji: "🚀" },
  { label: "10 Crore",  amount: 100000000, emoji: "👑" },
];

export default function CrorepatiCalculator() {
  const [monthly, setMonthly]       = useState(10000);
  const [rate, setRate]             = useState(12);
  const [existing, setExisting]     = useState(0);
  const [target, setTarget]         = useState(10000000);
  const [stepUp, setStepUp]         = useState(10); // annual step-up %

  const result = useMemo(() => {
    const r = rate / 100 / 12;
    let corpus = existing;
    let months = 0;
    let sip = monthly;
    const milestoneResults = [];
    const milestoneSet = new Set(MILESTONES.map(m => m.amount));
    const yearlyData = [];

    // Calculate month by month
    while (months < 600 && corpus < target * 2) {
      // Step up SIP annually
      if (months > 0 && months % 12 === 0) {
        sip = sip * (1 + stepUp / 100);
        yearlyData.push({ year: months / 12, corpus, sip });
      }
      corpus = corpus * (1 + r) + sip;
      months++;

      // Check milestones
      MILESTONES.forEach(m => {
        if (corpus >= m.amount && !milestoneResults.find(mr => mr.amount === m.amount)) {
          milestoneResults.push({ ...m, months, years: (months / 12).toFixed(1) });
        }
      });

      if (corpus >= target) break;
    }

    const targetMilestone = milestoneResults.find(m => m.amount >= target);
    const yearsNeeded = targetMilestone ? parseFloat(targetMilestone.years) : null;
    const totalInvested = yearsNeeded ? monthly * 12 * yearsNeeded * (1 + stepUp / 100 / 2) : null;
    const wealthGained = yearsNeeded ? target - totalInvested : null;

    // Without step-up comparison
    let corpusNoStepUp = existing;
    let monthsNoStepUp = 0;
    while (monthsNoStepUp < 600) {
      corpusNoStepUp = corpusNoStepUp * (1 + r) + monthly;
      monthsNoStepUp++;
      if (corpusNoStepUp >= target) break;
    }
    const yearsNoStepUp = (monthsNoStepUp / 12).toFixed(1);

    return { milestoneResults, yearsNeeded, totalInvested, wealthGained, yearsNoStepUp, yearlyData: yearlyData.slice(0, 20) };
  }, [monthly, rate, existing, target, stepUp]);

  const sliders = [
    { label: "Monthly SIP",        val: monthly,  set: setMonthly,  min: 1000,   max: 100000, step: 1000,  display: fmt(monthly)   },
    { label: "Expected Return",     val: rate,     set: setRate,     min: 6,      max: 25,     step: 0.5,   display: rate + "% p.a." },
    { label: "Already Saved",       val: existing, set: setExisting, min: 0,      max: 5000000,step: 50000, display: fmtL(existing) },
    { label: "Annual SIP Step-Up",  val: stepUp,   set: setStepUp,   min: 0,      max: 30,     step: 5,     display: stepUp + "% p.a." },
  ];

  const targetMilestone = result.milestoneResults.find(m => m.amount >= target);

  return (
    <div>
      <style>{`
        .cr-slider { -webkit-appearance:none; appearance:none; width:100%; height:6px; border-radius:3px; background:#1a3020; outline:none; cursor:pointer; }
        .cr-slider::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%; background:#f59e0b; cursor:pointer; border:3px solid #050a05; box-shadow:0 0 0 2px #f59e0b; }
        .cr-slider::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background:#f59e0b; cursor:pointer; border:3px solid #050a05; }
        .target-btn { padding:10px 14px; border-radius:12px; cursor:pointer; border:1px solid #1a2e1a; font-size:12px; font-weight:600; transition:all 0.2s; background:#0d1a0d; color:#64748b; text-align:center; }
        .target-btn.active { background:rgba(245,158,11,0.15); border-color:#d97706; color:#f59e0b; }
        .target-btn:hover:not(.active) { border-color:#334155; color:#fff; }
      `}</style>

      {/* Target Selection */}
      <div style={{ marginBottom: "22px" }}>
        <p style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>आपका Target</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px" }}>
          {MILESTONES.map(m => (
            <button key={m.amount} className={`target-btn ${target === m.amount ? "active" : ""}`}
              onClick={() => setTarget(m.amount)}>
              <span style={{ fontSize: "18px", display: "block", marginBottom: "3px" }}>{m.emoji}</span>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div style={{ marginBottom: "24px" }}>
        {sliders.map(s => (
          <div key={s.label} style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label style={{ fontSize: "13px", color: "#94a3b8" }}>{s.label}</label>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#f59e0b", background: "rgba(245,158,11,0.12)", padding: "3px 12px", borderRadius: "8px" }}>
                {s.display}
              </span>
            </div>
            <input type="range" className="cr-slider" min={s.min} max={s.max} step={s.step} value={s.val}
              onChange={e => s.set(Number(e.target.value))} />
          </div>
        ))}
      </div>

      {/* MAIN RESULT */}
      {targetMilestone ? (
        <motion.div key={`${monthly}-${rate}-${target}-${stepUp}`}
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>

          {/* Hero Result */}
          <div style={{ background: "linear-gradient(135deg,rgba(245,158,11,0.12),rgba(16,185,129,0.08))", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "20px", padding: "24px", textAlign: "center", marginBottom: "18px" }}>
            <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>
              {fmt(monthly)}/month SIP से {fmtL(target)} बनने में
            </p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "8px", marginBottom: "6px" }}>
              <span style={{ fontSize: "64px", fontWeight: "900", color: "#f59e0b", letterSpacing: "-3px", lineHeight: 1 }}>
                {targetMilestone.years}
              </span>
              <span style={{ fontSize: "24px", fontWeight: "700", color: "#d97706" }}>साल</span>
            </div>
            <p style={{ fontSize: "14px", color: "#64748b" }}>
              {stepUp > 0 ? `${stepUp}% annual step-up के साथ vs ${result.yearsNoStepUp} साल बिना step-up` : `${result.yearsNoStepUp} साल`}
            </p>
            {stepUp > 0 && parseFloat(result.yearsNoStepUp) > parseFloat(targetMilestone.years) && (
              <div style={{ marginTop: "10px", background: "rgba(16,185,129,0.1)", borderRadius: "10px", padding: "8px 14px", display: "inline-block" }}>
                <span style={{ fontSize: "13px", color: "#10b981", fontWeight: "600" }}>
                  ⚡ Step-up से {(parseFloat(result.yearsNoStepUp) - parseFloat(targetMilestone.years)).toFixed(1)} साल पहले!
                </span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "18px" }}>
            {[
              { label: "Total SIP Invested", val: fmtL(result.totalInvested || 0), color: "#94a3b8" },
              { label: "Wealth Gained",      val: fmtL(Math.max(0, (result.wealthGained || 0))), color: "#10b981" },
              { label: "Target Corpus",      val: fmtL(target), color: "#f59e0b" },
            ].map(c => (
              <div key={c.label} style={{ background: "#0d1a0d", border: "1px solid #1a2e1a", borderRadius: "14px", padding: "14px", textAlign: "center" }}>
                <p style={{ fontSize: "10px", color: "#475569", margin: "0 0 5px", textTransform: "uppercase" }}>{c.label}</p>
                <p style={{ fontSize: "14px", fontWeight: "700", color: c.color, margin: 0 }}>{c.val}</p>
              </div>
            ))}
          </div>

          {/* Milestone Timeline */}
          <div style={{ background: "#0a0f0a", border: "1px solid #1a2e1a", borderRadius: "18px", padding: "20px", marginBottom: "16px" }}>
            <p style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
              🗓️ Wealth Journey — Milestones
            </p>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "16px", top: "10px", bottom: "10px", width: "2px", background: "#1a2e1a" }} />
              {result.milestoneResults.slice(0, 6).map((m, i) => {
                const isTarget = m.amount === target;
                return (
                  <motion.div key={m.label}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "12px", position: "relative" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%",
                      background: isTarget ? "#f59e0b" : "#0d1a0d",
                      border: `2px solid ${isTarget ? "#f59e0b" : "#1a2e1a"}`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1, fontSize: "14px" }}>
                      {m.emoji}
                    </div>
                    <div style={{ background: isTarget ? "rgba(245,158,11,0.1)" : "#0d1a0d", border: `1px solid ${isTarget ? "rgba(245,158,11,0.3)" : "#1a2e1a"}`, borderRadius: "12px", padding: "10px 14px", flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: isTarget ? "#f59e0b" : "#cbd5e1" }}>
                          {m.label} {isTarget ? "🎯" : ""}
                        </span>
                        <span style={{ fontSize: "14px", fontWeight: "700", color: isTarget ? "#f59e0b" : "#10b981" }}>
                          {m.years} साल
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Fun fact */}
          <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "14px", padding: "16px 18px" }}>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 6px" }}>💡 Did You Know?</p>
            <p style={{ fontSize: "14px", color: "#a7f3d0", margin: 0, lineHeight: 1.6 }}>
              अगर आप आज से {fmt(monthly)}/month invest करना शुरू करें —
              <strong style={{ color: "#10b981" }}> {targetMilestone.years} साल बाद {fmtL(target)} </strong>
              हो जाएगा! Compounding ka jadoo! ✨
            </p>
          </div>
        </motion.div>
      ) : (
        <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: "16px", padding: "20px", textAlign: "center" }}>
          <p style={{ color: "#f87171", fontSize: "15px", fontWeight: "600", margin: "0 0 6px" }}>
            इस SIP से बहुत time lagega
          </p>
          <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>
            Monthly SIP amount badhao ya return rate adjust karo।
          </p>
        </div>
      )}

      <p style={{ fontSize: "11px", color: "#334155", textAlign: "center", marginTop: "16px" }}>
        * Calculations estimated हैं। Market returns guaranteed नहीं हैं।
      </p>
    </div>
  );
}